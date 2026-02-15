import React, { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Package, Star, AlertCircle, ShoppingCart } from "lucide-react";
import ProgressiveImage from "./ProgressiveImage";
import { DEFAULT_PRODUCT_IMAGE } from "../../constants";

export default function ProductCardList({
    product,
    negocio,
    cartItem,
    onUpdateQuantity,
    onAdd,
    onDecrease,
    onShare,
    isAdding
}) {
    const canAdd = product.stock && negocio?.acepta_pedidos;
    const isDistribuidora = negocio?.tipo_negocio === "distribuidora";

    // Wholesale Logic
    const currentQty = cartItem?.cantidad || 0;
    const hasWholesale = isDistribuidora && product.precio_mayorista && product.cantidad_mayorista;
    const isWholesaleApplied = hasWholesale && currentQty >= product.cantidad_mayorista;
    const nextSavingsQty = hasWholesale && !isWholesaleApplied ? product.cantidad_mayorista - currentQty : 0;

    const displayPrice = isWholesaleApplied ? product.precio_mayorista : product.precio;

    return (
        <div className={`group relative flex items-start gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all mb-2 ${!canAdd ? 'opacity-60 bg-gray-50' : 'active:bg-gray-50'}`}>
            {/* Thumbnail */}
            <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-50">
                <ProgressiveImage
                    src={product.imagen_url || DEFAULT_PRODUCT_IMAGE}
                    alt={product.nombre}
                    className={`w-full h-full object-cover transition-transform duration-500 ${!canAdd && "grayscale opacity-80"}`}
                />

                {product.destacado && (
                    <div className="absolute top-0 left-0 bg-yellow-400 p-1 rounded-br-lg shadow-sm z-10">
                        <Star size={10} className="text-white fill-white" />
                    </div>
                )}

                {/* Out of Stock Label */}
                {!canAdd && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                        {/* Optional text or label here */}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-1 flex flex-col h-full justify-between py-0.5">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-exrabold text-gray-900 text-sm sm:text-base leading-tight line-clamp-2">{product.nombre}</h3>
                        <div className="flex flex-col items-end shrink-0">
                            <span className={`font-black text-gray-900 text-base sm:text-lg tracking-tight ${isWholesaleApplied ? 'text-green-600' : ''}`}>
                                ${displayPrice}
                            </span>
                            {isWholesaleApplied && (
                                <span className="text-[10px] text-gray-400 line-through decoration-gray-300">${product.precio}</span>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 truncate mt-0.5 font-medium max-w-[90%]">
                        {product.descripcion ? product.descripcion : <span className="text-gray-300 italic">Sin descripción</span>}
                    </p>
                </div>

                <div className="flex items-end justify-between mt-2 pt-2 border-t border-gray-50 border-dashed sm:border-none sm:pt-0 sm:mt-1">
                    <div className="flex flex-col gap-1 min-w-0">
                        {/* Wholesale Nudge */}
                        {hasWholesale && (
                            isWholesaleApplied ? (
                                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded-md border border-green-100 w-fit">
                                    Mayorista activo ✨
                                </span>
                            ) : (
                                <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-md border border-blue-100 w-fit truncate max-w-[140px]">
                                    Llevá {nextSavingsQty} más a ${product.precio_mayorista}
                                </span>
                            )
                        )}
                        {/* Min Order */}
                        {isDistribuidora && product.cantidad_minima > 1 && (
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                <Package size={10} strokeWidth={2} /> Mín. {product.cantidad_minima} un.
                            </div>
                        )}
                        {/* Unit */}
                        {isDistribuidora && product.unidad && product.unidad !== "unidad" && (
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                Por {product.unidad}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="shrink-0 flex items-center justify-end">
                        {canAdd ? (
                            <div className="h-8"> {/* Fixed height to prevent layout shifts */}
                                {currentQty > 0 || isAdding ? (
                                    <QuantitySelector
                                        initialValue={currentQty}
                                        min={0}
                                        max={typeof product.stock === 'number' ? product.stock : 9999}
                                        onConfirm={(val) => onUpdateQuantity(product, val)}
                                        onIncrement={() => onAdd(product)}
                                        onDecrement={() => onDecrease(cartItem?.cartItemId)}
                                        compact={true}
                                        color={negocio?.color_primario || '#ea580c'}
                                    />
                                ) : (
                                    <button
                                        onClick={() => onAdd(product)}
                                        className="h-8 px-4 bg-gray-100 text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-200 active:scale-95 transition-all flex items-center gap-1 border border-gray-200"
                                    >
                                        Agregar <ShoppingCart size={14} className="text-gray-500" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 uppercase tracking-wider">
                                Agotado
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
