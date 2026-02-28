import React from "react";
import { Plus, Minus, Share2, Star, Package } from "lucide-react";
import ProgressiveImage from "./ProgressiveImage";
import { DEFAULT_PRODUCT_IMAGE } from "../../constants";

export default function ProductCard({
    product,
    negocio,
    cartItem,
    onAdd,
    onDecrease,
    onShare,
    isAdding,
    totalQty = 0,
}) {
    const canAdd = product.stock && negocio?.acepta_pedidos;
    const isDistribuidora = negocio?.tipo_negocio === "distribuidora";
    const hasWholesale = isDistribuidora && product.precio_mayorista && product.cantidad_mayorista;

    // Wholesale Logic
    const currentQty = cartItem?.cantidad || 0;
    const isWholesaleApplied = hasWholesale && currentQty >= product.cantidad_mayorista;
    const nextSavingsQty = hasWholesale && !isWholesaleApplied ? product.cantidad_mayorista - currentQty : 0;
    const displayPrice = isWholesaleApplied ? product.precio_mayorista : product.precio;

    return (
        <div
            id={`producto-${product.id}`}
            className={`group bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-[2rem] shadow-lg shadow-orange-500/5 border border-gray-100 dark:border-white/10 hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all flex gap-4 overflow-hidden relative ${isWholesaleApplied ? 'ring-2 ring-green-500/20' : ''}`}
        >
            {/* Imagen Progresiva */}
            <ProgressiveImage
                src={product.imagen_url || DEFAULT_PRODUCT_IMAGE}
                alt={product.nombre}
                className={`w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-3xl bg-gray-50 dark:bg-zinc-800/50 object-cover ${!canAdd && "grayscale opacity-70"}`}
            />

            {/* Share Button */}
            <button
                onClick={(e) => onShare(e, product)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full text-gray-400 dark:text-zinc-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-orange-600 hover:bg-orange-50 hover:scale-110 z-10"
            >
                <Share2 size={16} />
            </button>

            {!canAdd && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] pointer-events-none rounded-[2rem] z-0" />
            )}
            {!canAdd ? (
                <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-black text-white bg-gray-900 px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xl">
                        Agotado
                    </span>
                </div>
            ) : product.destacado ? (
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className="text-[10px] font-black text-white px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-1.5"
                        style={{ backgroundColor: negocio?.color_primario || '#f97316' }}
                    >
                        <Star size={10} fill="currentColor" /> MÁS VENDIDO
                    </span>
                </div>
            ) : hasWholesale && isWholesaleApplied ? (
                <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-black text-white bg-green-500 px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-1">
                        MAYORISTA
                    </span>
                </div>
            ) : null}

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-zinc-100 truncate text-base sm:text-xl leading-tight">
                        {product.nombre}
                    </h3>
                    <p className="text-gray-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-2 mt-1.5 leading-relaxed font-medium">
                        {product.descripcion || "Sin descripción."}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="min-w-0">
                        <div className="flex items-baseline gap-1">
                            <span className={`text-lg sm:text-2xl font-black tracking-tight ${isWholesaleApplied ? 'text-green-600' : 'text-gray-900 dark:text-zinc-100'}`}>${displayPrice}</span>
                            {isWholesaleApplied && (
                                <span className="text-xs text-gray-400 dark:text-zinc-500 line-through font-bold">${product.precio}</span>
                            )}
                            {isDistribuidora && product.unidad && product.unidad !== "unidad" && !isWholesaleApplied && (
                                <span className="text-xs text-gray-400 dark:text-zinc-500 font-bold">/{product.unidad}</span>
                            )}
                        </div>
                        {hasWholesale && !isWholesaleApplied ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md mt-0.5">
                                Llevá {nextSavingsQty} más a ${product.precio_mayorista}
                            </span>
                        ) : isDistribuidora && product.cantidad_minima > 1 && (
                            <div className="flex items-center gap-1 mt-0.5">
                                <Package size={10} className="text-gray-400 dark:text-zinc-500" />
                                <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold">Mín. {product.cantidad_minima}</span>
                            </div>
                        )}
                    </div>

                    <div className="relative z-20"> {/* Button Wrapper for Z-Index */}
                        {canAdd ? (
                            cartItem ? (
                                <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 text-white rounded-full px-1.5 py-1.5 shadow-xl shadow-gray-200 dark:shadow-black/20">
                                    <button
                                        onClick={() => onDecrease(cartItem.cartItemId)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-gray-600 active:scale-95 transition-all"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="font-bold text-sm min-w-[16px] text-center">
                                        {cartItem.cantidad}
                                    </span>
                                    <button
                                        onClick={() => onAdd(product)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 active:scale-95 transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    {isAdding ? (
                                        <div className="h-9 sm:h-10 px-6 flex items-center justify-center text-orange-600 font-bold bg-orange-50 rounded-full animate-pulse border border-orange-100">
                                            <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => onAdd(product)}
                                                disabled={isAdding}
                                                style={{ backgroundColor: negocio?.color_primario || '#ea580c' }}
                                                className="h-9 sm:h-10 px-3 sm:px-5 flex items-center justify-center text-white rounded-full hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-lg font-bold text-xs sm:text-sm gap-1 sm:gap-2"
                                            >
                                                <span className="hidden xs:inline">Agregar</span> <Plus size={16} strokeWidth={3} />
                                            </button>
                                            {/* Badge for Total Quantity if Cart Item is null (variant mode) */}
                                            {totalQty > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-in zoom-in">
                                                    {totalQty}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                            )
                        ) : (
                            <span className="text-[10px] font-black uppercase text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
                                Sin Stock
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
