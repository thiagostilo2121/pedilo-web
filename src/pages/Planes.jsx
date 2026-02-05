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
import { Check, Zap, Loader2 } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { getCheckoutUrl } from "../services/suscripcionService";
import { useToast } from "../contexts/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function Planes() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const plan = {
    nombre: "Plan Profesional",
    precio: "15.000",
    periodo: "mes",
    caracteristicas: [
      "Menú digital personalizado",
      "Slug único",
      "Pedidos ilimitados",
      "Gestión de stock y categorías",
      "Seguimiento de pedidos para clientes",
      "Mucho más"
    ]
  };

  const handleSuscribirse = async () => {
    // Si no está logueado, redirigir a login
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getCheckoutUrl();

      if (data.has_subscription) {
        toast.info("Ya tenés una suscripción activa");
        window.location.href = "/dashboard/mi-suscripcion";
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
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Elegí tu plan</h1>
        <p className="text-gray-600 mb-12">Impulsá tu negocio hoy mismo. Sin contratos largos ni comisiones ocultas.</p>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border-4 border-orange-500 relative">
          <div className="bg-orange-500 text-white py-2 px-6 absolute top-6 right-[-35px] rotate-45 text-sm font-black uppercase tracking-widest w-40">
            Recomendado
          </div>

          <div className="p-10 md:p-16">
            <h2 className="text-2xl font-black mb-2">{plan.nombre}</h2>
            <div className="flex justify-center items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">${plan.precio}</span>
              <span className="text-gray-400 font-bold">/{plan.periodo}</span>
            </div>

            <ul className="text-left space-y-4 mb-10">
              {plan.caracteristicas.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="bg-orange-100 p-1 rounded-full text-orange-600">
                    <Check size={16} strokeWidth={3} />
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
                "Suscribirme ahora"
              )}
            </button>
            <p className="mt-6 text-gray-400 text-xs font-medium">Pagas hoy, configurás tu negocio en 1 minuto.</p>
          </div>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          Los pagos son procesados de forma segura por Mercado Pago
        </p>
      </div>
    </div>
  );
}