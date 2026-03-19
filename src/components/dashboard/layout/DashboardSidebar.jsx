import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Instagram,
  LogOut,
  Sun,
  Moon,
  Github
} from "lucide-react";
import { getMenuSections, activeClass, activeVioletClass, inactiveVioletClass, inactiveClass } from "../../../utils/menuConfig";

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen, user, isDark, toggleTheme, logoutAction }) {
  const menuSections = getMenuSections(user);

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-white/10 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50 dark:border-white/10">
        {sidebarOpen && <span className="text-2xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">Pedilo<span className="text-orange-600">.</span></span>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-zinc-400 transition-all active:scale-95"
          title={sidebarOpen ? "Contraer Menú" : "Expandir Menú"}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-6 overflow-y-auto pb-4 custom-scrollbar">
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
                  `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                    isActive ? (item.activeViolet ? activeVioletClass : activeClass) : (item.inactiveViolet ? inactiveVioletClass : inactiveClass)
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
          title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {sidebarOpen && <span className="ml-3">{isDark ? "Modo Claro" : "Modo Oscuro"}</span>}
        </button>

        {/* Socials Row */}
        <div className={`flex ${sidebarOpen ? 'flex-row' : 'flex-col'} gap-2 w-full`}>
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
          className={`flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-zinc-500 hover:text-orange-600 transition-colors ${!sidebarOpen && 'aspect-square'}`}
          title="Creado por @thiagostilo2121"
        >
          <Github size={14} />
          {sidebarOpen && <span>© {new Date().getFullYear()} @thiagostilo2121</span>}
        </a>
      </div>
    </aside>
  );
}
