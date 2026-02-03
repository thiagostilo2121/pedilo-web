import { useNavigate } from "react-router-dom";
import { Check, Zap, Shield, Star } from "lucide-react";

export default function Planes() {
  const navigate = useNavigate();

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
              onClick={() => navigate("/pago-checkout")} // Aquí irá tu futura pasarela
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-[0.98]"
            >
              Suscribirme ahora
            </button>
            <p className="mt-6 text-gray-400 text-xs font-medium">Pagas hoy, configurás tu negocio en 1 minuto.</p>
          </div>
        </div>
      </div>
    </div>
  );
}