/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { DEFAULT_LOGO } from '../../constants';
import DynamicIcon from '../common/DynamicIcon';

export default function BusinessHero({ negocio, onShowInfo }) {
    return (
        <header className="relative w-full h-[45vh] max-h-[420px] min-h-[340px] bg-gray-900 overflow-hidden group">
            <div className="absolute inset-0">
                <img
                    src={negocio.banner_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"}
                    className="w-full h-full object-cover opacity-90 blur-[2px] scale-105 group-hover:scale-100 transition-transform duration-[3s]"
                    alt="Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 pb-12 z-20 max-w-4xl mx-auto inset-x-0">
                <div className="flex items-end gap-5">
                    <div className="relative shrink-0">
                        <img src={negocio.logo_url || DEFAULT_LOGO} className="w-24 h-24 rounded-[1.8rem] border-[3px] border-white shadow-2xl object-cover bg-white dark:bg-zinc-900" alt="Logo Big" />
                        <div className={`absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md border border-white/10 ${negocio.acepta_pedidos ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                            <span className={`w-2 h-2 rounded-full ${negocio.acepta_pedidos ? 'bg-white dark:bg-zinc-900 animate-pulse' : 'bg-white/50'}`}></span>
                            {negocio.acepta_pedidos ? 'Abierto' : 'Cerrado'}
                        </div>
                    </div>

                    <div className="flex-1 text-white mb-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h1 className="text-3xl sm:text-4xl font-black leading-none drop-shadow-lg">{negocio.nombre}</h1>

                            {/* REPUTATION BADGES */}
                            {negocio.insignias?.map((badge) => {
                                const isFounder = badge.id === 'FOUNDER';

                                // FOUNDER BADGE: Special Pill Design
                                if (isFounder) {
                                    return (
                                        <div key={badge.id} className="group/badge relative flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/40 animate-pulse border border-white/20">
                                            <DynamicIcon name={badge.icon} size={14} className="text-white drop-shadow-sm" />
                                            <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow-sm">FUNDADOR</span>

                                            {/* TOOLTIP */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-white/10">
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <span className="text-yellow-400">{badge.name}</span>
                                                    <span className="text-[9px] text-gray-400 dark:text-zinc-500 font-normal">{badge.description}</span>
                                                </div>
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                        </div>
                                    );
                                }

                                // STANDARD BADGES
                                return (
                                    <div key={badge.id} className="group/badge relative bg-white/10 backdrop-blur-md rounded-full p-1.5 cursor-help shadow-lg border border-white/10 hover:bg-white/20 transition-all">
                                        <DynamicIcon name={badge.icon || "Award"} size={16} className="text-white" />

                                        {/* TOOLTIP */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-white/10">
                                            <div className="flex flex-col items-center gap-0.5">
                                                <span className="text-white">{badge.name}</span>
                                                <span className="text-[9px] text-gray-400 dark:text-zinc-500 font-normal">{badge.description}</span>
                                            </div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {negocio.descripcion && (
                            <p className="text-sm sm:text-base font-medium text-white/90 line-clamp-2 max-w-2xl drop-shadow-md leading-relaxed mb-4 hidden xs:block">
                                {negocio.descripcion}
                            </p>
                        )}

                        <div className="flex items-center flex-wrap gap-2 text-sm font-bold opacity-90 mt-5">
                            <span
                                className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer"
                                onClick={onShowInfo}
                            >
                                <Clock size={14} style={{ color: negocio.color_primario || '#fdba74' }} /> {negocio.horario || "Ver horarios"}
                            </span>
                            <span
                                className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer"
                                onClick={onShowInfo}
                            >
                                <MapPin size={14} style={{ color: negocio.color_primario || '#fdba74' }} /> Info
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
