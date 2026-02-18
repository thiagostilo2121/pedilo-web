import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Plus } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import negocioService from "../../services/negocioService";
import pedidosService from "../../services/pedidosService";

import DashboardLayout from "../../layout/DashboardLayout";
import SalesChart from "../../components/dashboard/SalesChart";
import TopProductsCard from "../../components/dashboard/TopProductsCard";
import TopClientsCard from "../../components/dashboard/TopClientsCard";
import RecentOrdersCard from "../../components/dashboard/RecentOrdersCard";
import CategoryRankingCard from "../../components/dashboard/CategoryRankingCard";
import PeakHoursChart from "../../components/dashboard/PeakHoursChart";

export default function DashboardHome() {
    const [overview, setOverview] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [topClients, setTopClients] = useState([]);
    const [tipoNegocio, setTipoNegocio] = useState("minorista");
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const savedRange = localStorage.getItem("dashboard_days_range") || 7;
            const [ov, chart, top, negocioRes, orders, peakHours] = await Promise.all([
                statsService.getOverview(),
                statsService.getSalesChart(savedRange),
                statsService.getTopProducts(5),
                negocioService.getMiNegocio(),
                pedidosService.getAll(5),
                statsService.getPeakHours().catch(() => [])
            ]);
            setOverview(ov);
            setChartData(chart);
            setTopProducts(top);
            setRecentOrders(orders || []);
            setHourlyData(peakHours || []);
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

            if (!peakHours || peakHours.length === 0) {
                setHourlyData([
                    { hour: "00h", volume: 0 }, { hour: "06h", volume: 0 },
                    { hour: "12h", volume: 0 }, { hour: "18h", volume: 0 },
                ]);
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
                <div className="space-y-8">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-2xl" />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                        <Skeleton className="xl:col-span-2 h-96 rounded-2xl" />
                        <Skeleton className="h-96 rounded-2xl" />
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
            <div className="space-y-8 px-4 sm:px-0">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium">Resumen de tu negocio hoy</p>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatsCard
                        title="Ventas Hoy"
                        value={`$${overview?.ventas_hoy?.toLocaleString() || 0}`}
                        icon={<DollarSign size={24} />}
                        subtext={dailyTrend.text}
                        trend={dailyTrend.trend}
                    />
                    <StatsCard
                        title="Pedidos Hoy"
                        value={overview?.pedidos_hoy || 0}
                        icon={<ShoppingBag size={24} />}
                        subtext="Ordenes recibidas"
                    />
                    <StatsCard
                        title="Ticket Promedio"
                        value={`$${overview?.ticket_promedio?.toLocaleString() || 0}`}
                        icon={<TrendingUp size={24} />}
                        subtext="Histórico"
                    />
                    <StatsCard
                        title="Pendientes"
                        value={overview?.pedidos_pendientes || 0}
                        icon={<AlertCircle size={24} />}
                        subtext="Requieren atención"
                        variant={overview?.pedidos_pendientes > 0 ? "warning" : "default"}
                    />
                </div>

                {/* MAIN GRID: 2 COLUMNS LAYOUT */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    {/* LEFT COLUMN: MAIN CHARTS & DATA (2/3) */}
                    <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                        <SalesChart
                            initialData={chartData}
                            initialRange={parseInt(localStorage.getItem("dashboard_days_range") || 7)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <TopProductsCard products={topProducts} />

                            {tipoNegocio === "distribuidora" ? (
                                <TopClientsCard clients={topClients} />
                            ) : (
                                <RecentOrdersCard orders={recentOrders} />
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ANALYTICS & SIDEBAR (1/3) */}
                    <div className="space-y-6">
                        <CategoryRankingCard data={categoryData} />
                        <PeakHoursChart data={hourlyData} />

                        {/* ACCESOS RÁPIDOS */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Accesos Rápidos</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="/dashboard/productos" className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center gap-2 active:scale-95 group">
                                    <Plus size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-600">Nuevo Producto</span>
                                </a>
                                <a href="/dashboard/pedidos" className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center gap-2 active:scale-95 group">
                                    <ShoppingBag size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-600">Ver Pedidos</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
