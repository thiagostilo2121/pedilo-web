import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Plus, BrainCircuit, ArrowRight } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import negocioService from "../../services/negocioService";
import pedidosService from "../../services/pedidosService";

import DashboardLayout from "../../layout/DashboardLayout";
import SalesChart from "../../components/dashboard/SalesChart";
import TopProductsCard from "../../components/dashboard/TopProductsCard";
import TopClientsCard from "../../components/dashboard/TopClientsCard";
import RecentOrdersCard from "../../components/dashboard/RecentOrdersCard";
import CategoryRankingCard from "../../components/dashboard/CategoryRankingCard";
import WeeklyHeatmap from "../../components/dashboard/WeeklyHeatmap";

export default function DashboardHome() {
    const [overview, setOverview] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [topClients, setTopClients] = useState([]);
    const [tipoNegocio, setTipoNegocio] = useState("minorista");
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const savedRange = localStorage.getItem("dashboard_days_range") || 7;
            const [ov, chart, top, negocioRes, orders, heatmap] = await Promise.all([
                statsService.getOverview(),
                statsService.getSalesChart(savedRange),
                statsService.getTopProducts(5),
                negocioService.getMiNegocio(),
                pedidosService.getAll(5),
                statsService.getWeeklyHeatmap(30).catch(() => [])
            ]);
            setOverview(ov);
            setChartData(chart);
            setTopProducts(top);
            setRecentOrders(orders || []);
            setHeatmapData(heatmap || []);
            setTipoNegocio(negocioRes?.tipo_negocio || "minorista");

            // Fetch top clients only for distribuidoras
            if (negocioRes?.tipo_negocio === "distribuidora") {
                try {
                    const clients = await statsService.getTopClients(5);
                    setTopClients(clients);
                } catch (e) {
                    console.error("Error loading top clients", e);
                }
            }

            // Aggregate Category Data from top products
            if (top && top.length > 0) {
                const catMap = top.reduce((acc, p) => {
                    const catName = p.categoria || "Otros";
                    acc[catName] = (acc[catName] || 0) + p.ingresos;
                    return acc;
                }, {});

                const cats = Object.entries(catMap)
                    .map(([name, value], i) => ({
                        name: name.length > 15 ? name.substring(0, 12) + "..." : name,
                        value,
                        color: ["#f97316", "#3b82f6", "#a855f7", "#10b981", "#6366f1", "#f43f5e"][i % 6]
                    }))
                    .sort((a, b) => b.value - a.value);
                setCategoryData(cats);
            }


        } catch (error) {
            console.error("Error loading stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="max-w-[1600px] mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2 rounded-xl" />
                        <Skeleton className="h-4 w-64 rounded-lg" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-3xl" />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <Skeleton className="lg:col-span-8 h-96 rounded-3xl" />
                        <Skeleton className="lg:col-span-4 h-96 rounded-3xl" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const calculateDailyTrend = () => {
        if (!overview || !chartData || chartData.length === 0) return { text: "vs ayer", trend: "neutral" };

        const hoy = overview.ventas_hoy || 0;
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yStr = yesterdayDate.toLocaleDateString('en-CA');

        let ayer = 0;
        const found = chartData.find(d => d.fecha && d.fecha.startsWith(yStr));

        if (found) {
            ayer = found.ventas;
        } else if (chartData.length >= 2) {
            const last = chartData[chartData.length - 1];
            const todayStr = new Date().toLocaleDateString('en-CA');
            if (last.fecha && last.fecha.startsWith(todayStr)) {
                ayer = chartData.length >= 2 ? chartData[chartData.length - 2].ventas : 0;
            }
        }

        if (ayer === 0) {
            return {
                text: hoy > 0 ? "↑ 100% vs ayer" : "vs ayer",
                trend: hoy > 0 ? "up" : "neutral"
            };
        }

        const diff = hoy - ayer;
        const percent = ((diff / ayer) * 100).toFixed(1);
        const symbol = diff >= 0 ? "↑" : "↓";

        return {
            text: `${symbol} ${Math.abs(percent)}% vs ayer`,
            trend: diff >= 0 ? "up" : "down"
        };
    };

    const dailyTrend = calculateDailyTrend();

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Dashboard</h1>
                        <p className="text-gray-500 mt-1 font-bold text-sm sm:text-base">Análisis detallado de tu negocio en tiempo real</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full w-fit">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Actualizado: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatsCard
                        title="Ventas Hoy"
                        value={`$${overview?.ventas_hoy?.toLocaleString() || 0}`}
                        icon={<DollarSign size={20} />}
                        subtext={dailyTrend.text}
                        trend={dailyTrend.trend}
                    />
                    <StatsCard
                        title="Pedidos Hoy"
                        value={overview?.pedidos_hoy || 0}
                        icon={<ShoppingBag size={20} />}
                        subtext="Ordenes recibidas"
                    />
                    <StatsCard
                        title="Ticket Promedio"
                        value={`$${Math.round(Number(overview?.ticket_promedio || 0)).toLocaleString()}`}
                        icon={<TrendingUp size={20} />}
                        subtext="Histórico"
                    />
                    <StatsCard
                        title="Pendientes"
                        value={overview?.pedidos_pendientes || 0}
                        icon={<AlertCircle size={20} />}
                        subtext="Requieren atención"
                        variant={overview?.pedidos_pendientes > 0 ? "warning" : "default"}
                    />
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: MAIN CHARTS & PRIMARY METRICS (8/12) */}
                    <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                        <SalesChart
                            initialData={chartData}
                            initialRange={parseInt(localStorage.getItem("dashboard_days_range") || 7)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <TopProductsCard products={topProducts} />

                            {tipoNegocio === "distribuidora" ? (
                                <TopClientsCard clients={topClients} />
                            ) : (
                                <RecentOrdersCard orders={recentOrders} />
                            )}
                        </div>


                    </div>

                    {/* RIGHT COLUMN: ANALYTICS & SIDEBAR (4/12) */}
                    <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                        <CategoryRankingCard data={categoryData} />

                        <WeeklyHeatmap data={heatmapData} />

                        {/* ACCESOS RÁPIDOS - MEJORADO */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-xl text-white">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Gestión Rápida</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="/dashboard/productos" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex flex-col items-center gap-2 active:scale-95 group">
                                    <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                                        <Plus size={20} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider">Nuevo Item</span>
                                </a>
                                <a href="/dashboard/pedidos" className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex flex-col items-center gap-2 active:scale-95 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                                        <ShoppingBag size={18} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider">Pedidos</span>
                                </a>
                            </div>
                        </div>

                        {/* AUTOPILOT CTA */}
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
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
