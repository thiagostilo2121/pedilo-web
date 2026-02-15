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
  Ticket,
  BarChart3,
  BrainCircuit,
  PieChart,
  MessageCircle,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();

  // ROI Calculator State
  const [sales, setSales] = useState(1500000);
  const [commission, setCommission] = useState(30);
  const appCost = (sales * commission) / 100;
  const pediloCost = 17000;
  const savings = appCost - pediloCost;
  const yearlySavings = savings * 12;

  // Formatting
  const formatMoney = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);

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

      {/* --- HERO SECTION: AGGRESSIVE & DIRECT --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-white to-white -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-800 text-xs sm:text-sm font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            ¿Cansado de regalar el 30%?
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-gray-950 max-w-5xl mx-auto">
            Dejá de regalar margen. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">Convertí cada pedido en ganancia real.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Recuperá el control. Usá las apps para que te conozcan, usá <span className="text-orange-600 font-extrabold">Pedilo</span> para ganar dinero de verdad.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl text-xl hover:bg-gray-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-200"
            >
              Empezar Gratis <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.open("/n/pedilo-oficial", "_blank", "noopener,noreferrer")}
              className="px-10 py-5 bg-white text-gray-900 font-black rounded-2xl text-xl hover:bg-gray-50 border-2 border-gray-100 transition-all shadow-sm"
            >
              Ver Demo Real
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Sin comisiones por venta</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Dinero en el acto</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Base de datos propia</span>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-5 duration-500">
        <button
          onClick={() => navigate("/register")}
          className="w-full py-4 bg-orange-600 text-white font-black rounded-xl shadow-2xl shadow-orange-900/40 flex items-center justify-center gap-2"
        >
          Quiero Dejar de Perder Plata <ArrowRight size={20} />
        </button>
      </div>

      {/* --- HYBRID STRATEGY: THE CYCLE OF SUCCESS --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-gray-900 text-white text-xs font-bold rounded-full mb-4 tracking-widest uppercase">Estrategia 2026</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">El Ciclo del Éxito.</h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
              No dejes las Apps. Usalas para pescar clientes, y traelos a tu pecera con Pedilo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto items-center">
            {/* STEP 1: DISCOVERY (APPS) */}
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 relative group hover:border-red-100 transition-colors">
              <div className="text-6xl font-black text-gray-200 mb-4 absolute top-4 right-6 group-hover:text-red-100 transition-colors">1</div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 text-gray-400">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Descubrimiento</h3>
              <p className="text-gray-500 font-medium mb-4 text-sm">El cliente tiene hambre y busca en las Apps. Te encuentra y pide.</p>
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>Costo (Comisión)</span>
                  <span className="text-red-500">30% (Duele)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full w-[100%]"></div>
                </div>
              </div>
            </div>

            {/* ARROW */}
            <div className="hidden md:flex justify-center text-gray-300">
              <ArrowRight size={48} />
            </div>

            {/* STEP 2: CONVERSION (THE HACK) */}
            <div className="p-8 rounded-3xl bg-orange-600 text-white shadow-2xl shadow-orange-200 relative scale-110 z-10">
              <div className="text-6xl font-black text-orange-500 mb-4 absolute top-4 right-6">2</div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                <QrCode size={24} />
              </div>
              <h3 className="text-xl font-black text-white mb-2">La Conversión</h3>
              <p className="text-orange-100 font-medium mb-4 text-sm">Entregás el pedido con un Flyer/QR de Pedilo: "La próxima pedí directo y ahorrá".</p>
              <div className="bg-orange-700/50 p-3 rounded-xl border border-orange-500/50">
                <div className="flex justify-between text-xs font-bold text-white mb-1">
                  <span>Inversión</span>
                  <span className="text-yellow-300">$10 (Impresión)</span>
                </div>
                <div className="w-full bg-orange-800 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full w-[5%]"></div>
                </div>
              </div>
            </div>

            {/* ARROW */}
            <div className="hidden md:flex justify-center text-gray-300">
              <ArrowRight size={48} />
            </div>

            {/* STEP 3: RETENTION (PEDILO) */}
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 relative group hover:border-green-100 transition-colors">
              <div className="text-6xl font-black text-gray-200 mb-4 absolute top-4 right-6 group-hover:text-green-100 transition-colors">3</div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 text-green-600">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Rentabilidad</h3>
              <p className="text-gray-500 font-medium mb-4 text-sm">El cliente vuelve a pedir por Pedilo. Es fiel a TU marca, no a la App.</p>
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>Costo (Comisión)</span>
                  <span className="text-green-500">0% (Gloria)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-gray-200 h-1.5 rounded-full w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHATSAPP REALITY: CHAOS VS ORDER --- */}
      <section className="py-24 bg-red-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">SOLO con WhatsApp <br /><span className="text-red-600">NO ALCANZA.</span></h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
              Perdés tiempo descifrando audios, direcciones incompletas y clientes que preguntan precios. Eso no es un negocio, es un caos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* THE CHAOS (MANUAL) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-100 text-red-600 px-4 py-2 rounded-bl-2xl font-black text-sm">REALIDAD ACTUAL</div>
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-500" /> El Caos
              </h3>

              <div className="space-y-4 font-mono text-sm max-w-sm mx-auto opacity-70">
                <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-800">
                  Hola precio de la hamburguesa?
                </div>
                <div className="bg-green-100 p-3 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl text-green-800 ml-auto text-right">
                  $8500 la simple, $9500 la doble...
                </div>
                <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-800">
                  Ah dale. Tenés papas?
                </div>
                <div className="bg-green-100 p-3 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl text-green-800 ml-auto text-right">
                  Si, chicas $3000, grandes $5000
                </div>
                <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-800 flex items-center gap-2">
                  <span className="italic text-xs text-gray-500">Audio 0:45</span> 🎤
                </div>
              </div>

              <div className="mt-8 text-center text-red-600 font-bold">
                Resultado: 20 minutos perdidos por pedido.
              </div>
            </div>

            {/* THE ORDER (PEDILO) */}
            <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden transform md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-bl-2xl font-black text-sm">CON PEDILO</div>
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" /> El Orden
              </h3>

              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <MessageCircle size={24} fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Nuevo Pedido #2491AB</div>
                    <div className="text-green-400 font-mono text-xs mb-2">Hace 2 min</div>
                    <p className="text-gray-300 text-sm">
                      ¡Hola Negocio Genial!<br />
                      Realicé un pedido por Pedilo #2491AB<br />
                      <strong>Total: $14.500 (Pagará por MP)</strong><br />
                      Dirección: Av. Siempreviva 742, 2A.
                    </p>
                  </div>
                </div>
                <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">
                  Aceptar
                </button>
              </div>

              <div className="mt-8 text-center text-green-400 font-bold">
                Resultado: 30 segundos por pedido. Cash en mano.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DATA & ANALYTICS: YOUR PARTNER --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXT CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 border border-blue-100 shadow-sm">
              <BrainCircuit size={16} /> Inteligencia de Negocio
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Datos para crecer. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">No para acumular.</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed">
              Pedilo dejó de ser una simple web de pedidos. Ahora es tu <strong>Socio Estratégico</strong>. Te damos métricas claras para que tomes decisiones basadas en datos reales, no en intuición.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Productos Estrella y Huesos</h3>
                  <p className="text-gray-500 font-medium">Identificá qué platos te dan ganancia real (80/20) y cuáles solo ocupan espacio en la heladera.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Ranking de Clientes</h3>
                  <p className="text-gray-500 font-medium">Sabé exactamante quiénes son tus clientes fieles. Premialos y asegurate de que vuelvan siempre.</p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                  <Timer size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Horarios Pico</h3>
                  <p className="text-gray-500 font-medium">Organizá tu personal de cocina y reparto sabiendo de antemano cuándo va a explotar la demanda.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* VISUAL MOCKUP */}
          <div className="order-1 lg:order-2 relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 relative z-10 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500 group">
              {/* Fake Dashboard Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tus Ventas</div>
                  <div className="text-2xl font-black text-gray-900">$1.250.000 <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">+12%</span></div>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <LayoutDashboard size={20} className="text-gray-500" />
                </div>
              </div>

              {/* Fake Chart */}
              <div className="flex items-end gap-3 h-48 mb-8 px-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-xl relative overflow-hidden bg-gray-100">
                    <div
                      className={`absolute bottom-0 w-full transition-all duration-1000 ${i === 5 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-gradient-to-t from-blue-500 to-blue-300 opacity-30'}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Fake Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <div className="flex gap-2 items-center mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm font-black text-xs">1#</div>
                    <span className="text-xs font-bold text-orange-800">Más Vendido</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm">Burger Doble Cheddar</div>
                  <div className="text-xs text-gray-500">243 pedidos este mes</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <div className="flex gap-2 items-center mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm"><Users size={16} /></div>
                    <span className="text-xs font-bold text-blue-800">Clientes Nuevos</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm">45 nuevos socios</div>
                  <div className="text-xs text-gray-500">Retención del 80%</div>
                </div>
              </div>
            </div>

            {/* Decor elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-bounce delay-1000 z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600"><TrendingUp size={20} /></div>
                <div>
                  <div className="text-xs font-bold text-gray-400">Conversión</div>
                  <div className="text-sm font-black text-gray-900">4.8% <span className="text-green-500">↑</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROI CALCULATOR: THE NUMBERS DON'T LIE --- */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">Calculadora de la Verdad.</h2>

          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-3xl p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* INPUTS */}
              <div className="space-y-8">
                <div>
                  <label className="block text-gray-400 font-bold mb-2 uppercase text-xs tracking-wider">Tu Venta Mensual por Apps</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSales(s => Math.max(0, s - 100000))} className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-bold text-xl">-</button>
                    <div className="flex-1 text-center bg-gray-900/50 rounded-xl p-3 text-2xl font-black text-white border border-gray-700">
                      {formatMoney(sales)}
                    </div>
                    <button onClick={() => setSales(s => s + 100000)} className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center font-bold text-xl">+</button>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={sales}
                    onChange={(e) => setSales(Number(e.target.value))}
                    className="w-full mt-4 accent-orange-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-2 uppercase text-xs tracking-wider">Comisión Apps (%)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="40"
                      step="1"
                      value={commission}
                      onChange={(e) => setCommission(Number(e.target.value))}
                      className="w-full accent-red-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xl font-bold text-red-400 w-16 text-right">{commission}%</span>
                  </div>
                </div>
              </div>

              {/* OUTPUTS */}
              <div className="space-y-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Pérdida Mensual (Para Apps)</div>
                  <div className="text-3xl font-black text-red-500 flex items-center gap-2">
                    -{formatMoney(appCost)} <ArrowRight size={20} /> 🗑️
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-black px-2 py-1 rounded-bl-lg">TU GANANCIA</div>
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Ahorro Anual con Pedilo</div>
                  <div className="text-4xl font-black text-green-400 mb-2">
                    {formatMoney(yearlySavings)}
                  </div>
                  <div className="text-sm font-medium text-gray-300 flex gap-2 items-center">
                    <CheckCircle2 size={16} className="text-green-500" /> Podrías comprar:
                    <span className="text-white font-bold">
                      {yearlySavings > 8000000 ? "Un Auto Usado 🚗" : yearlySavings > 2000000 ? "Una Moto 0km 🏍️" : "3 Freezers Industriales ❄️"}
                    </span>
                  </div>
                </div>

                <p className="text-center text-xs text-gray-500 italic">
                  *Costo Pedilo: $17.000 fijos. Sin letra chica.
                </p>
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

      {/* --- LIVE DEMO WIDGET: SHOW, DON'T TELL --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Probá la Velocidad <span className="text-green-600">En Vivo.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Tus clientes no se bajan ninguna App. No se registran. Entran, piden y chau.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* EXPLANATION */}
            <div className="order-2 md:order-1 space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-black text-xl shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Escanean o Clickean</h3>
                  <p className="text-gray-500">Desde Instagram o tu mesa. Se abre tu menú al instante.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-black text-xl shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Eligen sus gustos</h3>
                  <p className="text-gray-500">Interfaz perfecta. Se ve increíble en cualquier celular.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-xl shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Te llega a WhatsApp</h3>
                  <p className="text-gray-500">Limpio, calculado y listo para cobrar. Sin errores.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-blue-500" />
                  <span className="text-sm">Más de <span className="underline decoration-yellow-400 decoration-4">250 Negocios</span> ya facturan millones con Pedilo.</span>
                </p>
                <div className="flex -space-x-2 mt-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    +200
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="order-1 md:order-2">
              <div className="bg-white p-6 rounded-[2.5rem] border-4 border-gray-900 shadow-2xl relative max-w-sm mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20"></div>

                {/* Screen */}
                <div className="bg-gray-50 rounded-2xl overflow-hidden h-[500px] flex flex-col relative">
                  {/* Header */}
                  <div className="bg-white p-4 shadow-sm z-10 pt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
                      <div>
                        <div className="font-bold text-sm">Burger King (Fake)</div>
                        <div className="text-xs text-green-600 font-bold">• Abierto ahora</div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Doble Bacon</div>
                        <div className="text-xs text-gray-500 mb-2">Con extra queso...</div>
                        <div className="flex justify-between items-center">
                          <span className="font-black text-sm">$8.500</span>
                          <button className="w-6 h-6 bg-orange-600 rounded text-white font-bold flex items-center justify-center text-sm">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">Papas Cheddar</div>
                        <div className="text-xs text-gray-500 mb-2">Bañadas en...</div>
                        <div className="flex justify-between items-center">
                          <span className="font-black text-sm">$4.500</span>
                          <button className="w-6 h-6 bg-orange-600 rounded text-white font-bold flex items-center justify-center text-sm">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer */}
                  <div className="bg-white p-4 border-t border-gray-100">
                    <button className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 animate-pulse">
                      <Smartphone size={18} /> Enviar Pedido (WhatsApp)
                    </button>
                  </div>
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
