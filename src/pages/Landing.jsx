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
  AlertTriangle,
  Bell,
  ChefHat,
  ScanBarcode,
  Upload,
  Target,
  Lightbulb,
  Cherry,
  Flame,
  Clock,
  Crown,
  HandPlatter
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getDemoStats } from "../services/publicStatsService";

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [demoStats, setDemoStats] = useState(null);

  useEffect(() => {
    getDemoStats().then(setDemoStats);
  }, []);

  // Use fetched data or fallback
  const realSales = demoStats?.ventas || 1517800;
  const realOrders = demoStats?.pedidos || 145;
  const realAvgTicket = demoStats?.ticket_promedio || 10467;
  const realSavings = realSales * 0.30; // 30% commission

  // Date Formatting for "fecha actual argentina"
  const getArgentineDate = () => {
    const now = new Date();
    // Simple approach since user is in Argentina context usually, or use UTC-3 offset
    const options = { day: 'numeric', month: 'long', timeZone: 'America/Argentina/Buenos_Aires' };
    return new Intl.DateTimeFormat('es-AR', options).format(now);
  };

  const dateRangeString = `Desde el 3 de febrero al ${getArgentineDate()}`;

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

      {/* --- SOCIAL PROOF NUMBERS STRIP --- */}
      <section className="py-10 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">250+</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Negocios Activos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-orange-400">0%</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Comisión por Venta</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">&lt;30s</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Tiempo por Pedido</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-green-400">100%</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Tu Dinero, Tu Data</div>
            </div>
          </div>
        </div>

        {/* REAL CASE STUDY (FEB 3 - FEB 19) */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 animate-pulse"></div>

            <div className="p-6 relative z-10">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-800 pb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Dato Real ({dateRangeString})
              </h4>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                {/* VENTAS */}
                <div className="col-span-2 lg:col-span-1 border-r border-gray-800 pr-4">
                  <div className="text-gray-500 text-[10px] font-bold uppercase mb-1">Ventas Totales</div>
                  <div className="text-white font-extrabold text-2xl tracking-tight">{formatMoney(realSales)}</div>
                </div>

                {/* PEDIDOS */}
                <div className="border-r border-gray-800 pr-4">
                  <div className="text-gray-500 text-[10px] font-bold uppercase mb-1">Pedidos</div>
                  <div className="text-white font-bold text-xl flex items-center gap-2">
                    <ShoppingBag size={18} className="text-orange-500" /> {realOrders}
                  </div>
                </div>

                {/* TICKET PROMEDIO */}
                <div>
                  <div className="text-gray-500 text-[10px] font-bold uppercase mb-1">Ticket Promedio</div>
                  <div className="text-blue-400 font-bold text-xl">{formatMoney(realAvgTicket)}</div>
                </div>

                {/* SAVINGS - HIGHLIGHTED */}
                <div className="col-span-2 lg:col-span-1 bg-gray-800/50 p-3 rounded-xl border border-gray-700 text-right">
                  <div className="text-gray-500 text-[10px] font-bold uppercase mb-1">Ahorro (30% App)</div>
                  <div className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    {formatMoney(realSavings)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 mt-3 font-medium">
            *Datos reales obtenidos en vivo por API de la tienda Demo (ID #1).
          </p>
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

          <div className="grid md:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto items-center">
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
            <div className="p-8 rounded-3xl bg-orange-600 text-white shadow-2xl shadow-orange-200 relative md:scale-110 z-10">
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
                  <p className="text-gray-500 font-medium">Sabé exactamente quiénes son tus clientes fieles. Premialos y asegurate de que vuelvan siempre.</p>
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

      {/* --- COMMAND CENTER: REAL-TIME ORDER MANAGEMENT --- */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/30 via-gray-900 to-gray-950" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-bold mb-6 border border-orange-500/20">
              <Bell size={16} /> Panel de Control
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Tu Cocina tiene un <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Centro de Comando.</span></h2>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto">
              Cada pedido pasa por un pipeline profesional. Sonido, notificaciones push, y un tablero visual que tu equipo entiende en 2 segundos.
            </p>
          </div>

          {/* ORDER PIPELINE MOCKUP */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
              {/* Stage 1 */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-center relative group hover:bg-amber-500/20 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-400">
                  <Bell size={24} />
                </div>
                <h4 className="font-black text-amber-300 text-sm uppercase tracking-wider mb-1">Nuevo</h4>
                <p className="text-[10px] text-gray-500 font-medium">Suena la alarma. Decidís al instante.</p>
              </div>

              {/* Stage 2 */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 text-center group hover:bg-blue-500/20 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-400">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-black text-blue-300 text-sm uppercase tracking-wider mb-1">Aceptado</h4>
                <p className="text-[10px] text-gray-500 font-medium">Con un toque. El cliente ya sabe.</p>
              </div>

              {/* Stage 3 */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5 text-center group hover:bg-purple-500/20 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-purple-400">
                  <ChefHat size={24} />
                </div>
                <h4 className="font-black text-purple-300 text-sm uppercase tracking-wider mb-1">Cocinando</h4>
                <p className="text-[10px] text-gray-500 font-medium">Tu equipo sabe qué preparar.</p>
              </div>

              {/* Stage 4 */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center group hover:bg-green-500/20 transition-all">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-green-400">
                  <HandPlatter size={24} />
                </div>
                <h4 className="font-black text-green-300 text-sm uppercase tracking-wider mb-1">Listo</h4>
                <p className="text-[10px] text-gray-500 font-medium">Avisale por WhatsApp automático.</p>
              </div>
            </div>

            {/* NOTIFICATION MOCKUP */}
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 p-5 shadow-2xl relative">
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black text-white animate-bounce">1</div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/30">
                    <Bell size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-black text-white text-sm">🔔 ¡Nuevo Pedido!</p>
                      <span className="text-[10px] text-gray-500 font-bold">Ahora</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">De: <span className="text-white font-bold">María García</span> — $18.500</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">2x Milanesa Napolitana, 1x Papas Cheddar</p>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-green-500 text-white text-xs font-bold rounded-lg">Aceptar</button>
                      <button className="flex-1 py-2 bg-gray-700 text-gray-300 text-xs font-bold rounded-lg border border-gray-600">Ver</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-600 mt-4 font-medium">* Sonido + notificación push. Funciona aunque tengas la pantalla apagada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEEP INTELLIGENCE: CART INSIGHTS + HEATMAP + BEST CLIENTS --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-bold mb-6 border border-purple-100">
              <Lightbulb size={16} /> Inteligencia Automática
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Tu negocio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">piensa solo.</span></h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
              Pedilo analiza tus ventas en segundo plano y te dice exactamente qué funciona, qué sobra, y qué combinaciones te hacen ganar más.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

            {/* CART INTELLIGENCE */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-600 p-2 rounded-xl">
                  <Target size={18} className="text-white" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest">Inteligencia de Carrito</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">Productos Ancla</p>
                  <p className="text-xs text-gray-400 mb-3">El motivo principal de la compra.</p>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-xs font-black text-white">🏆 Milanesa Napolitana</p>
                    <p className="text-[9px] text-gray-500">145 pedidos como producto principal</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-2">Reyes del Upsell</p>
                  <p className="text-xs text-gray-400 mb-3">Siempre acompañan. Suben el ticket.</p>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-xs font-black text-white">⚡ Papas Cheddar</p>
                    <p className="text-[9px] text-gray-500">Se vendió en combo 89 veces</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-600/20 rounded-xl p-3 border border-orange-600/30">
                <p className="text-[10px] font-bold text-orange-200">
                  <span className="font-black text-white">💡 Insight:</span> Creá un combo "Milanga + Papas" y subí tu ticket promedio un 25%.
                </p>
              </div>
            </div>

            {/* WEEKLY HEATMAP */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-red-100 p-2 rounded-xl">
                  <Flame size={18} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Mapa de Calor</h3>
                  <p className="text-[10px] text-gray-400 font-bold">Demanda hora x hora</p>
                </div>
              </div>

              {/* HEATMAP MOCKUP */}
              <div className="space-y-1.5 mb-6">
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-gray-400 w-7 text-right">{day}</span>
                    <div className="flex-1 flex gap-0.5">
                      {Array.from({ length: 12 }, (_, hIdx) => {
                        const intensities = [
                          [0, 0, 0, 0, 0, 1, 2, 1, 0, 2, 3, 4],
                          [0, 0, 0, 0, 0, 1, 1, 2, 0, 3, 4, 3],
                          [0, 0, 0, 0, 0, 2, 2, 1, 0, 2, 3, 3],
                          [0, 0, 0, 0, 0, 1, 3, 2, 0, 4, 5, 4],
                          [0, 0, 0, 0, 0, 2, 3, 2, 0, 5, 5, 5],
                          [0, 0, 0, 0, 1, 3, 4, 3, 1, 5, 5, 5],
                          [0, 0, 0, 0, 1, 2, 3, 2, 0, 3, 4, 3],
                        ];
                        const val = intensities[dIdx][hIdx];
                        const colors = ["bg-gray-50", "bg-orange-100", "bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-600"];
                        return <div key={hIdx} className={`h-5 flex-1 rounded-[3px] ${colors[val]} transition-all hover:scale-150 hover:z-10`} />;
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-7" />
                  <div className="flex-1 flex justify-between text-[8px] font-black text-gray-300 uppercase">
                    <span>8h</span><span>12h</span><span>16h</span><span>20h</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-800 font-bold">
                  <span className="font-black">📊 Resultado:</span> Organizá turnos y stock sabiendo exactamente cuándo explota la demanda.
                </p>
              </div>
            </div>

            {/* BEST CLIENTS + METRICS */}
            <div className="space-y-6">
              {/* TODAY'S METRICS MOCKUP */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Métricas en Vivo</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-2xl border border-green-100">
                    <p className="text-[9px] font-bold text-green-600 uppercase">Ventas Hoy</p>
                    <p className="text-lg font-black text-gray-900">$285K</p>
                    <p className="text-[9px] font-bold text-green-600">↑ 18% vs ayer</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
                    <p className="text-[9px] font-bold text-blue-600 uppercase">Ticket Prom.</p>
                    <p className="text-lg font-black text-gray-900">$14.2K</p>
                    <p className="text-[9px] font-bold text-blue-500">Histórico 30d</p>
                  </div>
                </div>
              </div>

              {/* BEST CLIENTS */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Crown size={16} className="text-yellow-500" />
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mejores Clientes</h3>
                </div>
                <div className="space-y-3">
                  {[{ name: "Almacén Don Pedro", orders: 47, total: "$892K" }, { name: "Bar La Esquina", orders: 31, total: "$654K" }, { name: "Rest. El Trébol", orders: 28, total: "$521K" }].map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-900 truncate">{c.name}</p>
                        <p className="text-[9px] text-gray-400 font-bold">{c.orders} compras</p>
                      </div>
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{c.total}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-400 mt-3 italic font-medium">* Ideal para distribuidoras B2B. Sabé a quién premiar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BARCODE SCANNER + MASS IMPORT --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-gray-700 text-sm font-bold mb-6 border border-gray-200 shadow-sm">
              <ScanBarcode size={16} className="text-orange-600" /> Carga Inteligente
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">2000 productos cargados <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">en 5 minutos.</span></h2>
            <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed">
              No cargues producto por producto como en 2015. Pedilo tiene herramientas que <strong>ninguna otra plataforma ofrece</strong>.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shrink-0 border border-gray-100">
                  <ScanBarcode size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Escáner de Código de Barras</h3>
                  <p className="text-gray-500 font-medium">Escaneá con la cámara del celular. Pedilo busca el producto en una base de datos mundial y completa <strong>nombre, descripción e imagen</strong> automáticamente.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm shrink-0 border border-gray-100">
                  <Upload size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Importación Masiva Excel</h3>
                  <p className="text-gray-500 font-medium">¿Tenés una lista de precios en Excel? Subila y listo. Todos tus productos cargados de una. Ideal para distribuidoras con <strong>catálogos enormes</strong>.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* SCANNER MOCKUP */}
          <div className="relative">
            <div className="absolute inset-0 bg-gray-200 rounded-[3rem] rotate-2 transform"></div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl relative border border-gray-100">
              {/* Fake Scanner UI */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black">Escáner</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400 font-bold">Cámara activa</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-8 flex items-center justify-center border border-dashed border-gray-600">
                  <div className="text-center">
                    <ScanBarcode size={48} className="text-orange-500 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs text-gray-400 font-medium">Apuntá al código de barras</p>
                  </div>
                </div>
              </div>

              {/* Found Product */}
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-xs font-black text-green-700 uppercase">Producto Encontrado</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Package size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Coca Cola 2.25L</p>
                    <p className="text-xs text-gray-500">Gaseosa sabor cola</p>
                    <p className="text-[10px] text-gray-400">EAN: 7790895000065</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOPPINGS / EXTRAS SYSTEM --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Cada cliente pide <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">a su gusto.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
              Toppings, extras, salsas, puntos de cocción. Configurá todo desde el Dashboard y tus clientes eligen solitos. Cero errores, cero audios de 2 minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {/* EXPLANATION */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                  <Cherry size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Grupos de Toppings</h3>
                  <p className="text-gray-500 font-medium">Creá grupos como "Salsas", "Extras", "Punto de Cocción". Cada grupo tiene sus opciones con precio extra individual.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">El cliente arma su pedido perfecto</h3>
                  <p className="text-gray-500 font-medium">Interfaz visual que muestra las opciones con un toque. Nada de escribir "sin cebolla" en una nota.</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <p className="text-sm text-green-800 font-bold">
                  <span className="font-black">Resultado:</span> El pedido llega completo, sin errores, con el precio correcto calculado automáticamente. Tu cocina agradece.
                </p>
              </div>
            </div>

            {/* TOPPING MOCKUP */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 bg-gray-100 rounded-xl"></div>
                <div>
                  <p className="font-black text-gray-900">Burger Doble</p>
                  <p className="text-sm text-gray-500">$9.500</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">🧀 Extras</p>
                  <div className="space-y-2">
                    {[{ name: "Cheddar extra", price: "+$800", selected: true }, { name: "Panceta", price: "+$1.200", selected: true }, { name: "Huevo frito", price: "+$500", selected: false }].map((t, i) => (
                      <div key={i} className={`flex justify-between items-center p-2.5 rounded-xl border text-sm ${t.selected ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${t.selected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                            {t.selected && <CheckCircle2 size={12} className="text-white" />}
                          </div>
                          <span className="font-bold text-gray-900">{t.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{t.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">🔥 Cocción</p>
                  <div className="flex gap-2">
                    {["Jugosa", "A punto", "Cocida"].map((opt, i) => (
                      <button key={i} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${i === 0 ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-600 border-gray-200'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500 font-bold">Total:</span>
                <span className="text-xl font-black text-gray-900">$11.500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY A BASIC PAGE ISN'T ENOUGH --- */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Una web de pedidos <span className="text-red-600">ya no alcanza.</span></h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
              Cualquiera te hace una "paginita" para pedir. Pero sin inteligencia, sin datos, sin control real... es como tener un local sin caja registradora.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                <div className="p-4 text-center">
                  <span className="text-xs font-bold text-gray-400">&nbsp;</span>
                </div>
                <div className="p-4 text-center border-x border-gray-100">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest">Página Básica</span>
                </div>
                <div className="p-4 text-center bg-orange-50">
                  <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Pedilo</span>
                </div>
              </div>

              {/* Rows */}
              {[
                { feature: "Recibir pedidos", basic: true, pedilo: true },
                { feature: "Pipeline de cocina en vivo", basic: false, pedilo: true },
                { feature: "Notificaciones push + sonido", basic: false, pedilo: true },
                { feature: "Inteligencia de carrito (upsell)", basic: false, pedilo: true },
                { feature: "Mapa de calor semanal", basic: false, pedilo: true },
                { feature: "Escáner de código de barras", basic: false, pedilo: true },
                { feature: "Carga masiva por Excel", basic: false, pedilo: true },
                { feature: "Toppings y extras configurables", basic: false, pedilo: true },
                { feature: "Cupones y promociones", basic: false, pedilo: true },
                { feature: "Modo Mayorista (B2B)", basic: false, pedilo: true },
                { feature: "Ranking de clientes y productos", basic: false, pedilo: true },
                { feature: "Flyer QR descargable con tu marca", basic: false, pedilo: true },
              ].map((row, idx) => (
                <div key={idx} className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 last:border-0`}>
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-bold text-gray-700">{row.feature}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center border-x border-gray-100">
                    {row.basic
                      ? <CheckCircle2 size={18} className="text-gray-300" />
                      : <XCircle size={18} className="text-red-300" />
                    }
                  </div>
                  <div className="p-4 flex items-center justify-center bg-orange-50/50">
                    <CheckCircle2 size={18} className="text-orange-600" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-lg text-gray-600 font-bold">
              Una página básica recibe pedidos. <span className="text-orange-600 font-black">Pedilo hace crecer tu negocio.</span>
            </p>
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

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-500 font-medium">Todo lo que necesitás saber antes de empezar.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: "¿Realmente es 0% de comisión?", a: "Sí. Pedilo cobra un plan fijo mensual, no un porcentaje de tus ventas. Si vendés $1 o $10 millones, el costo es el mismo. Tu ganancia es toda tuya." },
              { q: "¿Necesito saber de tecnología?", a: "Para nada. Si sabés usar WhatsApp, sabés usar Pedilo. Configurás tu negocio en menos de 10 minutos. Cargás productos con fotos o escaneando el código de barras." },
              { q: "¿Mis clientes necesitan descargar una app?", a: "No. Tus clientes abren un link o escanean un QR y piden directo desde el navegador del celular. Sin registros, sin descargas. Menos fricción, más ventas." },
              { q: "¿Sirve para distribuidoras/mayoristas?", a: "Sí, Pedilo tiene un Modo Mayorista nativo con listas de precios diferenciadas, mínimos de compra y venta por bulto. Es la única plataforma B2B diseñada para esto." },
              { q: "¿Puedo usar Pedilo junto con PedidosYa/Rappi?", a: "¡Es la idea! Usá las apps para que te conozcan nuevos clientes y mandá un flyer QR con cada pedido para que la próxima vez pidan directo por Pedilo. Te ahorrás el 30% de comisión." },
              { q: "¿Qué pasa con mis datos si me voy?", a: "Tus datos son TUYOS. Podés exportar todo cuando quieras. No hay contratos de permanencia ni letra chica." },
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronRight size={20} className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-600 font-medium leading-relaxed animate-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-4 text-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-bold mb-8 border border-orange-500/20">
            <Zap size={16} /> Empezá hoy, vendé mañana
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">Tomá el control <br className="hidden md:block" />de tu negocio.</h2>
          <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
            Sin contratos. Sin letra chica. Tu negocio online en menos de 10 minutos.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="px-12 py-5 bg-orange-600 text-white font-black rounded-2xl text-xl hover:bg-orange-500 hover:scale-[1.02] transition-all shadow-2xl shadow-orange-900/50"
            >
              Crear mi Cuenta Gratis
            </button>
            <button
              onClick={() => window.open("/n/pedilo-oficial", "_blank", "noopener,noreferrer")}
              className="px-12 py-5 bg-white/5 text-white font-black rounded-2xl text-xl hover:bg-white/10 border border-white/10 transition-all"
            >
              Ver Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 font-medium mb-8">
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Sin tarjeta requerida</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Cancelá cuando quieras</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500" /> Soporte humano</span>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-2"><Github size={16} /> Open Source Core</span>
            <span>·</span>
            <span>Hecho con ❤️ en Argentina</span>
          </div>
        </div>
      </section>
    </div>
  );
}
