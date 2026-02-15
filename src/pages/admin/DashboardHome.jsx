import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Loader2, Plus, MessageCircle, Instagram, Users, BadgeCheck, Award, Zap, Tag, Clock, Activity, Target } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import negocioService from "../../services/negocioService";
import pedidosService from "../../services/pedidosService";

import DashboardLayout from "../../layout/DashboardLayout";

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
            const [ov, chart, top, negocioRes, orders, peakHours] = await Promise.all([
                statsService.getOverview(),
                statsService.getSalesChart(7),
                statsService.getTopProducts(5),
                negocioService.getMiNegocio(),
                pedidosService.getAll(5),
                statsService.getPeakHours().catch(() => []) // Handle potential errors gracefully
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

            // Hourly Data is now fetched from backend
            if (!peakHours || peakHours.length === 0) {
                // Keep a minimal fallback just in case backend returns empty, to avoid ugly empty chart
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

                    {/* METRICS GRID SKELETON */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 rounded-2xl" />
                        ))}
                    </div>

                    {/* CHARTS SECTION SKELETON */}
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

        // Find yesterday's sales from chartData
        // Need to be careful with Timezones. 
        // Best approach: Find the entry for the date string corresponding to "Yesterday" locally
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        // Format YYYY-MM-DD
        const yStr = yesterdayDate.toLocaleDateString('en-CA');

        let ayer = 0;
        const found = chartData.find(d => d.fecha && d.fecha.startsWith(yStr));

        if (found) {
            ayer = found.ventas;
        } else if (chartData.length >= 2) {
            // Fallback: use second to last element if last is today, or last if yesterday
            // Assuming sorted data
            const last = chartData[chartData.length - 1];
            const todayStr = new Date().toLocaleDateString('en-CA');

            if (last.fecha && last.fecha.startsWith(todayStr)) {
                ayer = chartData.length >= 2 ? chartData[chartData.length - 2].ventas : 0;
            } else {
                // Maybe last element IS yesterday? Let's check dates roughly or just assume 0
                ayer = 0;
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
                        {/* SALES AREA CHART */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight">Ventas últimos 7 días</h3>
                                <div className="px-3 py-1 bg-orange-50 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest">Ingresos Brutos</div>
                            </div>
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
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-50 flex flex-col gap-1">
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(payload[0].payload.fecha).toLocaleDateString()}</p>
                                                            <p className="text-sm font-black text-gray-900">${payload[0].value.toLocaleString()}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="ventas"
                                            stroke="#f97316"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorVentas)"
                                            activeDot={{ r: 6, strokeWidth: 0, fill: '#f97316' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* TOP DATA GRID: PRODUCTS & CLIENTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* TOP PRODUCTS */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Más Vendidos</h3>
                                <div className="space-y-5">
                                    {topProducts.map((prod, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                                    #{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{prod.nombre}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{prod.cantidad} ventas</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-black text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                                                ${prod.ingresos.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    {topProducts.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-8">Sin datos aún</p>
                                    )}
                                </div>
                            </div>

                            {/* TOP CLIENTS OR ALTERNATIVE STAT */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                {tipoNegocio === "distribuidora" ? (
                                    <>
                                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <Users size={14} className="text-blue-500" /> Mejores Clientes
                                        </h3>
                                        <div className="space-y-5">
                                            {topClients.map((client, idx) => (
                                                <div key={idx} className="flex items-center justify-between group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm line-clamp-1">{client.nombre}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{client.cantidad_pedidos} compras</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                                                        ${Number(client.total_gastado || 0).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                            {topClients.length === 0 && (
                                                <p className="text-sm text-gray-500 text-center py-8">Sin datos aún</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <ShoppingBag size={16} className="text-orange-500" /> Pedidos Recientes
                                            </h3>
                                            <a href="/dashboard/pedidos" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase underline">Ver Todos</a>
                                        </div>

                                        <div className="space-y-4">
                                            {recentOrders.length > 0 ? (
                                                recentOrders.map((order, i) => (
                                                    <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all duration-300">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${order.estado === 'pendiente' ? 'bg-orange-100 text-orange-600' :
                                                                order.estado === 'aceptado' ? 'bg-blue-100 text-blue-600' :
                                                                    'bg-green-100 text-green-600'
                                                                }`}>
                                                                #{order.codigo?.slice(-3) || order.id?.toString().slice(-3)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{order.nombre_cliente || "Cliente Web"}</p>
                                                                <p className="text-[10px] font-medium text-gray-500">{order.items?.length || 0} items</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-sm font-black text-gray-900">${order.total?.toLocaleString()}</span>
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${order.estado === 'pendiente' ? 'text-orange-600' :
                                                                order.estado === 'entregado' ? 'text-green-600' : 'text-gray-400'
                                                                }`}>{order.estado}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-10 text-center text-gray-400 text-xs font-bold italic">
                                                    No hay pedidos recientes
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: ANALYTICS & SIDEBAR (1/3) */}
                    <div className="space-y-6">
                        {/* TOP CATEGORIES RANKING */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Top Categorías</h3>
                                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">POR INGRESOS</span>
                            </div>

                            <div className="space-y-6">
                                {categoryData.length > 0 ? (
                                    categoryData.map((cat, i) => {
                                        const maxVal = Math.max(...categoryData.map(c => c.value));
                                        const percentage = (cat.value / maxVal) * 100;

                                        return (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between items-center px-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                                        <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{cat.name}</span>
                                                    </div>
                                                    <span className="text-xs font-black text-gray-900">${cat.value.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor: cat.color,
                                                            boxShadow: `0 0 10px ${cat.color}20`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="py-10 text-center text-gray-400 text-xs font-bold italic">
                                        Sin datos de categorías aún
                                    </div>
                                )}
                            </div>

                            {categoryData.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Categorías</span>
                                        <span className="text-sm font-black text-gray-900">${categoryData.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                                    </div>
                                    <Tag className="text-gray-300" size={24} />
                                </div>
                            )}
                        </div>

                        {/* PEAK HOURS BAR CHART */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap size={14} className="text-orange-500" /> Horarios Pico
                            </h3>
                            <div className="h-40 w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={hourlyData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                        <XAxis
                                            dataKey="hour"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 800 }}
                                            interval={3} // Show every 4th label to avoid clutter
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: '#f3f4f6', radius: 6 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const hour = payload[0].payload.hour;
                                                    // Add range logic if hour is "08h" -> "08:00 - 09:00"
                                                    const hourNum = parseInt(hour);
                                                    const nextHour = (hourNum + 1) % 24;
                                                    const range = `${hourNum.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`;

                                                    return (
                                                        <div className="bg-gray-900 px-3 py-2 rounded-xl shadow-xl border border-gray-800 text-white z-50">
                                                            <p className="text-[10px] font-medium text-gray-400 mb-1">{range}</p>
                                                            <p className="mt-2 text-xl font-black text-white leading-none">
                                                                {payload[0].value} <span className="text-[10px] font-bold text-gray-500 uppercase">Pedidos</span>
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar
                                            dataKey="volume"
                                            radius={[4, 4, 4, 4]}
                                            barSize={20}
                                        >
                                            {hourlyData.map((entry, index) => {
                                                // Calculate intensity based on max volume in the dataset
                                                const maxVol = Math.max(...hourlyData.map(d => d.volume)) || 1;
                                                const intensity = entry.volume / maxVol;

                                                // Dynamic color: Gray for low, Orange gradient for high
                                                let fill = "#f3f4f6";
                                                if (intensity > 0.7) fill = "#ea580c"; // High (Dark Orange)
                                                else if (intensity > 0.4) fill = "#fb923c"; // Medium (Orange)
                                                else if (intensity > 0.1) fill = "#fdba74"; // Low-Medium (Light Orange)

                                                return <Cell key={`cell-${index}`} fill={fill} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-2 flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5 h-3 items-end">
                                        <div className="w-1 h-1 bg-gray-200 rounded-sm"></div>
                                        <div className="w-1 h-2 bg-orange-300 rounded-sm"></div>
                                        <div className="w-1 h-3 bg-orange-600 rounded-sm"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400">Intensidad</span>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Últimos 30 días</span>
                            </div>
                        </div>

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
