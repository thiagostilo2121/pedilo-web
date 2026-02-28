import React, { useRef } from 'react';
import { Flame, Star, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGE } from '../../constants';
import ProgressiveImage from '../ui/ProgressiveImage';

export default function HighlyRecommended({
    productos,
    negocio,
    carrito,
    onAdd,
    onDecreaseQuantity,
    isAddingId
}) {
    const destacadeProducts = productos.filter(p => p.destacado);
    if (destacadeProducts.length === 0) return null;

    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="mb-10 pl-4 animate-in fade-in slide-in-from-bottom-4 duration-700 relative group/carousel">
            <div className="flex flex-col pr-4 mb-4">
                <h2 className="text-xl font-black text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                    Imperdibles <Flame className="text-orange-500 animate-pulse" size={24} fill="currentColor" />
                </h2>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mt-0.5">Los platos que se agotan más rápido hoy.</p>
            </div>

            {/* Desktop Navigation Arrows */}
            {destacadeProducts.length > 2 && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:flex absolute left-2 top-[55%] -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg shadow-gray-200 dark:shadow-black/20/50 items-center justify-center text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 transition-all border border-gray-100 dark:border-white/10"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:flex absolute right-2 top-[55%] -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg shadow-gray-200 dark:shadow-black/20/50 items-center justify-center text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 transition-all border border-gray-100 dark:border-white/10"
                    >
                        <ChevronRight size={28} />
                    </button>
                </>
            )}

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 pb-8 pr-4 -ml-4 pl-4 scrollbar-responsive snap-x pt-2 scroll-smooth"
            >
                {destacadeProducts.map(prod => {
                    const cartItem = carrito.find(p => p.id === prod.id);
                    const canAdd = prod.stock && negocio?.acepta_pedidos;

                    return (
                        <div
                            key={prod.id}
                            className="w-[260px] xs:w-[280px] sm:w-[320px] shrink-0 snap-center flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden relative group transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                            onClick={() => canAdd && onAdd(prod)}
                        >
                            <div className="h-40 xs:h-48 sm:h-56 relative w-full bg-gray-100 dark:bg-white/5">
                                <ProgressiveImage
                                    src={prod.imagen_url || DEFAULT_PRODUCT_IMAGE}
                                    alt={prod.nombre}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${!canAdd && "grayscale contrast-125"}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 z-10 pointer-events-none" />

                                <div className="absolute top-3 left-3 flex gap-2 z-20">
                                    <span
                                        className="text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-orange-500/40 tracking-wide uppercase"
                                        style={{ backgroundColor: negocio.color_primario || '#f97316' }}
                                    >
                                        <Star size={10} fill="currentColor" /> MÁS VENDIDO
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 px-3 py-1.5 rounded-full font-black text-sm shadow-xl flex items-center gap-1 z-20">
                                    ${prod.precio}
                                </div>
                            </div>

                            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-base sm:text-lg leading-tight mb-1 line-clamp-1">{prod.nombre}</h3>
                                    <p className="text-gray-500 dark:text-zinc-400 text-xs line-clamp-2 leading-relaxed">{prod.descripcion || "Una delicia esperando por vos."}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    {canAdd ? (
                                        cartItem ? (
                                            <div className="flex items-center bg-gray-900 text-white rounded-full px-1 py-1 w-full justify-between shadow-lg shadow-gray-200 dark:shadow-black/20" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={(e) => { e.stopPropagation(); onDecreaseQuantity(cartItem.cartItemId) }} className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 active:scale-90 transition-transform"><Minus size={14} /></button>
                                                <span className="font-bold text-sm">{cartItem.cantidad}</span>
                                                <button onClick={(e) => { e.stopPropagation(); onAdd(prod) }} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 active:scale-90 transition-transform"><Plus size={14} /></button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onAdd(prod) }}
                                                disabled={isAddingId === prod.id}
                                                className="w-full py-2.5 sm:py-3 text-white font-bold rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-110 group/btn text-sm sm:text-base"
                                                style={{ backgroundColor: negocio.color_primario || '#ea580c' }}
                                            >
                                                Agregar <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
                                            </button>
                                        )
                                    ) : (
                                        <span className="w-full text-center text-xs font-bold text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-white/5 py-2 rounded-xl">NO DISPONIBLE</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
