import { useState, useEffect } from "react";
import { statsService } from "../../services/statsService";
import { BrainCircuit, Loader2 } from "lucide-react";
import AutopilotHeader from "./autopilot/AutopilotHeader";
import AutopilotInfoPanel from "./autopilot/AutopilotInfoPanel";
import AutopilotKpiStrip from "./autopilot/AutopilotKpiStrip";
import {
    SalesAnomaliesSection,
    RetentionActionsSection,
    MarginAlertsSection,
    ComboSuggestionsSection,
    PromoRecommendationsSection,
    DeadProductsSection,
    RoiSimulationSection,
    DemandForecastSection,
    EmptyState
} from "./autopilot/AutopilotSections";

export default function IntelligenceCard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await statsService.getIntelligence(30);
            setData(result);
        } catch (err) {
            setError("No se pudo cargar la inteligencia.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    if (loading) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px] gap-4">
                <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center animate-pulse">
                        <BrainCircuit size={28} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <Loader2 size={14} className="absolute -bottom-1 -right-1 text-violet-500 animate-spin" />
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-900 dark:text-zinc-100 text-sm">Analizando tu negocio...</p>
                    <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-1">Procesando datos de pedidos, clientes y productos</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm p-6">
                <p className="text-red-500 font-bold text-sm">{error}</p>
                <button onClick={loadData} className="mt-2 text-xs font-bold text-gray-500 dark:text-zinc-400 underline">Reintentar</button>
            </div>
        );
    }

    if (!data) return null;

    const {
        combo_suggestions = [],
        promo_recommendations = [],
        at_risk_clients = [],
        dead_products = [],
        demand_forecast = {},
        roi_simulation = {},
        retention_actions = [],
        margin_alerts = [],
        sales_anomalies = [],
    } = data;

    const totalActions = combo_suggestions.length + promo_recommendations.length + retention_actions.length + margin_alerts.length + sales_anomalies.length;
    const criticalActions = retention_actions.filter(a => a.prioridad === "crítica").length + sales_anomalies.filter(a => a.severidad === "alta").length + margin_alerts.filter(a => a.severidad === "alta").length;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/40 dark:shadow-black/40 overflow-hidden">
            <AutopilotHeader 
                criticalActions={criticalActions}
                totalActions={totalActions}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                loadData={loadData}
            />

            {showInfo && <AutopilotInfoPanel />}

            <div className="p-4 sm:p-6 space-y-5">
                <AutopilotKpiStrip 
                    roi_simulation={roi_simulation}
                    demand_forecast={demand_forecast}
                    at_risk_clients={at_risk_clients}
                />

                <SalesAnomaliesSection anomalies={sales_anomalies} />
                <RetentionActionsSection actions={retention_actions} />
                <MarginAlertsSection alerts={margin_alerts} />
                <ComboSuggestionsSection suggestions={combo_suggestions} />
                <PromoRecommendationsSection recommendations={promo_recommendations} />
                <DeadProductsSection products={dead_products} days_period={data.periodo_dias} />
                <RoiSimulationSection roi_simulation={roi_simulation} />
                <DemandForecastSection demand_forecast={demand_forecast} />

                <EmptyState show={totalActions === 0 && at_risk_clients.length === 0 && dead_products.length === 0} />
            </div>
        </div>
    );
}
