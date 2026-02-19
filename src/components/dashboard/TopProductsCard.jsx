import React from 'react';
import { ShoppingBag } from "lucide-react";

export default function TopProductsCard({ products = [] }) {
    if (!products || !Array.isArray(products)) return null;

    const validProducts = products.filter(p => p && typeof p.cantidad === 'number');
    const maxSales = validProducts.length > 0 ? Math.max(...validProducts.map(p => p.cantidad)) : 0;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 h-full">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Top Productos</h3>
            <div className="space-y-5">
                {validProducts.map((prod, idx) => {
                    const percentage = maxSales > 0 ? (prod.cantidad / maxSales) * 100 : 0;

                    return (
                        <div key={idx} className="group cursor-default">
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-black text-gray-900 text-sm tracking-tight leading-snug group-hover:text-orange-600 transition-colors uppercase truncate">{prod.nombre || "Sin nombre"}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{prod.cantidad} ventas</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 shrink-0 whitespace-nowrap">
                                    ${Number(prod.ingresos || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
                {validProducts.length === 0 && (
                    <div className="py-10 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <ShoppingBag size={28} className="mb-2 opacity-10" />
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-40">Sin ventas aún</p>
                    </div>
                )}
            </div>
        </div>
    );
}
