/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { useState } from "react";
import { CreditCard, Plus, Trash2, Truck } from "lucide-react";

export default function LogisticaPanel({ negocio, setNegocio }) {
    const [nuevoMetodoPago, setNuevoMetodoPago] = useState("");
    const [nuevoTipoEntrega, setNuevoTipoEntrega] = useState("");

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
    );
}
