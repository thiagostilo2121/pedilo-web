import React, { useRef, useEffect, useState } from 'react';
import { DEFAULT_CATEGORY_IMAGE } from '../../constants';
// Nota: En lucide-react el ícono suele llamarse 'Menu' en lugar de 'Hamburger'
import { Compass } from 'lucide-react';

export default function CategoryStoryBar({ categorias, activeCategory, onSelectCategory, colorPrimario, colorSecundario }) {
    const scrollRef = useRef(null);
    const sentinelRef = useRef(null);
    const [isStuck, setIsStuck] = useState(false);

    if (categorias.length === 0) return null;

    const prim = colorPrimario || '#f97316';
    const sec = colorSecundario || '#ec4899';

    // Intersection Observer para detectar cuando el sticky está activo
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsStuck(!entry.isIntersecting);
            },
            {
                // Este margen asume que tienes un header de 56px de alto
                rootMargin: "-56px 0px 0px 0px",
                threshold: 0
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-scroll para centrar la categoría activa
    useEffect(() => {
        if (!scrollRef.current || !activeCategory) return;

        // Le damos un respiro al navegador para que termine de renderizar
        const timeoutId = setTimeout(() => {
            const container = scrollRef.current;
            // Buscamos el botón que coincida con la categoría activa
            const activeButton = container.querySelector(`[data-category="${activeCategory}"]`);

            if (activeButton) {
                // Calculamos la posición para que el botón quede en el medio de la pantalla
                const scrollCenter = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);

                container.scrollTo({
                    left: scrollCenter,
                    behavior: 'smooth'
                });
            }
        }, 50); // 50ms es suficiente para asegurar un cálculo perfecto

        return () => clearTimeout(timeoutId);
    }, [activeCategory]);

    return (
        <>
            {/* Centinela invisible para el IntersectionObserver */}
            <div ref={sentinelRef} className="h-[1px]" />

            <div
                className="md:hidden sticky top-[56px] z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl -mx-4 px-4 py-3 mb-8 border-b border-gray-100 dark:border-zinc-800/50 transition-all overflow-hidden shadow-sm scrollbar-responsive scroll-smooth"
            >
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto scrollbar-responsive pt-[10px] px-1 pb-[10px] items-center"
                >
                    {/* Título de Sección - Se reduce al ícono cuando está 'stuck' */}
                    <div className={`flex flex-col shrink-0 border-r border-gray-100 dark:border-zinc-800/50 transition-all duration-500 ease-in-out ${isStuck ? 'pr-4 mr-0' : 'pr-6 mr-2'}`}>

                        <h2 className="text-xl font-black tracking-tighter text-gray-900 dark:text-zinc-100 flex items-center whitespace-nowrap">
                            <Compass size={24} style={{ color: prim }} className="shrink-0" />

                            {/* Título: Solo colapsa el ancho y el margen */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${isStuck ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-2'}`}>
                                Categorías
                            </div>
                        </h2>

                        {/* Subtítulo: La clave aquí es el max-w-0 agregado junto al max-h-0 */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isStuck ? 'max-h-0 max-w-0 opacity-0 mt-0' : 'max-h-[20px] max-w-[150px] opacity-100 mt-0.5'}`}>
                            <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-extrabold uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: `${prim}99` }}>
                                Deslizá y explorá
                            </p>
                        </div>

                    </div>

                    {/* Botón 'Todos' */}
                    

                    {/* Mapeo de Categorías */}
                    {categorias.map(cat => {
                        const isActive = activeCategory === cat.nombre;
                        return (
                            <button
                                key={cat.id}
                                data-category={cat.nombre}
                                onClick={() => onSelectCategory(cat.nombre)}
                                className="flex flex-col items-center gap-3 group shrink-0 transition-all active:scale-90"
                            >
                                <div
                                    className={`relative w-[72px] h-[72px] rounded-full p-[3px] transition-all duration-500 ease-out ${isActive
                                            ? 'shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] scale-110 ring-2 ring-offset-2'
                                            : 'bg-gray-200 dark:bg-white/10 opacity-70 grayscale-[0.3] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105'
                                        }`}
                                    style={isActive ? {
                                        background: `linear-gradient(135deg, ${prim}, ${sec})`,
                                        '--tw-ring-color': prim
                                    } : {}}
                                >
                                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-950 flex items-center justify-center overflow-hidden relative shadow-inner">
                                        <img
                                            src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                                            alt={cat.nombre}
                                            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                                        />
                                    </div>
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full opacity-10 blur-xl pointer-events-none" style={{ background: prim }} />
                                    )}
                                </div>
                                <span className={`text-[11px] font-black truncate max-w-[84px] transition-colors ${isActive ? 'text-gray-900 dark:text-zinc-100' : 'text-gray-400'}`}>
                                    {cat.nombre}
                                </span>
                            </button>
                        )
                    })}
                    {/* Espaciador final para que el último elemento no quede pegado al borde */}
                    <div className="min-w-[12px]"></div>
                </div>

                {/* Gradiente derecho para indicar que hay más contenido scrolleable */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10 opacity-80" />
            </div>
        </>
    );
}