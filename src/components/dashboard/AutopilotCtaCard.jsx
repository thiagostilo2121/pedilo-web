import { BrainCircuit, ArrowRight } from "lucide-react";

export default function AutopilotCtaCard() {
  return (
    <a href="/dashboard/autopilot" className="block bg-gradient-to-br from-violet-600 to-indigo-600 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group hover:-translate-y-1 transition-all">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 rounded-3xl pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <BrainCircuit size={22} />
          </div>
          <div>
            <h3 className="font-black text-base tracking-tight">Autopilot</h3>
            <p className="text-[10px] text-violet-200 font-bold uppercase tracking-wider">Motor de Inteligencia</p>
          </div>
        </div>
        <p className="text-sm text-violet-100 font-medium leading-relaxed mb-4">Combos sugeridos, pronósticos de demanda, clientes en riesgo y más.</p>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/90 group-hover:text-white">
          Ir a Autopilot <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
