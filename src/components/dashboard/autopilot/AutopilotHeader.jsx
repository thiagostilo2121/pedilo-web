import { ShieldAlert, Zap, X, Info, RefreshCcw } from "lucide-react";

export default function AutopilotHeader({ criticalActions, totalActions, showInfo, setShowInfo, loadData }) {
    return (
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-violet-50/80 via-white to-indigo-50/80 dark:from-violet-950/40 dark:via-zinc-900 dark:to-indigo-950/40 backdrop-blur-sm">
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2">
                    {criticalActions > 0 && (
                        <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-200 dark:border-red-800 animate-pulse">
                            <ShieldAlert size={12} />
                            {criticalActions} Urgente{criticalActions > 1 ? "s" : ""}
                        </span>
                    )}
                    <span className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-violet-200 dark:border-violet-800">
                        <Zap size={12} />
                        {totalActions} Accion{totalActions !== 1 ? "es" : ""}
                    </span>
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className={`p-2 rounded-xl transition-all ${showInfo ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' : 'bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'}`}
                        title="Información sobre Autopilot"
                    >
                        {showInfo ? <X size={14} /> : <Info size={14} />}
                    </button>
                    <button onClick={loadData} className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 hover:rotate-180 transition-all duration-500" title="Actualizar">
                        <RefreshCcw size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
