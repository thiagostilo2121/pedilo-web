import { useNavigate, Link } from "react-router-dom";
import {
  Store,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Smartphone,
  CreditCard,
  Menu,
  X,
  Zap,
  Users
} from "lucide-react";
import { useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Landing() {
  const navigate = useNavigate();
  useDocumentTitle("Pedilo - Tu Negocio Profesional");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 w-full overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Pedilo<span className="text-orange-600">.</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Características
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Cómo Funciona
              </a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Planes
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-2"
              >
                Ingresar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm shadow-sm"
              >
                Crear Tienda
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#features" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Características
              </a>
              <a href="#how-it-works" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Cómo Funciona
              </a>
              <a href="#pricing" onClick={toggleMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                Planes
              </a>
              <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col gap-3 px-3">
                <button
                  onClick={() => { toggleMenu(); navigate("/login"); }}
                  className="w-full bg-gray-50 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200"
                >
                  Ingresar
                </button>
                <button
                  onClick={() => { toggleMenu(); navigate("/register"); }}
                  className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-sm"
                >
                  Crear Tienda
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="pt-[72px]">
        
        {/* === HERO SECTION === */}
        <section className="px-4 py-16 md:py-24 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                Tu plataforma de pedidos <span className="text-orange-600">profesional y fácil.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-normal mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Recibí pedidos por WhatsApp sin comisiones, gestioná tu catálogo y profesionalizá tu negocio en menos de 5 minutos.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-lg"
                >
                  Crear mi Tienda <ArrowRight size={20} />
                </button>
                <a
                  href="/n/pedilo-oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-gray-700 font-medium px-8 py-3.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Store size={20} className="text-gray-500" /> Ver Demo
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 size={16} className="text-green-600" /> Sin tarjeta de crédito requerida.
              </p>
            </div>

            {/* Sub-Hero Image / Illustration Mockup */}
            <div className="flex-1 w-full max-w-lg lg:max-w-full">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-2 sm:p-4 aspect-[4/3] flex flex-col relative overflow-hidden">
                <div className="bg-gray-100 rounded-t-xl h-8 flex items-center px-4 gap-2 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-b-xl flex items-center justify-center" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
                    alt="Restaurante usando tablet"
                    className="w-full h-full object-cover rounded-b-lg opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-orange-900/10 rounded-b-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === BRAND / SOCIAL PROOF / TRUST === */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Razones para elegirnos
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 text-gray-700 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-orange-600 w-5 h-5" /> 0% Comisiones en ventas</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-orange-600 w-5 h-5" /> Control total de tus clientes</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-orange-600 w-5 h-5" /> Carga rápida de productos</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-orange-600 w-5 h-5" /> Soporte humano</div>
            </div>
          </div>
        </section>

        {/* === FEATURES SECTION === */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Todo lo que necesitás para potenciar tu venta</h2>
              <p className="text-lg text-gray-600">Herramientas profesionales diseñadas para organizar el caos y aumentar tus ingresos sin depender de intermediarios.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tu Tienda Móvil</h3>
                <p className="text-gray-600 leading-relaxed">
                  Catálogo optimizado para celulares. Tus clientes ven tus productos, eligen y te envían el pedido ordenado por WhatsApp sin descargar apps.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Orden Automático</h3>
                <p className="text-gray-600 leading-relaxed">
                  Olvidate de descifrar audios largos. Recibís un mensaje estandarizado con todos los detalles del pedido, listo para preparar y cobrar.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Gestión de Stock</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pausá productos que no tenés en el momento. Controlá la disponibilidad y precios en tiempo real desde tu propio dashboard.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pagos Flexibles</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ofrecé pago en efectivo, transferencia o integrá tu alias. Vos decidís cómo cobrar sin que la plataforma retenga tu dinero.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Horarios Comerciales</h3>
                <p className="text-gray-600 leading-relaxed">
                  La tienda se abre y se cierra automáticamente según tus horarios de atención. Evitá rechazar pedidos fuera de tu turno.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Seguridad y Confianza</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mantén tu propia base de clientes y datos protegidos en la nube. Tu información es solo tuya y de nadie más.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Empezar es así de simple</h2>
              <p className="text-lg text-gray-600">Tres pasos para transformar tu canal de ventas.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>

              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-white border-2 border-orange-600 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 relative">
                  <span className="bg-white px-2">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Creá tu cuenta</h3>
                <p className="text-gray-600">Registrate gratis y personalizá los datos y logo de tu negocio en minutos.</p>
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-white border-2 border-orange-600 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 relative">
                  <span className="bg-white px-2">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Subí tu menú</h3>
                <p className="text-gray-600">Agregá tus productos, precios y categorías. Activá los medios de pago que prefieras.</p>
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 bg-white border-2 border-orange-600 rounded-full flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 relative">
                  <span className="bg-white px-2">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Compartí el link</h3>
                <p className="text-gray-600">Poné tu link en Instagram, Google o WhatsApp y empezá a recibir pedidos estructurados.</p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3.5 rounded-lg shadow-md transition-colors"
              >
                Comenzar Ahora Mismo
              </button>
            </div>
          </div>
        </section>

        {/* === PRICING === */}
        <section id="pricing" className="py-20 bg-gray-50 border-y border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Planes claros, sin sorpresas</h2>
              <p className="text-lg text-gray-600">Elegí la opción que mejor se adapte a tu etapa de crecimiento.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Basic Plan */}
              <div className="bg-white border flex flex-col border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Emprendedor</h3>
                  <div className="flex items-baseline gap-1 text-gray-900">
                    <span className="text-4xl font-bold">$18.000</span>
                    <span className="text-gray-500 font-medium">/mes</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Para negocios que buscan organizarse.</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Productos ilimitados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Recepción de pedidos por WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gestión de horarios básicos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Personalización de marca básica</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full py-3 rounded-lg border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Empezar Básico
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-900 border flex flex-col border-gray-800 rounded-2xl p-8 shadow-xl relative">
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Más elegido
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Comercial Pro</h3>
                  <div className="flex items-baseline gap-1 text-white">
                    <span className="text-4xl font-bold">$27.000</span>
                    <span className="text-gray-400 font-medium">/mes</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Para volumen de ventas y profesionalismo.</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200">Todo lo del plan Emprendedor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200">Gestión avanzada de variaciones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200">Importación masiva Excel/CSV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200">Estadísticas e Inteligencia de ventas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200">Integraciones API (Próximamente)</span>
                  </li>
                </ul>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-colors shadow-md"
                >
                  Probar Comercial Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* === FINAL CTA SECTION === */}
        <section className="py-24 bg-orange-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Listos para transformar tu atención al cliente</h2>
            <p className="text-xl text-orange-100 mb-10 font-medium">
              Eliminá el desorden de mensajes. Crecé con Pedilo hoy mismo. Cero porcentaje de comisión.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-orange-600 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Crear mi Tienda <Zap size={20} />
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
