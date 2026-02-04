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

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiPublic from "../api/apiPublic";
import pedidosService from "../services/pedidosService";
import { useToast } from "../contexts/ToastProvider";
import {
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Truck,
  User,
  Phone,
  MessageSquare,
  ShoppingBag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ slug }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [carrito, setCarrito] = useState([]);
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const storedCarrito = localStorage.getItem(`carrito_${slug}`);
    if (storedCarrito) setCarrito(JSON.parse(storedCarrito));

    async function fetchNegocio() {
      try {
        setLoading(true);
        const res = await apiPublic.get(`/${slug}`);
        setNegocio(res.data);
      } catch (err) {
        toast.error("No se pudo cargar la información del negocio.");
      } finally {
        setLoading(false);
      }
    }
    fetchNegocio();
  }, [slug, toast]);

  useEffect(() => {
    const storedCarrito = localStorage.getItem(`carrito_${slug}`);
    const parsedCarrito = storedCarrito ? JSON.parse(storedCarrito) : [];

    if (parsedCarrito.length === 0 && !pedido) {
      // Si no hay productos y no venimos de finalizar un pedido, volvemos
      navigate(`/n/${slug}`);
    } else {
      setCarrito(parsedCarrito);
    }
  }, [slug, navigate, pedido]);

  const onSubmit = async (data) => {
    if (!carrito.length) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        telefono_cliente: (data.codigo_pais_cliente || "") + (data.telefono_cliente || "").replace(/\D/g, ""),
        items: carrito.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
        })),
      };

      // Limpiar campos auxiliares del payload si existen
      delete payload.codigo_pais_cliente;

      const newOrder = await pedidosService.create(slug, payload);
      setPedido(newOrder);
      localStorage.removeItem(`carrito_${slug}`);
      setCarrito([]);
      toast.success("¡Pedido enviado con éxito!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al procesar el pedido. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6" />
          <div className="bg-gray-100 rounded-3xl h-64" />
        </div>
      </div>
    </div>
  );

  if (!negocio) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Error al cargar datos</h2>
      <p className="text-gray-500 mb-4">No pudimos obtener la información del negocio.</p>
      <button onClick={() => navigate(-1)} className="text-orange-600 font-bold underline">Volver</button>
    </div>
  );

  // ================== PANTALLA DE ÉXITO ==================
  if (pedido) return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900">¡Pedido Recibido!</h2>
          <p className="text-gray-500 text-sm mt-1">Ya estamos listos para prepararlo.</p>
        </div>

        <div className="py-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Código de Seguimiento</p>
          <p className="text-4xl font-black text-gray-900 tracking-tighter italic">
            {pedido.codigo}
          </p>
        </div>

        <div className="space-y-3">
          {negocio.telefono && (
            <a
              href={`https://wa.me/${(negocio.codigo_pais || "") + negocio.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(
                `¡Hola ${negocio.nombre}! Acabo de realizar un pedido.\n\nCódigo: *${pedido.codigo}*\nNombre: ${pedido.nombre_cliente}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100"
            >
              <MessageSquare size={20} /> Enviar a WhatsApp
            </a>
          )}
          <button
            onClick={() => navigate(`/n/${slug}`)}
            className="w-full text-gray-500 font-bold text-sm py-2 hover:text-gray-800"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );

  const total = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  // Helper para iconos inteligentes
  const getIconForOption = (text, type) => {
    const t = text.toLowerCase();
    if (type === 'pago') {
      if (t.includes('efectivo')) return "💵";
      if (t.includes('mercado')) return "📲";
      if (t.includes('tarjeta') || t.includes('débito') || t.includes('crédito')) return "💳";
      if (t.includes('transferencia')) return "🏦";
      return "💲";
    }
    if (type === 'entrega') {
      if (t.includes('local') || t.includes('retiro')) return "🏪";
      if (t.includes('delivery') || t.includes('envío') || t.includes('moto')) return "🛵";
      return "📦";
    }
    return "🔹";
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* ... (Header y boton volver se mantienen, solo mostramos el form refactorizado) */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft size={20} /> Volver al menú
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">Tus Datos</h2>

          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nombre Completo</label>
              <div className="flex items-center border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-1">
                <User size={18} className="text-gray-400" />
                <input
                  {...register("nombre_cliente", { required: "El nombre es obligatorio" })}
                  className="w-full p-2 focus:outline-none text-sm font-bold text-gray-700"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              {errors.nombre_cliente && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.nombre_cliente.message}</span>}
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Teléfono</label>
              <div className="flex gap-2">
                <div className="flex-[0.3] flex items-center border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-1">
                  <span className="text-gray-400 text-sm font-bold">+</span>
                  <input
                    {...register("codigo_pais_cliente", { required: true })}
                    className="w-full p-2 focus:outline-none text-sm font-bold text-gray-700"
                    placeholder="54"
                    maxLength={4}
                  />
                </div>
                <div className="flex-[0.7] flex items-center border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-1">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    {...register("telefono_cliente", {
                      required: "El teléfono es necesario",
                      onChange: (e) => {
                        const val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || e.target.value.replace(/\D/g, '');
                        e.target.value = val;
                      }
                    })}
                    className="w-full p-2 focus:outline-none text-sm font-bold text-gray-700"
                    placeholder="11 2233 4455"
                  />
                </div>
              </div>
              {(errors.telefono_cliente || errors.codigo_pais_cliente) && (
                <span className="text-[10px] text-red-500 font-bold ml-1">
                  El código y el teléfono son obligatorios
                </span>
              )}
            </div>

            {/* SECCIÓN PAGO */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1 mb-2">
                <CreditCard size={12} /> Método de Pago
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(negocio.metodos_pago || ["Efectivo"]).map((m) => (
                  <label key={m} className="cursor-pointer">
                    <input
                      type="radio"
                      value={m}
                      {...register("metodo_pago", { required: true })}
                      className="peer sr-only"
                    />
                    <div className="p-3 border-2 border-gray-100 rounded-2xl bg-white hover:bg-gray-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 transition-all flex flex-col items-center justify-center gap-1 text-center h-full">
                      <span className="text-2xl">{getIconForOption(m, 'pago')}</span>
                      <span className="text-xs font-bold">{m}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* SECCIÓN ENTREGA */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1 mb-2">
                <Truck size={12} /> Entrega
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(negocio.tipos_entrega || ["Retiro en local"]).map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input
                      type="radio"
                      value={t}
                      {...register("tipo_entrega", { required: true })}
                      className="peer sr-only"
                    />
                    <div className="p-3 border-2 border-gray-100 rounded-2xl bg-white hover:bg-gray-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 transition-all flex flex-col items-center justify-center gap-1 text-center h-full">
                      <span className="text-2xl">{getIconForOption(t, 'entrega')}</span>
                      <span className="text-xs font-bold">{t}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </form>
        </div>

        {/* Resumen Estilo Ticket */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">Resumen</h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {carrito.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div className="flex gap-2 min-w-0">
                    <span className="font-bold text-orange-600">{item.cantidad}x</span>
                    <span className="text-gray-600 truncate">{item.nombre}</span>
                  </div>
                  <span className="font-bold text-gray-900 ml-2">${(item.precio * item.cantidad).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-dashed border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold uppercase text-xs">Total a pagar</span>
                <span className="text-3xl font-black text-orange-600">${total.toFixed(0)}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || carrito.length === 0}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-black shadow-xl active:scale-95"
                  }`}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent animate-spin rounded-full" />
                ) : (
                  <>Finalizar Pedido <ShoppingBag size={20} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}