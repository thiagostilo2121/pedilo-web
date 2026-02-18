import React from 'react';

export default function TopProductsCard({ products }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Más Vendidos</h3>
            <div className="space-y-5">
                {products.map((prod, idx) => (
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
                {products.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-8">Sin datos aún</p>
                )}
            </div>
        </div>
    );
}
