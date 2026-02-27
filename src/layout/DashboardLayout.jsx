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
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";
import negocioService from "../services/negocioService";
import CommandPalette from "../components/dashboard/CommandPalette";
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
  Instagram,
  User,
  ExternalLink,
  Store,
  BrainCircuit,
  Lock
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [negocio, setNegocio] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cached = sessionStorage.getItem("negocio_info");
    if (cached) {
      setNegocio(JSON.parse(cached));
      return; // Already have it, don't fetch
    }

    negocioService.getMiNegocio()
      .then(data => {
        setNegocio(data);
        sessionStorage.setItem("negocio_info", JSON.stringify(data));
      })
      .catch(err => console.error("Error fetching negocio:", err));
  }, []);

  const logoutAction = () => {
    sessionStorage.removeItem("negocio_info");
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Inicio", path: "/dashboard/inicio", icon: <LayoutDashboard size={20} />, end: true },
    { name: "Pedidos", path: "/dashboard/pedidos", icon: <ShoppingBag size={20} /> },
    { name: "Marketing", path: "/dashboard/marketing", icon: <CirclePercent size={20} /> },
    { name: "Autopilot", path: "/dashboard/autopilot", icon: <BrainCircuit size={20} /> },
    { name: "Productos", path: "/dashboard/productos", icon: <Pizza size={20} /> },
    { name: "Categorías", path: "/dashboard/categorias", icon: <Tags size={20} /> },
    { name: "Toppings", path: "/dashboard/toppings", icon: <Cherry size={20} /> },
    { name: "Configuración", path: "/dashboard/configuracion", icon: <Settings size={20} /> },
    { name: "Mi Suscripción", path: "/dashboard/mi-suscripcion", icon: <CreditCard size={20} /> },
  ];

  if (user?.es_admin) {
    menuItems.push({
      name: "Admin Panel",
      path: "/dashboard/admin",
      icon: <Lock size={20} className="text-purple-500" />
    });
  }

  const activeClass = "bg-orange-600 text-white shadow-md shadow-orange-200";
  const inactiveClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-900";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <CommandPalette />
      {/* SIDEBAR DESKTOP */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50">
          {sidebarOpen && <span className="text-2xl font-black text-gray-900 tracking-tighter">Pedilo<span className="text-orange-600">.</span></span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all active:scale-95"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${isActive ? activeClass : inactiveClass
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 flex flex-col items-center gap-3">
          {/* Socials Row */}
          <div className={`flex ${sidebarOpen ? 'flex-row' : 'flex-col'} gap-2`}>
            <a
              href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm shadow-green-100 ${!sidebarOpen && 'aspect-square'}`}
              title="Canal de WhatsApp"
            >
              <MessageCircle size={18} />
              {sidebarOpen && <span className="ml-2 text-xs font-black uppercase tracking-wider">Canal</span>}
            </a>
            <a
              href="https://instagram.com/pediloarg.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm shadow-pink-100 ${!sidebarOpen && 'aspect-square'}`}
              title="Instagram"
            >
              <Instagram size={18} />
              {sidebarOpen && <span className="ml-2 text-xs font-black uppercase tracking-wider">Instagram</span>}
            </a>
          </div>

          <button
            onClick={logoutAction}
            className={`w-full flex items-center justify-center py-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm`}
            title="Cerrar Sesión"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
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
        {/* NAVBAR DESKTOP & MOBILE */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 h-20 flex items-center justify-between px-4 sm:px-10 sticky top-0 z-30 shadow-sm shadow-gray-100/20">
          {/* Mobile Hamburguer (Only LG:HIDDEN) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Mobile (Only LG:HIDDEN) */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
          </div>

          {/* Business Info (Desktop & Mobile) */}
          <div className="flex items-center gap-4">
            {negocio ? (
              <div className="flex items-center gap-3">
                {negocio.logo_url ? (
                  <img src={negocio.logo_url} className="w-8 h-8 rounded-lg object-cover border border-gray-100 shadow-sm" alt="Logo" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200 shadow-sm">
                    <Store size={18} />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-tight">
                    {negocio.nombre}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider">
                    <User size={10} /> {user?.nombre || "Usuario"}
                    {user?.es_admin && <span className="ml-1 bg-purple-100 text-purple-600 px-1.5 py-px rounded-full text-[9px]">ADMIN</span>}
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100"></div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-100 rounded"></div>
                  <div className="h-2 w-12 bg-gray-50 rounded"></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Ctrl+K Badge (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md border border-gray-200 text-[10px] font-bold text-gray-500 mr-2">
              <span className="text-xs">CTRL + K</span>
            </div>
            {negocio && (
              <a
                href={`/n/${negocio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all border border-orange-100/50 shadow-sm shadow-orange-50"
              >
                <ExternalLink size={14} />
                Ver Tienda
              </a>
            )}
            <button
              onClick={() => navigate("/dashboard/configuracion")}
              className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-100 shadow-sm"
              title="Configuración"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* MENU MOBILE DESPLEGABLE */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-out bg-gray-50/95 backdrop-blur-xl flex flex-col`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100/50 bg-white shrink-0">
            <span className="text-2xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
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

            {/* Socials inside scrollable area to save sticky space */}
            <div className="grid grid-cols-2 gap-4 mt-6">
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

            <div className="flex justify-center gap-6 pt-6 pb-2 text-sm font-medium text-gray-400">
              <button onClick={() => navigate("/terminos")}>Términos y Condiciones</button>
              <button onClick={() => navigate("/privacidad")}>Privacidad</button>
            </div>
          </nav>

          {/* Sticky Mobile Footer Section */}
          <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] shrink-0 z-10">
            <button
              onClick={logoutAction}
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-bold"
            >
              <LogOut size={20} />
              <span className="text-base">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}