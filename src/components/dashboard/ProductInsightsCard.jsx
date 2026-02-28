import React from 'react';
import { Target, Zap, ArrowRight, Lightbulb } from "lucide-react";

export default function ProductInsightsCard({ data }) {
    if (!data) return null;

    const { anchors = [], complements = [] } = data;

    return (
        <div className="bg-gray-900 p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-800 text-white overflow-hidden relative">
            {/* Branding decorativo sutil */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-600 p-2 rounded-xl">
                    <Lightbulb size={18} className="text-white" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Inteligencia de Carrito</h3>
                    <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold">Cómo compran tus clientes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {/* PRODUCTOS ANCLA */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-orange-400">
                        <Target size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Productos Ancla</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed italic">
                        Son el motivo principal de compra. Clientes entran buscando estos items específicamente.
                    </p>
                    <div className="space-y-3">
                        {anchors.map((product, idx) => (
                            <div key={idx} className="bg-white/5 rounded-2xl p-3 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                                <div>
                                    <p className="text-xs font-black text-gray-100 uppercase tracking-tight">{product.nombre}</p>
                                    <p className="text-[9px] text-gray-500 dark:text-zinc-400 font-bold">{product.frecuencia} pedidos solitarios</p>
                                </div>
                                <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        ))}
                        {anchors.length === 0 && <p className="text-[10px] text-gray-600 dark:text-zinc-400 italic">No hay datos suficientes aún</p>}
                    </div>
                </div>

                {/* PRODUCTOS COMPLEMENTO */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-400">
                        <Zap size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Reyes del Upsell</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed italic">
                        Ideales para acompañar. Rara vez se piden solos, suelen aumentar el ticket promedio.
                    </p>
                    <div className="space-y-3">
                        {complements.map((product, idx) => (
                            <div key={idx} className="bg-white/5 rounded-2xl p-3 border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                                <div>
                                    <p className="text-xs font-black text-gray-100 uppercase tracking-tight">{product.nombre}</p>
                                    <p className="text-[9px] text-gray-500 dark:text-zinc-400 font-bold">Vendido en combos {product.frecuencia} veces</p>
                                </div>
                                <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        ))}
                        {complements.length === 0 && <p className="text-[10px] text-gray-600 dark:text-zinc-400 italic">No hay datos de combos aún</p>}
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-orange-600/20 rounded-2xl border border-orange-600/30">
                <p className="text-[10px] font-bold text-orange-200">
                    <span className="font-black uppercase mr-1 text-white">Insight:</span>
                    {anchors.length > 0 && complements.length > 0
                        ? `Considerá crear un combo que incluya "${anchors[0].nombre}" y "${complements[0].nombre}" para incentivar la compra.`
                        : "Seguí recolectando pedidos para obtener sugerencias automáticas de combos."
                    }
                </p>
            </div>
        </div>
    );
}
