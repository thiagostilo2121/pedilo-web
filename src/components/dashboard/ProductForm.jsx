import React, { useState, useEffect, useRef } from "react";
import { X, Trash2, ImageIcon, Star, Loader2, Info, Warehouse } from "lucide-react";

export default function ProductForm({
    isOpen,
    onClose,
    initialData,
    scannedData,
    categories,
    toppingsGroups,
    initialToppingsConfig,
    loadingToppings,
    onSubmit, // (formData, imageFile, toppingsConfig) => Promise
    isSubmitting,
    tipoNegocio,
}) {
    const isDistribuidora = tipoNegocio === "distribuidora";
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen_url: "",
        categoria: "",
        stock: true,
        destacado: false,
        precio_mayorista: "",
        cantidad_mayorista: "",
        cantidad_minima: 1,
        unidad: "unidad",
    });
    const [imageFile, setImageFile] = useState(null);
    const [productoToppingsConfig, setProductoToppingsConfig] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (initialData && scannedData) {
                // Merge existing data with scanned data
                setForm({
                    nombre: scannedData.nombre || initialData.nombre,
                    descripcion: scannedData.descripcion || initialData.descripcion,
                    precio: initialData.precio || "",
                    imagen_url: scannedData.imagen_url || initialData.imagen_url,
                    categoria: categories.find(c => c.nombre === initialData.categoria) ? initialData.categoria : categories[0]?.nombre || "",
                    stock: initialData.stock ?? true,
                    destacado: initialData.destacado ?? false,
                    precio_mayorista: initialData.precio_mayorista ?? "",
                    cantidad_mayorista: initialData.cantidad_mayorista ?? "",
                    cantidad_minima: initialData.cantidad_minima ?? 1,
                    unidad: initialData.unidad || "unidad",
                });
                setImageFile(null);
            } else if (initialData) {
                setForm({
                    nombre: initialData.nombre || "",
                    descripcion: initialData.descripcion || "",
                    precio: initialData.precio || "",
                    imagen_url: initialData.imagen_url || "",
                    categoria: categories.find(c => c.nombre === initialData.categoria) ? initialData.categoria : categories[0]?.nombre || "",
                    stock: initialData.stock ?? true,
                    destacado: initialData.destacado ?? false,
                    precio_mayorista: initialData.precio_mayorista ?? "",
                    cantidad_mayorista: initialData.cantidad_mayorista ?? "",
                    cantidad_minima: initialData.cantidad_minima ?? 1,
                    unidad: initialData.unidad || "unidad",
                });
                setImageFile(null);
            } else {
                setForm({
                    nombre: scannedData?.nombre || "",
                    descripcion: scannedData?.descripcion || "",
                    precio: "",
                    imagen_url: scannedData?.imagen_url || "",
                    categoria: categories[0]?.nombre || "",
                    stock: true,
                    destacado: false,
                    precio_mayorista: "",
                    cantidad_mayorista: "",
                    cantidad_minima: 1,
                    unidad: "unidad",
                });
                setImageFile(null);
            }
        }
    }, [isOpen, initialData, categories, scannedData]);

    useEffect(() => {
        if (isOpen && !loadingToppings) {
            // Reset or set config based on initialToppingsConfig or default disabled
            const newConfig = {};
            toppingsGroups.forEach(g => {
                newConfig[g.id] = { enabled: false, min: 0, max: g.toppings.length };
            });

            if (initialToppingsConfig) {
                Object.entries(initialToppingsConfig).forEach(([key, val]) => {
                    if (newConfig[key]) newConfig[key] = val;
                });
            }
            setProductoToppingsConfig(newConfig);
        }
    }, [isOpen, loadingToppings, toppingsGroups, initialToppingsConfig]);


    const handleSubmit = () => {
        onSubmit(form, imageFile, productoToppingsConfig);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? "Editar Producto" : "Nuevo Producto"}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1 overscroll-contain pb-20 md:pb-6">
                    {/* Lado Izquierdo: Imagen */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-gray-100 transition-colors">
                            {imageFile || form.imagen_url ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : form.imagen_url}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageFile(null);
                                            setForm({ ...form, imagen_url: "" });
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <ImageIcon className="mx-auto text-gray-300 mb-2" size={40} />
                                    <p className="text-xs text-gray-400 font-medium">Click para subir foto</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
                            <input
                                type="checkbox"
                                checked={form.stock}
                                onChange={(e) => setForm({ ...form, stock: e.target.checked })}
                                className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
                            />
                            <label className="text-sm font-bold text-orange-800 cursor-pointer select-none" onClick={() => setForm(f => ({ ...f, stock: !f.stock }))}>
                                Disponible para la venta
                            </label>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                            <input
                                type="checkbox"
                                checked={form.destacado}
                                onChange={(e) => setForm({ ...form, destacado: e.target.checked })}
                                className="w-5 h-5 accent-yellow-500 rounded cursor-pointer"
                            />
                            <div className="flex flex-col cursor-pointer select-none" onClick={() => setForm(f => ({ ...f, destacado: !f.destacado }))}>
                                <label className="text-sm font-bold text-yellow-800 flex items-center gap-1 cursor-pointer">
                                    Destacar Producto <Star size={14} fill="currentColor" />
                                </label>
                                <span className="text-[10px] text-yellow-600">Aparecerá arriba en "Recomendados"</span>
                            </div>
                        </div>
                    </div>

                    {/* Lado Derecho: Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                            <input
                                type="text"
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                placeholder="Ej: Hamburguesa Especial"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio</label>
                                <input
                                    type="number"
                                    value={form.precio}
                                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold"
                                    placeholder="$0"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                                <select
                                    value={form.categoria}
                                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                                >
                                    {categories.map(cat => <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción</label>
                            <textarea
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                                rows="3"
                                placeholder="¿Qué ingredientes lleva?"
                            />
                        </div>

                        {/* Sección Mayorista (solo distribuidoras) */}
                        {isDistribuidora && (
                            <div className="border-t border-blue-100 pt-4">
                                <label className="block text-xs font-bold text-blue-600 uppercase mb-3 flex items-center gap-1">
                                    <Warehouse size={12} /> Configuración Mayorista
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Precio Mayorista</label>
                                        <input
                                            type="number"
                                            value={form.precio_mayorista}
                                            onChange={(e) => setForm({ ...form, precio_mayorista: e.target.value })}
                                            className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="$0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cantidad Mayorista</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={form.cantidad_mayorista}
                                            onChange={(e) => setForm({ ...form, cantidad_mayorista: e.target.value })}
                                            className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="Ej: 6"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cantidad Mínima</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={form.cantidad_minima}
                                            onChange={(e) => setForm({ ...form, cantidad_minima: parseInt(e.target.value) || 1 })}
                                            className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Unidad</label>
                                        <input
                                            type="text"
                                            value={form.unidad}
                                            onChange={(e) => setForm({ ...form, unidad: e.target.value })}
                                            className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            placeholder="Ej: kg, pack, unidad"
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2">
                                    El precio mayorista se aplica cuando el cliente pide al menos la cantidad mayorista.
                                </p>
                            </div>
                        )}

                        {/* Sección de Toppings */}
                        <div className="border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                                    Toppings / Extras <Info size={12} />
                                </label>
                                {loadingToppings && <Loader2 className="animate-spin text-orange-600" size={14} />}
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                {loadingToppings ? (
                                    <div className="space-y-2 opacity-50 pointer-events-none">
                                        {[1, 2].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>)}
                                    </div>
                                ) : (
                                    <>
                                        {toppingsGroups.map(grupo => (
                                            <div key={grupo.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-orange-200 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={productoToppingsConfig[grupo.id]?.enabled || false}
                                                            onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                ...prev,
                                                                [grupo.id]: { ...prev[grupo.id], enabled: e.target.checked }
                                                            }))}
                                                            className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                                                        />
                                                        <span className="font-bold text-sm text-gray-700">{grupo.nombre}</span>
                                                    </label>
                                                    <span className="text-xs text-gray-400">{grupo.toppings?.length || 0} opc.</span>
                                                </div>

                                                {productoToppingsConfig[grupo.id]?.enabled && (
                                                    <div className="flex gap-2 pl-6 animate-in slide-in-from-top-2 duration-200">
                                                        <div className="flex-1">
                                                            <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Mínimo</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={productoToppingsConfig[grupo.id]?.min ?? 0}
                                                                onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                    ...prev,
                                                                    [grupo.id]: { ...prev[grupo.id], min: e.target.value }
                                                                }))}
                                                                className="w-full bg-white p-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Máximo</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={productoToppingsConfig[grupo.id]?.max ?? 0}
                                                                onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                    ...prev,
                                                                    [grupo.id]: { ...prev[grupo.id], max: e.target.value }
                                                                }))}
                                                                className="w-full bg-white p-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {toppingsGroups.length === 0 && (
                                            <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-xs text-gray-400 italic">No tenés grupos de toppings creados.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6 bg-gray-50 flex gap-3 sticky bottom-0 border-t border-gray-100 mt-auto z-10">
                    <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-3 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:bg-gray-400 disabled:shadow-none transition-all flex justify-center items-center gap-2"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Guardando..." : "Guardar Producto"}
                    </button>
                </div>
            </div>
        </div>
    );
}
