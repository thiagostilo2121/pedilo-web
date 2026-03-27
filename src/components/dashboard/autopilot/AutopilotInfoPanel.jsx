import { BrainCircuit, Activity, Percent, Zap, Sparkles, Target, TrendingUp } from "lucide-react";

export default function AutopilotInfoPanel() {
    return (
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10 bg-violet-50/50 dark:bg-violet-950/10">
            <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                <BrainCircuit size={18} className="text-violet-500" />
                ¿Qué hace el Autopilot de Pedilo?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-zinc-400">
                <div className="space-y-4">
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><Activity size={14} className="text-red-500" /> Detección de Anomalías</strong>
                        Monitorea tus ventas en tiempo real comparándolas con promedios históricos por día de la semana. Te alerta de caídas inusuales o bajas en el ticket promedio.
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><Percent size={14} className="text-amber-500" /> Análisis de Rentabilidad</strong>
                        Cruza la rotación de tus productos con su costo (si lo ingresaste) para alertarte sobre "best-sellers" con bajo margen, o sugerirte promocionar productos de alta ganancia.
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><Zap size={14} className="text-red-500" /> Acciones de Retención</strong>
                        Analiza el comportamiento de compra. Te sugiere contactar a clientes VIP en riesgo de fuga, o crear promociones para reactivar clientes inactivos.
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><Sparkles size={14} className="text-violet-500" /> Sugerencia de Combos</strong>
                        Encuentra qué productos se compran juntos frecuentemente y te recomienda agruparlos para aumentar la facturación y el ticket promedio.
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><Target size={14} className="text-orange-500" /> Promos Recomendadas</strong>
                        Muestra productos cuyas ventas han caído. Sugiere lanzamientos de cupones, 2x1 o promociones para aquellos que no alcanzan su potencial mayorista.
                    </div>
                    <div>
                        <strong className="text-gray-900 dark:text-zinc-100 flex items-center gap-1.5 mb-1"><TrendingUp size={14} className="text-blue-500" /> Pronóstico & ROI</strong>
                        Estima tus ingresos para los próximos 7 días y visibiliza cuánta plata estás ahorrando al usar Pedilo frente a las comisiones de apps externas.
                    </div>
                </div>
            </div>
        </div>
    );
}
