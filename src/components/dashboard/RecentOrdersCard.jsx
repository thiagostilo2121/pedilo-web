import React from 'react';
import { ShoppingBag, ChevronRight } from "lucide-react";
import Card from "./Card";

export default function RecentOrdersCard({ orders = [] }) {
    if (!orders || !Array.isArray(orders)) return null;

    const validOrders = orders.filter(o => o && o.id);

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s === 'pendiente') return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
        if (s === 'aceptado') return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
        if (s === 'en_progreso') return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
        if (s === 'finalizado') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
        return 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-400 border-gray-200 dark:border-white/10';
    };

    return (
        <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                        Actividad Reciente
                    </h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 hidden sm:flex">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></span>
                        <span className="text-[8px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest leading-none mt-px">EN VIVO</span>
                    </div>
                </div>
                <a href="/dashboard/pedidos" className="flex items-center gap-1 text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider group transition-all">
                    Ver Todos <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>

            <div className="space-y-3">
                {validOrders.length > 0 ? (
                    validOrders.map((order, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100/50 dark:border-white/10 flex items-center justify-between gap-3 group hover:bg-white dark:bg-zinc-900 dark:hover:bg-white/5 hover:shadow-lg hover:shadow-orange-600/5 transition-all duration-300">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center font-black text-[10px] text-gray-400 dark:text-zinc-500 shrink-0 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-colors">
                                    #{order.codigo?.slice(-4) || String(order.id).slice(-3)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-gray-900 dark:text-zinc-100 truncate uppercase tracking-tight">{order.nombre_cliente || "Cliente Web"}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md border ${getStatusColor(order.estado)} uppercase tracking-tighter whitespace-nowrap`}>
                                            {order.estado?.replace('_', ' ') || '?'}
                                        </span>
                                        <span className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 flex items-center gap-1 whitespace-nowrap">
                                            <ShoppingBag size={8} /> {order.items?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-sm font-black text-gray-900 dark:text-zinc-100 tracking-tighter whitespace-nowrap">${Number(order.total || 0).toLocaleString()}</p>
                                <p className="text-[8px] font-bold text-gray-400 dark:text-zinc-500 uppercase">Total</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 flex flex-col items-center justify-center text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                        <ShoppingBag size={28} className="mb-2 opacity-10" />
                        <p className="text-[10px] font-black uppercase tracking-widest italic opacity-40">No hay pedidos hoy</p>
                    </div>
                )}
            </div>
        </Card>
    );
}
