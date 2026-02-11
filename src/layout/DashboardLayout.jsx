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

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import {
  Settings,
  ShoppingBag,
  Pizza,
  Tags,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
  Cherry,
  CirclePercent,
  LayoutDashboard,
  MessageCircle,
  Instagram
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutAction = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Inicio", path: "/dashboard/inicio", icon: <LayoutDashboard size={20} />, end: true },
    { name: "Pedidos", path: "/dashboard/pedidos", icon: <ShoppingBag size={20} /> },
    { name: "Marketing", path: "/dashboard/marketing", icon: <CirclePercent size={20} /> },
    { name: "Productos", path: "/dashboard/productos", icon: <Pizza size={20} /> },
    { name: "Categorías", path: "/dashboard/categorias", icon: <Tags size={20} /> },
    { name: "Toppings", path: "/dashboard/toppings", icon: <Cherry size={20} /> },
    { name: "Configuración", path: "/dashboard/configuracion", icon: <Settings size={20} /> },
    { name: "Mi Suscripción", path: "/dashboard/mi-suscripcion", icon: <CreditCard size={20} /> },
  ];

  const activeClass = "bg-orange-50 text-orange-600 border-r-4 border-orange-600";
  const inactiveClass = "text-gray-600 hover:bg-gray-100";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR DESKTOP */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r shadow-sm transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b bg-white">
          {sidebarOpen && <span className="text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 mx-auto"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive ? activeClass : inactiveClass
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t space-y-4">
          {/* Socials Row */}
          <div className={`flex ${sidebarOpen ? 'flex-row' : 'flex-col'} gap-2`}>
            <a
              href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors ${!sidebarOpen && 'aspect-square'}`}
              title="Canal de WhatsApp"
            >
              <MessageCircle size={20} />
              {sidebarOpen && <span className="ml-2 text-sm font-bold">Canal</span>}
            </a>
            <a
              href="https://instagram.com/pediloarg.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-2.5 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors ${!sidebarOpen && 'aspect-square'}`}
              title="Instagram"
            >
              <Instagram size={20} />
              {sidebarOpen && <span className="ml-2 text-sm font-bold">Seguinos</span>}
            </a>
          </div>

          {/* Logout */}
          <button
            onClick={logoutAction}
            className={`w-full flex items-center ${sidebarOpen ? 'justify-center' : 'justify-center'} py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium`}
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
          </button>

          {/* Legal Links (Desktop Expanded Only) */}
          {sidebarOpen && (
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-gray-100 text-xs font-semibold text-gray-400">
              <button onClick={() => navigate("/terminos")} className="hover:text-gray-600 transition-colors">Términos</button>
              <button onClick={() => navigate("/privacidad")} className="hover:text-gray-600 transition-colors">Privacidad</button>
            </div>
          )}
        </div>

        {/* Mini-footer con créditos */}
        <div className="px-4 py-3 border-t bg-gray-50">
          <a
            href="https://github.com/thiagostilo2121"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-orange-600 transition-colors"
          >
            <Github size={14} />
            {sidebarOpen && <span>© {new Date().getFullYear()} @thiagostilo2121</span>}
          </a>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* NAVBAR MOBILE */}
        <header className="lg:hidden bg-white border-b h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* MENU MOBILE DESPLEGABLE */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-out bg-gray-50/95 backdrop-blur-xl`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b bg-white/50">
            <span className="text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-xl hover:bg-black/5"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl ${isActive ? activeClass : inactiveClass}`
                }
              >
                {item.icon}
                <span className="text-lg font-medium">{item.name}</span>
              </NavLink>
            ))}

            {/* Mobile Footer Section */}
            <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
              {/* Socials */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-green-50 text-green-600"
                >
                  <MessageCircle size={24} />
                  <span className="text-sm font-bold">Novedades</span>
                </a>
                <a
                  href="https://instagram.com/pediloarg.ofc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-pink-50 text-pink-600"
                >
                  <Instagram size={24} />
                  <span className="text-sm font-bold">Instagram</span>
                </a>
              </div>

              <button
                onClick={logoutAction}
                className="flex items-center justify-center gap-4 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut size={20} />
                <span className="text-lg font-medium">Cerrar Sesión</span>
              </button>

              <div className="flex justify-center gap-6 pt-4 text-sm font-medium text-gray-400">
                <button onClick={() => navigate("/terminos")}>Términos y Condiciones</button>
                <button onClick={() => navigate("/privacidad")}>Privacidad</button>
              </div>
            </div>
          </nav>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}