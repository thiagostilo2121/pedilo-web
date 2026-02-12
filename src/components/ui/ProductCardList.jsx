import React from "react";
import QuantitySelector from "./QuantitySelector";
import { Package, Star, AlertCircle } from "lucide-react";
import ProgressiveImage from "./ProgressiveImage"; // Assuming this exists or using standard img for now to reduce dependencies if needed
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
    // Wholesale Logic
    const currentQty = cartItem?.cantidad || 0;
    const hasWholesale = isDistribuidora && product.precio_mayorista && product.cantidad_mayorista;
    const isWholesaleApplied = hasWholesale && currentQty >= product.cantidad_mayorista;
    const nextSavingsQty = hasWholesale && !isWholesaleApplied ? product.cantidad_mayorista - currentQty : 0;

    const displayPrice = isWholesaleApplied ? product.precio_mayorista : product.precio;

    return (
        <div className={`group relative flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all ${!canAdd ? 'opacity-70 bg-gray-50' : ''}`}>
            {/* Thumbnail */}
            <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
                <img
                    src={product.imagen_url || DEFAULT_PRODUCT_IMAGE}
                    alt={product.nombre}
                    className={`w-full h-full object-cover ${!canAdd && "grayscale"}`}
                />
                {product.destacado && (
                    <div className="absolute top-0 left-0 bg-yellow-400 p-1 rounded-br-lg shadow-sm">
                        <Star size={10} className="text-white fill-white" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-2">{product.nombre}</h3>
                    <div className="flex flex-col items-end">
                        <span className={`font-black text-gray-900 ${isWholesaleApplied ? 'text-green-600' : ''}`}>
                            ${displayPrice}
                        </span>
                        {isWholesaleApplied && (
                            <span className="text-[10px] text-gray-400 line-through">${product.precio}</span>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500 truncate mb-1">{product.descripcion || "Sin descripción"}</p>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                    {/* Wholesale Badge / Nudge */}
                    {hasWholesale && (
                        isWholesaleApplied ? (
                            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded border border-green-200">
                                Precio Mayorista Aplicado
                            </span>
                        ) : (
                            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded border border-blue-100">
                                Llevá {nextSavingsQty} más a ${product.precio_mayorista}
                            </span>
                        )
                    )}

                    {/* Min Order per product */}
                    {isDistribuidora && product.cantidad_minima > 1 && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                            <Package size={10} /> Mín. {product.cantidad_minima}
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex items-center pl-3 border-l border-gray-100 min-h-[80px]">
                {canAdd ? (
                    <QuantitySelector
                        initialValue={currentQty}
                        min={0}
                        max={typeof product.stock === 'number' ? product.stock : 9999}
                        step={1}
                        onConfirm={(val) => onUpdateQuantity(product, val)}
                        onIncrement={() => onAdd(product)}
                        onDecrement={() => onDecrease(cartItem?.cartItemId)}
                        compact={true}
                        color={negocio?.color_primario || '#ea580c'}
                    />
                ) : (
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">AGOTADO</span>
                )}
            </div>
        </div>
    );
}
