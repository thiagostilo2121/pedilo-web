/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
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
  ShoppingBag,
  MapPin,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calcularPrecioEfectivo, calcularTotalCarrito } from "../utils/precioUtils";
import { getCheckoutMessage, BuildWhatsAppUrl } from "../utils/whatsappFormatter";

export default function Checkout({ slug }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [carrito, setCarrito] = useState([]);
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State pedido y cupones
  const [pedido, setPedido] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

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
      navigate(`/n/${slug}`);
    } else {
      setCarrito(parsedCarrito);
    }
  }, [slug, navigate, pedido]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidatingCoupon(true);
    try {
      const itemsPayload = carrito.map(p => ({
        producto_id: p.id,
        cantidad: p.cantidad,
        toppings: (p.toppings || []).map(t => ({ topping_id: t.id }))
      }));

      const res = await apiPublic.post(`/${slug}/validate-coupon`, {
        codigo: couponCode,
        items: itemsPayload
      });

      if (res.data.valido) {
        setDiscount(res.data.descuento);
        setAppliedCoupon(res.data.promocion);
        toast.success(`Cupón aplicado: $${res.data.descuento} OFF`);
      }
    } catch (error) {
      console.error(error);
      setDiscount(0);
      setAppliedCoupon(null);
      toast.error(error.response?.data?.detail || "Cupón inválido");
    } finally {
      setValidatingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const onSubmit = async (data) => {
    if (!carrito.length) return;

    setIsSubmitting(true);
    try {
      const payload = {
        nombre_cliente: data.nombre_cliente,
        telefono_cliente: (data.codigo_pais_cliente || "") + (data.telefono_cliente || "").replace(/\D/g, ""),
        metodo_pago: data.metodo_pago,
        tipo_entrega: data.tipo_entrega,
        direccion_entrega: data.direccion || null,
        notas: data.notas || null,
        codigo_cupon: appliedCoupon ? appliedCoupon.codigo : null,
        items: carrito.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
          toppings: (p.toppings || []).map(t => ({ topping_id: t.id }))
        })),
      };

      const newOrder = await pedidosService.create(slug, payload);

      // Keep direccion in local state for WhatsApp message
      setPedido({ ...newOrder, direccion: data.direccion });

      localStorage.removeItem(`carrito_${slug}`);
      setCarrito([]);
      toast.success("¡Pedido enviado con éxito!");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || err.response?.data?.message || "Error al procesar el pedido.";
      toast.error(Array.isArray(errorMsg) ? "Datos de envío inválidos" : errorMsg);
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
              href={BuildWhatsAppUrl((negocio.codigo_pais || "") + negocio.telefono, getCheckoutMessage(negocio, pedido))}
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

  const total = calcularTotalCarrito(carrito, negocio);

  // Validación de Pedido Mínimo (Distribuidoras)
  const montoMinimo = (negocio?.tipo_negocio === 'distribuidora' && negocio?.pedido_minimo) || 0;
  const cumpleMinimo = total >= montoMinimo;
  const faltaParaMinimo = montoMinimo - total;

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
                  className="w-full p-2 focus:outline-none text-base font-bold text-gray-700"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              {errors.nombre_cliente && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.nombre_cliente.message}</span>}
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Teléfono</label>
              <div className="flex gap-2">
                <div className="w-20 sm:w-24 shrink-0 flex items-center border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-2 sm:px-3 py-1">
                  <span className="text-gray-400 text-sm font-bold">+</span>
                  <input
                    {...register("codigo_pais_cliente", { required: true })}
                    className="w-full p-2 focus:outline-none text-base font-bold text-gray-700 min-w-0"
                    placeholder="54"
                    maxLength={4}
                  />
                </div>
                <div className="flex-1 min-w-0 flex items-center border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-1">
                  <Phone size={18} className="text-gray-400 shrink-0" />
                  <input
                    {...register("telefono_cliente", {
                      required: "El teléfono es necesario",
                      onChange: (e) => {
                        const val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || e.target.value.replace(/\D/g, '');
                        e.target.value = val;
                      }
                    })}
                    className="w-full p-2 focus:outline-none text-base font-bold text-gray-700 min-w-0"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <span className="text-sm font-bold">{m}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                      <span className="text-sm font-bold">{t}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* CAMPO DINÁMICO DE DIRECCIÓN */}
              {(watch("tipo_entrega")?.toLowerCase().includes("delivery") ||
                watch("tipo_entrega")?.toLowerCase().includes("envío") ||
                watch("tipo_entrega")?.toLowerCase().includes("domicilio")) && (
                  <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Dirección de Entrega</label>
                    <div className="flex items-start border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-2">
                      <MapPin size={18} className="text-gray-400 mt-2" />
                      <textarea
                        {...register("direccion", {
                          required: "La dirección es necesaria para el envío"
                        })}
                        rows={2}
                        className="w-full p-2 focus:outline-none text-base font-bold text-gray-700 resize-none"
                        placeholder="Calle 123, Piso/Depto, Referencias..."
                      />
                    </div>
                    {errors.direccion && <span className="text-[10px] text-red-500 font-bold ml-1">{errors.direccion.message}</span>}
                  </div>
                )}

              {/* Notas del pedido */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Notas (opcional)</label>
                <div className="flex items-start border-2 rounded-2xl focus-within:border-orange-500 transition-colors bg-white px-3 py-2">
                  <textarea
                    {...register("notas")}
                    rows={2}
                    className="w-full p-2 focus:outline-none text-base font-bold text-gray-700 resize-none"
                    placeholder="Instrucciones especiales, aclaraciones..."
                  />
                </div>
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
                <div key={item.cartItemId || item.id} className="flex justify-between items-start text-sm py-2 border-b border-gray-50 last:border-0">
                  <div className="flex gap-2 min-w-0">
                    <span className="font-bold text-orange-600 whitespace-nowrap">{item.cantidad}x</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-gray-600 truncate">{item.nombre}</span>
                        {negocio?.tipo_negocio === 'distribuidora' && item.precio_mayorista && item.cantidad_mayorista && item.cantidad >= item.cantidad_mayorista && (
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                            Mayorista
                          </span>
                        )}
                      </div>
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                          {(() => {
                            const counts = item.toppings.reduce((acc, t) => {
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
                  <span className="font-bold text-gray-900 ml-2 whitespace-nowrap">
                    ${(calcularPrecioEfectivo(item, negocio) * item.cantidad).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-dashed border-gray-100">

              {/* CUPONES UI */}
              <div className="mb-4">
                {!appliedCoupon ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleApplyCoupon();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Código de descuento"
                      className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase font-bold text-gray-700"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button
                      type="submit"
                      disabled={validatingCoupon || !couponCode}
                      className="shrink-0 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black disabled:opacity-50"
                    >
                      {validatingCoupon ? "..." : "Aplicar"}
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-bold">Cupón {appliedCoupon.codigo}</span>
                    </div>
                    <button type="button" onClick={removeCoupon} className="text-xs text-red-500 font-bold hover:underline">
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              {/* SUBTOTAL y DESCUENTO */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">
                    Subtotal {negocio?.tipo_negocio === 'distribuidora' && carrito.some(i => i.precio_mayorista && i.cantidad_mayorista && i.cantidad >= i.cantidad_mayorista) && "(con precios mayoristas)"}
                  </span>
                  <span className="font-bold text-gray-900">${total.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span className="font-bold">Descuento</span>
                    <span className="font-bold">-${discount.toFixed(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold uppercase text-xs">Total a pagar</span>
                <span className="text-3xl font-black text-orange-600">
                  ${Math.max(0, total - discount).toFixed(0)}
                </span>
              </div>

              {!cumpleMinimo && (
                <div className="mb-4 bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-600 animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle size={20} className="shrink-0" />
                  <p className="text-xs font-bold leading-tight">
                    El pedido mínimo es de <span className="text-black">${montoMinimo.toLocaleString()}</span>.
                    Te faltan <span className="text-black">${faltaParaMinimo.toLocaleString()}</span>.
                  </p>
                </div>
              )}

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || carrito.length === 0 || !cumpleMinimo}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${isSubmitting || !cumpleMinimo
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