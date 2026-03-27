import { DollarSign, TrendingUp, TrendingDown, Minus, Target, Users } from "lucide-react";
import { formatMoney } from "./format";

export default function AutopilotKpiStrip({ roi_simulation = {}, demand_forecast = {}, at_risk_clients = [] }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <DollarSign size={10} /> Ahorro vs Apps
                </div>
                <div className="font-black text-emerald-700 dark:text-emerald-300 text-lg sm:text-xl tracking-tight">
                    {formatMoney(roi_simulation?.ahorro_marketplace_30 || 0)}
                </div>
                <div className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium mt-0.5">vs 30% comisión</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <TrendingUp size={10} /> Ahorro Anual
                </div>
                <div className="font-black text-blue-700 dark:text-blue-300 text-lg sm:text-xl tracking-tight">
                    {formatMoney(roi_simulation?.ahorro_anual_estimado || 0)}
                </div>
                <div className="text-[10px] text-blue-500 dark:text-blue-400 font-medium mt-0.5">proyección neta</div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-900/10 p-4 rounded-2xl border border-violet-200/50 dark:border-violet-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
                <div className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Target size={10} /> Forecast 7d
                </div>
                <div className="font-black text-violet-700 dark:text-violet-300 text-lg sm:text-xl tracking-tight">
                    {demand_forecast?.pedidos_estimados_7d || 0}
                    <span className="text-xs font-bold ml-1 text-violet-400 dark:text-violet-500">pedidos</span>
                </div>
                <div className="text-[10px] text-violet-500 dark:text-violet-400 font-medium mt-0.5 flex items-center gap-1">
                    {demand_forecast?.tendencia === "crecimiento" && <TrendingUp size={10} className="text-green-500" />}
                    {demand_forecast?.tendencia === "declive" && <TrendingDown size={10} className="text-red-500" />}
                    {demand_forecast?.tendencia === "estable" && <Minus size={10} />}
                    {demand_forecast?.tendencia || "N/A"} {demand_forecast?.variacion_porcentaje ? `(${demand_forecast.variacion_porcentaje > 0 ? '+' : ''}${demand_forecast.variacion_porcentaje}%)` : ""}
                </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users size={10} /> Clientes Riesgo
                </div>
                <div className="font-black text-orange-700 dark:text-orange-300 text-lg sm:text-xl tracking-tight">
                    {at_risk_clients?.length || 0}
                </div>
                <div className="text-[10px] text-orange-500 dark:text-orange-400 font-medium mt-0.5">
                    {at_risk_clients?.length > 0 ? `${formatMoney(at_risk_clients.reduce((sum, c) => sum + c.total_gastado, 0))} en riesgo` : "Sin alertas"}
                </div>
            </div>
        </div>
    );
}
