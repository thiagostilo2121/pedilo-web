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
    <footer className="py-20 bg-white border-t border-gray-100 text-center">
      <div className="mb-10 text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></div>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10 font-bold text-gray-500">
        <button onClick={() => navigate("/terminos")} className="hover:text-orange-600">Términos del Servicio</button>
        <button onClick={() => navigate("/privacidad")} className="hover:text-orange-600">Política de Privacidad</button>
        <a href="https://web.whatsapp.com/send/?phone=1123860316&text=Hola,%20quisiera%20contactarlos%20por%20soporte%20de%20Pedilo" className="hover:text-orange-600">Contacto</a>
      </div>
      <p className="text-gray-400 font-medium">© 2026 Pedilo Argentina. Todos los derechos reservados.</p>
    </footer>
  );
}