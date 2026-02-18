import React from 'react';
import { Zap } from 'lucide-react';

export default function SmartAnuncio({ anuncio }) {
    if (!anuncio) return null;

    return (
        <div className="relative z-[60] bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-bold shadow-lg animate-in slide-in-from-top-full duration-500">
            <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
                <Zap size={14} className="text-yellow-400 animate-pulse shrink-0" fill="currentColor" />
                <span className="truncate">{anuncio}</span>
            </div>
        </div>
    );
}
