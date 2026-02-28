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

import { useState } from "react";
import { Check, Loader2, Gift, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import { getCheckoutUrl } from "../../services/suscripcionService";
import { useToast } from "../../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function Planes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(null); // 'basico' or 'pro'

  const planes = [
    {
      id: "basico",
      nombre: "Plan Básico",
      precio: "18.000",
      periodo: "mes",
      destacado: false,
      btnText: "Seleccionar Básico",
      color: "blue",
      caracteristicas: [
        "Catálogo Digital Ilimitado",
        "Pedidos por WhatsApp",
        "Métricas Básicas de Ventas",
        "Personalización de Marca (PWA)",
        "Toppings y Agregados",
        "Soporte Estándar"
      ]
    },
    {
      id: "pro",
      nombre: "Plan Pro (Recomendado)",
      precio: "55.000",
      periodo: "mes",
      destacado: true,
      btnText: "Empezar prueba gratis",
      color: "violet",
      caracteristicas: [
        "Todo lo del Plan Básico",
        <span key="autopilot" className="font-black text-violet-700">Autopilot: Recomendaciones con IA</span>,
        "Sistema Avanzado de Cupones",
        "Flyer & QR Pro Tool",
        "Alertas de Riesgo de Abandono",
        "Simulador de ROI de Envío",
        "Setup Inicial Asistido Gratis"
      ]
    }
  ];

  const handleSuscribirse = async (planId) => {
    // Si no está logueado, redirigir a login
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(planId);
    try {
      const data = await getCheckoutUrl(planId);

      if (data.has_subscription) {
        toast.info("Ya tenés una suscripción activa");
        navigate("/dashboard");
        return;
      }

      if (data.url) {
        // Redirigir al checkout de Mercado Pago
        window.location.href = data.url;
      } else {
        toast.error("No se pudo generar el link de pago");
      }
    } catch (err) {
      console.error("Error al obtener checkout URL:", err);
      toast.error("Error al procesar. Intentá de nuevo.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Elegí cómo potenciar tu negocio
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-16 font-medium max-w-2xl mx-auto">
          Desde digitalizar tus ventas hasta transformar tus datos en acciones inteligentes con el Autopilot. Sin contratos, ni comisiones ocultas.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch lg:items-center">
          {/* Plan Basico */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col h-full transform lg:scale-95">
            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="text-blue-600 uppercase tracking-widest text-xs md:text-sm font-black mb-4">{planes[0].nombre}</div>

              <div className="flex justify-center flex-col items-center gap-2 mb-8 mt-2">
                <div className="flex items-baseline">
                  <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">${planes[0].precio}</span>
                  <span className="text-gray-400 font-bold text-lg ml-1">/{planes[0].periodo}</span>
                </div>
              </div>

              <div className="h-px w-full bg-gray-100 mb-8 mt-auto hidden md:block" />

              <ul className="space-y-4 text-left mb-10 flex-grow">
                {planes[0].caracteristicas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 font-medium text-sm">
                    <div className="bg-blue-50 p-1.5 rounded-full text-blue-600 flex-shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSuscribirse(planes[0].id)}
                disabled={loading !== null}
                className="w-full bg-blue-50 text-blue-700 py-4 rounded-xl font-bold text-lg hover:bg-blue-100 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-auto border border-blue-100"
              >
                {loading === planes[0].id ? <Loader2 className="animate-spin" size={20} /> : null}
                {planes[0].btnText}
              </button>
              <p className="mt-4 text-gray-400 text-xs font-medium opacity-0 select-none">Espaciador</p>
            </div>
          </div>

          {/* Plan Pro */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-violet-200/70 overflow-hidden border-2 border-violet-500 relative flex flex-col h-full z-10">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 text-center text-xs font-black uppercase tracking-widest shadow-md">
              El "Cerebro" de tu Negocio
            </div>

            <div className="p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles size={16} className="text-violet-500" />
                <div className="text-violet-600 uppercase tracking-widest text-xs md:text-sm font-black">{planes[1].nombre}</div>
                <Sparkles size={16} className="text-violet-500" />
              </div>

              <div className="flex justify-center flex-col items-center gap-2 mb-6">
                <div className="flex items-baseline">
                  <span className="text-6xl md:text-7xl font-black text-gray-950 tracking-tighter">${planes[1].precio}</span>
                  <span className="text-gray-400 font-bold text-lg ml-1">/{planes[1].periodo}</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 mb-8 border border-emerald-100 text-center shadow-inner">
                <Gift size={18} className="text-emerald-600 shrink-0" />
                <span className="font-black text-xs md:text-sm uppercase tracking-wide">14 Días de Prueba Gratis</span>
              </div>

              <ul className="space-y-4 text-left mb-10 flex-grow">
                {planes[1].caracteristicas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-800 font-medium text-sm">
                    <div className="bg-violet-100 p-1.5 rounded-full text-violet-600 flex-shrink-0 mt-0.5 shadow-sm">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSuscribirse(planes[1].id)}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:from-violet-700 hover:to-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-violet-200 mt-auto"
              >
                {loading === planes[1].id ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                {planes[1].btnText}
              </button>
              <p className="mt-4 text-gray-500 text-xs font-medium text-center">Sino resulta, cancelás gratis.</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-gray-400 text-sm font-medium">
          Los pagos son procesados de forma segura por Mercado Pago. Precios expresados en ARS.
        </p>
      </div>
    </div>
  );
}