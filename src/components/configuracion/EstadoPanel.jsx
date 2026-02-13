/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Phone, MapPin, Clock, Power } from "lucide-react";

export default function EstadoPanel({ negocio, setNegocio }) {
    return (
        <div className="space-y-6">
            <section className={`p-6 rounded-3xl border shadow-sm transition-all duration-300 relative overflow-hidden ${negocio.acepta_pedidos
                ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 shadow-green-200 text-white'
                : 'bg-white border-gray-200 text-gray-400'
                }`}>

                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <h2 className={`text-lg font-black tracking-tight ${negocio.acepta_pedidos ? 'text-white' : 'text-gray-900'}`}>
                            {negocio.acepta_pedidos ? 'ABIERTO' : 'CERRADO'}
                        </h2>
                        <p className={`text-xs font-medium mt-1 ${negocio.acepta_pedidos ? 'text-green-100' : 'text-gray-400'}`}>
                            {negocio.acepta_pedidos
                                ? 'Tu tienda está recibiendo pedidos.'
                                : 'No estás aceptando pedidos.'}
                        </p>
                    </div>

                    <button
                        onClick={() => setNegocio({ ...negocio, acepta_pedidos: !negocio.acepta_pedidos })}
                        className={`p-3 rounded-full shadow-lg transition-transform active:scale-90 ${negocio.acepta_pedidos ? 'bg-white text-green-600' : 'bg-gray-100 text-gray-400'}`}
                    >
                        <Power size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* Decorative Elements */}
                {negocio.acepta_pedidos && (
                    <>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                    </>
                )}
            </section>

            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-gray-400" size={18} />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Contacto</h3>
                </div>

                <div className="space-y-4">
                    {/* Input de Teléfono y Código de País */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
                            <Phone size={18} className="text-gray-400 shrink-0" />

                            <div className="flex items-center gap-2 w-full">
                                <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
                                    <span className="text-gray-400 text-sm font-bold select-none">+</span>
                                    <input
                                        type="text"
                                        value={negocio.codigo_pais || ""}
                                        onChange={(e) => setNegocio({ ...negocio, codigo_pais: e.target.value.replace(/\D/g, '') })}
                                        className="w-8 text-sm outline-none bg-transparent font-bold text-gray-900 text-center"
                                        placeholder="54"
                                        maxLength={4}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    value={negocio.telefono || ""}
                                    onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value.replace(/\D/g, '') })}
                                    className="w-full text-sm outline-none bg-transparent font-bold text-gray-900 placeholder:font-normal placeholder:text-gray-400"
                                    placeholder="N° de celular"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Dirección</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
                            <MapPin size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={negocio.direccion || ""}
                                onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                                className="w-full text-sm outline-none bg-transparent font-medium text-gray-900"
                                placeholder="Calle, Altura, Ciudad"
                            />
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Horarios</label>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Clock size={18} className="text-gray-400 shrink-0" />
                            <input
                                type="text"
                                value={negocio.horario || ""}
                                onChange={(e) => setNegocio({ ...negocio, horario: e.target.value })}
                                className="w-full text-sm outline-none bg-transparent font-medium text-gray-900"
                                placeholder="Ej: Lun a Sab 19:00 a 23:00"
                            />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
