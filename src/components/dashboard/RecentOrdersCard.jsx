import React from 'react';
import { ShoppingBag } from "lucide-react";

export default function RecentOrdersCard({ orders }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag size={16} className="text-orange-500" /> Pedidos Recientes
                </h3>
                <a href="/dashboard/pedidos" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase underline">Ver Todos</a>
            </div>

            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map((order, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${order.estado === 'pendiente' ? 'bg-orange-100 text-orange-600' :
                                    order.estado === 'aceptado' ? 'bg-blue-100 text-blue-600' :
                                        'bg-green-100 text-green-600'
                                    }`}>
                                    #{order.codigo?.slice(-3) || order.id?.toString().slice(-3)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{order.nombre_cliente || "Cliente Web"}</p>
                                    <p className="text-[10px] font-medium text-gray-500">{order.items?.length || 0} items</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-black text-gray-900">${order.total?.toLocaleString()}</span>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${order.estado === 'pendiente' ? 'text-orange-600' :
                                    order.estado === 'entregado' ? 'text-green-600' : 'text-gray-400'
                                    }`}>{order.estado}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-400 text-xs font-bold italic">
                        No hay pedidos recientes
                    </div>
                )}
            </div>
        </div>
    );
}
