/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { useState } from "react";
import { X, Plus, Minus, Check, AlertCircle } from "lucide-react";

export default function ToppingSelector({ isOpen, onClose, onConfirm, producto, gruposToppings }) {
    const [selecciones, setSelecciones] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [errores, setErrores] = useState([]);

    if (!isOpen || !producto) return null;

    const updateToppingQuantity = (grupo, topping, delta) => {
        if (delta > 0 && !topping.disponible) return;

        setSelecciones(prev => {
            const grupoActual = prev[grupo.id] || [];
            const totalSeleccionados = grupoActual.length;

            if (delta > 0) {
                if (grupo.max_selecciones && totalSeleccionados >= grupo.max_selecciones) return prev;
                return { ...prev, [grupo.id]: [...grupoActual, topping] };
            } else {
                const index = grupoActual.findIndex(t => t.id === topping.id);
                if (index === -1) return prev;
                const newGroup = [...grupoActual];
                newGroup.splice(index, 1);
                return { ...prev, [grupo.id]: newGroup };
            }
        });
        setErrores([]);
    };

    const validarSelecciones = () => {
        const nuevosErrores = [];

        gruposToppings.forEach(grupo => {
            const seleccionados = (selecciones[grupo.id] || []).length;
            if (seleccionados < grupo.min_selecciones) {
                nuevosErrores.push(`${grupo.nombre}: seleccioná mínimo ${grupo.min_selecciones}`);
            }
            if (seleccionados > grupo.max_selecciones) {
                nuevosErrores.push(`${grupo.nombre}: máximo ${grupo.max_selecciones} opciones`);
            }
        });

        return nuevosErrores;
    };

    const handleConfirm = () => {
        const erroresValidacion = validarSelecciones();
        if (erroresValidacion.length > 0) {
            setErrores(erroresValidacion);
            return;
        }

        const toppingsSeleccionados = Object.values(selecciones).flat();
        onConfirm(producto, toppingsSeleccionados, cantidad);
        onClose();
        setSelecciones({});
        setCantidad(1);
        setErrores([]);
    };

    const calcularPrecioTotal = () => {
        const precioToppings = Object.values(selecciones).flat().reduce((acc, t) => acc + (t.precio_extra || t.precio || 0), 0);
        return (producto.precio + precioToppings) * cantidad;
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50">
            <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg">{producto.nombre}</h2>
                        <p className="text-sm text-gray-500">${producto.precio}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {gruposToppings.map(grupo => (
                        <div key={grupo.id}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-gray-900">{grupo.nombre}</h3>
                                <span className="text-xs text-gray-500">
                                    {grupo.min_selecciones > 0 ? `Mín ${grupo.min_selecciones}` : "Opcional"}
                                    {grupo.max_selecciones && ` · Máx ${grupo.max_selecciones}`}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {(grupo.toppings || []).map(topping => {
                                    const count = (selecciones[grupo.id] || []).filter(t => t.id === topping.id).length;
                                    const totalSelected = (selecciones[grupo.id] || []).length;
                                    const maxReached = grupo.max_selecciones && totalSelected >= grupo.max_selecciones;
                                    const sinStock = topping.disponible === false;

                                    return (
                                        <div
                                            key={topping.id}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${count > 0
                                                ? "border-orange-500 bg-orange-50/50"
                                                : "border-gray-200"
                                                } ${sinStock ? "opacity-60 bg-gray-50" : ""}`}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-medium ${sinStock ? "line-through text-gray-400" : "text-gray-900"}`}>{topping.nombre}</span>
                                                    {sinStock && <span className="text-[10px] uppercase font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded">Sin Stock</span>}
                                                </div>
                                                <span className={`text-sm ${(topping.precio_extra || topping.precio) > 0 ? "text-orange-600 font-bold" : "text-gray-400"}`}>
                                                    {(topping.precio_extra || topping.precio) > 0 ? `+$${topping.precio_extra || topping.precio}` : "Incluido"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {count > 0 && (
                                                    <button
                                                        onClick={() => updateToppingQuantity(grupo, topping, -1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-orange-600 hover:bg-orange-50 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                )}
                                                {count > 0 ? (
                                                    <span className="font-bold text-orange-600 w-4 text-center">{count}</span>
                                                ) : (
                                                    !sinStock && <span className="text-xs text-gray-400 mr-2">Agregar</span>
                                                )}
                                                <button
                                                    onClick={() => updateToppingQuantity(grupo, topping, 1)}
                                                    disabled={maxReached || sinStock}
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${maxReached || sinStock
                                                        ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                                                        : "bg-white border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white shadow-sm"
                                                        }`}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Errores */}
                {errores.length > 0 && (
                    <div className="px-4 py-2 bg-red-50 border-t border-red-100">
                        {errores.map((e, i) => (
                            <p key={i} className="text-red-600 text-sm flex items-center gap-1">
                                <AlertCircle size={14} /> {e}
                            </p>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Cantidad</span>
                        <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 border">
                            <button
                                onClick={() => setCantidad(c => Math.max(1, c - 1))}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="font-bold w-6 text-center">{cantidad}</span>
                            <button
                                onClick={() => setCantidad(c => c + 1)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Agregar ${calcularPrecioTotal()}
                    </button>
                </div>
            </div>
        </div>
    );
}
