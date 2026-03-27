
import IntelligenceCard from "../../components/dashboard/IntelligenceCard";
import { BrainCircuit, Sparkles, ArrowRight, TrendingUp, ShieldAlert, Zap } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/dashboard/PageHeader";

export default function Autopilot() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
                <PageHeader
                    title="Autopilot"
                    subtitle="Motor de predicción y recomendación automática"
                    icon={
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                            <BrainCircuit size={28} />
                        </div>
                    }
                    actions={
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full w-fit border border-violet-100">
                            <Sparkles size={12} />
                            Impulsado por tus datos
                        </div>
                    }
                />

                {user?.plan_actual !== "pro" ? (
                    <div className="relative bg-white dark:bg-zinc-900 border border-violet-100/50 dark:border-violet-900/30 rounded-[2rem] p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-2xl shadow-violet-500/5 overflow-hidden">
                        {/* Background glowing effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[600px] bg-gradient-to-b from-violet-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-900/40 text-violet-600 dark:text-violet-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-violet-200/50 dark:shadow-violet-900/20 ring-1 ring-violet-200/50 dark:ring-violet-800/50 text-3xl transform hover:scale-105 transition-transform duration-500">
                            <Sparkles size={48} />
                        </div>
                        <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 mb-6 tracking-tight">
                            Desbloqueá el Cerebro de tu Negocio
                        </h2>
                        <p className="relative z-10 text-gray-600 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                            Autopilot analiza tus pedidos, clientes y productos 24/7 para decirte exactamente <b className="text-gray-900 dark:text-zinc-100 font-black">qué hacer hoy</b> para vender más y retener clientes a punto de perderse.
                        </p>

                        <div className="relative z-10 bg-white/50 backdrop-blur-xl dark:bg-zinc-900/50 rounded-3xl p-6 sm:p-10 mb-12 text-left border border-white dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-black/20 ring-1 ring-gray-100 dark:ring-white/10">
                            <h3 className="font-bold text-gray-900 dark:text-zinc-100 mb-8 text-center text-xl flex items-center justify-center gap-2">
                                <Sparkles size={20} className="text-violet-500" />
                                Incluido en el Plan Pro
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                                        <TrendingUp size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-zinc-100">Combos Inteligentes</h4>
                                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Sugerencias exactas de productos que se compran juntos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                                        <ShieldAlert size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-zinc-100">Alerta de Pérdida</h4>
                                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Detecta clientes frecuentes que dejaron de comprar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                                        <BrainCircuit size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-zinc-100">Simulador de ROI</h4>
                                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Calcula cuánto ahorrás vs pagar un 30% a otras apps.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                                        <Zap size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-zinc-100">Acciones Directas</h4>
                                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Te genera cupones listos para enviar por WhatsApp.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <button
                                onClick={() => navigate("/dashboard/mi-suscripcion")}
                                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center gap-3 text-white font-black rounded-2xl text-lg sm:text-lg shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-1 transition-all overflow-hidden"
                            >
                                {/* Button shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                                
                                Mejorar al Plan Pro <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <span className="text-sm text-gray-500 dark:text-zinc-400 font-medium">14 Días de Prueba Gratis. Cancelá en cualquier momento.</span>
                        </div>
                    </div>
                ) : (
                    <IntelligenceCard />
                )}
            </div>
        </>
    );
}
