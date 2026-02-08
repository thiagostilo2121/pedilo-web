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

import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Zap,
  Smartphone,
  ChevronRight,
  LayoutDashboard,
  MessageCircle,
  Link as LinkIcon,
  Gift
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900">
      {/* --- HERO: Foco en la conversión --- */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Tu menú digital, <br />
            <span className="text-orange-600">sin vueltas.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Crea tu cuenta, configura tu negocio y obtén un enlace único para que tus clientes hagan pedidos de forma profesional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl text-lg shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
            >
              Empezar ahora <ChevronRight size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-gray-100 text-gray-700 font-bold rounded-2xl text-lg hover:bg-gray-50 transition-all"
            >
              Entrar al Panel
            </button>
          </div>
        </div>
      </section>

      {/* --- CÓMO FUNCIONA: El flujo de tu App --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">Simple para vos, simple para el cliente</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Gestioná todo</h3>
              <p className="text-gray-500">Carga tus productos, crea categorías y personaliza la info de tu local desde tu dashboard.</p>
            </div>

            {/* Paso 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <LinkIcon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Compartí tu Link</h3>
              <p className="text-gray-500">Tu negocio tendrá su propio <b>slug</b> (ej: pediloarg.netlify.app/tu-local). Ponelo en tu biografía de Instagram.</p>
            </div>

            {/* Paso 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3">Recibí el pedido</h3>
              <p className="text-gray-500">
                El pedido te llega al panel y por WhatsApp.
                <b> Coordinás el pago y la entrega directamente con tu cliente</b>, sin intermediarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA + PRECIO --- */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-8">Digitalizá tu negocio hoy</h2>
          <div className="inline-block bg-orange-600 text-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md">
            <span className="text-orange-200 font-bold uppercase tracking-widest text-xs">Suscripción Mensual</span>

            {/* Badge de Free Trial */}
            <div className="bg-white/20 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 my-4">
              <Gift size={18} />
              <span className="font-bold text-sm">14 días gratis para probar</span>
            </div>

            <div className="text-6xl font-black my-4">$17.000</div>

            <p className="text-orange-100 mb-8">Sin comisiones por venta. <br /> Todo el control es tuyo.</p>
            <button
              onClick={() => navigate("/register")}
              className="w-full py-4 bg-white text-orange-600 font-black rounded-xl text-lg hover:scale-105 transition-transform"
            >
              Empezar prueba gratis
            </button>
            <p className="text-orange-200 text-xs mt-4">Los primeros 14 días son gratis. Cancelá cuando quieras.</p>
          </div>
          <p className="mt-8 text-gray-400 text-sm">Próximamente: Métricas y analíticas de ventas.</p>
        </div>
      </section>
    </div>
  );
}