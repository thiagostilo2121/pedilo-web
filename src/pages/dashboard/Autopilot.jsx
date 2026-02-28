import DashboardLayout from "../../layout/DashboardLayout";
import IntelligenceCard from "../../components/dashboard/IntelligenceCard";
import { BrainCircuit, Sparkles, ArrowRight, TrendingUp, ShieldAlert, Zap } from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/dashboard/PageHeader";

export default function Autopilot() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <DashboardLayout>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
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

                {user?.plan_actual === "basico" ? (
                    <div className="bg-white dark:bg-zinc-900 border border-violet-100 dark:border-violet-900/30 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto shadow-sm">
                        <div className="w-20 h-20 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Sparkles size={40} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-zinc-100 mb-4 tracking-tight">
                            Desbloqueá el Cerebro de tu Negocio
                        </h2>
                        <p className="text-gray-500 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Autopilot analiza tus pedidos, clientes y productos 24/7 para decirte exactamente <b>qué hacer</b> hoy para vender más y retener clientes a punto de perderse.
                        </p>

                        <div className="bg-violet-50 dark:bg-violet-900/10 rounded-2xl p-6 sm:p-8 mb-10 text-left border border-violet-100/50 dark:border-violet-900/20">
                            <h3 className="font-bold text-violet-900 dark:text-violet-200 mb-6 text-center text-lg">Incluido en el Plan Pro:</h3>
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

                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={() => navigate("/dashboard/mi-suscripcion")}
                                className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-xl text-lg shadow-lg shadow-violet-200 dark:shadow-violet-900/20 hover:-translate-y-1 transition-all flex items-center gap-2"
                            >
                                Mejorar al Plan Pro <ArrowRight size={20} />
                            </button>
                            <span className="text-sm text-gray-500 dark:text-zinc-400 font-medium">14 Días de Prueba Gratis. Cancelá en cualquier momento.</span>
                        </div>
                    </div>
                ) : (
                    <IntelligenceCard />
                )}
            </div>
        </DashboardLayout>
    );
}
