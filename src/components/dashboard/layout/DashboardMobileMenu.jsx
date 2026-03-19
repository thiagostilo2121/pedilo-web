import { NavLink, useNavigate } from "react-router-dom";
import { X, MessageCircle, Instagram, Sun, Moon, LogOut } from "lucide-react";
import { getMenuSections, activeClass, activeVioletClass, inactiveVioletClass, inactiveClass } from "../../../utils/menuConfig";

export default function DashboardMobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  user,
  isDark,
  toggleTheme,
  logoutAction,
}) {
  const navigate = useNavigate();
  const menuSections = getMenuSections(user);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-50 transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-out bg-gray-50/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col`}
    >
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100/50 dark:border-white/5 bg-white dark:bg-zinc-900 shrink-0">
        <span className="text-2xl font-black text-gray-900 dark:text-zinc-100">
          Pedilo<span className="text-orange-600">.</span>
        </span>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="p-2 -mr-2 rounded-xl text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-100 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 dark:hover:bg-white/5 transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
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
                  `flex items-center justify-between px-4 py-3 rounded-xl ${
                    isActive
                      ? item.activeViolet
                        ? activeVioletClass
                        : activeClass
                      : item.inactiveViolet
                      ? inactiveVioletClass
                      : inactiveClass
                  }`
                }
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-lg font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      item.activeViolet
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    }`}
                  >
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
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-300 font-bold mt-4"
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
  );
}
