/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
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
  Inbox
} from "lucide-react";
import Skeleton from "../components/ui/Skeleton";

export default function PedidosDashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [filtro, setFiltro] = useState("activos"); // activos | finalizados | todos
  const [updatingId, setUpdatingId] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const toast = useToast();

  const notifiedPedidosIds = useRef(new Set());
  const isFirstFetch = useRef(true);
  const audioRef = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"));

  const playNotification = useCallback((pedido) => {
    // 1. Sonido
    audioRef.current.play().catch(e => console.log("Audio play blocked", e));

    // 2. Notificación de Navegador
    if (Notification.permission === "granted") {
      const notification = new Notification("¡Nuevo Pedido Recibido! 🔔", {
        body: `De: ${pedido.nombre_cliente || 'Cliente'} - Total: $${pedido.total}`,
        icon: "/vite.svg"
      });
      notification.onclick = () => {
        window.focus();
        setPedidoActivo(pedido);
      };
    }

    // 3. Toast visual
    toast.info(`Nuevo pedido de ${pedido.nombre_cliente || 'Cliente'}`);
  }, [toast]);

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      return;
    }

    if (!("Notification" in window)) {
      toast.error("Tu navegador no soporta notificaciones.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      toast.success("Notificaciones activas");
      audioRef.current.play().catch(() => { });
    } else {
      toast.error("Permiso denegado");
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

      // Actualizar set de notificados para incluir todos los actuales
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

  // Verificar suscripción premium y negocio
  useRequirePremium();


  useEffect(() => {
    fetchPedidos();
    // Refresco automático cada 15 segundos para el dashboard (más agresivo que el seguimiento)
    const interval = setInterval(() => fetchPedidos(true), 15000);
    return () => clearInterval(interval);
  }, [fetchPedidos]);


  const updateEstado = async (pedidoId, accion) => {
    if (updatingId === pedidoId) return;
    setUpdatingId(pedidoId);
    try {
      await pedidosService.updateEstado(pedidoId, accion);
      toast.success("Estado actualizado correctamente");
      await fetchPedidos(true);
      if (pedidoActivo?.id === pedidoId) setPedidoActivo(null);
    } catch (err) {
      console.error("Error al actualizar estado", err);
      const msg = err?.response?.data?.message || "Error al actualizar el estado.";
      toast.error(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusConfig = (estado) => {
    const configs = {
      pendiente: { color: "bg-amber-100 text-amber-700", icon: <Clock size={14} />, label: "Nuevo" },
      aceptado: { color: "bg-blue-100 text-blue-700", icon: <CheckCircle2 size={14} />, label: "Aceptado" },
      en_progreso: { color: "bg-purple-100 text-purple-700", icon: <ChefHat size={14} />, label: "Cocinando" },
      finalizado: { color: "bg-green-100 text-green-700", icon: <HandPlatter size={14} />, label: "Finalizado" },
      rechazado: { color: "bg-red-100 text-red-700", icon: <XCircle size={14} />, label: "Rechazado" },
    };
    return configs[estado] || { color: "bg-gray-100 text-gray-700", label: estado };
  };

  const pedidosFiltrados = pedidos
    .filter(p => {
      if (filtro === "activos") return ["pendiente", "aceptado", "en_progreso"].includes(p.estado);
      if (filtro === "finalizados") return p.estado === "finalizado" || p.estado === "rechazado";
      return true;
    })
    .reverse();

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Pedidos
            <div className="flex items-center gap-1.5 ml-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">En Vivo</span>
            </div>
          </h1>
          <p className="text-gray-500 text-sm">Gestiona tus ventas en tiempo real.</p>
        </div>

        {/* Filtros y Notificaciones */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleNotifications}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold transition-all shadow-sm border ${notificationsEnabled
              ? "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100"
              : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
              }`}
            title={notificationsEnabled ? "Desactivar alertas" : "Activar alertas de sonido"}
          >
            {notificationsEnabled ? <Bell size={18} className="animate-bounce" /> : <BellOff size={18} />}
            <span className="hidden sm:inline">{notificationsEnabled ? "Alertas ON" : "Alertas OFF"}</span>
          </button>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["activos", "finalizados", "todos"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${filtro === f ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && !pedidos.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-gray-100 flex flex-col h-56">
              <div className="p-5 flex-1 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 rounded w-16" />
                  <Skeleton className="h-6 rounded-full w-24" />
                </div>
                <Skeleton className="h-6 rounded w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 rounded w-1/2" />
                  <Skeleton className="h-4 rounded w-1/3" />
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 rounded-b-2xl flex gap-2">
                <Skeleton className="h-8 rounded-xl flex-1" />
                <Skeleton className="h-8 rounded-xl flex-1" />
              </div>
            </div>
          ))}
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No hay pedidos</h3>
          <p className="text-gray-500">
            {filtro === "todos"
              ? "Todavía no recibiste ningún pedido."
              : `No hay pedidos ${filtro}.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pedidosFiltrados.map((pedido) => {
            const config = getStatusConfig(pedido.estado);
            return (
              <div
                key={pedido.id}
                className={`bg-white rounded-2xl border-2 transition-all ${pedido.estado === 'pendiente' ? 'border-orange-200 shadow-orange-50 shadow-lg' : 'border-gray-100'
                  }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black bg-gray-900 text-white px-2 py-1 rounded tracking-widest uppercase">
                      #{pedido.codigo || pedido.id?.toString().slice(-4)}
                    </span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                      {config.icon} {config.label}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 truncate">{pedido.nombre_cliente || "Cliente"}</h2>
                  <div className="space-y-1.5 mt-2 mb-4">
                    <p className="text-gray-500 text-xs flex items-center gap-2">
                      <Phone size={14} /> {pedido.telefono_cliente || "—"}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center gap-2">
                      <CreditCard size={14} /> {pedido.metodo_pago || "—"}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-black text-gray-900">
                      ${Number(pedido.total || 0).toFixed(0)}
                    </span>
                    <button
                      onClick={() => setPedidoActivo(pedido)}
                      className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:underline"
                    >
                      Ver Detalle <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-gray-50 px-4 sm:px-5 py-3 rounded-b-2xl flex gap-2">
                  {pedido.estado === "pendiente" && (
                    <>
                      <button
                        onClick={() => updateEstado(pedido.id, "aceptar")}
                        disabled={updatingId === pedido.id}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => updateEstado(pedido.id, "rechazar")}
                        disabled={updatingId === pedido.id}
                        className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {pedido.estado === "aceptado" && (
                    <button
                      onClick={() => updateEstado(pedido.id, "progreso")}
                      disabled={updatingId === pedido.id}
                      className="w-full bg-purple-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-purple-700 disabled:opacity-50"
                    >
                      Empezar Cocina
                    </button>
                  )}
                  {pedido.estado === "en_progreso" && (
                    <button
                      onClick={() => updateEstado(pedido.id, "finalizar")}
                      disabled={updatingId === pedido.id}
                      className="w-full bg-green-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-green-700 disabled:opacity-50"
                    >
                      Finalizar Pedido
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Detalle de Ticket */}
      {pedidoActivo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-dashed flex justify-between items-center bg-gray-50">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resumen del Pedido</p>
                <h2 className="text-xl font-black">#{pedidoActivo.codigo || pedidoActivo.id}</h2>
              </div>
              <button onClick={() => setPedidoActivo(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors font-bold">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Entrega</p>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Truck size={14} /> {pedidoActivo.tipo_entrega || "—"}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Pago</p>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CreditCard size={14} /> {pedidoActivo.metodo_pago || "—"}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Package size={18} className="text-orange-500" /> Productos
                </h3>
                <div className="space-y-3">
                  {(pedidoActivo.items || []).map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                      <div className="flex gap-2 items-start">
                        <span className="font-bold text-orange-600 pt-0.5">{item.cantidad || 0}x</span>
                        <div>
                          <p className="text-gray-700 font-medium leading-tight">{item.nombre_producto || "Producto"}</p>
                          {item.toppings_seleccionados && item.toppings_seleccionados.length > 0 && (
                            <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                              {(() => {
                                const counts = item.toppings_seleccionados.reduce((acc, t) => {
                                  acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                  return acc;
                                }, {});
                                return Object.entries(counts)
                                  .map(([name, count]) => count > 1 ? `${count}x ${name}` : name)
                                  .join(", ");
                              })()}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${Number(item.subtotal || 0).toFixed(0)}
                      </span>
                    </div>
                  ))}
                  {!pedidoActivo.items?.length && (
                    <p className="text-xs text-gray-400">Sin productos registrados.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t-2 border-dashed">
                <span className="text-lg font-black uppercase">Total Pagado</span>
                <span className="text-2xl font-black text-orange-600">
                  ${Number(pedidoActivo.total || 0).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  if (!pedidoActivo.telefono_cliente) {
                    toast.error("No hay número de teléfono para este cliente.");
                    return;
                  }
                  const getMensajeWsp = (pedido) => {
                    const nombre = pedido.nombre_cliente || "Cliente";
                    const codigo = pedido.codigo || pedido.id;
                    const nombreNegocio = pedido.nombre_negocio || "Pedilo";
                    const base = `Hola ${nombre}, has realizado un pedido por ${nombreNegocio}!`;

                    const mensajes = {
                      pendiente: `${base} Hemos recibido tu pedido *${codigo}*. Te avisaremos cuando lo aceptemos!`,
                      aceptado: `${base} Tu pedido *${codigo}* ha sido aceptado.`,
                      en_progreso: `${base} Tu pedido *${codigo}* ya está en la cocina!`,
                      finalizado: `${base} ¡Buenas noticias! Tu pedido *${codigo}* está listo.`,
                      rechazado: `${base}. Lamentamos informarte que tu pedido *${codigo}* ha sido rechazado.`
                    };

                    return mensajes[pedido.estado] || `${base} Tu pedido *${codigo}* cambió a estado: ${pedido.estado}`;
                  };

                  const mensaje = getMensajeWsp(pedidoActivo);
                  window.open(`https://wa.me/${pedidoActivo.telefono_cliente}?text=${encodeURIComponent(mensaje)}`);
                }}
                className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-100"
              >
                <Phone size={18} /> Avisar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
