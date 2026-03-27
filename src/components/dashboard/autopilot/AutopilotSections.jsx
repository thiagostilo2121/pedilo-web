import { Activity, AlertTriangle, ArrowRight, BrainCircuit, Zap, Clock, DollarSign, PackageX, Percent, Phone, Sparkles, Target, TrendingDown, TrendingUp } from "lucide-react";
import AutopilotBadge from "./AutopilotBadge";
import AutopilotSection from "./AutopilotSection";
import { formatMoney } from "./format";

export function SalesAnomaliesSection({ anomalies }) {
    if (!anomalies || anomalies.length === 0) return null;
    return (
        <AutopilotSection icon={Activity} title="Anomalías Detectadas" count={anomalies.length} color="text-red-600" bgColor="bg-red-50 dark:bg-red-900/20">
            {anomalies.map((anom, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{anom.tipo.replace('_', ' ').toUpperCase()}</h5>
                        <AutopilotBadge priority={anom.severidad} />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">{anom.mensaje}</p>
                    <div className="flex items-center gap-2">
                        <TrendingDown size={14} className="text-red-500" />
                        <span className="text-xs font-bold text-red-600 dark:text-red-400">
                            {anom.metrica}: -{anom.caida_porcentaje}%
                        </span>
                    </div>
                </div>
            ))}
        </AutopilotSection>
    );
}

export function RetentionActionsSection({ actions }) {
    if (!actions || actions.length === 0) return null;
    return (
        <AutopilotSection icon={Zap} title="Acciones de Retención" count={actions.length} color="text-red-600" bgColor="bg-red-50">
            {actions.map((action, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-gray-600 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{action.titulo}</h5>
                        <AutopilotBadge priority={action.prioridad} />
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
        </AutopilotSection>
    );
}

export function MarginAlertsSection({ alerts }) {
    if (!alerts || alerts.length === 0) return null;
    return (
        <AutopilotSection icon={Percent} title="Análisis de Rentabilidad" count={alerts.length} color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-900/20">
            {alerts.map((alert, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 mt-4 dark:bg-white/5 border border-amber-100 dark:border-amber-900/30 hover:border-amber-200 dark:hover:border-amber-800 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{alert.producto}</h5>
                        <AutopilotBadge priority={alert.severidad} />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">{alert.mensaje}</p>
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
        </AutopilotSection>
    );
}

export function ComboSuggestionsSection({ suggestions }) {
    if (!suggestions || suggestions.length === 0) return null;
    return (
        <AutopilotSection icon={Sparkles} title="Combos Sugeridos" count={suggestions.length} color="text-violet-600" bgColor="bg-violet-50">
            {suggestions.map((combo, i) => (
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
                        <AutopilotBadge priority={combo.prioridad} />
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
        </AutopilotSection>
    );
}

export function PromoRecommendationsSection({ recommendations }) {
    if (!recommendations || recommendations.length === 0) return null;
    return (
        <AutopilotSection icon={Target} title="Promos Recomendadas" count={recommendations.length} color="text-orange-600" bgColor="bg-orange-50">
            {recommendations.map((promo, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 mt-4 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{promo.producto}</h5>
                        <AutopilotBadge priority={promo.prioridad} />
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
        </AutopilotSection>
    );
}

export function DeadProductsSection({ products, days_period }) {
    if (!products || products.length === 0) return null;
    return (
        <AutopilotSection icon={PackageX} title="Productos Sin Movimiento" count={products.length} color="text-gray-600 dark:text-zinc-400" bgColor="bg-gray-100 dark:bg-white/5">
            <div className="space-y-2">
                {products.map((prod, i) => (
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
                💡 Estos productos tienen 0 ventas en {days_period} días. Considerá quitarlos o crear promociones.
            </p>
        </AutopilotSection>
    );
}

export function RoiSimulationSection({ roi_simulation }) {
    if (!roi_simulation) return null;
    return (
        <AutopilotSection icon={DollarSign} title="Simulador de ROI" count={0} color="text-emerald-600" bgColor="bg-emerald-50">
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border mt-4 border-gray-100 dark:border-white/10 space-y-3">
                <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-zinc-400 font-medium">Ventas proyectadas (30 días)</span>
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
        </AutopilotSection>
    );
}

export function DemandForecastSection({ demand_forecast }) {
    if (!demand_forecast) return null;
    return (
        <AutopilotSection icon={TrendingUp} title="Pronóstico de Demanda" count={0} color="text-blue-600" bgColor="bg-blue-50">
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
        </AutopilotSection>
    );
}

export function EmptyState({ show }) {
    if (!show) return null;
    return (
        <div className="text-center py-10 text-gray-400 dark:text-zinc-500">
            <BrainCircuit size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-sm">No hay acciones por ahora</p>
            <p className="text-xs mt-1">Cuando haya más datos, Autopilot te dirá qué hacer.</p>
        </div>
    );
}
