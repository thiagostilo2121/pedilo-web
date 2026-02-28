import React from 'react';
import { X, MapPin, Clock, Phone } from 'lucide-react';

export default function BusinessInfoModal({ isOpen, onClose, negocio }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50">
                    <h3 className="font-black text-xl text-gray-900 dark:text-zinc-100">Información</h3>
                    <button onClick={onClose} className="bg-gray-200 dark:bg-white/10 p-2 rounded-full hover:bg-gray-300 transition-colors"><X size={18} /></button>
                </div>

                <div className="p-6 space-y-6">
                    {negocio.descripcion && (
                        <div className="bg-orange-50 p-4 rounded-2xl text-sm text-gray-700 dark:text-zinc-300 leading-relaxed font-medium border border-orange-100">
                            {negocio.descripcion}
                        </div>
                    )}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_primario}20`, color: negocio.color_primario || '#ea580c' }}><MapPin size={20} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-zinc-100">Dirección</h4>
                            <p className="text-gray-600 dark:text-zinc-400 text-sm">{negocio.direccion || "No especificada"}</p>
                            {negocio.direccion && <a href={`https://maps.google.com/?q=${negocio.direccion}`} target="_blank" className="text-xs font-bold mt-1 block" style={{ color: negocio.color_primario || '#ea580c' }}>Ver en Mapa</a>}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_secundario}20`, color: negocio.color_secundario || '#3b82f6' }}><Clock size={20} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-zinc-100">Horarios</h4>
                            <p className="text-gray-600 dark:text-zinc-400 text-sm whitespace-pre-line leading-relaxed">{negocio.horario || "No especificados"}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_primario}20`, color: negocio.color_primario || '#22c55e' }}><Phone size={20} /></div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-zinc-100">Contacto</h4>
                            <p className="text-gray-600 dark:text-zinc-400 text-sm">{negocio.telefono || "No especificado"}</p>
                            {negocio.telefono && <a href={`https://wa.me/${negocio.telefono.replace(/\D/g, '')}`} target="_blank" className="text-xs font-bold mt-1 block" style={{ color: negocio.color_primario || '#22c55e' }}>Enviar WhatsApp</a>}
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 text-center">
                    <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors">Entendido</button>
                </div>
            </div>
        </div>
    );
}
