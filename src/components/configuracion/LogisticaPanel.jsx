/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { useState } from "react";
import { CreditCard, Plus, Trash2, Truck, DollarSign, Warehouse, ShoppingBag } from "lucide-react";

export default function LogisticaPanel({ negocio, setNegocio }) {
    const [nuevoMetodoPago, setNuevoMetodoPago] = useState("");
    const [nuevoTipoEntrega, setNuevoTipoEntrega] = useState("");
    const isDistribuidora = negocio.tipo_negocio === "distribuidora";

    const handleAddMetodoPago = () => {
        const value = nuevoMetodoPago.trim();
        if (value && !negocio.metodos_pago.includes(value)) {
            setNegocio({ ...negocio, metodos_pago: [...negocio.metodos_pago, value] });
            setNuevoMetodoPago("");
        }
    };

    const handleAddTipoEntrega = () => {
        const value = nuevoTipoEntrega.trim();
        if (value && !negocio.tipos_entrega.includes(value)) {
            setNegocio({ ...negocio, tipos_entrega: [...negocio.tipos_entrega, value] });
            setNuevoTipoEntrega("");
        }
    };

    return (
        <div className="space-y-6">
            {/* Tipo de Negocio */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Warehouse className="text-indigo-500" size={20} /> Tipo de Negocio
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setNegocio({ ...negocio, tipo_negocio: "minorista" })}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left ${!isDistribuidora
                            ? "border-orange-500 bg-orange-50/50"
                            : "border-gray-100 hover:border-gray-200"
                            }`}
                    >
                        <ShoppingBag size={18} className={!isDistribuidora ? "text-orange-600 mb-1" : "text-gray-400 mb-1"} />
                        <p className="font-bold text-sm text-gray-900">Minorista</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Venta directa al público</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setNegocio({ ...negocio, tipo_negocio: "distribuidora" })}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left ${isDistribuidora
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-gray-100 hover:border-gray-200"
                            }`}
                    >
                        <Warehouse size={18} className={isDistribuidora ? "text-blue-600 mb-1" : "text-gray-400 mb-1"} />
                        <p className="font-bold text-sm text-gray-900">Distribuidora</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Venta mayorista</p>
                    </button>
                </div>
            </section>

            {/* Pedido Mínimo (distribuidora) */}
            {isDistribuidora && (
                <section className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <DollarSign className="text-blue-500" size={20} /> Pedido Mínimo
                    </h2>
                    <div className="flex gap-3 items-center">
                        <span className="text-gray-400 font-bold text-lg">$</span>
                        <input
                            type="number"
                            min="0"
                            value={negocio.pedido_minimo || 0}
                            onChange={(e) => setNegocio({ ...negocio, pedido_minimo: parseInt(e.target.value) || 0 })}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                            placeholder="0"
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                        Los clientes no podrán pedir por debajo de este monto.
                    </p>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <CreditCard className="text-blue-500" size={20} /> Pagos
                    </h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Ej: Mercado Pago"
                            value={nuevoMetodoPago}
                            onChange={(e) => setNuevoMetodoPago(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddMetodoPago}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {negocio.metodos_pago.map((m, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                                {m} <Trash2 size={12} className="cursor-pointer" onClick={() => setNegocio({ ...negocio, metodos_pago: negocio.metodos_pago.filter((_, idx) => idx !== i) })} />
                            </span>
                        ))}
                    </div>
                </section>

                <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Truck className="text-purple-500" size={20} /> Entregas
                    </h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Ej: Delivery propio"
                            value={nuevoTipoEntrega}
                            onChange={(e) => setNuevoTipoEntrega(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleAddTipoEntrega}
                            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {negocio.tipos_entrega.map((t, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold">
                                {t} <Trash2 size={12} className="cursor-pointer" onClick={() => setNegocio({ ...negocio, tipos_entrega: negocio.tipos_entrega.filter((_, idx) => idx !== i) })} />
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
