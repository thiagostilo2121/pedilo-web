import React from 'react';


export default function WeeklyHeatmap({ data }) {
    if (!data || data.length === 0) return null;

    let maxOrders = 0;
    data.forEach(day => {
        Object.values(day.slots).forEach(val => {
            if (val > maxOrders) maxOrders = val;
        });
    });

    const getIntensityClass = (value) => {
        if (value === 0) return 'bg-gray-50';
        const ratio = value / maxOrders;
        if (ratio < 0.2) return 'bg-orange-100';
        if (ratio < 0.4) return 'bg-orange-200';
        if (ratio < 0.6) return 'bg-orange-300';
        if (ratio < 0.8) return 'bg-orange-400';
        return 'bg-orange-600';
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Mapa de Calor</h3>
                    <p className="text-xs text-gray-900 font-black mt-1 uppercase tracking-tight">Demanda Semanal</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-2xl border border-gray-100">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Menos</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-[4px] bg-gray-50 border border-gray-200" />
                        <div className="w-2.5 h-2.5 rounded-[4px] bg-orange-200" />
                        <div className="w-2.5 h-2.5 rounded-[4px] bg-orange-400" />
                        <div className="w-2.5 h-2.5 rounded-[4px] bg-orange-600 shadow-sm shadow-orange-200" />
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Más</span>
                </div>
            </div>

            <div className="relative">
                <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 scroll-smooth">
                    <div className="min-w-[600px] mb-2 px-2">
                        {/* Header Horas */}
                        <div className="flex mb-4">
                            <div className="w-12 shrink-0" />
                            <div className="flex-1 flex justify-between px-1">
                                {[0, 4, 8, 12, 16, 20, 23].map((h) => (
                                    <div key={h} className="text-center" style={{ width: '4%' }}>
                                        <span className="text-[9px] font-black text-gray-300 uppercase">{h}h</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grilla */}
                        <div className="space-y-1.5">
                            {data.map((dayData, dIdx) => (
                                <div key={dIdx} className="flex items-center group">
                                    <span className="w-12 text-[10px] font-black text-gray-400 uppercase tracking-tighter shrink-0 border-r border-gray-50 pr-3 text-right group-hover:text-orange-600 transition-colors">
                                        {dayData.day}
                                    </span>
                                    <div className="flex-1 flex gap-1 px-2">
                                        {Object.entries(dayData.slots).map(([hour, count], hIdx) => (
                                            <div
                                                key={hIdx}
                                                title={`${dayData.day} ${hour}: ${count} pedidos`}
                                                className={`h-7 w-full rounded-[4px] transition-all duration-300 cursor-help ${getIntensityClass(count)} hover:scale-125 hover:z-10 hover:shadow-lg hover:shadow-orange-500/20`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50">
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest italic">
                    * Datos reales acumulados últimos 30 días
                </p>
            </div>
        </div>
    );
}
