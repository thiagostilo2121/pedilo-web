import { useState, useEffect } from "react";
import { statsService } from "../../services/statsService";
import {
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Zap,
    Users,
    PackageX,
    DollarSign,
    Sparkles,
    Phone,
    Target,
    Clock,
    ArrowRight,
    ShieldAlert,
    RefreshCcw,
    Loader2,
    Minus,
    ChevronUp,
    ChevronDown,
    Activity,
    Percent,
    Info,
    X,
} from "lucide-react";

const PRIORITY_COLORS = {
    "crítica": "bg-red-500",
    "alta": "bg-orange-500",
    "media": "bg-yellow-500",
    "baja": "bg-gray-400",
};

const PRIORITY_BG = {
    "crítica": "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
    "alta": "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300",
    "media": "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
    "baja": "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-zinc-400",
};

function PriorityBadge({ priority }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${PRIORITY_BG[priority] || PRIORITY_BG.media}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_COLORS[priority] || PRIORITY_COLORS.media}`}></span>
            {priority}
        </span>
    );
}

function formatMoney(val) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
}

function Section({ icon: Icon, title, count, children, color = "text-gray-900 dark:text-zinc-100", bgColor = "bg-gray-50 dark:bg-white/5" }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 dark:hover:bg-white/5 dark:bg-zinc-800/50 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
                        <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{title}</h4>
                    {count > 0 && (
                        <span className="text-[10px] font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">{count}</span>
                    )}
                </div>
                {open ? <ChevronUp size={16} className="text-gray-400 dark:text-zinc-500" /> : <ChevronDown size={16} className="text-gray-400 dark:text-zinc-500" />}
            </button>
            {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
        </div>
    );
}

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
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-violet-50 via-white to-indigo-50 dark:from-violet-950/30 dark:via-gray-900 dark:to-indigo-950/30">
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
                        <button onClick={loadData} className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all" title="Actualizar">
                            <RefreshCcw size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            {showInfo && (
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
            )}

            <div className="p-4 sm:p-6 space-y-5">

                {/* ROI Simulation KPI Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <DollarSign size={10} /> Ahorro vs Apps
                        </div>
                        <div className="font-black text-emerald-700 dark:text-emerald-300 text-lg sm:text-xl tracking-tight">
                            {formatMoney(roi_simulation.ahorro_marketplace_30)}
                        </div>
                        <div className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium mt-0.5">vs 30% comisión</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                        <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <TrendingUp size={10} /> Ahorro Anual
                        </div>
                        <div className="font-black text-blue-700 dark:text-blue-300 text-lg sm:text-xl tracking-tight">
                            {formatMoney(roi_simulation.ahorro_anual_estimado)}
                        </div>
                        <div className="text-[10px] text-blue-500 dark:text-blue-400 font-medium mt-0.5">proyección neta</div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-900/10 p-4 rounded-2xl border border-violet-200/50 dark:border-violet-800/50">
                        <div className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Target size={10} /> Forecast 7d
                        </div>
                        <div className="font-black text-violet-700 dark:text-violet-300 text-lg sm:text-xl tracking-tight">
                            {demand_forecast.pedidos_estimados_7d || 0}
                            <span className="text-xs font-bold ml-1 text-violet-400 dark:text-violet-500">pedidos</span>
                        </div>
                        <div className="text-[10px] text-violet-500 dark:text-violet-400 font-medium mt-0.5 flex items-center gap-1">
                            {demand_forecast.tendencia === "crecimiento" && <TrendingUp size={10} className="text-green-500" />}
                            {demand_forecast.tendencia === "declive" && <TrendingDown size={10} className="text-red-500" />}
                            {demand_forecast.tendencia === "estable" && <Minus size={10} />}
                            {demand_forecast.tendencia} {demand_forecast.variacion_porcentaje ? `(${demand_forecast.variacion_porcentaje > 0 ? '+' : ''}${demand_forecast.variacion_porcentaje}%)` : ""}
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
                        <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Users size={10} /> Clientes Riesgo
                        </div>
                        <div className="font-black text-orange-700 dark:text-orange-300 text-lg sm:text-xl tracking-tight">
                            {at_risk_clients.length}
                        </div>
                        <div className="text-[10px] text-orange-500 dark:text-orange-400 font-medium mt-0.5">
                            {at_risk_clients.length > 0 ? `${formatMoney(at_risk_clients.reduce((sum, c) => sum + c.total_gastado, 0))} en riesgo` : "Sin alertas"}
                        </div>
                    </div>
                </div>

                {/* Sales Anomalies — IMMEDIATE ATTENTION */}
                {sales_anomalies.length > 0 && (
                    <Section icon={Activity} title="Anomalías Detectadas" count={sales_anomalies.length} color="text-red-600" bgColor="bg-red-50 dark:bg-red-900/20">
                        {sales_anomalies.map((anom, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800 transition-all">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{anom.tipo.replace('_', ' ').toUpperCase()}</h5>
                                    <PriorityBadge priority={anom.severidad} />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">
                                    {anom.mensaje}
                                </p>
                                <div className="flex items-center gap-2">
                                    <TrendingDown size={14} className="text-red-500" />
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">
                                        {anom.metrica}: -{anom.caida_porcentaje}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Retention Actions — THE MOST IMPORTANT */}
                {retention_actions.length > 0 && (
                    <Section icon={Zap} title="Acciones de Retención" count={retention_actions.length} color="text-red-600" bgColor="bg-red-50">
                        {retention_actions.map((action, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:border-white/10 dark:hover:border-gray-600 transition-all">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{action.titulo}</h5>
                                    <PriorityBadge priority={action.prioridad} />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">{action.descripcion}</p>

                                {action.ingreso_en_riesgo && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle size={12} className="text-red-500" />
                                        <span className="text-xs font-bold text-red-600">{formatMoney(action.ingreso_en_riesgo)} en riesgo</span>
                                    </div>
                                )}

                                {action.clientes && (
                                    <div className="space-y-1.5 mb-3">
                                        {action.clientes.map((c, j) => (
                                            <div key={j} className="flex items-center justify-between bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg border border-gray-100 dark:border-white/10 text-xs">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <div className="w-7 h-7 bg-gray-900 dark:bg-white/10 text-white rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0">
                                                        {c.nombre?.charAt(0).toUpperCase() || "?"}
                                                    </div>
                                                    <span className="font-bold text-gray-900 dark:text-zinc-100 truncate">{c.nombre}</span>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="font-bold text-gray-500 dark:text-zinc-400">{formatMoney(c.gastado)}</span>
                                                    {c.telefono && (
                                                        <a href={`https://wa.me/${c.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                                                            className="p-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                                                            <Phone size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {action.sugerencia_cupon && (
                                    <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-900/20 px-3 py-2 rounded-lg border border-violet-100 dark:border-violet-800">
                                        <Sparkles size={12} className="text-violet-500 shrink-0" />
                                        <span className="text-[11px] text-violet-700 dark:text-violet-300 font-bold">Cupón sugerido: <code className="bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded text-violet-800 dark:text-violet-200">{action.sugerencia_cupon}</code></span>
                                    </div>
                                )}

                                {action.horas_muertas && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        <Clock size={12} className="text-gray-400 dark:text-zinc-500" />
                                        {action.horas_muertas.map((h, j) => (
                                            <span key={j} className="text-[10px] bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-zinc-400 px-2 py-0.5 rounded-full font-bold">{h}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Section>
                )}

                {/* Margin Alerts */}
                {margin_alerts.length > 0 && (
                    <Section icon={Percent} title="Análisis de Rentabilidad" count={margin_alerts.length} color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-900/20">
                        {margin_alerts.map((alert, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-amber-100 dark:border-amber-900/30 hover:border-amber-200 dark:hover:border-amber-800 transition-all">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{alert.producto}</h5>
                                    <PriorityBadge priority={alert.severidad} />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">
                                    {alert.mensaje}
                                </p>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className={alert.tipo === 'alerta_margen' ? 'text-red-500' : 'text-emerald-500'}>
                                        {alert.margen}% Margen
                                    </span>
                                    <span className="text-gray-500 dark:text-zinc-400">
                                        {alert.ventas} vendidos
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Combo Suggestions */}
                {combo_suggestions.length > 0 && (
                    <Section icon={Sparkles} title="Combos Sugeridos" count={combo_suggestions.length} color="text-violet-600" bgColor="bg-violet-50">
                        {combo_suggestions.map((combo, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border mt-4 border-gray-100 dark:border-white/10">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {combo.productos.map((p, j) => (
                                            <span key={j}>
                                                <span className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{p}</span>
                                                {j < combo.productos.length - 1 && <span className="text-gray-300 mx-1">+</span>}
                                            </span>
                                        ))}
                                    </div>
                                    <PriorityBadge priority={combo.prioridad} />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 mb-2">{combo.accion}</p>
                                <div className="flex items-center gap-4 text-[11px] font-bold">
                                    <span className="text-gray-500 dark:text-zinc-400">{combo.frecuencia}x comprados juntos</span>
                                    <span className="text-emerald-600 flex items-center gap-1">
                                        <TrendingUp size={12} /> +{formatMoney(combo.impacto_estimado)} estimado
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Promo Recommendations */}
                {promo_recommendations.length > 0 && (
                    <Section icon={Target} title="Promos Recomendadas" count={promo_recommendations.length} color="text-orange-600" bgColor="bg-orange-50">
                        {promo_recommendations.map((promo, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 mt-4 dark:border-white/10">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{promo.producto}</h5>
                                    <PriorityBadge priority={promo.prioridad} />
                                </div>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 mb-2">{promo.accion}</p>
                                {promo.caida_porcentaje && (
                                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-500">
                                        <TrendingDown size={12} /> Cayó un {promo.caida_porcentaje}% vs periodo anterior
                                    </div>
                                )}
                                {promo.tipo === "volumen" && (
                                    <div className="flex items-center gap-1 text-[11px] font-bold text-blue-500">
                                        <ArrowRight size={12} /> {promo.ventas_actual} vendidos — target mayorista: {promo.umbral_mayorista}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Section>
                )}

                {/* Dead Products */}
                {dead_products.length > 0 && (
                    <Section icon={PackageX} title="Productos Sin Movimiento" count={dead_products.length} color="text-gray-600 dark:text-zinc-400" bgColor="bg-gray-100 dark:bg-white/5">
                        <div className="space-y-2">
                            {dead_products.map((prod, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 mt-4 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <PackageX size={14} className="text-gray-400 dark:text-zinc-500 shrink-0" />
                                        <span className="font-bold text-gray-900 dark:text-zinc-100 truncate">{prod.nombre}</span>
                                        {prod.categoria && (
                                            <span className="text-[10px] bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-zinc-500 px-1.5 py-0.5 rounded-full shrink-0">{prod.categoria}</span>
                                        )}
                                    </div>
                                    <span className="font-bold text-gray-500 dark:text-zinc-400 shrink-0">{formatMoney(prod.precio)}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-medium mt-2">
                            💡 Estos productos tienen 0 ventas en {data.periodo_dias} días. Considerá quitarlos o crear promociones.
                        </p>
                    </Section>
                )}

                {/* ROI Breakdown */}
                <Section icon={DollarSign} title="Simulador de ROI" count={0} color="text-emerald-600" bgColor="bg-emerald-50">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border mt-4 border-gray-100 dark:border-white/10 space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 dark:text-zinc-400 font-medium">Ventas este periodo</span>
                            <span className="font-bold text-gray-900 dark:text-zinc-100">{formatMoney(roi_simulation.ventas_periodo)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 dark:text-zinc-400 font-medium">Si usaras App (30%)</span>
                            <span className="font-bold text-red-500">-{formatMoney(roi_simulation.ahorro_marketplace_30)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 dark:text-zinc-400 font-medium">Costo Pedilo (mensual)</span>
                            <span className="font-bold text-gray-900 dark:text-zinc-100">-{formatMoney(roi_simulation.costo_pedilo_mensual)}</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-white/20 pt-3 flex justify-between text-sm">
                            <span className="font-bold text-gray-900 dark:text-zinc-100">Ganancia Neta vs Apps</span>
                            <span className={`font-black text-lg ${roi_simulation.roi_neto_mensual > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {formatMoney(roi_simulation.roi_neto_mensual)}
                            </span>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium italic">{roi_simulation.mensaje}</p>
                </Section>

                {/* Demand Forecast Detail */}
                <Section icon={TrendingUp} title="Pronóstico de Demanda" count={0} color="text-blue-600" bgColor="bg-blue-50">
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10 text-center">
                            <div className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase mb-1">Pedidos / Día</div>
                            <div className="text-xl font-black text-gray-900 dark:text-zinc-100">{demand_forecast.promedio_diario_pedidos || 0}</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10 text-center">
                            <div className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase mb-1">Ingreso / Día</div>
                            <div className="text-xl font-black text-gray-900 dark:text-zinc-100">{formatMoney(demand_forecast.promedio_diario_ventas)}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500 dark:text-zinc-400 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${demand_forecast.confianza === 'alta' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : demand_forecast.confianza === 'media' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-400'}`}>
                            Confianza: {demand_forecast.confianza || "baja"}
                        </span>
                        <span>Próximos 7 días: {formatMoney(demand_forecast.ventas_estimadas_7d)} ({demand_forecast.pedidos_estimados_7d} pedidos)</span>
                    </div>
                </Section>

                {/* Empty State */}
                {totalActions === 0 && at_risk_clients.length === 0 && dead_products.length === 0 && (
                    <div className="text-center py-10 text-gray-400 dark:text-zinc-500">
                        <BrainCircuit size={40} className="mx-auto mb-4 opacity-30" />
                        <p className="font-bold text-sm">No hay acciones por ahora</p>
                        <p className="text-xs mt-1">Cuando haya más datos, Autopilot te dirá qué hacer.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
