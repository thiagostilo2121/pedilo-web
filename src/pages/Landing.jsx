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
  CheckCircle2,
  XCircle,
  QrCode,
  Users,
  Timer,
  Github,
  Sparkles,
  MousePointerClick,
  TrendingUp,
  Warehouse,
  BadgeCheck,
  Megaphone,
  ArrowRight,
  Truck,
  Package,
  FileSpreadsheet,
  Repeat,
  Search,
  Ticket
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-600">

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-black text-gray-900 tracking-tight">Pedilo<span className="text-orange-600">.</span></span>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-orange-600 font-bold transition-colors text-sm"
              >
                Ingresar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-lg shadow-orange-100 ring-2 ring-orange-100 ring-offset-2"
              >
                Comenzar Gratis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION: MARGIN & CONTROL --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-white -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-800 text-xs sm:text-sm font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Nueva versión ya disponible para Distribuidores
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-gray-950 max-w-5xl mx-auto">
            Dejá de regalar margen. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">Convertí cada pedido en ganancia real.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Vendé sin comisiones por pedido y fidelizá a tus clientes con tu propio canal de venta directa. Tu socio, no tu jefe.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-200"
            >
              Empezar a Ahorrar Hoy <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.open("/n/pedilo-oficial", "_blank", "noopener,noreferrer")}
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl text-lg hover:bg-gray-50 border border-gray-200 transition-all shadow-sm"
            >
              Ver Demo en Vivo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> 14 días gratis</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Setup incluido</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Sin tarjetas</span>
          </div>
        </div>
      </section>

      {/* --- HYBRID STRATEGY: COMPLEMENT, DON'T REPLACE --- */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">No reemplaza a las Apps. <br /><span className="text-orange-600">Las complementa.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
              La estrategia inteligente que usan los negocios rentables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* LEFT: APPS */}
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 relative overflow-hidden group hover:border-red-100 transition-colors">
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-bl-xl">MARKETING</div>
              <div className="mb-6 opacity-50 grayscale group-hover:grayscale-0 transition-all">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Apps de Delivery</h3>
              <p className="text-gray-500 font-medium mb-6">Usalas para que te conozcan clientes nuevos.</p>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                  <span>Costo Adquisición</span>
                  <span className="text-red-500">Alto (30%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-[80%]"></div>
                </div>
              </div>
            </div>

            {/* RIGHT: PEDILO */}
            <div className="p-8 rounded-3xl bg-white border-2 border-orange-500 shadow-2xl shadow-orange-100 relative overflow-hidden scale-105 z-10">
              <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RENTABILIDAD</div>
              <div className="mb-6 text-orange-600">
                <Zap size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Tu Pedilo</h3>
              <p className="text-gray-500 font-medium mb-6">Usalo para que se queden y compren directo.</p>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                  <span>Costo Retención</span>
                  <span className="text-green-600">Cero (0%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[5%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-400 font-medium flex items-center justify-center gap-2">
            <Repeat size={16} /> <span>El ciclo ideal: Descubrimiento (Apps) <ArrowRight size={14} className="inline mx-1" /> Primer Pedido <ArrowRight size={14} className="inline mx-1" /> Flyer/QR <ArrowRight size={14} className="inline mx-1" /> <strong>Cliente Recurrente (Pedilo)</strong></span>
          </div>
        </div>
      </section>

      {/* --- LOSS AVERSION: THE MATH --- */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">¿Cuánto estás dejando en la mesa?</h2>

          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 space-y-2">
                <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">Ventas Mensuales (Ejemplo)</p>
                <div className="text-4xl font-black text-white">$1.000.000</div>
              </div>

              <div className="md:col-span-2 space-y-6">
                {/* Comparison Bar */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-gray-400">Apps (30% + IVA)</span>
                      <span className="text-red-400">Pierdes $300.000/mes</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[30%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-white">Con Pedilo</span>
                      <span className="text-green-400">Inviertes solo $17.000/mes</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[1.7%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 grid md:grid-cols-3 gap-4 text-center md:text-left">
              <div className="md:col-span-2">
                <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                  La diferencia es de <span className="text-green-400">$283.000 extra</span> en tu bolsillo.
                </p>
              </div>
              <div className="md:col-span-1 flex flex-col justify-center text-sm font-medium text-gray-400 bg-gray-900/50 p-3 rounded-xl border border-gray-700/50">
                <span className="block mb-1">Equivale a:</span>
                <span className="text-white font-bold flex items-center gap-2 justify-center md:justify-start"><Users size={14} /> 1 Empleado part-time</span>
                <span className="text-white font-bold flex items-center gap-2 justify-center md:justify-start"><ShoppingBag size={14} /> 1 Freezer nuevo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHOLESALE MODE: CATEGORY DIFFERENTIATOR --- */}
      <section className="py-24 bg-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-orange-700 text-sm font-bold mb-6 border border-orange-200 shadow-sm">
              <Truck size={16} /> Especial para Mayoristas
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Diseñado también para Distribuidores.</h2>
            <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed">
              Sabemos que venderle a comercios no es lo mismo que venderle a consumidores. Pedilo tiene un <strong>Modo B2B</strong> nativo.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-gray-100">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Listas de Precios & Excel</h3>
                  <p className="text-gray-500 font-medium">Manejá miles de productos. Subí y actualizá precios masivamente desde Excel en segundos.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shrink-0 border border-gray-100">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Mínimos y Bultos</h3>
                  <p className="text-gray-500 font-medium">Configurá mínimo de compra monetario o venta por pack cerrado automágicamente.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-orange-200 rounded-[3rem] rotate-3 transform"></div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl relative border border-gray-100">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <span className="font-black text-xl text-gray-900">Distribuidora El Trebol</span>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">MODO MAYORISTA</div>
              </div>
              {/* Mock Item */}
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <Package size={28} />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 w-3/4 rounded-full mb-2"></div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">$4.500 <span className="text-xs font-normal text-gray-500">/pack x12</span></span>
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600">-</button>
                      <span className="font-bold">5</span>
                      <button className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 font-medium flex gap-2">
                <TrendingUp size={18} />
                <span>Faltan $15.000 para llegar al mínimo de compra.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHECKOUT EXPRESS: SPEED --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Menos pasos. Más pedidos.</h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Cada campo extra en un formulario te hace perder un 10% de ventas. Nosotros los eliminamos todos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* THE HARD WAY */}
            <div className="opacity-40 scale-95 grayscale transition-all hover:grayscale-0 hover:opacity-100 hover:scale-100 duration-500">
              <h3 className="text-center font-bold text-gray-400 mb-6 uppercase tracking-widest text-sm">Lo Habitual</h3>
              <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="space-y-3">
                  <div className="h-10 bg-white border border-gray-200 rounded-lg w-full"></div>
                  <div className="h-10 bg-white border border-gray-200 rounded-lg w-full"></div>
                  <div className="h-10 bg-white border border-gray-200 rounded-lg w-full"></div>
                  <div className="h-10 bg-white border border-gray-200 rounded-lg w-full"></div>
                  <div className="w-full bg-gray-300 h-12 rounded-xl mt-4 flex items-center justify-center text-gray-500 font-bold">Crear Cuenta</div>
                </div>
              </div>
            </div>

            {/* THE PEDILO WAY */}
            <div>
              <h3 className="text-center font-bold text-green-600 mb-6 uppercase tracking-widest text-sm animate-pulse">Checkout Express</h3>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xl shadow-green-100/50 relative">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg z-10">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div>
                      <div className="font-bold text-gray-900">2x Hamburguesa Doble</div>
                      <div className="text-green-600 font-bold">$12.000</div>
                    </div>
                  </div>
                  <div className="w-full bg-green-600 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg gap-2 shadow-lg shadow-green-200 hover:scale-[1.02] transition-transform cursor-pointer">
                    <Smartphone size={20} /> Enviar a WhatsApp
                  </div>
                  <p className="text-center text-xs text-gray-400 font-medium">Sin registros. Sin contraseñas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARKETING & SEO SUITE --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Herramientas para vender más.</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">No solo procesamos pedidos. Te damos las armas para combatir a la competencia y aparecer primero.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* SEO */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100%] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">SEO Automático</h3>
                <p className="text-gray-500 font-medium leading-relaxed">Tu tienda carga tan rápido que Google la prefiere. Aparecé primero cuando busquen delivery en tu zona sin pagar anuncios.</p>
              </div>
            </div>

            {/* SMART BANNERS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100%] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Megaphone size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Banners</h3>
                <p className="text-gray-500 font-medium leading-relaxed">Cartelera digital para anunciar ofertas flash, cambios de horario o promos. Tus clientes se enteran al instante.</p>
              </div>
            </div>

            {/* COUPONS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100%] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Ticket size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Motor de Cupones</h3>
                <p className="text-gray-500 font-medium leading-relaxed">Creá códigos como "MANDALE20" en segundos. Reactivá clientes dormidos y premiá a los fieles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QR RETENTION --- */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-8 -rotate-2">
            <QrCode size={64} className="text-gray-900" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Convertí cada pedido en un cliente recurrente.</h2>
          <p className="text-xl text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
            El sistema genera automáticamente <strong className="text-orange-600">Flyers y QRs</strong> con tu marca. Ponelos en las mesas, en las bolsas de delivery o en las facturas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">En la caja</span>
            <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">En la bolsa</span>
            <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">En la mesa</span>
          </div>
        </div>
      </section>

      {/* --- REPUTATION / GAMIFICATION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Visual Mockup of Badge */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                <div>
                  <div className="h-3 w-32 bg-gray-200 rounded-full mb-1"></div>
                  <div className="flex gap-1">
                    <BadgeCheck size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-blue-600">Verificado</span>
                  </div>
                </div>
              </div>
              <div className="h-24 bg-gray-50 rounded-xl w-full mb-4"></div>
              <div className="bg-yellow-50 text-yellow-800 p-2 rounded-lg text-xs font-bold text-center border border-yellow-100">
                <Megaphone size={14} className="inline mr-1" /> Envío Gratis Jueves!
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Insignias que venden por vos.</h2>
            <p className="text-lg text-gray-600 font-medium mb-6">
              Pedilo detecta tu buen desempeño y te premia con insignias de <strong>"Vendedor Verificado"</strong> y <strong>"Top Seller"</strong>.
            </p>
            <p className="text-gray-500 font-medium">
              Un negocio verificado aumenta su conversión un 40% porque genera confianza instantánea.
            </p>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-4 text-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">Tomá el control de tu negocio.</h2>
          <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
            Sin contratos. Sin letra chica. Empezás gratis y cancelás cuando quieras.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="w-full md:w-auto px-12 py-5 bg-orange-600 text-white font-black rounded-2xl text-xl hover:bg-orange-500 hover:scale-[1.02] transition-all shadow-2xl shadow-orange-900/50"
          >
            Crear mi Cuenta Gratis
          </button>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2"><Github size={16} /> Open Source Core</span>
            <span>·</span>
            <span>Hecho con ❤️ en Argentina</span>
          </div>
        </div>
      </section>
    </div>
  );
}
