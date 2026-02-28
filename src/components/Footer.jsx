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
import { Github, LogOut, Instagram } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <footer className="py-20 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 text-center">
      <div className="mb-10 text-2xl font-black text-gray-900 dark:text-zinc-100">Pedilo<span className="text-orange-600">.</span></div>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10 font-bold text-gray-500 dark:text-zinc-400">
        <button onClick={() => navigate("/terminos")} className="hover:text-orange-600">Términos del Servicio</button>
        <button onClick={() => navigate("/privacidad")} className="hover:text-orange-600">Política de Privacidad</button>
        <button onClick={() => navigate("/acerca")} className="hover:text-orange-600">Ficha Técnica</button>
        <a href="https://web.whatsapp.com/send/?phone=1123860316&text=Hola,%20quisiera%20contactarlos%20por%20soporte%20de%20Pedilo" className="hover:text-orange-600">Contacto</a>
        <div className="flex items-center gap-6">
          <a href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 text-green-600 font-black flex items-center gap-2">
            Canal de Novedades
          </a>
          <a href="https://instagram.com/pediloarg.ofc" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 text-gray-500 dark:text-zinc-400 transition-colors">
            <Instagram size={22} />
          </a>
        </div>
      </div>
      <p className="text-gray-400 dark:text-zinc-500 font-medium">© 2026 Pedilo Argentina. Todos los derechos reservados.</p>
    </footer>
  );
}