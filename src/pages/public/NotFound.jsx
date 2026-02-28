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
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Icono animado */}
      <div className="relative mb-8">
        <Ghost size={80} className="text-orange-500 animate-bounce" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-gray-200 rounded-full blur-sm" />
      </div>

      {/* Texto de error */}
      <h1 className="text-8xl font-black text-gray-200 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        ¡Ups! No encontramos este local
      </h2>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        Parece que el negocio que buscás no existe o cambió su nombre. 
        Asegurate de que el enlace sea el correcto.
      </p>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
        >
          <ArrowLeft size={18} />
          Volver atrás
        </button>
        
        <button
          onClick={() => navigate("/")}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95"
        >
          <Home size={18} />
          Ir al Inicio
        </button>
      </div>

      {/* Sección para captar dueños de negocios */}
      <div className="mt-20 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm max-w-lg">
        <h3 className="font-black text-gray-900 mb-2">¿Querés tener tu propio menú digital?</h3>
        <p className="text-gray-500 text-sm mb-6">
          Creá tu cuenta hoy y empezá a recibir pedidos de forma profesional.
        </p>
        <button 
          onClick={() => navigate("/register")}
          className="text-orange-600 font-black text-sm uppercase tracking-widest hover:underline"
        >
          Saber más sobre el SaaS →
        </button>
      </div>
    </div>
  );
}