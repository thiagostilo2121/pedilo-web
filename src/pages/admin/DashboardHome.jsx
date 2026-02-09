import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";

import DashboardLayout from "../../layout/DashboardLayout";

export default function DashboardHome() {
    const [overview, setOverview] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [ov, chart, top] = await Promise.all([
                statsService.getOverview(),
                statsService.getSalesChart(7),
                statsService.getTopProducts(5)
            ]);
            setOverview(ov);
            setChartData(chart);
            setTopProducts(top);
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

                    {/* METRICS GRID SKELETON */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-2xl" />
                        ))}
                    </div>

                    {/* CHARTS SECTION SKELETON */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
                        <Skeleton className="h-96 rounded-2xl" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Resumen de tu negocio hoy</p>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Ventas Hoy"
                        value={`$${overview?.ventas_hoy?.toLocaleString() || 0}`}
                        icon={<DollarSign size={24} />}
                        subtext="Ingresos netos"
                    />
                    <StatsCard
                        title="Pedidos Hoy"
                        value={overview?.pedidos_hoy || 0}
                        icon={<ShoppingBag size={24} />}
                        subtext="Órdenes recibidas"
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
                    />
                </div>

                {/* CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* MAIN CHART */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Ventas últimos 7 días</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="fecha"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { weekday: 'short' })}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="ventas"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVentas)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* TOP PRODUCTS */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Más Vendidos</h3>
                        <div className="space-y-6">
                            {topProducts.map((prod, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm line-clamp-1">{prod.nombre}</p>
                                            <p className="text-xs text-gray-500">{prod.cantidad} ventas</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        ${prod.ingresos.toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            {topProducts.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">Sin datos aún</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
