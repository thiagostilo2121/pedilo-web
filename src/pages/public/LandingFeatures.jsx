import { useState } from "react";
import { 
  BrainCircuit, DollarSign, Sparkles, TrendingUp, Users, Target, Activity, Percent, Zap, ArrowRight,
  ShieldCheck, CheckCircle2, FileSpreadsheet, Package, ScanBarcode, Upload, Cherry, Flame,
  LayoutDashboard, Bell, ChefHat, HandPlatter, Lightbulb, Crown, XCircle, ChevronRight
} from "lucide-react";

export default function LandingFeatures() {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: "autopilot",
      icon: <BrainCircuit size={24} />,
      title: "Autopilot con Inteligencia Artificial",
      desc: "Dejá que Pedilo te sugiera promos, detecte anomalías y rescate clientes en riesgo.",
      color: "violet"
    },
    {
      id: "roi",
      icon: <DollarSign size={24} />,
      title: "Calculadora de Ganancias",
      desc: "Descubrí cuánto dinero estás perdiendo con las Apps de delivery actuales.",
      color: "emerald"
    },
    {
      id: "mayorista",
      icon: <Package size={24} />,
      title: "Venta Mayorista (B2B)",
      desc: "Listas de precios, mínimos de compra y venta por bulto sin usar Excel.",
      color: "blue"
    },
    {
      id: "operacion",
      icon: <LayoutDashboard size={24} />,
      title: "Centro de Comando en Vivo",
      desc: "Pipeline interactivo, alertas sonoras y notificaciones push para tu cocina.",
      color: "orange"
    },
    {
      id: "catalogo",
      icon: <ScanBarcode size={24} />,
      title: "Armado de Catálogo Ultra Rápido",
      desc: "Importación masiva por Excel o escaneando el código de barras (EAN).",
      color: "rose"
    },
    {
      id: "extras",
      icon: <Cherry size={24} />,
      title: "Opciones y Agregados",
      desc: "Tus clientes pueden personalizar su pedido con extras, salsas y puntos de cocción.",
      color: "amber"
    }
  ];

  const renderModalContent = () => {
    switch(activeFeature) {
      case "autopilot":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-violet-600 mb-4">Autopilot — El Cerebro de tu Negocio</h3>
            <p className="text-gray-600 font-medium">Autopilot analiza tus pedidos en tiempo real y te da recomendaciones precisas para ganar más plata.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                <Target size={20} className="text-violet-600 mb-2" />
                <h4 className="font-bold text-gray-900 text-sm">Motor de Promos</h4>
                <p className="text-xs text-gray-500 mt-1">Te sugiere cupones para productos que cayeron en ventas.</p>
              </div>
              <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                <Users size={20} className="text-violet-600 mb-2" />
                <h4 className="font-bold text-gray-900 text-sm">Clientes en Riesgo</h4>
                <p className="text-xs text-gray-500 mt-1">Detecta quién dejó de comprar y te arma el mensaje de reenganche.</p>
              </div>
              <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                <Activity size={20} className="text-violet-600 mb-2" />
                <h4 className="font-bold text-gray-900 text-sm">Alertas Tempranas</h4>
                <p className="text-xs text-gray-500 mt-1">Si tus ventas de hoy caen abruptamente, te avisa al instante.</p>
              </div>
              <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                <Sparkles size={20} className="text-violet-600 mb-2" />
                <h4 className="font-bold text-gray-900 text-sm">Detector de Combos</h4>
                <p className="text-xs text-gray-500 mt-1">Analiza qué suelen comprar junto y te sugiere armar un combo.</p>
              </div>
            </div>
          </div>
        );
      case "roi":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-emerald-600 mb-4">La Verdad sobre las Comisiones</h3>
            <div className="bg-gray-900 p-6 rounded-2xl text-white">
              <p className="text-gray-300 mb-4">Si vendés $1.000.000 por mes a través de una App (que te cobra el 30%):</p>
              <div className="flex items-center gap-4 text-rose-400 font-bold mb-4 border-b border-gray-700 pb-4">
                <XCircle size={20} /> Perdida mensual: -$300.000
              </div>
              <div className="flex items-center gap-4 text-emerald-400 font-black text-xl">
                <CheckCircle2 size={24} /> Ahorro anual con Pedilo: $3.384.000
              </div>
              <p className="text-xs text-gray-500 mt-4">*Calculado restando el valor del plan Pro de Pedilo ($55k/mes).</p>
            </div>
            <p className="text-gray-600 font-medium">No trabajes para las Apps. Usalas para captar clientes nuevos, enviá un flyer en tu paquete, y fidelizalos para que la próxima compra sea directo por Pedilo (0% comisión).</p>
          </div>
        );
      case "mayorista":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-blue-600 mb-4">Funciones B2B (Mayoristas)</h3>
            <p className="text-gray-600 font-medium">Especial para fábricas, distribuidoras y venta por volumen. Chau PDFs desactualizados.</p>
            <ul className="space-y-4 mt-6">
              <li className="flex gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> 
                Listas de precios separadas (Minorista vs Mayorista).
              </li>
              <li className="flex gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> 
                Establecer Monto Mínimo de Compra (Ej: Sólo compras mayores a $50.000).
              </li>
              <li className="flex gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> 
                Configurar Venta por Bulto Cerrado (Ej: Pack x12 unidades mínimo).
              </li>
              <li className="flex gap-3 text-sm text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> 
                Barra de progreso en vivo indicando cuánto falta para llegar al mínimo.
              </li>
            </ul>
          </div>
        );
      case "operacion":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-orange-600 mb-4">Centro de Comando Interactivo</h3>
            <p className="text-gray-600 font-medium">Tu cocina organizada al máximo. Pedilo incluye un dashboard optimizado para trabajar bajo presión.</p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Bell size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Alarma Invasiva</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Suena fuerte hasta que aceptas el pedido. Imposible que se pase.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><LayoutDashboard size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Pipeline Kanban</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Mové el pedido de "Nuevo" a "Aceptado", "Cocinando" y "Listo".</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-lg text-green-600"><Zap size={20} /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Notificaciones Automáticas</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Le avisa al cliente por WhatsApp cuando su pedido sale de la cocina.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "catalogo":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-rose-600 mb-4">Configuración a la Velocidad de la Luz</h3>
            <p className="text-gray-600 font-medium">Sabemos que cargar productos da fiaca. Por eso hicimos herramientas para que lo resuelvas en minutos.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                <ScanBarcode size={24} className="text-rose-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Escáner de Código de Barras</h4>
                <p className="text-sm text-gray-600">Usá la cámara de tu celular para escanear el código del producto (EAN). Pedilo busca en una base mundial y te llena el nombre, descripción y foto solo.</p>
              </div>
              <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                <Upload size={24} className="text-rose-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Importación desde Excel</h4>
                <p className="text-sm text-gray-600">¿Ya tenés un Excel con tus 1000 productos? Subilo, mapeá las columnas y en 5 segundos tenés todo tu catálogo online.</p>
              </div>
            </div>
          </div>
        );
      case "extras":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-amber-600 mb-4">Modificadores Interminables</h3>
            <p className="text-gray-600 font-medium">Tus clientes piden exactamente lo que quieren sin tener que escribirlo. Vos configurás "Grupos de Modificadores" y Pedilo se encarga de la interfaz y de sumar el precio.</p>
            
            <div className="border border-gray-200 rounded-2xl p-4 mt-6 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900 text-sm">Punto de la Carne</span>
                <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded uppercase">Obligatorio</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-gray-100 text-gray-500 text-xs py-1.5 px-3 rounded flex-1 text-center font-bold">Jugosa</div>
                <div className="bg-gray-800 text-white text-xs py-1.5 px-3 rounded flex-1 text-center font-bold shadow-sm">A Punto</div>
                <div className="bg-gray-100 text-gray-500 text-xs py-1.5 px-3 rounded flex-1 text-center font-bold">Cocida</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 mt-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900 text-sm">Agregá Salsas</span>
                <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded uppercase">Elige hasta 2</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-amber-50 border border-amber-200 p-2 rounded text-sm">
                  <span className="font-bold text-amber-900">Mayonesa Casera</span>
                  <span className="text-amber-600 font-bold">+$500</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-2 rounded text-sm">
                  <span className="font-bold text-gray-600">Salsa Cheddar</span>
                  <span className="text-gray-400 font-bold">+$800</span>
                </div>
              </div>
            </div>
            
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden" id="funciones">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Potencia absoluta, <span className="text-orange-600">sin letra chica.</span></h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Pedilo no es solo un menú virtual. Es un ecosistema completo diseñado para aumentar tu facturación y automatizar lo aburrido. Explorá todo lo que incluye.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              onClick={() => setActiveFeature(feature.id)}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 hover:shadow-xl hover:border-orange-300 transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors text-${feature.color}-600 bg-${feature.color}-50 group-hover:bg-${feature.color}-600 group-hover:text-white`}>
                {feature.icon}
              </div>
              <h3 className="font-black text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Ver detalles <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setActiveFeature(null)}
          ></div>
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up border border-gray-100">
            <button 
              onClick={() => setActiveFeature(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full flex items-center justify-center transition-colors font-bold z-20"
            >
              ✕
            </button>
            <div className="p-8 md:p-12">
              {renderModalContent()}
              <div className="mt-10 max-w-xs mx-auto">
                <button 
                  onClick={() => { setActiveFeature(null); window.location.href = '#planes' }}
                  className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Increíble, ver planes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
