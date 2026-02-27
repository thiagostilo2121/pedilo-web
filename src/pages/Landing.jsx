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
  Activity,
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
  TrendingUp,
  BadgeCheck,
  Megaphone,
  ArrowRight,
  Store,
  CircleEllipsis,
  Truck,
  Package,
  FileSpreadsheet,
  Search,
  Ticket,
  BrainCircuit,
  MessageCircle,
  AlertTriangle,
  DollarSign,
  Bell,
  ChefHat,
  ScanBarcode,
  Upload,
  ShieldCheck,
  Target,
  Lightbulb,
  Cherry,
  Flame,
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
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[72px] items-center">
            <span className="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-1">
              Pedilo<span className="text-orange-600">.</span>
            </span>
            <div className="flex gap-3 sm:gap-6 items-center">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors text-sm px-2"
              >
                Ingresar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-bold transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Crear Tienda
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION: PREMIUM & PROFESSIONAL --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 blur-[100px] rounded-full mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          {/* Sleek Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/60 shadow-sm text-gray-800 text-xs sm:text-sm font-semibold mb-8 hover:bg-white/80 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>La nueva forma de recibir pedidos</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 sm:mb-8 leading-[1.05] text-gray-900 max-w-5xl mx-auto">
            Tu negocio.<br />
            Tus reglas.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-rose-500">Tu ganancia.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium px-4">
            La alternativa a las Apps que te cobra <span className="text-gray-900 font-black">$0 comisión</span>. Fidelizá a tus clientes y recuperá el control de tu local hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full text-lg hover:bg-orange-700 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-orange-600/20"
            >
              Crear mi Tienda Gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/n/pedilo-oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 flex items-center justify-center bg-white/80 backdrop-blur-md text-gray-700 font-bold rounded-full text-lg hover:text-gray-900 hover:bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <Store size={20} className="mr-2 text-gray-500" /> Ver Demo en Vivo
            </a>
          </div>

          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Garantía de onboarding y soporte gratuito
            </div>
          </div>

          {/* REAL DATA EVIDENCE - GLASSMORPHISM */}
          <div className="max-w-5xl mx-auto transform hover:-translate-y-1 transition-transform duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white rounded-3xl blur-xl opacity-50"></div>
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-orange-100 rounded-full blur-3xl opacity-40 -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-6 border-b border-gray-100/80 relative z-10 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-100 to-orange-50 flex items-center justify-center border border-orange-200/50 text-orange-600">
                    <TrendingUp size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-gray-900 font-bold">Datos Reales de Tienda Demo</h4>
                    <span className="text-gray-500 text-xs font-medium">{dateRangeString}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Métricas en Vivo
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center relative z-10">
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/50 border border-gray-100 text-center lg:text-left transition-colors hover:bg-white">
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-1"><BadgeCheck size={14} /> Ventas Totales</div>
                  <div className="text-gray-900 font-black text-2xl lg:text-3xl tracking-tight">{formatMoney(realSales)}</div>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/50 border border-gray-100 text-center lg:text-left transition-colors hover:bg-white">
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-1"><ShoppingBag size={14} /> Pedidos</div>
                  <div className="text-gray-900 font-bold text-2xl lg:text-3xl">{realOrders}</div>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/50 border border-gray-100 text-center lg:text-left transition-colors hover:bg-white">
                  <div className="text-gray-500 text-xs font-semibold uppercase mb-1.5 flex items-center justify-center lg:justify-start gap-1"><Ticket size={14} /> Ticket Prom.</div>
                  <div className="text-gray-700 font-bold text-xl lg:text-2xl">{formatMoney(realAvgTicket)}</div>
                </div>
                <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-500 text-center shadow-lg shadow-orange-500/20 text-white transform hover:scale-105 transition-all cursor-default relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full blur-xl -mr-4 -mt-4"></div>
                  <div className="text-orange-100 text-xs font-bold uppercase mb-1.5 tracking-wide">Tu Ahorro (30%)</div>
                  <div className="font-black text-2xl lg:text-3xl tracking-tight">
                    {formatMoney(realSavings)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-orange-100 font-medium mt-1">Directo a tu bolsillo</div>
                </div>
              </div>
            </div>

            {/* TRUST BADGES STRIP */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 opacity-90 relative z-10 pb-8">
              <div className="flex gap-2 items-center text-gray-600 text-xs font-medium bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm transition-transform hover:-translate-y-0.5">
                <CheckCircle2 size={16} className="text-green-500" /> MercadoPago / Transferencia
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-xs font-medium bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm transition-transform hover:-translate-y-0.5">
                <CheckCircle2 size={16} className="text-green-500" /> Sin comisiones ocultas
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-xs font-medium bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm transition-transform hover:-translate-y-0.5">
                <CheckCircle2 size={16} className="text-green-500" /> Base de datos propia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF NUMBERS STRIP --- */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 md:divide-x divide-gray-800">
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">250<span className="text-orange-500 text-3xl md:text-5xl align-top inline-block ml-1">+</span></div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Negocios Activos</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">0<span className="text-orange-500 text-3xl md:text-5xl align-top inline-block ml-1">%</span></div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Comisión por Venta</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">&lt;30<span className="text-orange-500 text-3xl md:text-5xl align-top inline-block ml-1">s</span></div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Tiempo por Pedido</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">100<span className="text-orange-500 text-3xl md:text-5xl align-top inline-block ml-1">%</span></div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Tu Dinero y Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEGMENTATION: IDENTIFY YOUR PAIN --- */}
      <section className="py-24 md:py-32 bg-gray-50/50 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 p-32 bg-orange-100 rounded-full blur-3xl opacity-40 -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 p-32 bg-blue-50 rounded-full blur-3xl opacity-40 -ml-16 -mb-16 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-orange-600 text-xs font-bold mb-4 border border-orange-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
              SOLUCIONES A MEDIDA
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">¿Cuál es la realidad de tu negocio?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* CARD 1: APPS */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all group cursor-default">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-6 group-hover:scale-110 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all">
                <Store size={24} />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-3">Uso Apps de Delivery</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Rappi, PedidosYa, etc.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tu Dolor</div>
                <div className="text-gray-700 font-bold text-sm">Regalás el 30% + IVA de cada venta.</div>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <CheckCircle2 size={16} /> Tu propia App con 0% comisión.
              </div>
            </div>

            {/* CARD 2: WHATSAPP */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all group cursor-default">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-3">Vendo por WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Instagram, Chat, Teléfono.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tu Dolor</div>
                <div className="text-gray-700 font-bold text-sm">Caos de mensajes y pedidos perdidos.</div>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <CheckCircle2 size={16} /> Automatizá tu toma de pedidos.
              </div>
            </div>

            {/* CARD 3: OTHERS */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all group cursor-default">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-6 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                <CircleEllipsis size={24} />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-3">Uso otra Plataforma</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Cartanube, ALaCarta, etc.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tu Dolor</div>
                <div className="text-gray-700 font-bold text-sm">Sistemas lentos que son solo un 'menú online'.</div>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <CheckCircle2 size={16} /> Diseño premium + Datos para crecer.
              </div>
            </div>

            {/* CARD 4: WHOLESALE */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all group cursor-default">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 mb-6 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                <Truck size={24} />
              </div>
              <h3 className="font-black text-xl text-gray-900 mb-3">Soy Mayorista</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Distribuidora, Fábrica.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tu Dolor</div>
                <div className="text-gray-700 font-bold text-sm">PDFs, Excel y desorden en el stock.</div>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <CheckCircle2 size={16} /> Tienda B2B pensada para volumen.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AGITATION SECTION: THE PAIN --- */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-12 leading-tight tracking-tight">
            ¿Es tu socio o es tu jefe? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 font-bold text-3xl sm:text-5xl tracking-tight">Las Apps se quedan con tu ganancia.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch justify-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-100 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/60 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-300 text-left relative z-10 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 border border-rose-100/50"><XCircle size={28} /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Comisiones Abusivas</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Si vendés $100.000, te quedan $70.000. Regalás el 30% de tu esfuerzo solo por usar su plataforma.</p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/60 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-300 text-left relative z-10 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 border border-orange-100/50"><AlertTriangle size={28} /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Clientes "Secuestrados"</h3>
              <p className="text-gray-600 font-medium leading-relaxed">¿Sabés quién te compró? No. Los datos son de la App. Vos pasás a ser solo el cocinero que les hace el producto.</p>
            </div>
          </div>
          <div className="inline-block relative">
            <span className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur opacity-30"></span>
            <p className="relative bg-white px-8 py-4 rounded-xl text-xl sm:text-2xl font-black text-gray-900 border border-gray-100 shadow-sm">
              Es hora de tener tu propio canal.<br className="sm:hidden" />
              <span className="text-orange-600 sm:ml-2">Es hora de elegir Pedilo.</span>
            </p>
          </div>
        </div>
      </section>



      {/* STICKY MOBILE CTA */}
      {/* STICKY MOBILE CTA - OPTIMIZED */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 p-3 pb-5 animate-in slide-in-from-bottom-5 duration-500 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex justify-center">
        <button
          onClick={() => navigate("/register")}
          className="w-full max-w-sm py-3.5 bg-orange-600 text-white font-black rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 leading-tight active:scale-[0.98] transition-all"
        >
          <span className="text-base uppercase tracking-tight">Crear mi Tienda Gratis</span> <ArrowRight size={18} />
        </button>
      </div>

      {/* --- HYBRID STRATEGY: THE CYCLE OF SUCCESS --- */}
      <section className="py-24 md:py-32 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-block px-4 py-1.5 bg-gray-900/5 backdrop-blur-sm border border-gray-200 text-gray-800 text-xs font-bold rounded-full mb-6 tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 inline-block rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Estrategia Recomendada
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">El Ciclo de Venta Inteligente.</h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              No dejes las Apps si te traen clientes nuevos. <strong className="text-gray-900">Usalas para pescarlos</strong> y luego fidelizalos en tu propia plataforma con Pedilo.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1.2fr_auto_1fr] gap-6 max-w-6xl mx-auto items-center">
            {/* STEP 1: DISCOVERY (APPS) */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 relative group transition-colors">
              <div className="text-6xl font-black text-gray-100 mb-4 absolute top-4 right-6 pointer-events-none">1</div>
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 text-gray-400 relative z-10">
                <Search size={22} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">Descubrimiento</h3>
              <p className="text-gray-500 font-medium mb-6 text-sm relative z-10">El usuario te encuentra en PedidosYa o similares y hace la primera compra.</p>
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 relative z-10">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                  <span>Comisión App</span>
                  <span className="text-rose-500">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-1.5 rounded-full w-[100%] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                </div>
              </div>
            </div>

            {/* ARROW */}
            <div className="hidden md:flex justify-center text-gray-300">
              <ArrowRight size={32} />
            </div>

            {/* STEP 2: CONVERSION (THE HACK) */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl relative md:scale-110 z-20 group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 rounded-3xl pointer-events-none"></div>
              <div className="text-6xl font-black text-gray-700/50 mb-4 absolute top-4 right-6 pointer-events-none z-0">2</div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-white backdrop-blur-sm relative z-10">
                <QrCode size={26} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3 tracking-tight relative z-10">La Intercepción</h3>
              <p className="text-gray-300 font-medium mb-6 text-sm leading-relaxed relative z-10">
                Entregás ese pedido con un Flyer atractivo: <strong className="text-white">"La próxima pedí directo, más rápido y a mejor precio"</strong>.
              </p>
              <div className="bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 relative z-10">
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                  <span>Costo Impresión</span>
                  <span className="text-yellow-400">Diminuto</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full w-[15%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                </div>
              </div>
            </div>

            {/* ARROW */}
            <div className="hidden md:flex justify-center text-gray-300">
              <ArrowRight size={32} />
            </div>

            {/* STEP 3: RETENTION (PEDILO) */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 relative group transition-colors">
              <div className="text-6xl font-black text-gray-100 mb-4 absolute top-4 right-6 pointer-events-none">3</div>
              <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-6 text-green-600 relative z-10">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">Rentabilidad</h3>
              <p className="text-gray-500 font-medium mb-6 text-sm relative z-10">Ese cliente ahora te compra directo por Pedilo. Pasa a ser fiel a tu marca.</p>
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 relative z-10">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                  <span>Comisión App</span>
                  <span className="text-green-600">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gray-300 h-1.5 rounded-full w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHATSAPP REALITY: CHAOS VS ORDER --- */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Vender SOLO con WhatsApp <br className="hidden sm:block" /><span className="text-red-600">no es escalable.</span></h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Perdés tiempo descifrando audios, contestando "precio" mil veces al día y anotando mal la dirección. Eso no es un negocio serio, es un caos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            {/* THE CHAOS (MANUAL) */}
            <div className="bg-gray-50/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden text-center md:text-left flex flex-col">
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 px-5 py-2 rounded-bl-3xl font-bold text-xs tracking-widest uppercase shadow-sm">Realidad Actual</div>
              <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center justify-center md:justify-start gap-3 tracking-tight">
                <AlertTriangle className="text-gray-400" /> El Caos Diario
              </h3>

              <div className="space-y-4 font-mono text-[13px] max-w-sm mx-auto md:mx-0 opacity-80 flex-1 w-full">
                <div className="bg-white p-3.5 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-600 border border-gray-200 shadow-sm w-[85%]">
                  Hola precio de la hamburguesa?
                </div>
                <div className="bg-green-50 p-3.5 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl text-green-900 ml-auto text-right border border-green-200 shadow-sm w-[85%]">
                  $8500 la simple, $9500 la doble...
                </div>
                <div className="bg-white p-3.5 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-600 border border-gray-200 shadow-sm w-[85%]">
                  Ah dale. Tenés papas?
                </div>
                <div className="bg-green-50 p-3.5 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl text-green-900 ml-auto text-right border border-green-200 shadow-sm w-[85%]">
                  Si, chicas $3000, grandes $5000
                </div>
                <div className="bg-white p-3.5 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl text-gray-500 flex items-center gap-2 border border-gray-200 shadow-sm w-[60%]">
                  <span className="italic">Audio 0:45</span> 🎤
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <span className="inline-flex items-center gap-2 text-rose-600 font-bold bg-rose-50 px-4 py-2 rounded-full text-sm">
                  <XCircle size={18} /> 20 minutos perdidos por pedido.
                </span>
              </div>
            </div>

            {/* THE ORDER (PEDILO) */}
            <div className="bg-gray-900 p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden transform lg:scale-105 z-10 text-center md:text-left flex flex-col border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 bg-green-500 text-white px-5 py-2 rounded-bl-3xl font-bold text-xs tracking-widest uppercase shadow-sm z-20">Con Pedilo</div>
              <h3 className="text-2xl font-black text-white mb-8 flex items-center justify-center md:justify-start gap-3 tracking-tight relative z-10">
                <CheckCircle2 className="text-green-400" /> El Orden Absoluto
              </h3>

              <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 text-left relative z-10 flex-1 shadow-inner">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/30">
                    <MessageCircle size={22} fill="currentColor" />
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <div className="font-bold text-white mb-1.5 flex items-center gap-2 flex-wrap">
                      Nuevo Pedido #2491AB <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded-full text-green-400 animate-pulse">Ahora</span>
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono bg-gray-900/50 p-3 rounded-xl border border-gray-700 overflow-hidden break-words">
                      ¡Hola! Envío nuevo pedido ✨<br />
                      <strong>Total: $14.500 (Abona c/ MP)</strong><br />
                      Dir: Av. Siempreviva 742, 2A.<br />
                      <span className="text-gray-500 text-xs">Ver detalle en el link adjunto.</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-green-950 font-black rounded-xl transition-all shadow-md active:scale-95 text-sm uppercase tracking-wider">
                  Aceptar Pedido
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700 text-center relative z-10">
                <span className="inline-flex items-center gap-2 text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-sm">
                  <CheckCircle2 size={18} /> 30 segundos por pedido. Efectividad 100%.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF: TESTIMONIALS --- */}
      <section className="py-24 md:py-32 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        {/* Background Decorative patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">No nos creas a nosotros.</h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Escuchá a los dueños que ya se liberaron de las comisiones abusivas y tomaron el control de su negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative mt-0 md:mt-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-500 rounded-full flex items-center justify-center font-black text-5xl leading-none pt-6 shadow-sm border border-orange-100/50">"</div>
              <p className="text-gray-700 font-medium leading-relaxed mb-8 relative z-10 italic mt-2">
                "Antes de Pedilo, le dejaba el 30% de mi esfuerzo a una app. Ahora, ese dinero va directo al bolsillo o a mejorar el local. La gente prefiere pedir por acá porque es rapidísimo."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-black shadow-md shadow-orange-500/20">L</div>
                <div>
                  <div className="font-bold text-gray-900 tracking-tight">Lucas M.</div>
                  <div className="text-sm text-gray-500 font-medium">Dueño de Hamburguesería</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 (Featured) */}
            <div className="bg-gray-900 p-8 md:p-10 rounded-3xl border border-gray-800 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-transparent pointer-events-none"></div>
              <div className="absolute -top-6 left-8 w-14 h-14 bg-gray-800 border border-gray-700 text-orange-500 rounded-full flex items-center justify-center font-black text-5xl leading-none pt-6 shadow-lg z-20">"</div>
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10 italic mt-2 text-lg">
                "Con el modo mayorista me ahorré horas de pasar precios por Excel. Mis clientes entran, ven su precio con descuento y piden. Es un antes y un después para la distribuidora."
              </p>
              <div className="flex items-center gap-4 relative z-10 border-t border-gray-800 pt-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 font-black shadow-lg">C</div>
                <div>
                  <div className="font-bold text-white tracking-tight">Carla S.</div>
                  <div className="text-sm text-gray-400 font-medium">Gerente de Distribuidora</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative mt-0 md:mt-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-500 rounded-full flex items-center justify-center font-black text-5xl leading-none pt-6 shadow-sm border border-blue-100/50">"</div>
              <p className="text-gray-700 font-medium leading-relaxed mb-8 relative z-10 italic mt-2">
                "El control que te da el dashboard es increíble. Supe que las papas solas casi no se vendían, armé un combo que me sugirió el sistema y las ventas volaron."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">M</div>
                <div>
                  <div className="font-bold text-gray-900 tracking-tight">Martín P.</div>
                  <div className="text-sm text-gray-500 font-medium">Encargado de Pizzería</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AUTOPILOT: THE AI BRAIN --- */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-50/60 rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/60 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 text-sm font-bold mb-6 border border-violet-200/60 shadow-sm">
              <BrainCircuit size={16} /> Autopilot — Motor de Inteligencia
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              No pienses. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Pedilo piensa por vos.</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Autopilot analiza tus pedidos, clientes y productos en tiempo real y te dice <strong className="text-gray-900">exactamente qué hacer</strong> para ganar más. Sin reportes complicados, sin Excel, sin adivinar.
            </p>
          </div>

          {/* Autopilot Engine Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16">

            {/* FEATURED: ROI Simulator */}
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-gray-700 group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 rounded-3xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/20">
                    <DollarSign size={14} /> Simulador de ROI
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    Sabé cuánto ahorrás <br className="hidden sm:block" />vs cada App de delivery.
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Autopilot calcula en tiempo real tu ahorro mensual y anual comparando tu volumen real contra las comisiones de PedidosYa, Rappi y cualquier marketplace. Todo automatizado.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Si vendieras por Apps (30%)</div>
                    <div className="text-2xl font-black text-red-400">-$450.000 <span className="text-gray-500 text-sm font-medium">/mes</span></div>
                  </div>
                  <div className="bg-emerald-500/10 backdrop-blur-sm p-5 rounded-2xl border border-emerald-500/20">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 size={12} /> Con Pedilo</div>
                    <div className="text-2xl font-black text-emerald-400">+$433.000 <span className="text-emerald-300/60 text-sm font-medium">ahorro neto/mes</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Combo Detection */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-violet-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-50 to-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-5 border border-violet-200/50 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Detector de Combos</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Analiza qué productos compran juntos y te sugiere combos con impacto de ingreso estimado.</p>
              </div>
            </div>

            {/* Demand Forecast */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5 border border-blue-200/50 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <TrendingUp size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Pronóstico de Demanda</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Proyecta cuántos pedidos y cuánta plata vas a hacer los próximos 7 días con nivel de confianza.</p>
              </div>
            </div>

            {/* At-Risk Clients */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-orange-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-5 border border-orange-200/50 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Users size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Clientes en Riesgo</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Detecta quién dejó de comprarte y cuánta plata estás perdiendo. Te da el botón de WhatsApp listo.</p>
              </div>
            </div>

            {/* Promo Engine */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-green-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded-xl flex items-center justify-center mb-5 border border-green-200/50 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Motor de Promos</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Cuando un producto cae en ventas, Autopilot te recomienda un cupón con porcentaje y nombre incluido.</p>
              </div>
            </div>

            {/* Dead Products */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-rose-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-5 border border-rose-200/50 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <AlertTriangle size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Alerta de Producto Muerto</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Productos activos con 0 ventas en 30 días. Sacalos del menú o haceles una promo antes de que te cuesten.</p>
              </div>
            </div>

            {/* Retention Automation */}
            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-5 border border-indigo-200/50 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Acciones de Retención</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Cupones sugeridos, campañas de reenganche y activación de horarios muertos. Todo listo para ejecutar.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button onClick={() => navigate("/register")} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-full text-lg hover:shadow-violet-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-violet-600/20 mx-auto">
              Probá Autopilot Gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-sm text-gray-400 font-medium">Se activa automáticamente cuando tenés pedidos. Sin configuración.</p>
          </div>
        </div>
      </section>

      {/* --- ROI CALCULATOR: THE NUMBERS DON'T LIE --- */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
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
                <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="text-gray-500 text-xs font-bold uppercase mb-1">Pérdida Mensual (Para Apps)</div>
                  <div className="text-3xl font-black text-red-600 flex items-center gap-2">
                    -{formatMoney(appCost)} <ArrowRight size={20} className="text-red-400" /> <span className="animate-pulse">🗑️</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-900/20 backdrop-blur-sm border border-emerald-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-emerald-950 text-[10px] font-black px-3 py-1.5 rounded-bl-xl tracking-widest uppercase shadow-sm">TU GANANCIA</div>
                  <div className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Ahorro Anual (Usando Pedilo)
                  </div>
                  <div className="text-5xl font-black text-emerald-400 mb-4 tracking-tight drop-shadow-sm">
                    {formatMoney(yearlySavings)}
                  </div>
                  <div className="text-sm font-medium text-emerald-100/70 border-t border-emerald-500/20 pt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="shrink-0 text-emerald-300">Este año podrías comprar:</span>
                    <span className="text-white font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 inline-flex w-max">
                      {yearlySavings > 8000000 ? "Un Auto Usado 🚗" : yearlySavings > 2000000 ? "Una Moto 0km 🏍️" : "3 Freezers Industriales ❄️"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                  <ShieldCheck size={14} className="text-green-500" /> Costo Pedilo: Solo $17.000 final, todo el año.
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- WHOLESALE MODE: CATEGORY DIFFERENTIATOR --- */}
      <section className="py-32 bg-white overflow-hidden border-t border-gray-100 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 border border-blue-100 shadow-sm">
              <Truck size={16} /> Especial para Mayoristas
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Vendé por Mayor sin enloquecer con Excel.</h2>
            <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed">
              Tus clientes mayoristas quieren comprar fácil y rápido. Dales una plataforma B2B moderna, no un PDF de 20 páginas desactualizado.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Listas de Precios & Excel</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Manejá miles de productos. Subí y actualizá precios masivamente desde Excel en segundos.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Mínimos y Bultos Cerrados</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Configurá mínimo de compra monetario o venta por pack cerrado automágicamente.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] rotate-3 transform transition-transform group-hover:rotate-6"></div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl relative border border-gray-100">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <span className="font-black text-xl text-gray-900">Distribuidora El Trébol</span>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black tracking-widest uppercase rounded-full">B2B Premium</div>
              </div>
              {/* Mock Item */}
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                  <Package size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-800 w-3/4 rounded-full mb-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg text-gray-900 truncate">$4.500 <span className="text-xs font-medium text-gray-500 ml-1">/pack x12</span></span>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <button className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                      <span className="font-bold w-4 text-center text-sm">5</span>
                      <button className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 text-sm text-blue-800 font-medium flex gap-3 items-center backdrop-blur-sm">
                <TrendingUp size={18} className="shrink-0" />
                <span>Faltan <strong>$15.000</strong> para llegar al mínimo de compra.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LIVE DEMO WIDGET: SHOW, DON'T TELL --- */}
      <section className="py-32 bg-gray-50 border-t border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50/50 to-transparent pointer-events-none hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Probá la Velocidad <span className="text-green-600">En Vivo.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Tus clientes no se bajan ninguna App. No se registran. Entran, piden y chau. La menor fricción posible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* EXPLANATION */}
            <div className="order-2 md:order-1 space-y-8">
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-xl text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">Escanean o Clickean</h3>
                  <p className="text-gray-500 leading-relaxed">Desde el perfil de Instagram o un QR en tu mesa. Se abre tu menú digital al instante.</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-xl text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">Eligen sus gustos</h3>
                  <p className="text-gray-500 leading-relaxed">Interfaz ultra-rápida. Creada para verse y funcionar increíble en cualquier celular.</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-14 h-14 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center font-black text-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shrink-0 shadow-sm shadow-green-500/10">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors">Te llega a WhatsApp</h3>
                  <p className="text-gray-500 leading-relaxed">Pedido limpio, calculado, con opciones claras y listo para cobrar. Sin vueltas ni audios.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200/60 mt-8">
                <p className="font-bold text-gray-900 flex items-center gap-2 mb-5">
                  <Users className="text-blue-500 shrink-0" />
                  <span className="text-sm">Más de <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">250 Negocios</span> ya facturan millones.</span>
                </p>
                <div className="flex -space-x-3 items-center">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm bg-gradient-to-br ${i % 2 === 0 ? 'from-orange-400 to-rose-400' : 'from-blue-400 to-indigo-400'}`} style={{ zIndex: 10 - i }}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm z-0">
                    +200
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE WIDGET */}
            <div className="order-1 md:order-2">
              <div className="bg-white p-4 rounded-[3rem] border-8 border-gray-900 shadow-2xl relative max-w-[320px] mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-2xl z-20 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  <div className="w-12 h-2 rounded-full bg-gray-800"></div>
                </div>

                {/* Screen */}
                <div className="bg-gray-50 rounded-[2rem] overflow-hidden h-[550px] flex flex-col relative border border-gray-100">
                  {/* Header */}
                  <div className="bg-white/80 backdrop-blur-md p-4 shadow-sm z-10 pt-10 border-b border-gray-100 sticky top-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-500 rounded-full shadow-sm"></div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Burger King (Fake)</div>
                        <div className="text-[10px] text-green-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Abierto
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-auto p-4 space-y-4 relative">
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex gap-3 hover:border-orange-200 transition-colors cursor-pointer group/item">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0"></div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900 truncate">Doble Bacon</div>
                          <div className="text-xs text-gray-500 line-clamp-1">Con extra cheddar...</div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-black text-sm text-gray-900">$8.500</span>
                          <button className="w-7 h-7 bg-orange-50 text-orange-600 rounded-lg font-bold flex items-center justify-center text-sm group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex gap-3 hover:border-orange-200 transition-colors cursor-pointer group/item">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl shrink-0"></div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900 truncate">Papas Cheddar</div>
                          <div className="text-xs text-gray-500 line-clamp-1">Bañadas en salsa...</div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-black text-sm text-gray-900">$4.500</span>
                          <button className="w-7 h-7 bg-orange-50 text-orange-600 rounded-lg font-bold flex items-center justify-center text-sm group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Footer */}
                  <div className="bg-white/90 backdrop-blur-md p-4 border-t border-gray-100 sticky bottom-0 z-10">
                    <button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all">
                      <Smartphone size={18} /> Enviar al WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARKETING & SEO SUITE --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Herramientas para <span className="text-orange-600">vender más.</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">No solo procesamos pedidos. Te damos las armas para combatir a la competencia y aparecer primero en tu zona.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* SEO */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] hover:border-blue-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-125"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-200/50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Search size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">SEO Local Automático</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">Tu tienda carga extremadamente rápido bajo los estándares de Google. Aparecé primero cuando busquen delivery en tu zona sin pagar un peso en anuncios.</p>
              </div>
            </div>

            {/* SMART BANNERS */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:border-orange-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-125"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-orange-200/50 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  <Megaphone size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Smart Banners</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">Convertí el inicio de tu tienda en una marquesina digital. Anunciá ofertas flash, promociones 2x1 o cambios de horario para que todos se enteren al instante.</p>
              </div>
            </div>

            {/* COUPONS */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)] hover:border-green-100 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-125"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-green-200/50 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <Ticket size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Motor de Cupones</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">Creá códigos como "MANDALE20" con fecha de caducidad en segundos. Reactivá clientes dormidos por WhatsApp y premiá a los fieles para fidelizarlos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMMAND CENTER: REAL-TIME ORDER MANAGEMENT --- */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/80 backdrop-blur-sm text-gray-300 text-sm font-bold mb-6 border border-gray-700 shadow-sm">
              <LayoutDashboard size={16} className="text-orange-500" /> Dashboard en Tiempo Real
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Tu Cocina tiene un <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500">Centro de Comando.</span></h2>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Cada pedido pasa por un pipeline profesional de 4 estados. Sonido de alerta, notificaciones push, y un tablero visual diseñado para que tu equipo opere bajo presión.
            </p>
          </div>

          {/* ORDER PIPELINE MOCKUP */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {/* Stage 1 */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-amber-500/20 rounded-[2rem] p-6 text-center relative group hover:bg-gray-800/60 transition-all cursor-default shadow-lg shadow-amber-900/10 hover:-translate-y-1">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
                  </span>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                  <Bell size={26} />
                </div>
                <h4 className="font-black text-amber-300 text-sm uppercase tracking-widest mb-2">Nuevo</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Suena la alarma. Decidís al instante.</p>
              </div>

              {/* Stage 2 */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-blue-500/20 rounded-[2rem] p-6 text-center group hover:bg-gray-800/60 transition-all cursor-default hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={26} />
                </div>
                <h4 className="font-black text-blue-300 text-sm uppercase tracking-widest mb-2">Aceptado</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Con un toque. El cliente ya sabe.</p>
              </div>

              {/* Stage 3 */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-purple-500/20 rounded-[2rem] p-6 text-center group hover:bg-gray-800/60 transition-all cursor-default hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                  <ChefHat size={26} />
                </div>
                <h4 className="font-black text-purple-300 text-sm uppercase tracking-widest mb-2">Cocinando</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Tu equipo sabe qué preparar.</p>
              </div>

              {/* Stage 4 */}
              <div className="bg-gray-800/40 backdrop-blur-md border border-green-500/20 rounded-[2rem] p-6 text-center group hover:bg-gray-800/60 transition-all cursor-default hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform">
                  <HandPlatter size={26} />
                </div>
                <h4 className="font-black text-green-300 text-sm uppercase tracking-widest mb-2">Listo</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">Avisale por WhatsApp automático.</p>
              </div>
            </div>

            {/* NOTIFICATION MOCKUP OVERLAY */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="bg-gray-800/90 backdrop-blur-xl rounded-[2rem] border border-gray-700/80 p-6 shadow-2xl relative transform transition-transform hover:scale-105">
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-xs font-black text-white animate-bounce shadow-lg shadow-red-500/50">1</div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/30">
                    <Bell size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-black text-white text-base tracking-tight">🔔 ¡Nuevo Pedido!</p>
                      <span className="text-xs text-gray-400 font-bold bg-gray-900/50 px-2 py-0.5 rounded-md border border-gray-700">Ahora</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">De: <span className="text-white font-bold">María García</span> — <span className="text-green-400 font-black">$18.500</span></p>
                    <p className="text-xs text-gray-500 font-medium mb-4 p-2.5 bg-gray-900/50 rounded-lg border border-gray-800 leading-relaxed">2x Milanesa Napolitana, 1x Papas Cheddar</p>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 bg-green-500 hover:bg-green-400 text-gray-900 text-sm font-black rounded-xl transition-colors shadow-lg shadow-green-500/20">Aceptar</button>
                      <button className="flex-1 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white text-sm font-bold rounded-xl border border-gray-600 transition-colors">Ver Detalle</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-6 font-medium italic">
                * El sonido y la notificación push funcionan aunque tengas la pantalla de tu celular apagada o estés en otra app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEEP INTELLIGENCE: CART INSIGHTS + HEATMAP + BEST CLIENTS --- */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-bold mb-6 border border-purple-100 shadow-sm">
              <Lightbulb size={16} /> Inteligencia Automática
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Tu negocio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">piensa solo.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Pedilo analiza tus ventas en segundo plano y te dice exactamente qué funciona, qué sobra, y qué combinaciones te hacen ganar más dinero.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* CART INTELLIGENCE */}
            <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(147,51,234,0.3)] text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/30">
                  <Target size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-100">Inteligencia de Carrito</h3>
              </div>

              <div className="space-y-5 mb-8 relative z-10">
                <div>
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Crown size={12} /> Productos Ancla</p>
                  <p className="text-xs text-gray-400 mb-3 font-medium">El motivo principal de la compra.</p>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-sm font-black text-white mb-0.5">Milanesa Napolitana</p>
                    <p className="text-[10px] text-gray-400 font-medium">145 pedidos como base</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Zap size={12} /> Reyes del Upsell</p>
                  <p className="text-xs text-gray-400 mb-3 font-medium">Siempre acompañan. Suben el ticket.</p>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-sm font-black text-white mb-0.5">Papas Cheddar</p>
                    <p className="text-[10px] text-gray-400 font-medium">Se vendió en combo 89 veces</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl p-4 border border-purple-500/30 relative z-10">
                <p className="text-xs font-medium text-purple-100 leading-relaxed">
                  <span className="font-black text-white bg-purple-500/50 px-2 py-0.5 rounded mr-2">💡 Insight</span>
                  Creá un combo "Milanga + Papas" y vas a subir tu ticket promedio un 25%.
                </p>
              </div>
            </div>

            {/* WEEKLY HEATMAP */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-100 text-orange-600">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Mapa de Calor</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Demanda hora x hora</p>
                  </div>
                </div>

                {/* HEATMAP MOCKUP */}
                <div className="space-y-2 mb-8">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-gray-400 w-8 text-right uppercase">{day}</span>
                      <div className="flex-1 flex gap-1">
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
                          const colors = ["bg-gray-50", "bg-orange-100/50", "bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-500"];
                          return <div key={hIdx} className={`h-6 flex-1 rounded-[4px] ${colors[val]} transition-all hover:scale-150 hover:z-10 cursor-crosshair`} />;
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="w-8" />
                    <div className="flex-1 flex justify-between text-[9px] font-black text-gray-300 uppercase tracking-widest">
                      <span>8h</span><span>12h</span><span>16h</span><span>20h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100/50 relative z-10">
                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                  <span className="font-black">📊 Acción:</span> Reforzá tu cocina los viernes a las 20h, ahí está tu cuello de botella mensual.
                </p>
              </div>
            </div>

            {/* BEST CLIENTS + METRICS */}
            <div className="space-y-8 flex flex-col justify-between h-full">
              {/* TODAY'S METRICS MOCKUP */}
              <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 group hover:shadow-xl transition-all duration-300">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={12} /> Métricas en Vivo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-100/50">
                    <p className="text-[9px] font-black text-green-600 uppercase tracking-wider mb-1">Ventas Hoy</p>
                    <p className="text-2xl font-black text-gray-900 mb-1">$285K</p>
                    <p className="text-[10px] font-bold text-green-600 flex items-center gap-0.5"><TrendingUp size={10} /> 18% vs ayer</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-wider mb-1">Ticket Prom.</p>
                    <p className="text-2xl font-black text-gray-900 mb-1">$14.2K</p>
                    <p className="text-[10px] font-bold text-blue-500">Histórico 30d</p>
                  </div>
                </div>
              </div>

              {/* BEST CLIENTS */}
              <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50/50 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-50 p-2 rounded-xl border border-yellow-100 text-yellow-600">
                      <Crown size={16} />
                    </div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mejores Clientes</h3>
                  </div>
                  <div className="space-y-4 flex-1">
                    {[{ name: "Almacén Don Pedro", orders: 47, total: "$892K" }, { name: "Bar La Esquina", orders: 31, total: "$654K" }, { name: "Rest. El Trébol", orders: 28, total: "$521K" }].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 group/item">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-[11px] font-black text-gray-400 group-hover/item:bg-yellow-100 group-hover/item:text-yellow-700 transition-colors border border-gray-100">{i + 1}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-gray-900 truncate">{c.name}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{c.orders} pedidos registrados</p>
                        </div>
                        <span className="text-xs font-black text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">{c.total}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-5 font-bold tracking-wide italic border-t border-gray-50 pt-4 text-center">
                    💡 Ideal para B2B: Sabé a quién darle trato VIP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BARCODE SCANNER + MASS IMPORT --- */}
      <section className="py-32 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-gray-700 text-sm font-bold mb-6 border border-gray-200 shadow-sm animate-fade-in-up">
              <ScanBarcode size={16} className="text-orange-600" /> Carga Inteligente
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">2000 productos cargados <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-500">en 5 minutos.</span></h2>
            <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
              No cargues producto por producto como si fuera 2015. Pedilo incluye herramientas únicas preparadas para <strong>ahorrarte horas de trabajo manual</strong>.
            </p>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <ScanBarcode size={26} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-orange-600 transition-colors duration-300">Escáner de Código de Barras</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Escaneá con la cámara del celular. Buscamos en una base de datos mundial y completamos <strong>nombre, descripción e imagen</strong> automágicamente.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0 border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <Upload size={26} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-green-600 transition-colors duration-300">Importación Masiva Excel</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">¿Ya tenés tu catálogo en Excel? Subilo y listo. Miles de productos online en un clic. Ideal para supermercados y distribuidoras mayoristas.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* SCANNER MOCKUP */}
          <div className="relative group perspective">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-100 rounded-[3rem] rotate-2 transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-[1.02]"></div>
            <div className="bg-white p-8 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative border border-gray-100 transition-transform duration-500 group-hover:-translate-y-2">
              {/* Fake Scanner UI */}
              <div className="bg-gray-900 rounded-[2rem] p-6 text-white mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,1)] animate-scan_fast"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-sm font-black tracking-widest uppercase text-gray-300">Escáner AR</span>
                  <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                    <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Cámara Activa</span>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-10 flex items-center justify-center border-2 border-dashed border-gray-600 relative z-10">
                  <div className="text-center">
                    <ScanBarcode size={56} className="text-orange-500 mx-auto mb-4 opacity-80" />
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Apuntá al EAN</p>
                  </div>
                </div>
              </div>

              {/* Found Product */}
              <div className="bg-green-50/50 backdrop-blur-md p-5 rounded-2xl border border-green-200 shadow-sm animate-fade-in-up">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-100 p-1.5 rounded-lg text-green-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs font-black text-green-700 uppercase tracking-widest">Encontrado en Base de Datos</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-green-100 shadow-sm shrink-0">
                    <Package size={28} className="text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-base truncate mb-1">Coca Cola 2.25L Retornable</p>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Gaseosa sabor cola original</p>
                    <div className="inline-block bg-white px-2 py-1.5 rounded border border-gray-100 text-[10px] font-mono font-bold text-gray-400 shadow-sm">
                      EAN: 7790895000065
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOPPINGS / EXTRAS SYSTEM --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-orange-50/50 to-transparent -z-10 skew-y-3"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Cada cliente pide <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">a su gusto.</span></h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
              Toppings, extras, salsas, y puntos de cocción. Configurá todo desde el Dashboard y tus clientes eligen solitos. Cero errores de cocina, cero audios de 2 minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            {/* EXPLANATION */}
            <div className="space-y-8">
              <div className="flex gap-5 items-start group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 shadow-sm border border-orange-200/50 group-hover:scale-110 transition-transform">
                  <Cherry size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-orange-600 transition-colors">Grupos de Modificadores</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Creá grupos como "Salsas", "Extras", o "Punto de cocción". Definí si son obligatorios u opcionales, y cuántos pueden elegir.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-200/50 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">El cliente arma su pedido Perfecto</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">Interfaz visual e intuitiva para armar su producto con un par de toques. Chau a las aclaraciones larguísimas escritas a mano.</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 shadow-sm animate-fade-in-up">
                <p className="text-sm text-green-800 font-medium leading-relaxed">
                  <span className="font-black text-green-900 block mb-1">✅ Resultado:</span> El pedido llega completo a la cocina y con el precio de los extras calculado automáticamente.
                </p>
              </div>
            </div>

            {/* TOPPING MOCKUP */}
            <div className="relative group perspective">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/50 to-red-100/50 rounded-[3rem] -rotate-3 transform transition-all duration-500 group-hover:-rotate-6 group-hover:scale-[1.02]"></div>
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl shadow-inner"></div>
                  <div>
                    <p className="font-black text-xl text-gray-900">Burger Doble Smash</p>
                    <p className="text-base text-gray-500 font-bold">$9.500</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Cherry size={14} /> Agregá Extras</p>
                      <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Opcional</span>
                    </div>
                    <div className="space-y-2.5">
                      {[{ name: "Doble Cheddar", price: "+$800", selected: true }, { name: "Bacon Crujiente", price: "+$1.200", selected: true }, { name: "Huevo frito", price: "+$500", selected: false }].map((t, i) => (
                        <div key={i} className={`flex justify-between items-center p-3.5 rounded-2xl border transition-all ${t.selected ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 cursor-pointer'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded drop-shadow-sm flex items-center justify-center transition-colors ${t.selected ? 'bg-orange-500 text-white' : 'bg-white border-2 border-gray-300'}`}>
                              {t.selected && <CheckCircle2 size={14} />}
                            </div>
                            <span className={`font-bold text-sm ${t.selected ? 'text-orange-900' : 'text-gray-700'}`}>{t.name}</span>
                          </div>
                          <span className={`text-xs font-black ${t.selected ? 'text-orange-600' : 'text-gray-400'}`}>{t.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Flame size={14} /> Punto de Cocción</p>
                      <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Obligatorio</span>
                    </div>
                    <div className="flex gap-2.5">
                      {["Jugosa", "A punto", "Cocida"].map((opt, i) => (
                        <button key={i} className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition-all shadow-sm ${i === 1 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-[2.5rem]">
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">Total Calculado</span>
                  <span className="text-3xl font-black text-gray-900">$11.500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY A BASIC PAGE ISN'T ENOUGH (COMPARISON) --- */}
      <section className="py-32 bg-gray-900 border-t border-gray-800 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Una web básica <span className="text-red-500">ya no alcanza.</span></h2>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Cualquiera te hace una "paginita" para pedir. Pero sin inteligencia, sin datos y sin control real... es como tener un local sin caja registradora.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-[2.5rem] border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1.5fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg-gray-800/80 border-b border-gray-700">
                <div className="p-6 flex items-center">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Característica</span>
                </div>
                <div className="p-6 text-center border-l border-gray-700 flex flex-col items-center justify-center">
                  <span className="text-xs md:text-sm font-black text-red-400 uppercase tracking-widest">Página Básica</span>
                  <span className="text-[10px] text-gray-500 mt-1 font-medium hidden md:block">Catálogo Común</span>
                </div>
                <div className="p-6 text-center border-l border-orange-500/30 bg-orange-500/10 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
                  <span className="text-sm md:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 uppercase tracking-widest">Pedilo</span>
                  <span className="text-[10px] text-orange-200 mt-1 font-medium hidden md:block">Potencia Absoluta</span>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-700/50">
                {[
                  { feature: "Recibir pedidos por WhatsApp", basic: true, pedilo: true },
                  { feature: "Pipeline de cocina interactivo", basic: false, pedilo: true },
                  { feature: "Notificaciones Push + Alarma", basic: false, pedilo: true },
                  { feature: "Inteligencia de Upsell automática", basic: false, pedilo: true },
                  { feature: "Mapa de Calor por día y hora", basic: false, pedilo: true },
                  { feature: "Escáner Inteligente Barcode", basic: false, pedilo: true },
                  { feature: "Importación Masiva Excel", basic: false, pedilo: true },
                  { feature: "Toppings, Salsas y Extras combinados", basic: false, pedilo: true },
                  { feature: "Motor de Cupones y Descuentos", basic: false, pedilo: true },
                  { feature: "Modo Distribuidores Mayoristas (B2B)", basic: false, pedilo: true },
                  { feature: "Flyers y QRs listos para imprimir", basic: false, pedilo: true },
                  { feature: "Insignias de Confianza Automáticas", basic: false, pedilo: true }
                ].map((row, idx) => (
                  <div key={idx} className={`grid grid-cols-[1.5fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] transition-colors hover:bg-gray-700/30`}>
                    <div className="p-4 md:p-6 flex items-center">
                      <span className="text-sm md:text-base font-bold text-gray-300">{row.feature}</span>
                    </div>
                    <div className="p-4 md:p-6 flex items-center justify-center border-l border-gray-700">
                      {row.basic
                        ? <CheckCircle2 size={20} className="text-gray-500" />
                        : <XCircle size={20} className="text-red-500/50" />
                      }
                    </div>
                    <div className="p-4 md:p-6 flex items-center justify-center border-l border-orange-500/30 bg-orange-500/5 relative">
                      {row.pedilo && (
                        <>
                          <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay"></div>
                          <CheckCircle2 size={24} className="text-orange-400 relative z-10 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-12 text-xl text-gray-400 font-bold mb-4">
              Una simple página recibe pedidos. <span className="text-white">Pedilo hace crecer tu restaurante.</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- RETENTION & TRUST (QR + GAMIFICATION) --- */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-grid-slate-200/[0.04] bg-[bottom_center] inset-0" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* QR RETENTION */}
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center items-center md:items-start text-center md:text-left relative group hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>

              <div className="inline-block p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-sm border border-indigo-100 mb-8 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 relative z-10">
                <QrCode size={56} className="text-indigo-600" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight relative z-10 leading-[1.1]">Convertí la comida en clientes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">recurrentes.</span></h2>
              <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed relative z-10">
                Pedilo genera automáticamente <strong className="text-indigo-600 font-bold">Flyers y QRs</strong> hiper atractivos con tu marca, listos para imprimir. Pegalos en tus bolsas o ponelos en las mesas para que pidan solitos.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 relative z-10 w-full">
                <span className="px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2 transition-all hover:bg-gray-100"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> En la caja</span>
                <span className="px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2 transition-all hover:bg-gray-100"><div className="w-2 h-2 rounded-full bg-purple-500"></div> En la bolsa delivery</span>
                <span className="px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2 transition-all hover:bg-gray-100"><div className="w-2 h-2 rounded-full bg-pink-500"></div> En la mesa del local</span>
              </div>
            </div>

            {/* GAMIFICATION & BADGES */}
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center relative group hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>

              {/* Visual Mockup of Badge */}
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-xl border-b-[6px] border-b-gray-200 mx-auto w-full max-w-sm mb-12 transform rotate-2 group-hover:rotate-0 group-hover:-translate-y-2 transition-all duration-500 relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 shadow-inner"></div>
                  <div>
                    <div className="h-3 w-32 bg-gray-200 rounded-full mb-2"></div>
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 px-3 py-1.5 rounded-lg shadow-sm">
                      <BadgeCheck size={16} className="text-blue-600" />
                      <span className="text-[11px] font-black text-blue-800 uppercase tracking-widest">Verificado</span>
                    </div>
                  </div>
                </div>
                <div className="h-24 bg-gray-100/80 border border-gray-100 rounded-2xl w-full mb-6"></div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-900 p-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-center border border-yellow-200/60 shadow-sm flex items-center justify-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                  Super Vendedor
                </div>
              </div>

              <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 tracking-tight leading-[1.1]">Insignias que venden <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">por vos.</span></h2>
                <p className="text-lg text-gray-500 font-medium mb-6 leading-relaxed">
                  El sistema detecta tu buen desempeño (rapidez, sin cancelaciones) y te premia con insignias de <strong className="text-blue-600 font-bold">"Verificado"</strong> y <strong className="text-amber-600 font-bold">"Top Seller"</strong>.
                </p>
                <div className="bg-gradient-to-r from-blue-50/80 to-blue-50/30 border border-blue-100/80 rounded-2xl p-5 shadow-sm">
                  <p className="text-sm font-bold text-blue-900 leading-relaxed">
                    <span className="text-lg block mb-1">💡</span> Un negocio verificado convierte hasta un <strong className="font-black">40% más</strong> sus visitas en ventas porque genera confianza instantánea al consumidor.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">Respuestas claras, sin vueltas ni letra chica.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "¿Realmente es 0% de comisión?", a: "Sí. Pedilo cobra un plan fijo mensual, no un porcentaje de tus ventas. Si vendés $1 o $10 millones, el costo es el mismo. Tu ganancia es toda tuya, como debe ser." },
              { q: "¿Necesito saber de tecnología?", a: "Para nada. Si sabés usar WhatsApp, sabés usar Pedilo. Configurás tu negocio rápido y directo. Podés cargar productos con fotos o incluso escaneando el código de barras." },
              { q: "¿Mis clientes necesitan descargar una app?", a: "No, eso es del pasado. Tus clientes abren un link o escanean un QR y piden directo desde el navegador del celular. Sin registros pesados, sin barreras. Menos fricción significa más ventas." },
              { q: "¿Sirve para distribuidoras/mayoristas?", a: "Absolutamente sí. Pedilo tiene un Modo Mayorista nativo con listas de precios diferenciadas, mínimos de compra y venta por bulto/pack. Es una plataforma B2B premium pensada para este formato." },
              { q: "¿Puedo usar Pedilo junto con PedidosYa/Rappi?", a: "¡Esa es la estrategia híbrida! Usá las apps para que te conozcan nuevos clientes (gastas en marketing), y mandá un flyer/QR en la bolsa con cada pedido para que la próxima vez pidan directo por Pedilo. Así transformás un cliente caro en uno rentable." },
              { q: "¿Qué pasa con mis datos si me voy?", a: "Tus datos son 100% TUYOS. Tu base de clientes e información te pertenece. No hay contratos de permanencia ni trampas para retenerte." },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 hover:border-orange-300 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left group cursor-pointer border-none outline-none"
                >
                  <span className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors pr-4">{faq.q}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-orange-50 shrink-0 transition-colors ${openFaq === idx ? 'bg-orange-100 text-orange-600' : 'text-gray-400 group-hover:text-orange-600'}`}>
                    <ChevronRight size={24} className={`transition-all duration-300 ${openFaq === idx ? 'rotate-90' : ''}`} />
                  </div>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-gray-600 font-medium leading-relaxed border-t border-dashed border-gray-100 mt-2">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING ANCHOR & FINAL CTA --- */}
      <section className="py-32 px-4 text-center bg-gray-900 border-t border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
        <div className="max-w-4xl mx-auto relative z-10">

          {/* PRICING ANCHOR */}
          <div className="mb-16">
            <div className="inline-block bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:border-orange-500/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/50 via-gray-800/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-orange-400 font-bold text-xs tracking-[0.2em] uppercase mb-4">Suscripción Única</div>
                <div className="text-white font-black text-5xl md:text-7xl mb-4 flex items-center justify-center gap-3 tracking-tight">
                  $17.000<span className="text-xl md:text-2xl text-gray-500 font-bold self-end mb-2 tracking-normal">/mes</span>
                </div>
                <p className="text-gray-400 font-medium text-base md:text-lg max-w-sm mx-auto leading-relaxed">
                  Todo incluido. Sin comisiones por venta. Sin costos ocultos. Precio final.
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-bold mb-8 border border-orange-500/20 shadow-sm">
            <Zap size={16} /> Empezá hoy, vendé mañana
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">El momento de recuperar <br className="hidden md:block" />tu ganancia es ahora.</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-medium mb-16 max-w-3xl mx-auto leading-relaxed">
            Unite a los negocios que ya transformaron sus ventas por WhatsApp en un e-commerce automático y profesional.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black rounded-2xl text-xl hover:from-orange-500 hover:to-orange-400 hover:scale-[1.02] transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] flex items-center justify-center gap-3 tracking-wide"
            >
              Crear Tienda Gratis <ArrowRight size={24} />
            </button>
            <button
              onClick={() => window.open("/n/pedilo-oficial", "_blank", "noopener,noreferrer")}
              className="px-10 py-5 bg-gray-800 text-white font-bold rounded-2xl text-xl hover:bg-gray-700 border border-gray-700 transition-all flex items-center justify-center gap-2"
            >
              Ver Demo Interactiva
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400 font-bold mb-16">
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-orange-500" /> Sin tarjeta de crédito</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-orange-500" /> Cancelá cuando quieras</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-orange-500" /> Soporte humano real</span>
          </div>
        </div>
      </section>
    </div>
  );
}
