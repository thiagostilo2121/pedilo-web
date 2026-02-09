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
import { Check, Loader2, Gift } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { getCheckoutUrl } from "../services/suscripcionService";
import { useToast } from "../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function Planes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const plan = {
    nombre: "Plan Profesional Todo Incluido",
    precio: "17.000",
    periodo: "mes",
    caracteristicas: [
      "Catálogo Digital Ilimitado",
      "Pedidos por WhatsApp",
      "Sistema de Cupones Dinámicos",
      "Flyer & QR Pro Tool",
      "Métricas de Ventas en tiempo real",
      "Personalización de Marca (PWA)",
      "Toppings y Agregados",
      "Setup Inicial Asistido Gratis"
    ]
  };

  const handleSuscribirse = async () => {
    // Si no está logueado, redirigir a login
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getCheckoutUrl();

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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Elegí el éxito de tu negocio</h1>
        <p className="text-xl text-gray-500 mb-16 font-medium">Digitalizá tus ventas hoy mismo. Sin contratos, sin comisiones, 100% transparente.</p>

        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-orange-100 overflow-hidden border border-gray-100 relative max-w-2xl mx-auto">
          <div className="bg-orange-600 text-white py-2 px-8 absolute top-8 right-[-45px] rotate-45 text-xs font-black uppercase tracking-widest w-48 shadow-lg">
            Más Elegido
          </div>

          <div className="p-8 md:p-16">
            <div className="text-orange-600 uppercase tracking-widest text-sm font-black mb-4">{plan.nombre}</div>

            <div className="flex justify-center items-baseline gap-2 mb-8">
              <span className="text-7xl font-black text-gray-950 tracking-tighter">${plan.precio}</span>
              <span className="text-gray-400 font-bold text-lg">/{plan.periodo}</span>
            </div>

            {/* Valor entregado */}
            <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl flex items-center justify-center gap-3 mb-10 border border-green-100">
              <Gift size={22} className="text-green-600" />
              <span className="font-black">14 DÍAS DE PRUEBA TOTALMENTE GRATIS</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-left mb-12">
              {plan.caracteristicas.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                  <div className="bg-orange-100 p-1 rounded-full text-orange-600 flex-shrink-0">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSuscribirse}
              disabled={loading}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Preparando pago...
                </>
              ) : (
                "Empezar prueba gratis"
              )}
            </button>
            <p className="mt-6 text-gray-400 text-xs font-medium">Los primeros 14 días son gratis. Cancelá cuando quieras.</p>
          </div>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Los pagos son procesados de forma segura por Mercado Pago
        </p>
      </div>
    </div>
  );
}