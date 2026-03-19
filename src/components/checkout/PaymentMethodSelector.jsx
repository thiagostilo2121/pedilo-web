import React from 'react';
import { CreditCard, CheckCircle2 } from "lucide-react";
import { getIconConfig } from "../../utils/checkoutIcons";

export default function PaymentMethodSelector({ register, watch, metodosPago }) {
    const metodoElegido = watch("metodo_pago");
    const metodos = metodosPago || ["Efectivo"];

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 flex items-center justify-between">
                <span>Método de Pago</span>
                {metodoElegido && (
                    <span className="text-sm px-2 py-0.5 bg-green-100 text-green-700 rounded-lg flex items-center gap-1 font-bold animate-in zoom-in">
                        <CheckCircle2 size={14} /> Seleccionado
                    </span>
                )}
            </h2>

            <div className="relative group">
                <label className="text-xs font-bold uppercase ml-1 flex items-center justify-between mb-3">
                    <span className={metodoElegido ? "text-green-600 flex items-center gap-1" : "text-gray-400 flex items-center gap-1"}>
                        <CreditCard size={14} /> ¿Cómo vas a pagar?
                    </span>
                    {!metodoElegido && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1"></span>}
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {metodos.map((m) => {
                        const { icon, colorClass } = getIconConfig(m, 'pago');
                        const isSelected = metodoElegido === m;

                        return (
                            <label key={m} className={`relative cursor-pointer group/label h-full`}>
                                <input
                                    type="radio"
                                    value={m}
                                    {...register("metodo_pago", { required: true })}
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
                                    
                                    <span className={`text-sm font-black transition-colors leading-tight
                                        ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400 group-hover/label:text-gray-900 dark:group-hover/label:text-gray-200'}`}>
                                        {m}
                                    </span>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
