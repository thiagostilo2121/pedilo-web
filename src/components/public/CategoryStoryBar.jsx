import React from 'react';
import { DEFAULT_CATEGORY_IMAGE } from '../../constants';

export default function CategoryStoryBar({ categorias, activeCategory, onSelectCategory, colorPrimario, colorSecundario }) {
    if (categorias.length === 0) return null;

    return (
        <div className="md:hidden sticky top-[72px] z-40 bg-gray-50/95 backdrop-blur-md pb-6 pt-3 -mx-4 px-4 mb-8 border-b border-gray-100/50 shadow-sm transition-all">
            <div className="flex gap-4 overflow-x-auto scrollbar-responsive pt-2 px-2 pb-2">
                {/* 'Todos' Button */}
                <button
                    onClick={() => onSelectCategory("todos")}
                    className="flex flex-col items-center gap-2 group min-w-[72px]"
                >
                    <div
                        className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${activeCategory === "todos" ? 'shadow-lg scale-105' : 'bg-gray-200 dark:bg-white/10 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0'}`}
                        style={activeCategory === "todos" ? { background: `linear-gradient(to top right, ${colorPrimario || '#f97316'}, ${colorSecundario || '#ec4899'})` } : {}}
                    >
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 border-2 border-white flex items-center justify-center overflow-hidden">
                            <span className="font-black text-[10px] uppercase text-gray-800 dark:text-zinc-200">Menú</span>
                        </div>
                    </div>
                    <span className={`text-xs font-bold truncate max-w-[96px] ${activeCategory === "todos" ? 'text-gray-900 dark:text-zinc-100' : 'text-gray-500 dark:text-zinc-400'}`}>Todos</span>
                </button>

                {/* Categories Map */}
                {categorias.map(cat => {
                    const isActive = activeCategory === cat.nombre;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.nombre)}
                            className="flex flex-col items-center gap-2 group min-w-[72px]"
                        >
                            <div
                                className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${isActive ? 'shadow-lg scale-105' : 'bg-gradient-to-tr from-gray-200 to-gray-300 opacity-90 group-hover:scale-105'}`}
                                style={isActive ? { background: `linear-gradient(to top right, ${colorPrimario || '#f97316'}, ${colorSecundario || '#ec4899'})` } : {}}
                            >
                                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 border-2 border-white flex items-center justify-center overflow-hidden relative">
                                    <img
                                        src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                                        alt={cat.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <span className={`text-xs font-bold truncate max-w-[96px] ${isActive ? 'text-gray-900 dark:text-zinc-100' : 'text-gray-500 dark:text-zinc-400'}`}>{cat.nombre}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
