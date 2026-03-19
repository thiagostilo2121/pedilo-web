import React, { useEffect, useState } from 'react';
import { ShoppingBag, CheckCircle2, AlertCircle } from "lucide-react";
import { calcularPrecioEfectivo } from "../../utils/precioUtils";

export default function OrderSummary({ 
    carrito, 
    negocio, 
    total, 
    discount, 
    appliedCoupon, 
    couponCode, 
    setCouponCode, 
    handleApplyCoupon, 
    removeCoupon, 
    validatingCoupon,
    cumpleMinimo,
    montoMinimo,
    faltaParaMinimo,
    isSubmitting
}) {
    // Para animación del total
    const [animateTotal, setAnimateTotal] = useState(false);
    
    useEffect(() => {
        setAnimateTotal(true);
        const t = setTimeout(() => setAnimateTotal(false), 500);
        return () => clearTimeout(t);
    }, [total, discount]);

    const finalTotal = Math.max(0, total - discount);

    return (
        <div className="space-y-6 lg:sticky lg:top-24 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">Resumen</h2>
            
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-white/10 space-y-6">
                <div className="max-h-[40vh] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {carrito.map((item) => {
                        const isWholesale = negocio?.tipo_negocio === 'distribuidora' && item.precio_mayorista && item.cantidad_mayorista && item.cantidad >= item.cantidad_mayorista;
                        
                        return (
                            <div key={item.cartItemId || item.id} className="flex justify-between items-start text-sm py-3 border-b border-gray-50 dark:border-white/5 last:border-0 group">
                                <div className="flex gap-3 min-w-0">
                                    <span className="font-black text-white bg-orange-500 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                        {item.cantidad}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-gray-800 dark:text-gray-200 font-bold truncate group-hover:text-orange-600 transition-colors">{item.nombre}</span>
                                            {isWholesale && (
                                                <span className="text-[9px] bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                                                    Mayorista
                                                </span>
                                            )}
                                        </div>
                                        {item.toppings && item.toppings.length > 0 && (
                                            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 line-clamp-2 leading-tight">
                                                {(() => {
                                                    const counts = item.toppings.reduce((acc, t) => {
                                                        acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                                        return acc;
                                                    }, {});
                                                    return Object.entries(counts)
                                                        .map(([name, count]) => count > 1 ? `${count}x ${name}` : name)
                                                        .join(" • ");
                                                })()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span className="font-black text-gray-900 dark:text-white shrink-0 ml-4">
                                    ${(calcularPrecioEfectivo(item, negocio) * item.cantidad).toFixed(0)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-6 border-t-[3px] border-dashed border-gray-100 dark:border-white/10">
                    
                    {/* CUPONES UI */}
                    <div className="mb-6">
                        {!appliedCoupon ? (
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleApplyCoupon(); }} 
                                className="flex gap-2 relative group"
                            >
                                <input
                                    type="text"
                                    placeholder="Código de descuento"
                                    className="flex-1 w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all uppercase font-bold text-gray-800 dark:text-gray-100 placeholder:normal-case placeholder:font-medium placeholder:text-gray-400"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                />
                                <button
                                    type="submit"
                                    disabled={validatingCoupon || !couponCode}
                                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-gray-900 text-white px-4 rounded-lg text-xs font-bold hover:bg-black disabled:opacity-50 transition-colors shadow-sm"
                                >
                                    {validatingCoupon ? "..." : "Aplicar"}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-3 flex justify-between items-center animate-in zoom-in-95 duration-300">
                                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                    <CheckCircle2 size={18} />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black uppercase my-2 tracking-wider leading-none">CUPÓN APLICADO</span>
                                        <span className="text-sm font-bold opacity-80">{appliedCoupon.codigo}</span>
                                    </div>
                                </div>
                                <button type="button" onClick={removeCoupon} className="text-[10px] text-red-500 uppercase tracking-widest font-black hover:underline px-2 py-1 bg-white dark:bg-zinc-800 rounded-md shadow-sm">
                                    Quitar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SUBTOTAL y DESCUENTO */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400 font-bold">
                                Subtotal {negocio?.tipo_negocio === 'distribuidora' && carrito.some(i => i.precio_mayorista && i.cantidad_mayorista && i.cantidad >= i.cantidad_mayorista) && <span className="text-[10px] font-normal opacity-70">(inc. mayorista)</span>}
                            </span>
                            <span className="font-bold text-gray-800 dark:text-gray-200">${total.toFixed(0)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between items-center text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-l-2 border-emerald-500 pl-2 py-1 pr-2 rounded animate-in slide-in-from-left-2">
                                <span className="font-black">Descuento</span>
                                <span className="font-black">-${discount.toFixed(0)}</span>
                            </div>
                        )}
                    </div>

                    {/* TOTAL FINAL ANIMADO */}
                    <div className="flex justify-between items-end mb-8 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                        <span className="text-gray-400 dark:text-gray-500 font-black uppercase my-2 tracking-widest text-[10px]">Total a pagar</span>
                        <span className={`text-4xl font-black text-orange-600 dark:text-orange-500 transition-transform duration-300 ${animateTotal ? 'scale-110 -translate-y-1' : ''}`}>
                            ${finalTotal.toFixed(0)}
                        </span>
                    </div>

                    {/* MENSAJE DE PEDIDO MÍNIMO */}
                    {!cumpleMinimo && (
                        <div className="mb-6 bg-red-50 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20 p-4 rounded-2xl flex items-start gap-3 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle size={20} className="shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-black uppercase tracking-wide">Pedido Mínimo no alcanzado</span>
                                <p className="text-sm font-medium leading-tight text-red-800 dark:text-red-300">
                                    Mínimo: <strong className="text-black dark:text-white">${montoMinimo.toLocaleString()}</strong>.<br/>
                                    Agregá <strong className="text-black dark:text-white">${faltaParaMinimo.toLocaleString()}</strong> para continuar.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* BOTÓN FINAL DE SUBMIT */}
                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={isSubmitting || carrito.length === 0 || !cumpleMinimo}
                        className={`w-full py-4 sm:py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden
                            ${isSubmitting || !cumpleMinimo 
                                ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed border outline-none border-gray-200 dark:border-white/10"
                                : "bg-gray-900 border border-gray-900 dark:border-white/10 dark:bg-zinc-100 text-white dark:text-gray-900 shadow-xl shadow-gray-900/20 dark:shadow-white/10 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                            }`}
                    >
                        {/* Brillo en botón activo */}
                        {!isSubmitting && cumpleMinimo && (
                            <div className="absolute inset-0 w-1/4 h-full bg-white/20 dark:bg-black/10 skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        )}

                        {isSubmitting ? (
                            <div className="h-6 w-6 border-4 border-gray-400 border-t-transparent animate-spin rounded-full" />
                        ) : (
                            <>
                                <span>{cumpleMinimo ? 'Confirmar y Enviar' : 'Completar Pedido'}</span>
                                <ShoppingBag size={20} className={cumpleMinimo ? "group-hover:scale-110 transition-transform" : ""} />
                            </>
                        )}
                    </button>
                    
                    {cumpleMinimo && (
                        <p className="text-center mt-3 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 opacity-80">
                            🔒 Tu pedido se envía por WhatsApp
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
