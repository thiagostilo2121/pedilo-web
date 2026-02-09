import React from "react";
import { Plus, Minus, Share2, Star } from "lucide-react";
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
}) {
    const canAdd = product.stock && negocio?.acepta_pedidos;

    return (
        <div
            id={`producto-${product.id}`}
            className="group bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all flex gap-4 overflow-hidden relative"
        >
            {/* Imagen Progresiva */}
            <ProgressiveImage
                src={product.imagen_url || DEFAULT_PRODUCT_IMAGE}
                alt={product.nombre}
                className={`w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-2xl bg-gray-50 ${!canAdd && "grayscale opacity-70"}`}
            />

            {/* Share Button */}
            <button
                onClick={(e) => onShare(e, product)}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full text-gray-400 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-orange-600 hover:bg-orange-50 hover:scale-110 z-10"
            >
                <Share2 size={14} />
            </button>

            {!canAdd && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] pointer-events-none rounded-3xl z-0">
                    {/* Only overlay the image ideally, but this works for full card disabled feel */}
                </div>
            )}
            {!canAdd && (
                <div className="absolute top-2 left-2 z-10">
                    <span className="text-[10px] font-black text-white bg-black/60 px-2 py-1 rounded uppercase">
                        Agotado
                    </span>
                </div>
            )}

            {/* ... resto del contenido del producto ... */}
            <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                <div>
                    <h3 className="font-bold text-gray-900 truncate text-base md:text-lg">
                        {product.nombre}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mt-1 leading-snug">
                        {product.descripcion || "Sin descripción."}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-black text-gray-900">${product.precio}</span>
                    {canAdd ? (
                        cartItem ? (
                            <div className="flex items-center gap-2 bg-orange-50 rounded-full px-1 py-1 border border-orange-100">
                                <button
                                    onClick={() => onDecrease(cartItem.cartItemId)}
                                    className="w-7 h-7 flex items-center justify-center bg-white text-orange-600 rounded-full shadow-sm hover:bg-orange-100"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="font-bold text-sm min-w-[16px] text-center">
                                    {cartItem.cantidad}
                                </span>
                                <button
                                    onClick={() => onAdd(product)}
                                    disabled={isAdding}
                                    className="w-7 h-7 flex items-center justify-center bg-orange-600 text-white rounded-full shadow-sm"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onAdd(product)}
                                disabled={isAdding}
                                className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition-colors shadow-sm border border-gray-100"
                            >
                                <Plus size={20} />
                            </button>
                        )
                    ) : (
                        <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            Sin Stock
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
