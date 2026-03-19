import React from 'react';
import { CheckCircle2, MessageSquare, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { getCheckoutMessage, BuildWhatsAppUrl } from "../../utils/whatsappFormatter";
import { toast } from "react-hot-toast";

export default function OrderSuccessScreen({ pedido, negocio, slug, navigate }) {
    
    // Auto-scroll al instante de renderizar el success
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Simular un sonido sutil de éxito o disparar confeti (requiere librería externa, lo emulamos con la escala inicial)
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pedido.codigo);
        toast.success("Código de seguimiento copiado", { icon: "📋" });
    };

    return (
        <div className="max-w-lg mx-auto px-4 py-8 md:py-16 text-center animate-in fade-in zoom-in-95 duration-700 relative">
            
            {/* Confetti Background Decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-20 dark:opacity-5">
                <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-40 left-1/4 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-500"></div>
                <div className="absolute top-30 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-700"></div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-green-500/10 border border-gray-100 dark:border-white/10 p-6 sm:p-10 space-y-8">
                
                {/* Header Animado */}
                <div className="flex flex-col items-center gap-4 relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse"></div>
                    <div className="bg-green-100 dark:bg-green-500/20 p-5 rounded-full ring-8 ring-green-50 dark:ring-green-500/5 animate-[bounce_1s_ease-out]">
                        <CheckCircle2 size={56} className="text-green-600 dark:text-green-400" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">¡Pedido Listo!</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5 font-bold">Ya creamos tu código de orden.</p>
                    </div>
                </div>

                {/* Código de Seguimiento Interactivo */}
                <button 
                    onClick={copyToClipboard}
                    className="w-full py-8 bg-gray-50 dark:bg-zinc-800/50 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/20 hover:border-orange-500 dark:hover:border-orange-500/50 transition-all group flex flex-col items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest leading-none group-hover:text-orange-500 transition-colors">
                        Código de Seguimiento (Toca para copiar)
                    </p>
                    <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                        {pedido.codigo}
                    </p>
                </button>

                {/* 🚨 RECORDATORIO CRITICO DE WHATSAPP 🚨 */}
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-5 rounded-2xl flex flex-col items-center gap-3 text-center shadow-inner relative overflow-hidden animate-in slide-in-from-bottom-5 delay-500">
                    <div className="absolute -right-4 -top-4 text-red-100 dark:text-red-900/30">
                        <AlertTriangle size={80} strokeWidth={3} />
                    </div>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-black relative z-10">
                        <AlertTriangle size={24} className="animate-pulse" /> 
                        <span className="uppercase tracking-wide text-lg">Importante</span>
                    </div>
                    <p className="text-sm font-bold text-red-900 dark:text-red-300 leading-snug relative z-10">
                        El negocio puede rechazar tu pedido si no envías un mensaje en WhatsApp.  
                    </p>
                </div>

                {/* CTA Acciones */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/10">
                    {negocio.telefono && (
                        <a
                            href={BuildWhatsAppUrl((negocio.codigo_pais || "") + negocio.telefono, getCheckoutMessage(negocio, pedido))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/20 active:scale-[0.98] group"
                        >
                            <MessageSquare size={24} fill="currentColor" className="group-hover:scale-110 transition-transform animate-pulse" /> 
                            <span>MANDAR PEDIDO AL LOCAL</span>
                        </a>
                    )}
                    
                    <button
                        onClick={() => navigate(`/n/${slug}`)}
                        className="flex justify-center items-center gap-2 w-full text-gray-400 dark:text-gray-500 font-bold text-sm py-3 hover:text-gray-900 dark:hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio del menú
                    </button>
                    
                    <div className="flex justify-center text-xs text-gray-300 dark:text-gray-600 font-bold items-center gap-1 mt-6 opacity-50">
                        <RefreshCw size={12} /> Powered by Pedilo
                    </div>
                </div>
            </div>
        </div>
    );
}
