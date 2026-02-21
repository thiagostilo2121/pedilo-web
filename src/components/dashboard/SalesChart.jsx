import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Loader2, Download } from "lucide-react";
import { statsService } from "../../services/statsService";

export default function SalesChart({ initialData, initialRange }) {
    const [chartData, setChartData] = useState(initialData || []);
    const [daysRange, setDaysRange] = useState(() => {
        const saved = localStorage.getItem("dashboard_days_range");
        return saved ? parseInt(saved) : (initialRange || 7);
    });
    const [chartLoading, setChartLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem("dashboard_days_range", daysRange.toString());
        loadChartData(daysRange);
    }, [daysRange]);

    const loadChartData = async (days) => {
        try {
            setChartLoading(true);
            const chart = await statsService.getSalesChart(days);
            setChartData(chart);
        } catch (error) {
            console.error("Error loading chart data", error);
        } finally {
            setChartLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (!chartData || chartData.length === 0) return;

        // Header
        let csvContent = "Fecha,Ventas ($),Cantidad de Pedidos\n";

        // Rows
        chartData.forEach(day => {
            csvContent += `${day.fecha},${day.ventas},${day.pedidos || 0}\n`;
        });

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `pedilo_ventas_${daysRange}dias_${new Date().toLocaleDateString('en-CA')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const calculateRangeTrend = () => {
        if (!chartData || chartData.length < 2) return null;

        const first = chartData[0].ventas;
        const last = chartData[chartData.length - 1].ventas;

        if (first === 0) return { text: "Tendencia positiva", color: "text-green-600", icon: "↑" };

        const diff = last - first;
        const percent = ((diff / first) * 100).toFixed(1);

        if (last > first) return { text: `Crecieron un ${percent}%`, color: "text-green-600", icon: "↑" };
        if (last < first) return { text: `Cayeron un ${Math.abs(percent)}%`, color: "text-red-600", icon: "↓" };
        return { text: "Se mantuvieron estables", color: "text-gray-500", icon: "→" };
    };

    const rangeTrend = calculateRangeTrend();

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            {/* INLINE LOADING OVERLAY */}
            {chartLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100">
                        <Loader2 size={16} className="text-orange-600 animate-spin" />
                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Actualizando...</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight">Ventas últimos {daysRange} días</h3>
                        <button
                            onClick={handleExportCSV}
                            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-95 group flex items-center gap-2"
                            title="Exportar Detalle"
                        >
                            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Exportar</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="inline-block px-2 py-0.5 bg-orange-50 rounded text-[9px] font-black text-orange-600 uppercase tracking-widest">Ingresos Brutos</div>
                        {rangeTrend && (
                            <span className={`text-[10px] font-bold ${rangeTrend.color}`}>
                                {rangeTrend.icon} {rangeTrend.text}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                    {[7, 15, 30, 90].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDaysRange(range)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${daysRange === range
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {range}D
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-80 w-full" style={{ minHeight: "320px" }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
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
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            tickFormatter={(val) => {
                                // Reemplazar guiones por barras para que JS interprete como local y no como UTC midnight
                                const d = new Date(val.replace(/-/g, '\/'));
                                if (daysRange <= 7) {
                                    return d.toLocaleDateString(undefined, { weekday: 'short' });
                                }
                                return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
                            }}
                            minTickGap={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                            tickFormatter={(val) => val >= 1000 ? `$${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : `$${val}`}
                            width={55}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const dateStr = payload[0].payload.fecha.replace(/-/g, '\/');
                                    return (
                                        <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-50 flex flex-col gap-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                {new Date(dateStr).toLocaleDateString()}
                                            </p>
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
    );
}
