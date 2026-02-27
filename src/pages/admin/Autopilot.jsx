import DashboardLayout from "../../layout/DashboardLayout";
import IntelligenceCard from "../../components/dashboard/IntelligenceCard";
import { BrainCircuit, Sparkles } from "lucide-react";

export default function Autopilot() {
    return (
        <DashboardLayout>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
                {/* Header with violet branding */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                            <BrainCircuit size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Autopilot</h1>
                            <p className="text-gray-500 mt-0.5 font-bold text-sm sm:text-base">Motor de predicción y recomendación automática</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full w-fit border border-violet-100">
                        <Sparkles size={12} />
                        Impulsado por tus datos
                    </div>
                </div>

                <IntelligenceCard />
            </div>
        </DashboardLayout>
    );
}
