/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import React from 'react';
import { MapPin, Clock, BadgeHelp } from 'lucide-react';
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

                    <div className="flex-1 text-white">
                        {/* TOP SECTION: LOGO + STATUS */}
                        <div className="flex items-center mb-2">
                            <div className="relative shrink-0">
                                <img src={negocio.logo_url || DEFAULT_LOGO} className="w-24 h-24 rounded-[1.8rem] border-[3px] border-white shadow-2xl object-cover bg-white dark:bg-zinc-900" alt="Logo Big" />
                                <div className={`absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md border border-white/10 ${negocio.acepta_pedidos ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                    <span className={`w-2 h-2 rounded-full ${negocio.acepta_pedidos ? 'bg-white dark:bg-zinc-900 animate-pulse' : 'bg-white/50'}`}></span>
                                    {negocio.acepta_pedidos ? 'Abierto' : 'Cerrado'}
                                </div>
                            </div>
                        </div>

                        {/* NAME + BADGES SECTION (On the same level) */}
                        <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-6 lg:mb-1">
                            <h1 className="text-4xl sm:text-5xl font-black leading-none drop-shadow-lg tracking-tight shrink-0">
                                {negocio.nombre}
                            </h1>

                            {/* REPUTATION BADGES (Right side on mobile, next to H1 on desktop) */}
                            {negocio.insignias?.length > 0 && (
                                <div className="flex flex-wrap items-center justify-end lg:justify-start gap-2 shrink-0">
                                    {negocio.insignias.map((badge) => {
                                        const isFounder = badge.id === 'FOUNDER';
                                        const isVeteran = badge.id === 'VETERANO_500';
                                        const isTopSeller = badge.id === 'TOP_SELLER_100' || badge.id?.includes('TOP_SELLER');
                                        const isVerified = badge.id === 'VERIFICADO_50' || badge.id?.includes('VERIFICADO');

                                        let badgeStyle = 'bg-white/20';
                                        let tooltipTitleStyle = 'text-white';

                                        if (isFounder) {
                                            badgeStyle = 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-orange-500/50 animate-pulse';
                                            tooltipTitleStyle = 'text-yellow-400';
                                        } else if (isTopSeller) {
                                            badgeStyle = 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/50'
                                            tooltipTitleStyle = 'text-green-400';
                                        } else if (isVeteran) {
                                            badgeStyle = 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/50'
                                            tooltipTitleStyle = 'text-orange-400';
                                        } else if (isVerified) {
                                            badgeStyle = 'bg-gradient-to-br from-blue-400 to-blue-600';
                                            tooltipTitleStyle = 'text-blue-400';
                                        }

                                        return (
                                            <div
                                                key={badge.id}
                                                className={`group/badge relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg border border-white/20 backdrop-blur-md cursor-help transition-all hover:scale-110 ${badgeStyle}`}
                                            >
                                                <DynamicIcon name={badge.icon || "Award"} size={18} className="text-white drop-shadow-sm" />

                                                {/* TOOLTIP */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900/95 backdrop-blur-xl text-white text-[10px] font-bold px-3 py-2 rounded-xl opacity-0 group-hover/badge:opacity-100 transition-all pointer-events-none z-50 shadow-2xl border border-white/10 transform scale-95 group-hover/badge:scale-100">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className={`text-[11px] uppercase tracking-wider ${tooltipTitleStyle}`}>{badge.name}</span>
                                                        <span className="text-[9px] text-gray-300 font-medium max-w-[150px] text-center leading-tight whitespace-pre-wrap">{badge.description}</span>
                                                    </div>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/10"></div>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-4 border-transparent border-t-gray-900/95"></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {negocio.descripcion && (
                            <p className="text-sm sm:text-base font-medium text-white/70 line-clamp-3 max-w-xl break-words drop-shadow-md leading-relaxed mb-2">
                                {negocio.descripcion}
                            </p>
                        )}

                        <div className="flex items-center flex-wrap gap-2 text-sm font-bold opacity-90">
                            <span
                                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 hover:bg-white/20 transition-all cursor-pointer"
                                onClick={onShowInfo}
                            >
                                <Clock size={14} style={{ color: negocio.color_primario || '#fdba74' }} /> {negocio.horario || "Ver horarios"}
                            </span>
                            <span
                                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 hover:bg-white/20 transition-all cursor-pointer"
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
