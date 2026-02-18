import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { calcularTotalCarrito } from '../../utils/precioUtils';

export default function FloatingCartButton({ carrito, negocio, onClick }) {
    if (carrito.length === 0) return null;

    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const totalAmount = calcularTotalCarrito(carrito, negocio);
    const isDistribuidora = negocio.tipo_negocio === 'distribuidora';
    const belowMinimum = isDistribuidora && negocio.pedido_minimo > 0 && totalAmount < negocio.pedido_minimo;

    return (
        <div className="fixed bottom-6 inset-x-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-2xl mx-auto">
            <button
                onClick={onClick}
                className="w-full text-white p-2 pl-6 pr-2 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl bg-opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ backgroundColor: negocio.color_primario || '#111827', boxShadow: `0 20px 25px -5px ${negocio.color_primario}40` }}
            >
                <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{totalItems} ITEMS</span>
                    <span className="text-xl font-black">${totalAmount.toFixed(0)}</span>

                    {belowMinimum && (
                        <div className="w-20 h-1 bg-black/20 rounded-full mt-1 overflow-hidden relative">
                            <div
                                className="absolute left-0 top-0 h-full bg-white/90 rounded-full"
                                style={{ width: `${Math.min(100, (totalAmount / negocio.pedido_minimo) * 100)}%` }}
                            />
                        </div>
                    )}
                </div>
                <div className="bg-white text-gray-900 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    Ver Pedido <ShoppingBag size={18} />
                </div>
            </button>
        </div>
    );
}
