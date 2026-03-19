import { Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActionsCard() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-zinc-900 dark:to-zinc-800 p-6 rounded-3xl shadow-xl text-white">
      <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-300 uppercase tracking-[0.2em] mb-4">Gestión Rápida</h3>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/dashboard/productos" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex flex-col items-center gap-2 active:scale-95 group">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
            <Plus size={20} className="text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider">Nuevo Item</span>
        </Link>
        <Link to="/dashboard/pedidos" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex flex-col items-center gap-2 active:scale-95 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <ShoppingBag size={18} className="text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider">Pedidos</span>
        </Link>
      </div>
    </div>
  );
}
