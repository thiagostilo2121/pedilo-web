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

import { Link, useNavigate } from "react-router-dom";
import { Github, LogOut } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <footer className="bg-orange-600 text-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Columna 1: Marca y Propuesta */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/favicons/favicon2.png"
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

      {/* Barra inferior con créditos */}
      <div className="border-t border-orange-500 bg-orange-700/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-orange-100 text-sm">
            © {new Date().getFullYear()} Pedilo. Hecho para impulsar el comercio local.
          </p>
          <div className="flex items-center gap-6 text-sm">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </button>
            )}
            <a
              href="https://github.com/thiagostilo2121"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">@thiagostilo2121</span>
            </a>
            <a
              href="https://github.com/thiagostilo2121/pedilo-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-200 hover:text-white transition-colors"
            >
              Frontend
            </a>
            <a
              href="https://github.com/thiagostilo2121/pedilo-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-200 hover:text-white transition-colors"
            >
              Backend
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}