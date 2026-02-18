import React from 'react';
import { Users } from "lucide-react";

export default function TopClientsCard({ clients }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users size={14} className="text-blue-500" /> Mejores Clientes
            </h3>
            <div className="space-y-5">
                {clients.map((client, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {idx + 1}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm line-clamp-1">{client.nombre}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{client.cantidad_pedidos} compras</p>
                            </div>
                        </div>
                        <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                            ${Number(client.total_gastado || 0).toLocaleString()}
                        </span>
                    </div>
                ))}
                {clients.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-8">Sin datos aún</p>
                )}
            </div>
        </div>
    );
}
