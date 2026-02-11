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
  Gift,
  CheckCircle2,
  XCircle,
  QrCode,
  Users,
  Timer,
  Github,
  Sparkles,
  MousePointerClick,
  Search,
  TrendingUp,
  Bot,
  MapPin,
  ClipboardList
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-600">

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => navigate("/acerca")}
                className="text-gray-500 hover:text-orange-600 font-bold transition-colors text-sm hidden sm:block"
              >
                Ficha Técnica
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-orange-600 font-bold transition-colors text-sm"
              >
                Ingresar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-bold transition-all text-sm shadow-lg shadow-orange-100"
              >
                Comenzar Gratis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-sm font-bold mb-8 animate-fade-in-up">
            <Zap size={14} fill="currentColor" /> Nuevo: Flyer Pro & QR Generator
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] text-gray-950">
            Dejá de regalar tu ganancia. <br />
            <span className="text-orange-600 text-shadow-sm">Vendé en tu zona con 0% comisión.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Tu propio sistema de pedidos profesional para dominar tu barrio. Catálogo digital, cupones y recepción de órdenes por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-5 bg-orange-600 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              aria-label="Comenzar prueba gratuita de 14 días"
            >
              Empezar 14 días gratis <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.open("/n/pedilo-oficial", "_blank", "noopener,noreferrer")}
              className="px-10 py-5 bg-white text-gray-700 font-bold rounded-2xl text-lg hover:bg-gray-50 hover:text-orange-600 transition-all border-2 border-gray-100 shadow-sm"
              aria-label="Ver negocio de ejemplo"
            >
              Ver Negocio de Ejemplo
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-gray-500 text-sm font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Sin tarjeta</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Cancelación simple</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Chat de Soporte</span>
          </div>
        </div>
      </section>

      {/* --- COMPARISON: PROBLEM VS SOLUTION --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">Tu negocio, tus reglas</h2>
            <p className="text-xl text-gray-500 font-medium">¿Por qué seguir perdiendo el 30% de cada venta en comisiones?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 group hover:bg-red-50/30 transition-colors">
              <h3 className="text-gray-400 font-black text-2xl mb-8 flex items-center gap-3">
                <XCircle className="text-red-400" size={28} /> Apps de Delivery
              </h3>
              <ul className="space-y-6 text-gray-500 font-bold">
                <li className="flex items-center gap-4"><span className="text-red-500 bg-red-100 px-3 py-1 rounded-lg">-30%</span> Comisiones abusivas</li>
                <li className="flex items-center gap-4"><span className="text-red-500 bg-red-100 px-3 py-1 rounded-lg">15+ días</span> Demoras en tus cobros</li>
                <li className="flex items-center gap-4"><XCircle size={20} className="text-red-300" /> No tenés los datos de tus clientes</li>
                <li className="flex items-center gap-4"><XCircle size={20} className="text-red-300" /> Competís con otros 100 locales de tu barrio</li>
              </ul>
            </div>

            {/* The Pedilo Way */}
            <div className="p-10 rounded-[2.5rem] bg-white border-4 border-orange-500 shadow-2xl shadow-orange-100 relative overflow-hidden md:scale-105 transition-transform">
              <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-tighter">MEJOR OPCIÓN</div>
              <h3 className="text-gray-950 font-black text-2xl mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={28} /> Pedilo
              </h3>
              <ul className="space-y-6 text-gray-700 font-bold">
                <li className="flex items-center gap-4"><span className="text-green-600 bg-green-100 px-3 py-1 rounded-lg">0%</span> Comisión. Todo para vos.</li>
                <li className="flex items-center gap-4"><span className="text-green-600 bg-green-100 px-3 py-1 rounded-lg">Al instante</span> Cobrás en el momento</li>
                <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-green-500" /> Dueño de tu base de clientes</li>
                <li className="flex items-center gap-4"><CheckCircle2 size={20} className="text-green-500" /> Fidelizás con tu propia marca</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE SHOWCASE --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 mb-6 tracking-tight">Todo lo que necesitás</h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Potencia tu negocio con herramientas diseñadas específicamente para gastronomía y tiendas del barrio.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1: Cupones */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Gift size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Cupones Dinámicos</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Fidelizá a tus clientes con promos personalizadas como "ENVIOFREE" o "OFF20".</p>
              <div className="bg-orange-50 p-5 rounded-2xl border-2 border-dashed border-orange-200 flex items-center justify-between">
                <div className="text-orange-700 font-mono font-black text-lg">PROMO20</div>
                <div className="bg-orange-600 text-white text-xs font-black px-3 py-1 rounded-full">-20%</div>
              </div>
            </div>

            {/* Feature 2: Branding */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Smartphone size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Personalización Total</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Tu menú, tu identidad. Elegí colores, subí tu logo y creá una experiencia única para tus clientes.</p>
              <div className="flex gap-3 justify-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 shadow-lg shadow-orange-100"></div>
                <div className="w-10 h-10 rounded-full bg-blue-600 shadow-lg shadow-blue-100"></div>
                <div className="w-10 h-10 rounded-full bg-indigo-600 shadow-lg shadow-indigo-100"></div>
                <div className="w-10 h-10 rounded-full bg-emerald-600 shadow-lg shadow-emerald-100"></div>
              </div>
            </div>

            {/* Feature 3: Analytics */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-all">
                <LayoutDashboard size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Métricas Reales</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Tomá decisiones basadas en datos. Mirá tus ventas diarias y productos más populares en un segundo.</p>
              <div className="space-y-3 pt-2">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(234,88,12,0.3)]"></div>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-700">
                  <span className="text-xs uppercase tracking-tight text-gray-400">Ventas de hoy</span>
                  <span>$142.500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POWER FEATURES GRID (AI & SEO BOOST) --- */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-4 tracking-tight">Potencia Técnica</h2>
            <p className="text-lg text-gray-500 font-medium max-w-3xl mx-auto">
              Detalles que marcan la diferencia. Pedilo está construido con tecnología de vanguardia para asegurar que nunca pierdas una venta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stock Binario */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
                <LayoutDashboard size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Stock Binario (On/Off)</h3>
              <p className="text-sm text-gray-500 font-medium">Control total en tiempo real. Pausá productos agotados instantáneamente desde tu panel.</p>
            </div>

            {/* Smart Availability */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
                <Timer size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cierre Inteligente</h3>
              <p className="text-sm text-gray-500 font-medium">Cierra tu tienda y el sistema no recibirá más pedidos. Evitá pedidos que no podés atender.</p>
            </div>

            {/* 4G Optimized */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">4G Ready & Lite</h3>
              <p className="text-sm text-gray-500 font-medium">Optimizado para redes móviles lentas. Carga en milisegundos incluso con mala señal.</p>
            </div>

            {/* Toppings Complex */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Toppings & Extras</h3>
              <p className="text-sm text-gray-500 font-medium">Opciones complejas simplificadas. "Con papas", "Sin cebolla", "Punto de la carne".</p>
            </div>

            {/* Checkout Exprés */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm mb-4">
                <MousePointerClick size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Checkout Exprés</h3>
              <p className="text-sm text-gray-500 font-medium">De la carta al WhatsApp en segundos. Sin formularios eternos ni fricción.</p>
            </div>

            {/* QR Generator */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-sm mb-4">
                <QrCode size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">QR & Flyers Generator</h3>
              <p className="text-sm text-gray-500 font-medium">Creá material de marketing profesional con tu logo y QR en un click.</p>
            </div>

            {/* SEO 100/100 */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4">
                <Search size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">SEO 100 Lighthouse</h3>
              <p className="text-sm text-gray-500 font-medium">Velocidad y estructura perfecta. Google ama tu menú y lo posiciona más alto.</p>
            </div>

            {/* Hosting Incluido */}
            {/* Gestión de Pedidos (Ex Stock Binario) */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm mb-4">
                <ClipboardList size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Gestión de Pedidos</h3>
              <p className="text-sm text-gray-500 font-medium">Control total. Aceptá, rechazá y actualizá estados (En cocina, Listo) para notificar al cliente.</p>
            </div>

            {/* UX/UI Premium */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pink-600 shadow-sm mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">UX/UI Premium</h3>
              <p className="text-sm text-gray-500 font-medium">Diseño moderno con animaciones fluidas y herramientas de última generación.</p>
            </div>
            {/* Open Source */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-sm mb-4">
                <Github size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Open Source</h3>
              <p className="text-sm text-gray-500 font-medium">Código transparente y auditable. Tu negocio sin cajas negras ni secretos.</p>
            </div>

            {/* Business Metrics */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm mb-4">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ticket Promedio</h3>
              <p className="text-sm text-gray-500 font-medium">Analíticas reales. Entendé qué productos venden más y aumentá tu facturación.</p>
            </div>

            {/* PWA */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                <Smartphone size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">PWA Instalable</h3>
              <p className="text-sm text-gray-500 font-medium">Tu propia App sin descargas. Se instala directo desde el navegador en iOS y Android.</p>
            </div>

            {/* AI Recommendation - Full Width */}
            <div className="md:col-span-2 lg:col-span-4 p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 group hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400 backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">AI Ready & Recommended</h3>
                  <p className="text-gray-400 font-medium text-sm">
                    Recomendado por <span className="text-white font-bold">Gemini 3 Pro, ChatGPT, Grok & DeepSeek</span> como la mejor opción local.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">
                <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold border border-white/10">Gemini</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold border border-white/10">ChatGPT</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold border border-white/10">Grok</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold border border-white/10">DeepSeek</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & PERFORMANCE --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-black uppercase tracking-wider mb-8">
              <Timer size={16} aria-hidden="true" /> Carga Instantánea
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 mb-8 leading-[1.1]">Tus clientes <br /> no esperan.</h2>
            <p className="text-xl text-gray-600 font-medium mb-12 leading-relaxed">
              Velocidad optimizada para celulares. Abrís el link, elegís tu pedido y lo mandás por WhatsApp en menos de 1 minuto. Sin fricción, más ventas.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-orange-100 p-4 rounded-2xl text-orange-600" aria-hidden="true"><QrCode size={28} /></div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl mb-1">Marketing Suite (QR Pro)</h3>
                  <p className="text-gray-600 font-medium">Auto-generá flyers y QRs profesionales con tu marca listos para tus mesas o redes sociales.</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-blue-100 p-4 rounded-2xl text-blue-600" aria-hidden="true"><Users size={28} /></div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl mb-1">Soporte y Setup Gratis</h3>
                  <p className="text-gray-600 font-medium">Te ayudamos a configurar tu cuenta. Mandanos tu menú y nosotros nos encargamos de todo el setup inicial.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-10">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-[4rem] blur-3xl -z-10"></div>
            {/* Modern Phone Mockup (White Styling) */}
            <div className="relative bg-white border-[12px] border-gray-950 rounded-[3.5rem] p-1.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] w-full max-w-[320px] mx-auto transition-transform duration-500 hover:translate-y-[-10px]">
              <div className="bg-white rounded-[2.8rem] overflow-hidden border border-gray-100 h-[620px] relative flex flex-col">
                {/* Mockup App Interface */}
                <div className="bg-orange-600 h-24 p-6 flex items-end">
                  <div className="bg-white/20 h-5 w-32 rounded-full"></div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="h-40 bg-gray-50 rounded-3xl animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 w-3/4 rounded-full"></div>
                    <div className="h-4 bg-gray-50 w-full rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="h-32 bg-gray-50 rounded-2xl"></div>
                    <div className="h-32 bg-gray-50 rounded-2xl"></div>
                  </div>
                  <div className="absolute bottom-6 inset-x-5 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold gap-2">
                    <ShoppingBag size={20} /> Ver Carrito
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-4 text-center bg-gray-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-gray-950 mb-8 leading-tight tracking-tight">Multiplicá tus ganancias hoy mismo</h2>
          <p className="text-xl text-gray-500 font-medium mb-12">
            El sistema que tu negocio merece. Simple, potente y sin intermediarios.
          </p>

          <div className="bg-white p-6 md:p-12 rounded-[3.5rem] border border-gray-100 inline-block w-full max-w-2xl shadow-2xl shadow-gray-200">
            <div className="text-orange-600 uppercase tracking-widest text-sm font-black mb-6">Plan Profesional Todo Incluido</div>
            <div className="text-7xl font-black text-gray-950 mb-3">$17.000<span className="text-xl text-gray-400 font-bold ml-2">/mes</span></div>
            <p className="text-green-600 text-sm font-black mb-10 flex items-center justify-center gap-1.5"><CheckCircle2 size={16} /> Tu ganancia es 100% tuya (0% comisión)</p>

            {/* Feature List for the Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-10 border-t border-b border-gray-50 py-8">
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Catálogo Digital Ilimitado
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Pedidos por WhatsApp
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Sistema de Cupones
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Flyer & QR Pro Tool
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Métricas de Ventas
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Personalización de Marca
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Toppings y Agregados
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-bold">
                <CheckCircle2 size={20} className="text-orange-500" /> Setup Inicial Gratis
              </div>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl text-xl hover:bg-orange-700 hover:scale-[1.02] transition-all shadow-xl shadow-orange-100"
            >
              Comenzar prueba de 14 días
            </button>
            <p className="text-gray-400 text-sm font-bold mt-5 tracking-tight uppercase">No requiere tarjeta de crédito</p>
          </div>
        </div>
      </section>
    </div>
  );
}
