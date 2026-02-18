import React from 'react';
import { Tag } from "lucide-react";

export default function CategoryRankingCard({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Top Categorías</h3>
                </div>
                <div className="py-10 text-center text-gray-400 text-xs font-bold italic">
                    Sin datos de categorías aún
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Top Categorías</h3>
                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">POR INGRESOS</span>
            </div>

            <div className="space-y-6">
                {data.map((cat, i) => {
                    const maxVal = Math.max(...data.map(c => c.value));
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
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Categorías</span>
                    <span className="text-sm font-black text-gray-900">${data.reduce((a, b) => a + b.value, 0).toLocaleString()}</span>
                </div>
                <Tag className="text-gray-300" size={24} />
            </div>
        </div>
    );
}
