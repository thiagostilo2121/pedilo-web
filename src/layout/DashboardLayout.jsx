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
import { useTheme } from "../contexts/ThemeProvider";
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
  Lock,
  Sun,
  Moon
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [negocio, setNegocio] = useState(null);
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
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

  const menuSections = [
    {
      title: "Principal",
      items: [
        { name: "Inicio", path: "/dashboard/inicio", icon: <LayoutDashboard size={20} />, end: true },
        { name: "Pedidos", path: "/dashboard/pedidos", icon: <ShoppingBag size={20} /> },
        { name: "Configuración", path: "/dashboard/configuracion", icon: <Settings size={20} /> },
      ]
    },
    {
      title: "Catálogo",
      items: [
        { name: "Productos", path: "/dashboard/productos", icon: <Pizza size={20} /> },
        { name: "Categorías", path: "/dashboard/categorias", icon: <Tags size={20} /> },
        { name: "Toppings", path: "/dashboard/toppings", icon: <Cherry size={20} /> },
      ]
    },
    {
      title: "Crecimiento",
      items: [
        { name: "Autopilot", path: "/dashboard/autopilot", icon: <BrainCircuit size={20} />, activeViolet: true, inactiveViolet: true, badge: "NUEVO" },
        { name: "Marketing", path: "/dashboard/marketing", icon: <CirclePercent size={20} /> },
      ]
    },
    {
      title: "Cuenta",
      items: [
        { name: "Mi Suscripción", path: "/dashboard/mi-suscripcion", icon: <CreditCard size={20} /> },
      ]
    }
  ];

  if (user?.es_admin) {
    menuSections.push({
      title: "Administración",
      items: [
        {
          name: "Admin Panel",
          path: "/dashboard/admin",
          icon: <Lock size={20} className="text-purple-500" />
        }
      ]
    });
  }

  const activeClass = "bg-orange-600 text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30";
  const activeVioletClass = "bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/30";
  const inactiveVioletClass = "text-violet-600 hover:bg-violet-50 hover:text-violet-700 dark:text-violet-400 dark:bg-violet-900/10 dark:hover:bg-violet-900/20 dark:hover:text-violet-300";
  const inactiveClass = "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-200";

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden font-sans transition-colors duration-300">
      <CommandPalette />
      {/* SIDEBAR DESKTOP */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-white/10 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50 dark:border-white/10">
          {sidebarOpen && <span className="text-2xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">Pedilo<span className="text-orange-600">.</span></span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-zinc-400 transition-all active:scale-95"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-6 overflow-y-auto pb-4">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {sidebarOpen ? (
                <div className="px-4 mb-2 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                  {section.title}
                </div>
              ) : (
                sIdx > 0 && <div className="mx-4 my-2 border-t border-gray-100 dark:border-white/10"></div>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${isActive ? (item.activeViolet ? activeVioletClass : activeClass) : (item.inactiveViolet ? inactiveVioletClass : inactiveClass)
                    }`
                  }
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span>{item.name}</span>}
                  </div>
                  {sidebarOpen && item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider ${item.activeViolet ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 dark:border-white/10 flex flex-col items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center py-3 rounded-xl transition-all font-bold text-sm ${sidebarOpen ? '' : 'px-2'} ${isDark
              ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            title={isDark ? "Cambiar a Light" : "Cambiar a Dark"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {sidebarOpen && <span className="ml-3">{isDark ? "Modo Claro" : "Modo Oscuro"}</span>}
          </button>

          {/* Socials Row */}
          <div className={`flex ${sidebarOpen ? 'flex-row' : 'flex-col'} gap-2`}>
            <a
              href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white transition-all shadow-sm shadow-green-100 dark:shadow-none ${!sidebarOpen && 'aspect-square'}`}
              title="Canal de WhatsApp"
            >
              <MessageCircle size={18} />
              {sidebarOpen && <span className="ml-2 text-xs font-black uppercase tracking-wider">Canal</span>}
            </a>
            <a
              href="https://instagram.com/pediloarg.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-600 hover:text-white transition-all shadow-sm shadow-pink-100 dark:shadow-none ${!sidebarOpen && 'aspect-square'}`}
              title="Instagram"
            >
              <Instagram size={18} />
              {sidebarOpen && <span className="ml-2 text-xs font-black uppercase tracking-wider">Instagram</span>}
            </a>
          </div>

          <button
            onClick={logoutAction}
            className={`w-full flex items-center justify-center py-3 text-gray-400 dark:text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-xl transition-all font-bold text-sm`}
            title="Cerrar Sesión"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-3">Cerrar Sesión</span>}
          </button>
        </div>

        {/* Mini-footer con créditos */}
        <div className="px-4 py-3 border-t bg-gray-50 dark:bg-zinc-900 dark:border-white/10">
          <a
            href="https://github.com/thiagostilo2121"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-500 hover:text-orange-600 transition-colors"
          >
            <Github size={14} />
            {sidebarOpen && <span>© {new Date().getFullYear()} @thiagostilo2121</span>}
          </a>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* NAVBAR DESKTOP & MOBILE */}
        <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100/50 dark:border-white/5 h-20 flex items-center justify-between px-4 sm:px-10 sticky top-0 z-30 shadow-sm shadow-gray-100 dark:shadow-black/20/20 dark:shadow-none">
          {/* Mobile Hamburguer (Only LG:HIDDEN) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/5 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Mobile (Only LG:HIDDEN) */}
          <div className="lg:hidden flex items-center gap-2">
            <span className="text-xl font-black text-gray-900 dark:text-zinc-100">Pedilo<span className="text-orange-600">.</span></span>
          </div>

          {/* Business Info (Desktop & Mobile) */}
          <div className="flex items-center gap-4">
            {negocio ? (
              <div className="flex items-center gap-3">
                {negocio.logo_url ? (
                  <img src={negocio.logo_url} className="w-8 h-8 rounded-lg object-cover border border-gray-100 dark:border-white/10 shadow-sm" alt="Logo" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 border border-orange-200 dark:border-orange-800 shadow-sm">
                    <Store size={18} />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 dark:text-zinc-100 leading-tight">
                    {negocio.nombre}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                    <User size={10} /> {user?.nombre || "Usuario"}
                    {user?.es_admin && <span className="ml-1 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-1.5 py-px rounded-full text-[9px]">ADMIN</span>}
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5"></div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-gray-100 dark:bg-white/5 rounded"></div>
                  <div className="h-2 w-12 bg-gray-50 dark:bg-white/5 rounded"></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Ctrl+K Badge (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-500 dark:text-zinc-400 mr-2">
              <span className="text-xs">CTRL + K</span>
            </div>
            {negocio && (
              <a
                href={`/n/${negocio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all border border-orange-100/50 dark:border-orange-800/50 shadow-sm shadow-orange-50 dark:shadow-none"
              >
                <ExternalLink size={14} />
                Ver Tienda
              </a>
            )}
            {/* Theme Toggle in Header */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-200 transition-all border border-gray-100 dark:border-white/10 shadow-sm"
              title={isDark ? "Modo Claro" : "Modo Oscuro"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate("/dashboard/configuracion")}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-200 transition-all border border-gray-100 dark:border-white/10 shadow-sm"
              title="Configuración"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* MENU MOBILE DESPLEGABLE */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-out bg-gray-50/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100/50 dark:border-white/5 bg-white dark:bg-zinc-900 shrink-0">
            <span className="text-2xl font-black text-gray-900 dark:text-zinc-100">Pedilo<span className="text-orange-600">.</span></span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-xl text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-100 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 dark:hover:bg-white/5 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-6 flex-1 overflow-y-auto">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="px-4 mb-3 text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl ${isActive ? (item.activeViolet ? activeVioletClass : activeClass) : (item.inactiveViolet ? inactiveVioletClass : inactiveClass)}`
                    }
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="text-lg font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${item.activeViolet ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}

            {/* Socials inside scrollable area to save sticky space */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <a
                href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              >
                <MessageCircle size={24} />
                <span className="text-sm font-bold">Novedades</span>
              </a>
              <a
                href="https://instagram.com/pediloarg.ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
              >
                <Instagram size={24} />
                <span className="text-sm font-bold">Instagram</span>
              </a>
            </div>

            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-300 font-bold"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}</span>
            </button>

            <div className="flex justify-center gap-6 pt-6 pb-2 text-sm font-medium text-gray-400 dark:text-zinc-500">
              <button onClick={() => navigate("/terminos")}>Términos y Condiciones</button>
              <button onClick={() => navigate("/privacidad")}>Privacidad</button>
            </div>
          </nav>

          {/* Sticky Mobile Footer Section */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] shrink-0 z-10">
            <button
              onClick={logoutAction}
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors font-bold"
            >
              <LogOut size={20} />
              <span className="text-base">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}