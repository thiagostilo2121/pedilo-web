import React from 'react';
import { User, Phone, CheckCircle2 } from "lucide-react";

export default function CheckoutForm({ register, errors, watch, colorPrimario }) {
    const nombre = watch("nombre_cliente");
    const telefono = watch("telefono_cliente");
    const codigoPais = watch("codigo_pais_cliente");
    
    // Validamos que nombre tenga al menos 3 caracteres y telefono 8
    const isNombreValid = nombre?.length >= 3;
    const isTelefonoValid = telefono?.length >= 8 && codigoPais?.length >= 1;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 flex items-center justify-between">
                <span>Tus Datos</span>
                {isNombreValid && isTelefonoValid && (
                    <span className="text-sm px-2 py-0.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 font-bold animate-in zoom-in">
                        <CheckCircle2 size={14} /> Listo
                    </span>
                )}
            </h2>

            <div className="space-y-5">
                <div className="relative group">
                    <label className="text-xs font-bold uppercase ml-1 flex items-center justify-between">
                        <span className={isNombreValid ? "text-green-600" : "text-gray-400"}>Nombre Completo</span>
                        {!isNombreValid && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1"></span>}
                    </label>
                    <div className={`mt-1 flex items-center border-2 rounded-2xl transition-all shadow-sm bg-white dark:bg-zinc-900 px-3 py-1.5 
                        ${errors.nombre_cliente ? 'border-red-300 ring-4 ring-red-50' : 
                          isNombreValid ? 'border-green-300 ring-4 ring-green-50' : 
                          'border-gray-200 dark:border-white/10 group-focus-within:border-gray-300'}`}
                         style={!errors.nombre_cliente && !isNombreValid ? { '--tw-ring-color': colorPrimario || '#ea580c', borderBottomColor: 'var(--tw-ring-color)' } : {}}
                    >
                        <User size={18} className={`${isNombreValid ? 'text-green-500' : 'text-gray-400'}`} />
                        <input
                            {...register("nombre_cliente", { required: "El nombre es obligatorio", minLength: { value: 3, message: "Mínimo 3 letras" } })}
                            className="w-full p-2 focus:outline-none text-base font-bold text-gray-800 dark:text-gray-100 bg-transparent"
                            placeholder="Ej: Juan Pérez"
                        />
                        {isNombreValid && <CheckCircle2 size={16} className="text-green-500 mr-1 animate-in zoom-in" strokeWidth={3} />}
                    </div>
                    {errors.nombre_cliente && <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold">{errors.nombre_cliente.message}</span>}
                </div>

                <div className="relative group pt-2">
                    <label className="text-xs font-bold uppercase ml-1 flex items-center justify-between">
                        <span className={isTelefonoValid ? "text-green-600" : "text-gray-400"}>WhatsApp</span>
                        {!isTelefonoValid && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1"></span>}
                    </label>
                    <div className="mt-1 flex gap-2">
                        {/* Código de País */}
                        <div className={`w-20 sm:w-24 shrink-0 flex items-center border-2 rounded-2xl transition-all shadow-sm bg-white dark:bg-zinc-900 px-2 sm:px-3 py-1.5
                             ${errors.codigo_pais_cliente ? 'border-red-300' : isTelefonoValid ? 'border-green-300' : 'border-gray-200 dark:border-white/10'}`}
                        >
                            <span className="text-gray-400 text-sm font-black mr-1">+</span>
                            <input
                                {...register("codigo_pais_cliente", { required: true })}
                                className="w-full p-2 focus:outline-none text-base font-bold text-gray-800 dark:text-gray-100 min-w-0 bg-transparent text-center"
                                placeholder="54"
                                maxLength={4}
                            />
                        </div>

                        {/* Teléfono */}
                        <div className={`flex-1 min-w-0 flex items-center border-2 rounded-2xl transition-all shadow-sm bg-white dark:bg-zinc-900 px-3 py-1.5
                            ${errors.telefono_cliente ? 'border-red-300 ring-4 ring-red-50' : 
                              isTelefonoValid ? 'border-green-300 ring-4 ring-green-50' : 
                              'border-gray-200 dark:border-white/10 group-focus-within:border-gray-300'}`}
                        >
                            <Phone size={18} className={`${isTelefonoValid ? 'text-green-500' : 'text-gray-400'} shrink-0`} />
                            <input
                                {...register("telefono_cliente", {
                                    required: "El teléfono es necesario",
                                    minLength: { value: 8, message: "Teléfono inválido" },
                                    onChange: (e) => {
                                        const val = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || e.target.value.replace(/\D/g, '');
                                        e.target.value = val;
                                    }
                                })}
                                className="w-full p-2 focus:outline-none text-base font-bold text-gray-800 dark:text-gray-100 min-w-0 bg-transparent tracking-wide"
                                type="tel"
                                placeholder="11 2233 4455"
                            />
                            {isTelefonoValid && <CheckCircle2 size={16} className="text-green-500 mr-1 animate-in zoom-in" strokeWidth={3} />}
                        </div>
                    </div>
                    {(errors.telefono_cliente || errors.codigo_pais_cliente) && (
                        <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold">
                            {errors.telefono_cliente?.message || "Ingresá tu código y teléfono"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
