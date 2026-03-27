import { BrainCircuit, ArrowRight, Sparkles } from "lucide-react";

export default function AutopilotCtaCard() {
  return (
    <a href="/dashboard/autopilot" className="group block bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 p-6 rounded-[2rem] shadow-xl shadow-violet-500/20 text-white relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/30 transition-all duration-300 ring-1 ring-white/10 hover:ring-white/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] opacity-30 pointer-events-none"></div>
      
      {/* Animated shimmer on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transition-all" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <BrainCircuit size={24} className="text-fuchsia-200" />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-fuchsia-200 drop-shadow-sm">Autopilot</h3>
              <p className="text-[10px] text-fuchsia-200/80 font-bold uppercase tracking-[0.2em] flex items-center gap-1"><Sparkles size={10}/> Motor predictivo</p>
            </div>
          </div>
          <p className="text-sm text-indigo-100/90 font-medium leading-relaxed mb-6">Analiza datos 24/7 y te sugiere acciones para vender más y retener clientes.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider text-white w-fit backdrop-blur-sm transition-colors">
          Usar IA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
