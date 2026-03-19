/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiPublic from "../../api/apiPublic";
import pedidosService from "../../services/pedidosService";
import { useToast } from "../../contexts/ToastProvider";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calcularTotalCarrito } from "../../utils/precioUtils";

// Modular Components
import CheckoutStepper from "../../components/checkout/CheckoutStepper";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import DeliveryMethodSelector from "../../components/checkout/DeliveryMethodSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import OrderSuccessScreen from "../../components/checkout/OrderSuccessScreen";

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
    toast.success("Cupón removido");
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

      setPedido({ ...newOrder, direccion: data.direccion });

      localStorage.removeItem(`carrito_${slug}`);
      setCarrito([]);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || err.response?.data?.message || "Error al procesar el pedido.";
      toast.error(Array.isArray(errorMsg) ? "Datos de envío inválidos" : errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-48 mb-6" />
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-16 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-32 mb-6" />
          <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-3xl h-64" />
        </div>
      </div>
    </div>
  );

  if (!negocio) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Error al cargar datos</h2>
      <p className="text-gray-500 mb-4">No pudimos obtener la información del negocio.</p>
      <button onClick={() => navigate(-1)} className="text-orange-600 font-bold underline">Volver</button>
    </div>
  );

  if (pedido) {
    return <OrderSuccessScreen pedido={pedido} negocio={negocio} slug={slug} navigate={navigate} />;
  }

  const total = calcularTotalCarrito(carrito, negocio);
  const montoMinimo = (negocio?.tipo_negocio === 'distribuidora' && negocio?.pedido_minimo) || 0;
  const cumpleMinimo = total >= montoMinimo;
  const faltaParaMinimo = montoMinimo - total;

  // Calculamos el step actual para el stepper visual
  const watchAll = watch();
  const isDatosComplete = watchAll.nombre_cliente?.length >= 3 && watchAll.telefono_cliente?.length >= 8 && watchAll.codigo_pais_cliente?.length >= 1;
  const isPagoComplete = !!watchAll.metodo_pago;
  const isDelivery = watchAll.tipo_entrega?.toLowerCase().includes("delivery") || 
                     watchAll.tipo_entrega?.toLowerCase().includes("envío") || 
                     watchAll.tipo_entrega?.toLowerCase().includes("domicilio");
  const isEntregaComplete = watchAll.tipo_entrega && (!isDelivery || (isDelivery && watchAll.direccion?.length > 4));

  // El stepper tiene 3 pasos máximo; completar todo lo deja en el paso 3 (no 4)
  let currentStep = 1;
  if (isDatosComplete) currentStep = 2;
  if (isDatosComplete && isPagoComplete) currentStep = 3;
  // Nota: isEntregaComplete deja el indicador en 3 (completo), no sube a 4

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold hover:text-orange-600 dark:hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver al menú
        </button>

        {/* Status indicator on desktop */}
        <div className="hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{negocio.nombre}</span>
        </div>
      </div>

      <CheckoutStepper currentStep={currentStep} colorPrimario={negocio.color_primario} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="lg:col-span-7 space-y-2">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            
            <CheckoutForm 
                register={register} 
                errors={errors} 
                watch={watch} 
                colorPrimario={negocio.color_primario} 
            />

            <PaymentMethodSelector 
                register={register} 
                watch={watch} 
                metodosPago={negocio.metodos_pago} 
            />

            <DeliveryMethodSelector 
                register={register} 
                watch={watch} 
                errors={errors} 
                tiposEntrega={negocio.tipos_entrega} 
            />
            
          </form>
        </div>

        {/* Lado Derecho: Resumen Ticket */}
        <div className="lg:col-span-5">
            <OrderSummary
                carrito={carrito}
                negocio={negocio}
                total={total}
                discount={discount}
                appliedCoupon={appliedCoupon}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
                removeCoupon={removeCoupon}
                validatingCoupon={validatingCoupon}
                cumpleMinimo={cumpleMinimo}
                montoMinimo={montoMinimo}
                faltaParaMinimo={faltaParaMinimo}
                isSubmitting={isSubmitting}
            />
        </div>
      </div>
    </div>
  );
}