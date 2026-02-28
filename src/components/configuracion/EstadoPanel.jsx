/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Phone, MapPin, Clock, Power } from "lucide-react";
import Card from "../dashboard/Card";
import SectionHeader from "../dashboard/SectionHeader";
import FormField from "../dashboard/FormField";

export default function EstadoPanel({ negocio, setNegocio }) {
    return (
        <div className="space-y-6">
            <section className={`p-6 rounded-3xl border shadow-sm transition-all duration-300 relative overflow-hidden ${negocio.acepta_pedidos
                ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 shadow-green-200 text-white'
                : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-500'
                }`}>

                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <h2 className={`text-lg font-black tracking-tight ${negocio.acepta_pedidos ? 'text-white' : 'text-gray-900 dark:text-zinc-100'}`}>
                            {negocio.acepta_pedidos ? 'ABIERTO' : 'CERRADO'}
                        </h2>
                        <p className={`text-xs font-medium mt-1 ${negocio.acepta_pedidos ? 'text-green-100' : 'text-gray-400 dark:text-zinc-500'}`}>
                            {negocio.acepta_pedidos
                                ? 'Tu tienda está recibiendo pedidos.'
                                : 'No estás aceptando pedidos.'}
                        </p>
                    </div>

                    <button
                        onClick={() => setNegocio({ ...negocio, acepta_pedidos: !negocio.acepta_pedidos })}
                        className={`p-3 rounded-full shadow-lg transition-transform active:scale-90 ${negocio.acepta_pedidos ? 'bg-white text-green-600' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-zinc-500'}`}
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

            <Card className="space-y-5">
                <SectionHeader icon={MapPin} title="Contacto" className="mb-2" />

                <div className="space-y-4">
                    {/* Input de Teléfono y Código de País */}
                    <FormField label="WhatsApp">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
                            <Phone size={18} className="text-gray-400 dark:text-zinc-500 shrink-0" />

                            <div className="flex items-center gap-2 w-full">
                                <div className="flex items-center gap-1 pr-2 border-r border-gray-200 dark:border-white/10">
                                    <span className="text-gray-400 dark:text-zinc-500 text-sm font-bold select-none">+</span>
                                    <input
                                        type="text"
                                        value={negocio.codigo_pais || ""}
                                        onChange={(e) => setNegocio({ ...negocio, codigo_pais: e.target.value.replace(/\D/g, '') })}
                                        className="w-8 text-sm outline-none bg-transparent font-bold text-gray-900 dark:text-zinc-100 text-center"
                                        placeholder="54"
                                        maxLength={4}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    value={negocio.telefono || ""}
                                    onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value.replace(/\D/g, '') })}
                                    className="w-full text-sm outline-none bg-transparent font-bold text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                                    placeholder="N° de celular"
                                />
                            </div>
                        </div>
                    </FormField>

                    {/* Dirección */}
                    <FormField label="Dirección">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
                            <MapPin size={18} className="text-gray-400 dark:text-zinc-500 shrink-0" />
                            <input
                                type="text"
                                value={negocio.direccion || ""}
                                onChange={(e) => setNegocio({ ...negocio, direccion: e.target.value })}
                                className="w-full text-sm outline-none bg-transparent font-medium text-gray-900 dark:text-zinc-100"
                                placeholder="Calle, Altura, Ciudad"
                            />
                        </div>
                    </FormField>

                    {/* Horarios */}
                    <FormField label="Horarios">
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Clock size={18} className="text-gray-400 dark:text-zinc-500 shrink-0" />
                            <input
                                type="text"
                                value={negocio.horario || ""}
                                onChange={(e) => setNegocio({ ...negocio, horario: e.target.value })}
                                className="w-full text-sm outline-none bg-transparent font-medium text-gray-900 dark:text-zinc-100"
                                placeholder="Ej: Lun a Sab 19:00 a 23:00"
                            />
                        </div>
                    </FormField>

                </div>
            </Card>
        </div>
    );
}
