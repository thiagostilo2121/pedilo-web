import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Plus, BrainCircuit, ArrowRight } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import negocioService from "../../services/negocioService";
import pedidosService from "../../services/pedidosService";


import SalesChart from "../../components/dashboard/SalesChart";
import TopProductsCard from "../../components/dashboard/TopProductsCard";
import TopClientsCard from "../../components/dashboard/TopClientsCard";
import RecentOrdersCard from "../../components/dashboard/RecentOrdersCard";
import CategoryRankingCard from "../../components/dashboard/CategoryRankingCard";
import WeeklyHeatmap from "../../components/dashboard/WeeklyHeatmap";
import AutopilotCtaCard from "../../components/dashboard/AutopilotCtaCard";
import QuickActionsCard from "../../components/dashboard/QuickActionsCard";

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
                statsService.getOverview(30),
                statsService.getSalesChart(savedRange),
                statsService.getTopProducts(5, 30),
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
                    const clients = await statsService.getTopClients(5, 30);
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
            <div className="space-y-8 py-4 sm:py-8">
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
        <div className="space-y-8 py-4 sm:py-8">
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-zinc-100 tracking-tight sm:text-4xl">Dashboard</h1>
                        <p className="text-gray-500 dark:text-zinc-400 mt-1 font-bold text-sm sm:text-base">Análisis detallado de tu negocio en los últimos 30 días</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit">
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
                        subtext="Últimos 30 días"
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

                        {/* AUTOPILOT CTA */}
                        <AutopilotCtaCard />


                    </div>


                    {/* RIGHT COLUMN: ANALYTICS & SIDEBAR (4/12) */}
                    <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                        <CategoryRankingCard data={categoryData} />

                        <WeeklyHeatmap data={heatmapData} />

                        {/* ACCESOS RÁPIDOS */}
                        <QuickActionsCard />
                    </div>
                </div>
            </div>
    );
}
