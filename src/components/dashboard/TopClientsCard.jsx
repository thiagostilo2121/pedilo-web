import React from 'react';
import { Users } from "lucide-react";

export default function TopClientsCard({ clients = [] }) {
    if (!clients || !Array.isArray(clients)) return null;

    const validClients = clients.filter(c => c && typeof c.total_gastado !== 'undefined');
    const maxSpent = validClients.length > 0 ? Math.max(...validClients.map(c => Number(c.total_gastado || 0))) : 0;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 h-full">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Mejores Clientes</h3>
            <div className="space-y-5">
                {validClients.map((client, idx) => {
                    const spent = Number(client.total_gastado || 0);
                    const percentage = maxSpent > 0 ? (spent / maxSpent) * 100 : 0;

                    return (
                        <div key={idx} className="group cursor-default">
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-black text-gray-900 text-sm tracking-tight leading-snug group-hover:text-blue-600 transition-colors uppercase truncate">{client.nombre || "Cliente"}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{client.cantidad_pedidos || 0} compras</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shrink-0 whitespace-nowrap">
                                    ${spent.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
                {validClients.length === 0 && (
                    <div className="py-10 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Users size={28} className="mb-2 opacity-10" />
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-40">Sin clientes aún</p>
                    </div>
                )}
            </div>
        </div>
    );
}
