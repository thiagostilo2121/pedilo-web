/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { useState } from "react";
import { CreditCard, Plus, Trash2, Truck, DollarSign, Warehouse, ShoppingBag, Check } from "lucide-react";

export default function LogisticaPanel({ negocio, setNegocio }) {
    const [nuevoMetodoPago, setNuevoMetodoPago] = useState("");
    const [nuevoTipoEntrega, setNuevoTipoEntrega] = useState("");
    const isDistribuidora = negocio.tipo_negocio === "distribuidora";

    const handleAddMetodoPago = (e) => {
        e.preventDefault();
        const value = nuevoMetodoPago.trim();
        if (value && !negocio.metodos_pago.includes(value)) {
            setNegocio({ ...negocio, metodos_pago: [...negocio.metodos_pago, value] });
            setNuevoMetodoPago("");
        }
    };

    const handleAddTipoEntrega = (e) => {
        e.preventDefault();
        const value = nuevoTipoEntrega.trim();
        if (value && !negocio.tipos_entrega.includes(value)) {
            setNegocio({ ...negocio, tipos_entrega: [...negocio.tipos_entrega, value] });
            setNuevoTipoEntrega("");
        }
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">

            {/* TIPO DE NEGOCIO */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Warehouse className="text-gray-400" size={18} />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Modelo de Negocio</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setNegocio({ ...negocio, tipo_negocio: "minorista" })}
                        className={`group relative p-5 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${!isDistribuidora
                            ? "border-orange-500 bg-orange-50/50 shadow-sm"
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 bg-white"
                            }`}
                    >
                        <div className={`p-3 rounded-xl transition-colors ${!isDistribuidora ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400 group-hover:bg-white"}`}>
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className={`font-black text-sm mb-1 ${!isDistribuidora ? "text-orange-900" : "text-gray-900"}`}>Minorista</p>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">Venta directa al consumidor final (B2C).</p>
                        </div>
                        {!isDistribuidora && (
                            <div className="absolute top-4 right-4 bg-orange-500 text-white p-1 rounded-full shadow-sm">
                                <Check size={12} strokeWidth={4} />
                            </div>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setNegocio({ ...negocio, tipo_negocio: "distribuidora" })}
                        className={`group relative p-5 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${isDistribuidora
                            ? "border-blue-500 bg-blue-50/50 shadow-sm"
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 bg-white"
                            }`}
                    >
                        <div className={`p-3 rounded-xl transition-colors ${isDistribuidora ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400 group-hover:bg-white"}`}>
                            <Warehouse size={24} />
                        </div>
                        <div>
                            <p className={`font-black text-sm mb-1 ${isDistribuidora ? "text-blue-900" : "text-gray-900"}`}>Mayorista / Distribuidora</p>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">Venta por volumen a comercios (B2B).</p>
                        </div>
                        {isDistribuidora && (
                            <div className="absolute top-4 right-4 bg-blue-500 text-white p-1 rounded-full shadow-sm">
                                <Check size={12} strokeWidth={4} />
                            </div>
                        )}
                    </button>
                </div>
            </section>

            {/* EXTENSIÓN: PEDIDO MÍNIMO (Solo Distribuidoras) */}
            {isDistribuidora && (
                <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <label className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3 block flex items-center gap-2">
                            <DollarSign size={14} /> Mínimo de Compra
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                            <div className="relative w-full sm:flex-1 sm:max-w-xs">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-black text-lg">$</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={negocio.pedido_minimo || 0}
                                    onChange={(e) => setNegocio({ ...negocio, pedido_minimo: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl text-lg font-black text-blue-900 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-blue-300"
                                    placeholder="0"
                                />
                            </div>
                            <p className="text-xs text-blue-600/80 font-medium sm:max-w-sm">
                                Los clientes no podrán finalizar el pedido si el total es menor a este monto.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <hr className="border-gray-100" />

            {/* MÉTODOS DE PAGO Y ENVÍO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* PAGOS */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <CreditCard className="text-gray-400" size={18} />
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Métodos de Pago</h3>
                    </div>

                    <form onSubmit={handleAddMetodoPago} className="flex gap-2 relative">
                        <input
                            type="text"
                            placeholder="Ej: Mercado Pago, Efectivo..."
                            value={nuevoMetodoPago}
                            onChange={(e) => setNuevoMetodoPago(e.target.value)}
                            className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border-gray-100 rounded-xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!nuevoMetodoPago.trim()}
                            className="absolute right-1.5 top-1.5 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 disabled:bg-gray-300 transition-all shadow-md"
                        >
                            <Plus size={16} />
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 min-h-[40px] content-start">
                        {negocio.metodos_pago.length > 0 ? (
                            negocio.metodos_pago.map((m, i) => (
                                <span key={i} className="group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 shadow-sm hover:border-gray-300 transition-all cursor-default select-none animate-in zoom-in-95 duration-200">
                                    {m}
                                    <button
                                        type="button"
                                        onClick={() => setNegocio({ ...negocio, metodos_pago: negocio.metodos_pago.filter((_, idx) => idx !== i) })}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 italic py-2">No agregaste métodos de pago aún.</p>
                        )}
                    </div>
                </section>

                {/* ENVÍOS */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Truck className="text-gray-400" size={18} />
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Tipos de Entrega</h3>
                    </div>

                    <form onSubmit={handleAddTipoEntrega} className="flex gap-2 relative">
                        <input
                            type="text"
                            placeholder="Ej: Delivery propio, Retiro..."
                            value={nuevoTipoEntrega}
                            onChange={(e) => setNuevoTipoEntrega(e.target.value)}
                            className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border-gray-100 rounded-xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!nuevoTipoEntrega.trim()}
                            className="absolute right-1.5 top-1.5 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 disabled:bg-gray-300 transition-all shadow-md"
                        >
                            <Plus size={16} />
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 min-h-[40px] content-start">
                        {negocio.tipos_entrega.length > 0 ? (
                            negocio.tipos_entrega.map((t, i) => (
                                <span key={i} className="group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 shadow-sm hover:border-gray-300 transition-all cursor-default select-none animate-in zoom-in-95 duration-200">
                                    {t}
                                    <button
                                        type="button"
                                        onClick={() => setNegocio({ ...negocio, tipos_entrega: negocio.tipos_entrega.filter((_, idx) => idx !== i) })}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 italic py-2">No agregaste tipos de entrega aún.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
