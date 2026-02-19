/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useEffect, useState, useCallback, useRef } from "react";
import pedidosService from "../services/pedidosService";
import DashboardLayout from "../layout/DashboardLayout";
import { useRequirePremium } from "../hooks/useRequirePremium";
import { useToast } from "../contexts/ToastProvider";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  ChevronRight,
  Phone,
  CreditCard,
  Truck,
  Bell,
  BellOff,
  HandPlatter,
  ChefHat,
  Inbox,
  User,
  MapPin
} from "lucide-react";
import Skeleton from "../components/ui/Skeleton";

export default function PedidosDashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [filtro, setFiltro] = useState("activos"); // activos | finalizados | todos
  const [updatingId, setUpdatingId] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => localStorage.getItem("pedilo_notifications") === "true");
  const [incomingOrder, setIncomingOrder] = useState(null);
  const toast = useToast();

  const notifiedPedidosIds = useRef(new Set());
  const isFirstFetch = useRef(true);
  const audioRef = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"));

  const playNotification = useCallback((pedido) => {
    // 1. Audio Reset & Play
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }

    // 2. Set In-App Alert (Critical for Mobile when app is open)
    setIncomingOrder(pedido);

    // 3. Native Notification
    if (Notification.permission === "granted") {
      try {
        const title = `¡Nuevo Pedido $${Math.round(pedido.total)}! 🔔`;
        const options = {
          body: `${pedido.nombre_cliente} • ${pedido.items.length} productos\nToca para gestionar.`,
          icon: "/favicons/favicon2.png",
          badge: "/favicons/favicon2.png",
          vibrate: [200, 100, 200],
          tag: `pedido-${pedido.id}`,
          requireInteraction: true,
          data: { url: window.location.href }
        };

        // Service Worker Registration for better mobile support (optional check)
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then(registration => {
            // If supported, show via SW (better for mobile)
            if (registration.showNotification) {
              registration.showNotification(title, options);
            } else {
              new Notification(title, options);
            }
          });
        } else {
          const n = new Notification(title, options);
          n.onclick = (e) => {
            e.preventDefault();
            window.focus();
            setPedidoActivo(pedido);
            setIncomingOrder(null);
            n.close();
          };
        }
      } catch (e) {
        console.error("Notification failed", e);
      }
    }
  }, []);

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem("pedilo_notifications", "false");
      return;
    }
    if (!("Notification" in window)) {
      toast.error("Tu navegador no soporta notificaciones.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      localStorage.setItem("pedilo_notifications", "true");

      // Feedback
      audioRef.current.play().catch(() => { });
      new Notification("Notificaciones Activas ✅", {
        body: "Te avisaremos aquí cuando llegue un pedido.",
        icon: "/favicons/favicon2.png"
      });
      toast.success("Notificaciones activas");
    } else {
      toast.error("Permiso denegado. Habilitalo en el navegador.");
    }
  };

  const fetchPedidos = useCallback(async (silencioso = false) => {
    if (!silencioso) setLoading(true);
    try {
      const data = await pedidosService.getAll(40);
      if (!Array.isArray(data)) throw new Error("Formato inválido de pedidos");

      if (!isFirstFetch.current) {
        const newOrders = data.filter(p =>
          p.estado === 'pendiente' && !notifiedPedidosIds.current.has(p.id)
        );
        if (newOrders.length > 0 && notificationsEnabled) {
          playNotification(newOrders[0]);
        }
      }

      data.forEach(p => {
        if (p.estado === 'pendiente') notifiedPedidosIds.current.add(p.id);
      });

      isFirstFetch.current = false;
      setPedidos(data);
    } catch (err) {
      console.error("Error al cargar pedidos", err);
      if (!silencioso) toast.error("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  }, [toast, notificationsEnabled, playNotification]);

  useRequirePremium();

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(() => fetchPedidos(true), 15000);
    return () => clearInterval(interval);
  }, [fetchPedidos]);


  const updateEstado = async (pedidoId, accion) => {
    if (updatingId === pedidoId) return;
    setUpdatingId(pedidoId);
    try {
      await pedidosService.updateEstado(pedidoId, accion);
      toast.success("Estado actualizado");
      await fetchPedidos(true);
      if (pedidoActivo?.id === pedidoId) setPedidoActivo(null);
    } catch (err) {
      console.error("Error al actualizar estado", err);
      toast.error("Error al actualizar.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusConfig = (estado) => {
    const configs = {
      pendiente: { color: "bg-amber-50 text-amber-700 border-amber-100", icon: <Clock size={14} />, label: "Nuevo" },
      aceptado: { color: "bg-blue-50 text-blue-700 border-blue-100", icon: <CheckCircle2 size={14} />, label: "Aceptado" },
      en_progreso: { color: "bg-purple-50 text-purple-700 border-purple-100", icon: <ChefHat size={14} />, label: "Cocinando" },
      finalizado: { color: "bg-green-50 text-green-700 border-green-100", icon: <HandPlatter size={14} />, label: "Listo" },
      rechazado: { color: "bg-red-50 text-red-700 border-red-100", icon: <XCircle size={14} />, label: "Rechazado" },
    };
    return configs[estado] || { color: "bg-gray-50 text-gray-700 border-gray-100", label: estado };
  };

  const pedidosFiltrados = pedidos
    .filter(p => {
      if (filtro === "activos") return ["pendiente", "aceptado", "en_progreso"].includes(p.estado);
      if (filtro === "finalizados") return p.estado === "finalizado" || p.estado === "rechazado";
      return true;
    });

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Pedidos
            <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 rounded-full border border-orange-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">En Vivo</span>
            </div>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Gestioná tus ventas en tiempo real.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={toggleNotifications}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border ${notificationsEnabled
              ? "bg-white text-orange-600 border-orange-200 shadow-orange-100"
              : "bg-white text-gray-400 border-gray-100"
              }`}
          >
            {notificationsEnabled ? <Bell size={18} className="animate-bounce" /> : <BellOff size={18} />}
            <span className="hidden sm:inline">{notificationsEnabled ? "Sonido Activado" : "Activar Sonido"}</span>
          </button>

          <div className="flex bg-white border border-gray-100 p-1 rounded-xl shadow-sm">
            {["activos", "finalizados", "todos"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filtro === f ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && !pedidos.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20 rounded-lg" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-8 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <div className="pt-4 border-t border-gray-50 flex gap-2">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center max-w-2xl mx-auto">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Inbox className="text-gray-400" size={40} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">No hay pedidos</h3>
          <p className="text-gray-500">
            {filtro === "todos" ? "Esperando que llegue el primer pedido..." : `No hay pedidos ${filtro} en este momento.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {pedidosFiltrados.map((pedido) => {
            const config = getStatusConfig(pedido.estado);
            return (
              <div
                key={pedido.id}
                className={`bg-white rounded-3xl border transition-all hover:shadow-xl group relative overflow-hidden flex flex-col ${pedido.estado === 'pendiente' ? 'border-orange-200 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/20' : 'border-gray-100 shadow-sm'
                  }`}
              >
                {pedido.estado === 'pendiente' && <div className="absolute top-0 inset-x-0 h-1 bg-orange-500 animate-pulse" />}

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                      #{pedido.codigo || pedido.id?.toString().slice(-4)}
                    </span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${config.color}`}>
                      {config.icon} {config.label}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-black text-gray-900 truncate leading-tight mb-1">{pedido.nombre_cliente || "Cliente"}</h2>
                    <div className="flex items-center gap-3 text-gray-500 text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {(() => {
                          const fecha = new Date(pedido.creado_en);
                          const hoy = new Date();
                          const ayer = new Date(hoy);
                          ayer.setDate(hoy.getDate() - 1);

                          const esHoy = fecha.toDateString() === hoy.toDateString();
                          const esAyer = fecha.toDateString() === ayer.toDateString();

                          const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                          if (esHoy) return hora;
                          if (esAyer) return `Ayer ${hora}`;
                          return `${fecha.getDate()}/${fecha.getMonth() + 1} ${hora}`;
                        })()}
                      </span>
                      <span className="flex items-center gap-1"><CreditCard size={12} /> {pedido.metodo_pago}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-3 mb-4 flex-1">
                    <div className="space-y-1">
                      {(pedido.items || []).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-700">
                          <span className="font-bold truncate max-w-[70%]"><span className="text-orange-600">{item.cantidad}x</span> {item.nombre_producto}</span>
                        </div>
                      ))}
                      {(pedido.items?.length || 0) > 3 && (
                        <p className="text-[10px] text-gray-400 font-bold italic pt-1">... y {pedido.items.length - 3} más</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-dashed border-gray-100 pt-4 mt-auto">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Total</p>
                      <p className="text-2xl font-black text-gray-900">${Number(pedido.total || 0).toFixed(0)}</p>
                    </div>
                    <button
                      onClick={() => setPedidoActivo(pedido)}
                      className="bg-gray-900 text-white rounded-xl p-2.5 hover:bg-black transition-colors shadow-lg shadow-gray-200"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Acciones Rápidas (Solo si pendiente o en curso para no ensuciar) */}
                {(['pendiente', 'aceptado', 'en_progreso'].includes(pedido.estado)) && (
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex gap-2">
                    {pedido.estado === "pendiente" && (
                      <>
                        <button
                          onClick={() => updateEstado(pedido.id, "aceptar")}
                          disabled={updatingId === pedido.id}
                          className="flex-1 bg-green-500 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-100 disabled:opacity-50 active:scale-95"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => updateEstado(pedido.id, "rechazar")}
                          disabled={updatingId === pedido.id}
                          className="flex-1 bg-white text-red-500 border border-gray-200 py-2.5 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors disabled:opacity-50 active:scale-95"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {pedido.estado === "aceptado" && (
                      <button
                        onClick={() => updateEstado(pedido.id, "progreso")}
                        disabled={updatingId === pedido.id}
                        className="w-full bg-purple-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 disabled:opacity-50 active:scale-95"
                      >
                        A Cocina
                      </button>
                    )}
                    {pedido.estado === "en_progreso" && (
                      <button
                        onClick={() => updateEstado(pedido.id, "finalizar")}
                        disabled={updatingId === pedido.id}
                        className="w-full bg-green-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-green-700 shadow-lg shadow-green-100 disabled:opacity-50 active:scale-95"
                      >
                        Listo para retirar
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detalle (Full Screen Mobile) */}
      {pedidoActivo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center z-50 p-0 sm:p-6" onClick={() => setPedidoActivo(null)}>
          <div
            className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-gray-900">Pedido #{pedidoActivo.codigo || pedidoActivo.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${getStatusConfig(pedidoActivo.estado).color}`}>
                    {getStatusConfig(pedidoActivo.estado).icon} {getStatusConfig(pedidoActivo.estado).label}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {(() => {
                      const fecha = new Date(pedidoActivo.creado_en);
                      const hoy = new Date();
                      const ayer = new Date(hoy);
                      ayer.setDate(hoy.getDate() - 1);
                      const esHoy = fecha.toDateString() === hoy.toDateString();
                      const esAyer = fecha.toDateString() === ayer.toDateString();
                      const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                      if (esHoy) return `Hoy ${hora}`;
                      if (esAyer) return `Ayer ${hora}`;
                      return `${fecha.getDate()}/${fecha.getMonth() + 1} ${hora}`;
                    })()}
                  </span>
                </div>
              </div>
              <button onClick={() => setPedidoActivo(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                <XCircle size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4 flex-1 overflow-y-auto bg-gray-50/50">
              {/* Info Cliente */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{pedidoActivo.nombre_cliente}</p>
                    <p className="text-xs text-gray-500">{pedidoActivo.telefono_cliente}</p>
                  </div>
                </div>
                {pedidoActivo.direccion_entrega && (
                  <div className="pt-3 border-t border-gray-50 flex gap-2">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 font-medium">{pedidoActivo.direccion_entrega}</p>
                  </div>
                )}
              </div>

              {/* Método de pago y tipo entrega */}
              <div className="flex gap-2">
                <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Pago</p>
                    <p className="text-xs font-bold text-gray-800 capitalize">{pedidoActivo.metodo_pago || "—"}</p>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <Truck size={16} className="text-gray-400" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Entrega</p>
                    <p className="text-xs font-bold text-gray-800 capitalize">{pedidoActivo.tipo_entrega || "Retiro"}</p>
                  </div>
                </div>
              </div>

              {/* Notas */}
              {pedidoActivo.notas && (
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                  <p className="text-[10px] font-bold text-yellow-600 uppercase mb-1">Nota del cliente</p>
                  <p className="text-sm font-medium text-yellow-800 italic">"{pedidoActivo.notas}"</p>
                </div>
              )}

              {/* Items */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Package size={16} /> Productos
                </h3>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {pedidoActivo.items?.map((item, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-50 last:border-0 flex justify-between gap-4">
                      <div className="flex gap-3">
                        <span className="font-black text-orange-600 bg-orange-50 h-6 w-6 rounded-md flex items-center justify-center text-xs shrink-0">{item.cantidad}</span>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.nombre_producto}</p>
                          {item.toppings_seleccionados?.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              + {(() => {
                                const counts = item.toppings_seleccionados.reduce((acc, t) => {
                                  acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                  return acc;
                                }, {});
                                return Object.entries(counts)
                                  .map(([name, count]) =>
                                    count > 1 ? `${count}x ${name}` : name
                                  )
                                  .join(", ");
                              })()}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 text-sm shrink-0">
                        ${Number(item.subtotal).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 bg-white border-t border-gray-100 shrink-0 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-400">Total a cobrar</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">${Number(pedidoActivo.total).toFixed(0)}</span>
              </div>

              {/* Botones de acción según estado */}
              {(['pendiente', 'aceptado', 'en_progreso'].includes(pedidoActivo.estado)) && (
                <div className="flex gap-2 mb-3">
                  {pedidoActivo.estado === "pendiente" && (
                    <>
                      <button
                        onClick={() => updateEstado(pedidoActivo.id, "aceptar")}
                        disabled={updatingId === pedidoActivo.id}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-100 disabled:opacity-50 active:scale-95"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => updateEstado(pedidoActivo.id, "rechazar")}
                        disabled={updatingId === pedidoActivo.id}
                        className="flex-1 bg-white text-red-500 border border-red-200 py-3 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-50 active:scale-95"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {pedidoActivo.estado === "aceptado" && (
                    <button
                      onClick={() => updateEstado(pedidoActivo.id, "progreso")}
                      disabled={updatingId === pedidoActivo.id}
                      className="w-full bg-purple-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 disabled:opacity-50 active:scale-95"
                    >
                      Enviar a Cocina
                    </button>
                  )}
                  {pedidoActivo.estado === "en_progreso" && (
                    <button
                      onClick={() => updateEstado(pedidoActivo.id, "finalizar")}
                      disabled={updatingId === pedidoActivo.id}
                      className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-700 shadow-lg shadow-green-100 disabled:opacity-50 active:scale-95"
                    >
                      Listo para retirar
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  const mensaje = `Hola ${pedidoActivo.nombre_cliente}! 🍽️\n\nEstado de tu pedido *#${pedidoActivo.codigo || pedidoActivo.id}*:\n${pedidoActivo.estado === 'pendiente' ? '⏳ Recibido, esperando confirmación.' : pedidoActivo.estado === 'aceptado' ? '✅ ¡Aceptado! Estamos preparándolo.' : pedidoActivo.estado === 'en_progreso' ? '🍳 ¡En la cocina!' : '🚀 ¡Listo para disfrutar!'}`;
                  window.open(`https://wa.me/${pedidoActivo.telefono_cliente}?text=${encodeURIComponent(mensaje)}`);
                }}
                className="w-full py-3.5 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
              >
                <Phone size={18} /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Custom In-App Alert (Top Priority) */}
      {incomingOrder && (
        <div className="fixed top-4 left-4 right-4 z-[9999] animate-in slide-in-from-top duration-500">
          <div className="bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4 max-w-lg mx-auto ring-1 ring-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-2 animate-pulse">
                <Bell size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg leading-none">¡Nuevo Pedido!</h3>
                <p className="text-sm text-gray-300 font-medium">{incomingOrder.nombre_cliente} • <span className="text-white font-bold">${Math.round(incomingOrder.total)}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPedidoActivo(incomingOrder);
                  setIncomingOrder(null);
                }}
                className="bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-colors active:scale-95"
              >
                Ver
              </button>
              <button
                onClick={() => setIncomingOrder(null)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
