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
  Percent,
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
import { getDemoStats } from "../../services/publicStatsService";
import LandingFeatures from "./LandingFeatures";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Landing() {
  const navigate = useNavigate();
  useDocumentTitle("Catálogo Online para tu Negocio");
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
  const pediloCost = 18000;
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

      <LandingFeatures />

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

          {/* DOS PLANES */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
            {/* PLAN BASICO */}
            <div className="w-full lg:w-1/2 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 hover:border-orange-500/30 transition-all duration-300 flex flex-col items-center">
              <div className="text-gray-400 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-center">Plan Básico</div>
              <div className="text-white font-black text-5xl md:text-6xl mb-4 flex items-center justify-center gap-2 tracking-tight">
                $18.000<span className="text-lg md:text-xl text-gray-500 font-bold self-end mb-1 tracking-normal">/mes</span>
              </div>
              <p className="text-gray-400 font-medium text-sm md:text-base mb-8 text-center px-4">
                El motor para recibir pedidos sin regalar comisiones. Ideal para arrancar fuerte.
              </p>
              <ul className="space-y-4 text-left w-full max-w-[320px] mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-200 font-medium"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Resto Web (0% Comisiones)</li>
                <li className="flex items-center gap-3 text-gray-200 font-medium"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Pedidos Ilimitados en WhatsApp</li>
                <li className="flex items-center gap-3 text-gray-200 font-medium"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Modificadores Integrados (Toppings)</li>
                <li className="flex items-center gap-3 text-gray-200 font-medium"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Comando Inteligente Básico</li>
                <li className="flex items-center gap-3 text-gray-200 font-medium"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Importación Masiva Barcode/Excel</li>
              </ul>
              <button onClick={() => navigate("/register")} className="w-full py-4 rounded-2xl bg-gray-700/80 hover:bg-gray-600 text-white font-bold transition-all shadow-md active:scale-95 border border-gray-600">
                Elegir Básico
              </button>
            </div>

            {/* PLAN PRO */}
            <div className="w-full lg:w-1/2 bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-xl border-2 border-orange-500/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_80px_-15px_rgba(234,88,12,0.4)] transition-all duration-300 relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-400 via-rose-500 to-purple-500"></div>
              <div className="absolute top-8 right-8 bg-orange-500/10 border border-orange-500/50 text-orange-400 px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-full z-10">
                Recomendado
              </div>
              <div className="text-orange-400 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-center mt-2">Plan Pro</div>
              <div className="text-white font-black text-5xl md:text-6xl mb-2 flex items-center justify-center gap-2 tracking-tight relative z-10">
                $55.000<span className="text-lg md:text-xl text-gray-500 font-bold self-end mb-1 tracking-normal">/mes</span>
              </div>
              <div className="text-green-400 font-bold text-[11px] md:text-xs mb-6 flex items-center gap-1 justify-center bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20"><Sparkles size={14} /> 14 Días de Prueba Gratis</div>
              <p className="text-gray-300 font-medium text-sm md:text-base mb-8 text-center px-4 relative z-10">
                El ecosistema completo con Inteligencia Artificial para escalar facturación sin límites.
              </p>
              <ul className="space-y-4 text-left w-full max-w-[320px] mb-8 flex-1 relative z-10">
                <li className="flex items-center gap-3 text-gray-400 font-medium italic"><CheckCircle2 size={20} className="text-gray-600 shrink-0" /> Todo lo del plan Básico, más:</li>
                <li className="flex items-center gap-3 text-white font-bold"><BrainCircuit size={20} className="text-violet-400 shrink-0" /> Autopilot (Motor de Promos IA)</li>
                <li className="flex items-center gap-3 text-white font-bold"><Target size={20} className="text-blue-400 shrink-0" /> Inteligencia de Carrito y Upsells</li>
                <li className="flex items-center gap-3 text-white font-bold"><Flame size={20} className="text-orange-400 shrink-0" /> Mapa de Calor de Demanda</li>
                <li className="flex items-center gap-3 text-white font-bold"><Truck size={20} className="text-green-400 shrink-0" /> Modo B2B Expandido (Mayorista)</li>
              </ul>
              <button onClick={() => navigate("/register")} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-black hover:from-orange-500 hover:to-rose-500 transition-all shadow-lg shadow-orange-500/30 active:scale-95 text-base md:text-lg border-b-4 border-rose-700 hover:border-b-0 hover:translate-y-1 relative z-10">
                Probar Gratis (14 Días)
              </button>
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
