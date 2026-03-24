import React, { useRef, useEffect } from 'react';
import { DEFAULT_CATEGORY_IMAGE } from '../../constants';

export default function CategoryStoryBar({ categorias, activeCategory, onSelectCategory, colorPrimario }) {
    const scrollRef = useRef(null);

    if (categorias.length === 0) return null;

    const prim = colorPrimario || '#f97316';

    // Auto-scroll para centrar la categoría activa
    useEffect(() => {
        if (!scrollRef.current || !activeCategory) return;

        const timeoutId = setTimeout(() => {
            const container = scrollRef.current;
            const activeButton = container.querySelector(`[data-category="${activeCategory}"]`);

            if (activeButton) {
                const scrollCenter = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
                container.scrollTo({
                    left: scrollCenter,
                    behavior: 'smooth'
                });
            }
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [activeCategory]);

    return (
        <div className="md:hidden sticky top-[56px] z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 -mx-4 py-3 mb-6 shadow-sm">
            <div
                ref={scrollRef}
                className="flex gap-2.5 overflow-x-auto scrollbar-responsive px-4 pb-1 mt-2 items-center"
            >
                {categorias.map(cat => {
                    const isActive = activeCategory === cat.nombre;
                    return (
                        <button
                            key={cat.id}
                            data-category={cat.nombre}
                            onClick={() => onSelectCategory(cat.nombre)}
                            className={`flex items-center gap-2.5 pr-4 pl-1.5 py-1.5 rounded-full transition-all shrink-0 border ${
                                isActive 
                                    ? 'border-transparent shadow-md scale-[1.02]' 
                                    : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800'
                            }`}
                            style={isActive ? { backgroundColor: prim, color: '#fff' } : {}}
                        >
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm bg-white">
                                <img
                                    src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                                    alt={cat.nombre}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className={`text-[13px] font-bold tracking-tight whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-700 dark:text-zinc-300'}`}>
                                {cat.nombre}
                            </span>
                        </button>
                    );
                })}
                {/* Espaciador final */}
                <div className="min-w-[12px] shrink-0" />
            </div>
            
            {/* Gradiente derecho para indicar scroll */}
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
        </div>
    );
}