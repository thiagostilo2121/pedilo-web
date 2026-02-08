/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Phone, MapPin, Clock } from "lucide-react";

export default function EstadoPanel({ negocio, setNegocio }) {
    return (
        <div className="space-y-6">
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                <div className={`absolute top-0 right-0 h-1 w-full ${negocio.acepta_pedidos ? 'bg-green-500' : 'bg-red-500'}`} />
                <h2 className="text-lg font-bold mb-4">Estado del Local</h2>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Aceptando pedidos</span>
                    <button
                        onClick={() => setNegocio({ ...negocio, acepta_pedidos: !negocio.acepta_pedidos })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${negocio.acepta_pedidos ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${negocio.acepta_pedidos ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Si apagas esto, los clientes no podrán finalizar compras.</p>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-lg font-bold mb-2">Contacto y Ubicación</h2>
                {/* Input de Teléfono y Código de País */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                        <Phone size={18} className="text-gray-400 shrink-0" />
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                <span className="text-gray-400 text-sm font-bold">+</span>
                                <input
                                    type="text"
                                    value={negocio.codigo_pais || ""}
                                    onChange={(e) => setNegocio({ ...negocio, codigo_pais: e.target.value.replace(/\D/g, '') })}
                                    className="w-10 text-sm outline-none bg-transparent font-bold"
                                    placeholder="54"
                                    maxLength={4}
                                />
                            </div>
                            <input
                                type="tel"
                                value={negocio.telefono || ""}
                                onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value.replace(/\D/g, '') })}
                                className="w-full text-sm outline-none bg-transparent font-medium"
                                placeholder="Número de WhatsApp"
                            />
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                        <MapPin size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={negocio.direccion || ""}
                            onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                            className="w-full text-sm outline-none bg-transparent"
                            placeholder="Dirección"
                        />
                    </div>

                    {/* Horarios */}
                    <div className="flex items-center gap-3 p-2 border-b border-gray-50 focus-within:border-orange-500 transition-colors">
                        <Clock size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            value={negocio.horario || ""}
                            onChange={(e) => setNegocio({ ...negocio, horario: e.target.value })}
                            className="w-full text-sm outline-none bg-transparent"
                            placeholder="Horarios (ej: Lunes a Sábados 19 a 23hs)"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
