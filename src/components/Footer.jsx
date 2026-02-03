import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Columna 1: Marca y Propuesta */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/favicons/favicon2.png" // Simplificado: la carpeta public se sirve desde la raíz
              alt="Pedilo Logo"
              className="w-10 h-10 object-contain bg-white rounded-lg p-1"
            />
            <span className="text-2xl font-bold text-white tracking-tight">Pedilo</span>
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            Potenciamos negocios locales con pedidos directos, sin intermediarios y 100% libres de comisiones.
          </p>
        </div>

        {/* Columna 2: Segmentos (Escalabilidad) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">Soluciones</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <span className="opacity-80">Comida Rápida</span>
            <span className="opacity-50 italic">Heladerías (Próximamente)</span>
            <span className="opacity-50 italic">Cafeterías (Próximamente)</span>
          </nav>
        </div>

        {/* Columna 3: Navegación Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">Soporte y Legal</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/terminos" className="hover:text-white hover:translate-x-1 transition-all">
              Términos y condiciones
            </Link>
            <Link to="/privacidad" className="hover:text-white hover:translate-x-1 transition-all">
              Política de privacidad
            </Link>
            <Link to="/contacto" className="hover:text-white hover:translate-x-1 transition-all font-medium text-white">
              Contacto / Ayuda
            </Link>
          </nav>
        </div>

        {/* Columna 4: Seguridad y Proceso */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs text-orange-200">Seguridad del Pedido</h4>
          <div className="bg-orange-700/40 p-3 rounded-lg border border-orange-400/20">
            <p className="text-xs leading-normal text-orange-50">
              <strong>Validación necesaria:</strong> Para procesar tu pedido, es indispensable contactar al negocio vía WhatsApp. 
              <span className="block mt-2 font-semibold text-white">
                Los comercios están autorizados a rechazar pedidos sin confirmación por mensaje por razones de seguridad.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-orange-500 bg-orange-700/30 py-6 text-center text-sm">
        <p className="text-orange-100">
          © {new Date().getFullYear()} Pedilo. Hecho para impulsar el comercio local.
        </p>
      </div>
    </footer>
  );
}