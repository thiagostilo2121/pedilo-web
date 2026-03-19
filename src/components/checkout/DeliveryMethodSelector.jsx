import React from 'react';
import { Truck, MapPin, CheckCircle2 } from "lucide-react";
import { getIconConfig } from "../../utils/checkoutIcons";

export default function DeliveryMethodSelector({ register, watch, errors, tiposEntrega }) {
    const tipoElegido = watch("tipo_entrega");
    const direccion = watch("direccion");
    const notas = watch("notas");
    
    const metodos = tiposEntrega || ["Retiro en local"];
    
    // Check if delivery is selected
    const isDelivery = tipoElegido?.toLowerCase().includes("delivery") || 
                       tipoElegido?.toLowerCase().includes("envío") || 
                       tipoElegido?.toLowerCase().includes("domicilio");
    
    // Validation flags
    const isEntregaValid = tipoElegido && (!isDelivery || (isDelivery && direccion?.length > 4));

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 flex items-center justify-between">
                <span>Entrega</span>
                {isEntregaValid && (
                    <span className="text-sm px-2 py-0.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 font-bold animate-in zoom-in">
                        <CheckCircle2 size={14} /> Completo
                    </span>
                )}
            </h2>

            <div className="relative group">
                <label className="text-xs font-bold uppercase ml-1 flex items-center justify-between mb-3">
                    <span className={tipoElegido ? "text-green-600 flex items-center gap-1" : "text-gray-400 flex items-center gap-1"}>
                        <Truck size={14} /> ¿Cómo lo recibís?
                    </span>
                    {!tipoElegido && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1"></span>}
                </label>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {metodos.map((t) => {
                        const { icon, colorClass } = getIconConfig(t, 'entrega');
                        const isSelected = tipoElegido === t;

                        return (
                            <label key={t} className="relative cursor-pointer group/label h-full">
                                <input
                                    type="radio"
                                    value={t}
                                    {...register("tipo_entrega", { required: true })}
                                    className="peer sr-only"
                                />
                                <div className={`h-full p-4 border-2 rounded-2xl bg-white dark:bg-zinc-900 transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center shadow-sm relative overflow-hidden
                                    ${isSelected 
                                        ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-500/10 ring-4 ring-orange-50 dark:ring-orange-500/5' 
                                        : 'border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 active:scale-95'}`}
                                >
                                    {/* Selection Check */}
                                    <div className={`absolute top-2 right-2 transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                                        <div className="bg-orange-500 text-white rounded-full p-0.5">
                                            <CheckCircle2 size={14} strokeWidth={4} />
                                        </div>
                                    </div>

                                    <div className={`transition-transform duration-300 flex items-center justify-center
                                        ${isSelected ? 'scale-110' : 'group-hover/label:scale-110 grayscale group-hover/label:grayscale-0'}`}>
                                        <div className={`${colorClass} p-2 rounded-full ${isSelected ? 'bg-white shadow-sm' : ''}`}>
                                            {icon}
                                        </div>
                                    </div>
                                    <span className={`text-sm font-black transition-colors leading-tight px-2
                                        ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400 group-hover/label:text-gray-900 dark:group-hover/label:text-gray-200'}`}>
                                        {t}
                                    </span>
                                </div>
                            </label>
                        );
                    })}
                </div>

                {/* CAMPO DINÁMICO DE DIRECCIÓN */}
                {isDelivery && (
                    <div className="relative animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-300 mb-6 bg-orange-50/30 dark:bg-white/5 p-4 rounded-3xl border border-orange-100 dark:border-white/10">
                        <label className="text-xs font-bold uppercase ml-1 flex justify-between">
                            <span className={direccion?.length > 4 ? "text-green-600" : "text-gray-500 dark:text-gray-300"}>Dirección de Entrega</span>
                            {direccion?.length > 4 && <CheckCircle2 size={14} className="text-green-500 mr-1 animate-in zoom-in" strokeWidth={3} />}
                        </label>
                        <div className={`mt-2 flex items-start border-2 rounded-2xl transition-all bg-white dark:bg-zinc-900 px-3 py-2
                             ${errors.direccion ? 'border-red-300 ring-4 ring-red-50' : 
                               (direccion?.length > 4) ? 'border-green-300 ring-2 ring-green-50' : 
                               'border-gray-200 dark:border-white/10 focus-within:border-orange-500'}`}
                        >
                            <MapPin size={20} className={`${direccion?.length > 4 ? 'text-green-500' : 'text-orange-500'} mt-2 shrink-0`} />
                            <textarea
                                {...register("direccion", {
                                    required: "La dirección es necesaria para el envío a domicilio",
                                    minLength: { value: 5, message: "Ingresá una dirección válida" }
                                })}
                                rows={2}
                                className="w-full p-2 focus:outline-none text-base font-bold text-gray-800 dark:text-gray-100 resize-none bg-transparent placeholder:opacity-50"
                                placeholder="Ej: Av. Siempreviva 742, timbre 2..."
                            />
                        </div>
                        {errors.direccion && <span className="absolute -bottom-5 left-4 text-[10px] text-red-500 font-bold">{errors.direccion.message}</span>}
                    </div>
                )}

                {/* NOTAS */}
                <div className="relative mb-2">
                    <label className="text-xs font-bold uppercase ml-1 flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Notas Adicionales <span className="font-normal opacity-70">(Opcional)</span></span>
                        {notas?.length > 0 && <CheckCircle2 size={14} className="text-gray-400 mr-1 animate-in zoom-in" strokeWidth={3} />}
                    </label>
                    <div className="mt-2 flex items-start border-2 rounded-2xl transition-colors bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 focus-within:border-gray-400 px-3 py-2">
                        <textarea
                            {...register("notas")}
                            rows={2}
                            className="w-full p-2 focus:outline-none text-base font-bold text-gray-800 dark:text-gray-100 resize-none bg-transparent placeholder:opacity-40"
                            placeholder="Aclaraciones, instrucciones para el delivery, billete con el que pagás..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
