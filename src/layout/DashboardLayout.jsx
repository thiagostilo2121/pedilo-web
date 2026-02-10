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
  LayoutDashboard
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

        <div className="p-4 border-t">
          <button
            onClick={logoutAction}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>

          <button
            onClick={() => navigate("/terminos")}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <FileText size={20} />
            {sidebarOpen && <span>Términos y C.</span>}
          </button>

          <button
            onClick={() => navigate("/privacidad")}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <FileText size={20} />
            {sidebarOpen && <span>Privacidad</span>}
          </button>
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

            <button
              onClick={logoutAction}
              className="flex items-center gap-4 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl mt-10"
            >
              <LogOut size={20} />
              <span className="text-lg font-medium">Cerrar Sesión</span>
            </button>

            <button
              onClick={() => navigate("/terminos")}
              className="flex items-center gap-4 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <FileText size={20} />
              <span className="text-lg font-medium">Términos y Condiciones</span>
            </button>

            <button
              onClick={() => navigate("/privacidad")}
              className="flex items-center gap-4 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <FileText size={20} />
              <span className="text-lg font-medium">Privacidad</span>
            </button>
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