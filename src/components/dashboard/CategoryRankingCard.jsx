import React from 'react';
import { Tag } from "lucide-react";
import Card from "./Card";

export default function CategoryRankingCard({ data }) {
    if (!data || data.length === 0) {
        return (
            <Card>
                <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6">Categorías</h3>
                <div className="py-12 flex flex-col items-center justify-center text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                    <Tag size={28} className="mb-2 opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-widest italic opacity-40">Sin datos aún</p>
                </div>
            </Card>
        );
    }

    const maxVal = Math.max(...data.map(c => c.value));
    const totalValue = data.reduce((a, b) => a + b.value, 0);

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Categorías</h3>
                <span className="text-[9px] font-black text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-lg border border-orange-100 dark:border-orange-800">INGRESOS</span>
            </div>

            <div className="space-y-5">
                {data.map((cat, i) => {
                    const percentage = maxVal > 0 ? (cat.value / maxVal) * 100 : 0;

                    return (
                        <div key={i} className="space-y-2 group cursor-default">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125" style={{ backgroundColor: cat.color }} />
                                    <span className="text-xs font-black text-gray-700 dark:text-zinc-300 uppercase tracking-tight group-hover:text-gray-900 dark:hover:text-zinc-100 dark:text-zinc-100 dark:hover:text-zinc-100 dark:text-zinc-100 dark:group-hover:text-gray-100 transition-colors">{cat.name}</span>
                                </div>
                                <span className="text-xs font-black text-gray-900 dark:text-zinc-100 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-gray-100 dark:border-white/10">${cat.value.toLocaleString()}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden border border-gray-100/50 dark:border-0">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: cat.color,
                                        boxShadow: `0 0 8px ${cat.color}30`
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-50 dark:border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Total</span>
                    <span className="text-sm font-black text-gray-900 dark:text-zinc-100">${totalValue.toLocaleString()}</span>
                </div>
                <Tag className="text-gray-200 dark:text-gray-700 dark:text-zinc-300" size={20} />
            </div>
        </Card>
    );
}
