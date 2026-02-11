import { useEffect, useState } from "react";
import { statsService } from "../../services/statsService";
import StatsCard from "../../components/dashboard/StatsCard";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle, Loader2, Plus, MessageCircle, Instagram } from "lucide-react";
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
                    {/* LEFT COLUMN: CHARTS + QUICK ACTIONS */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* MAIN CHART */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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

                        {/* QUICK ACTIONS */}
                        {/* QUICK ACTIONS */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Accesos Rápidos</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                <a href="/dashboard/pedidos" className="p-3 sm:p-4 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors flex flex-col items-center gap-2 group active:scale-95">
                                    <div className="p-2 bg-white rounded-full text-orange-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">Ver Pedidos</span>
                                </a>
                                <a href="/dashboard/productos" className="p-3 sm:p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors flex flex-col items-center gap-2 group active:scale-95">
                                    <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus size={20} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">Nuevo Producto</span>
                                </a>
                                <a href="/dashboard/marketing" className="p-3 sm:p-4 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors flex flex-col items-center gap-2 group active:scale-95">
                                    <div className="p-2 bg-white rounded-full text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <DollarSign size={20} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">Crear Oferta</span>
                                </a>
                                <a href="/dashboard/configuracion" className="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors flex flex-col items-center gap-2 group active:scale-95">
                                    <div className="p-2 bg-white rounded-full text-gray-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <TrendingUp size={20} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">Configurar</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                        {/* SHARE STORE SHORTCUT */}
                        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none transform group-hover:scale-150 transition-transform duration-700" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">¡Hacé crecer tu negocio!</h3>
                                <p className="text-orange-100 text-sm mb-6 leading-relaxed">
                                    Creá un flyer profesional con tu QR y logo para compartir en redes o pegar en tu local.
                                </p>
                                <a
                                    href="/dashboard/marketing"
                                    className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
                                >
                                    <ShoppingBag size={18} />
                                    Crear Flyer Gratis
                                </a>
                            </div>
                        </div>

                        {/* WHATSAPP CHANNEL WIDGET */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <MessageCircle className="text-green-500" size={20} />
                                        Canal de Novedades
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                        Unite a nuestro canal oficial de WhatsApp para recibir tips de venta, novedades y regalos exclusivos.
                                    </p>
                                    <a
                                        href="https://whatsapp.com/channel/0029Vb6K9vHKwqSYl9BJdE37"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:underline"
                                    >
                                        Unirme ahora <Plus size={16} />
                                    </a>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl text-green-600">
                                    <MessageCircle size={24} />
                                </div>
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
            </div>
        </DashboardLayout>
    );
}
