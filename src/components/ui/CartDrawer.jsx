import React from "react";
import { ShoppingBag, X, Plus, Minus, ChevronLeft, AlertCircle, Package } from "lucide-react";
import { DEFAULT_PRODUCT_IMAGE } from "../../constants";
import { calcularPrecioEfectivo } from "../../utils/precioUtils";

export default function CartDrawer({
    isOpen,
    onClose,
    cart,
    negocio,
    onIncrease,
    onDecrease,
    onCheckout,
    total,
    count,
}) {
    const DEFAULT_IMAGE = DEFAULT_PRODUCT_IMAGE;

    const calcularPrecioItem = (item) => calcularPrecioEfectivo(item);

    return (
        <div
            className={`fixed inset-0 z-50 ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`absolute right-0 bottom-0 top-0 w-full sm:w-[450px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-5 border-b flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        Mi Pedido
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-500 hover:text-black hover:border-gray-900 transition-all font-bold"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <ShoppingBag size={64} className="mb-4 text-gray-400" />
                            <p className="font-bold text-xl">Carrito vacío</p>
                            <p className="text-sm">¡Agregá algo rico!</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.cartItemId}
                                className="flex gap-4 p-4 bg-white border border-gray-50 shadow-sm rounded-2xl relative group"
                            >
                                <img
                                    src={item.imagen_url || DEFAULT_IMAGE}
                                    className="w-16 h-16 object-cover rounded-xl bg-gray-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{item.nombre}</p>
                                    {item.toppings?.length > 0 && (
                                        <p className="text-xs text-gray-400 truncate">
                                            +{(() => {
                                                const counts = item.toppings.reduce((acc, t) => {
                                                    acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                                                    return acc;
                                                }, {});
                                                return Object.entries(counts)
                                                    .map(([name, count]) =>
                                                        count > 1 ? `${count}x ${name}` : name
                                                    )
                                                    .join(", ");
                                            })()}
                                        </p>
                                    )}
                                    <p className="text-orange-600 font-extrabold text-lg">
                                        ${(calcularPrecioItem(item) * item.cantidad).toFixed(0)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                                        <button
                                            onClick={() => onDecrease(item.cartItemId)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-gray-600 active:scale-95"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="font-bold text-sm min-w-[16px] text-center">
                                            {item.cantidad}
                                        </span>
                                        <button
                                            onClick={() => onIncrease(item)}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-orange-600 active:scale-95"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-white border-t border-gray-100 pb-8 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-10">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    Total a pagar
                                </p>
                                <p className="text-4xl font-black text-gray-900 tracking-tight">
                                    ${total.toFixed(0)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold mb-1">
                                    {count} items
                                </p>
                            </div>
                        </div>

                        {negocio?.acepta_pedidos ? (
                            (() => {
                                const pedidoMinimo = negocio?.pedido_minimo || 0;
                                const isDistribuidora = negocio?.tipo_negocio === "distribuidora";
                                const belowMinimum = isDistribuidora && pedidoMinimo > 0 && total < pedidoMinimo;
                                return (
                                    <>
                                        {belowMinimum && (
                                            <div className="mb-3 bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
                                                <Package size={16} className="flex-shrink-0" />
                                                <span>Falt{total === 0 ? 'an' : 'a'} <span className="font-black">${(pedidoMinimo - total).toLocaleString()}</span> para el pedido mínimo</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={onCheckout}
                                            disabled={belowMinimum}
                                            className={`w-full py-4 rounded-2xl font-bold text-xl transition-all shadow-lg active:scale-[0.98] flex justify-between items-center px-6 group ${belowMinimum ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-gray-900 text-white hover:bg-black'}`}
                                        >
                                            <span>Confirmar Pedido</span>
                                            <span className={`p-2 rounded-xl transition-colors ${belowMinimum ? 'bg-gray-400/30' : 'bg-white/20 group-hover:bg-white/30'}`}>
                                                <ChevronLeft className="rotate-180" size={20} />
                                            </span>
                                        </button>
                                    </>
                                );
                            })()
                        ) : (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold text-center text-sm">
                                <AlertCircle className="mx-auto mb-2" />
                                El local se encuentra cerrado.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
