import { useNavigate } from "react-router-dom";
import { Menu, X, Store, User, ExternalLink, Sun, Moon, Settings } from "lucide-react";

export default function DashboardHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  negocio,
  user,
  isDark,
  toggleTheme,
}) {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100/50 dark:border-white/5 h-20 flex items-center justify-between px-4 sm:px-10 sticky top-0 z-30 shadow-sm shadow-gray-100 dark:shadow-black/20/20 dark:shadow-none">
      {/* Mobile Hamburguer (Only LG:HIDDEN) */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/5 active:scale-95 transition-all"
        title="Menú"
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ctrl+K Badge (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-500 dark:text-zinc-400 mr-2" title="Buscar Comandos">
          <span className="text-xs">CTRL + K</span>
        </div>
        
        {negocio && (
          <a
            href={`/n/${negocio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all border border-orange-100/50 dark:border-orange-800/50 shadow-sm shadow-orange-50 dark:shadow-none"
            title="Ver Tienda Pública"
          >
            <ExternalLink size={14} />
            Ver Tienda
          </a>
        )}
        
        {/* Theme Toggle in Header */}
        <button
          onClick={toggleTheme}
          className="p-2 sm:p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-200 transition-all border border-gray-100 dark:border-white/10 shadow-sm"
          title={isDark ? "Modo Claro" : "Modo Oscuro"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button
          onClick={() => navigate("/dashboard/configuracion")}
          className="p-2 sm:p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-200 transition-all border border-gray-100 dark:border-white/10 shadow-sm"
          title="Configuración"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
