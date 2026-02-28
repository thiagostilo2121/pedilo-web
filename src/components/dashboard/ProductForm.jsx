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
        costo: "",
        imagen_url: "",
        categoria: "",
        stock: true,
        destacado: false,
        precio_mayorista: "",
        cantidad_mayorista: "",
        cantidad_minima: 1,
        unidad: "unidad",
        sku: "",
        codigo_barras: "",
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
                    costo: scannedData.costo || initialData.costo || "",
                    imagen_url: scannedData.imagen_url || initialData.imagen_url,
                    categoria: categories.find(c => c.nombre === initialData.categoria) ? initialData.categoria : categories[0]?.nombre || "",
                    stock: initialData.stock ?? true,
                    destacado: initialData.destacado ?? false,
                    precio_mayorista: initialData.precio_mayorista ?? "",
                    cantidad_mayorista: initialData.cantidad_mayorista ?? "",
                    cantidad_minima: initialData.cantidad_minima ?? 1,
                    unidad: initialData.unidad || "unidad",
                    sku: scannedData.sku || initialData.sku || "",
                    codigo_barras: scannedData.codigo_barras || initialData.codigo_barras || "",
                });
                setImageFile(null);
            } else if (initialData) {
                setForm({
                    nombre: initialData.nombre || "",
                    descripcion: initialData.descripcion || "",
                    precio: initialData.precio || "",
                    costo: initialData.costo || "",
                    imagen_url: initialData.imagen_url || "",
                    categoria: categories.find(c => c.nombre === initialData.categoria) ? initialData.categoria : categories[0]?.nombre || "",
                    stock: initialData.stock ?? true,
                    destacado: initialData.destacado ?? false,
                    precio_mayorista: initialData.precio_mayorista ?? "",
                    cantidad_mayorista: initialData.cantidad_mayorista ?? "",
                    cantidad_minima: initialData.cantidad_minima ?? 1,
                    unidad: initialData.unidad || "unidad",
                    sku: initialData.sku || "",
                    codigo_barras: initialData.codigo_barras || "",
                });
                setImageFile(null);
            } else {
                setForm({
                    nombre: scannedData?.nombre || "",
                    descripcion: scannedData?.descripcion || "",
                    precio: "",
                    costo: scannedData?.costo || "",
                    imagen_url: scannedData?.imagen_url || "",
                    categoria: categories[0]?.nombre || "",
                    stock: true,
                    destacado: false,
                    precio_mayorista: "",
                    cantidad_mayorista: "",
                    cantidad_minima: 1,
                    unidad: "unidad",
                    sku: scannedData?.sku || "",
                    codigo_barras: scannedData?.codigo_barras || "",
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center z-50 p-0 sm:p-6 overflow-hidden">
            <div className="bg-white dark:bg-zinc-900 w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:rounded-3xl sm:max-w-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300 sm:animate-in sm:zoom-in-95">
                <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-white dark:bg-zinc-900 shrink-0">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">
                            {initialData ? "Editar Producto" : "Nuevo Producto"}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">Detalles del ítem</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:bg-white/5 rounded-full transition-colors active:scale-95">
                        <X size={24} className="text-gray-500 dark:text-zinc-400" />
                    </button>
                </div>

                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto flex-1 overscroll-contain pb-24 sm:pb-6 bg-white dark:bg-zinc-900">
                    {/* Lado Izquierdo: Imagen */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-gray-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:bg-white/5 transition-colors cursor-pointer">
                            {imageFile || form.imagen_url ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : form.imagen_url}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider text-sm">Cambiar Foto</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageFile(null);
                                            setForm({ ...form, imagen_url: "" });
                                        }}
                                        className="absolute top-3 right-3 bg-white dark:bg-zinc-900 text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 z-10 hover:scale-110 transition-transform"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-full shadow-sm inline-block mb-3">
                                        <ImageIcon className="text-gray-300" size={40} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">Tocá para subir foto</p>
                                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-medium">Recomendado: 500x500px</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer z-0"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-white/10 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:bg-white/5 transition-colors" onClick={() => setForm(f => ({ ...f, stock: !f.stock }))}>
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${form.stock ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-white/15 bg-white dark:bg-zinc-900'}`}>
                                    {form.stock && <div className="w-2.5 h-2.5 bg-white dark:bg-zinc-900 rounded-sm" />}
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-900 dark:text-zinc-100 cursor-pointer block">
                                        Disponible para la venta
                                    </label>
                                    <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Si desactivas esto, aparecerá como "Agotado".</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 cursor-pointer select-none hover:bg-yellow-100 transition-colors" onClick={() => setForm(f => ({ ...f, destacado: !f.destacado }))}>
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${form.destacado ? 'bg-yellow-500 border-yellow-500' : 'border-yellow-300 bg-white dark:bg-zinc-900'}`}>
                                    {form.destacado && <Star size={14} className="text-white fill-current" />}
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-yellow-900 cursor-pointer block flex items-center gap-1">
                                        Producto Destacado
                                    </label>
                                    <span className="text-xs text-yellow-700 font-medium">Aparecerá primero en tu menú.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado Derecho: Info */}
                    <div className="flex flex-col gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-1">Nombre del producto</label>
                            <input
                                type="text"
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:text-zinc-500 text-lg"
                                placeholder="Ej: Hamburguesa Especial"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-1">Precio</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={form.precio}
                                        onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-black text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:text-zinc-500 text-lg"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-1">Costo (Opcional)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={form.costo}
                                        onChange={(e) => setForm({ ...form, costo: e.target.value })}
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-black text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:text-zinc-500 text-lg"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-1">Categoría</label>
                            <div className="relative">
                                <select
                                    value={form.categoria}
                                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100 appearance-none cursor-pointer"
                                >
                                    {categories.map(cat => <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-1">Descripción</label>
                            <textarea
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:text-zinc-500 resize-none"
                                rows="3"
                                placeholder="¿Qué ingredientes lleva? Contale a tus clientes."
                            />
                        </div>

                        {/* Advanced / Optional */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest pl-1">SKU (Opcional)</label>
                                <input
                                    type="text"
                                    value={form.sku}
                                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                                    placeholder="Ej: BEB-001"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Cód. Barras (Opcional)</label>
                                <input
                                    type="text"
                                    value={form.codigo_barras}
                                    onChange={(e) => setForm({ ...form, codigo_barras: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800/50 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 dark:bg-zinc-900 dark:focus:bg-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                                    placeholder="Ej: 779123456789"
                                />
                            </div>
                        </div>

                        {/* Sección Mayorista (solo distribuidoras) */}
                        {isDistribuidora && (
                            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                                <label className="block text-xs font-bold text-blue-600 uppercase mb-3 flex items-center gap-1">
                                    <Warehouse size={14} /> Configuración Mayorista
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-blue-400 uppercase mb-1">Precio Mayorista</label>
                                        <input
                                            type="number"
                                            value={form.precio_mayorista}
                                            onChange={(e) => setForm({ ...form, precio_mayorista: e.target.value })}
                                            className="w-full p-2 bg-white dark:bg-zinc-900 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="$0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-blue-400 uppercase mb-1">Cant. Mayorista</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={form.cantidad_mayorista}
                                            onChange={(e) => setForm({ ...form, cantidad_mayorista: e.target.value })}
                                            className="w-full p-2 bg-white dark:bg-zinc-900 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="Ej: 6"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-blue-400 uppercase mb-1">Cant. Mínima</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={form.cantidad_minima}
                                            onChange={(e) => setForm({ ...form, cantidad_minima: parseInt(e.target.value) || 1 })}
                                            className="w-full p-2 bg-white dark:bg-zinc-900 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                                            placeholder="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-blue-400 uppercase mb-1">Unidad</label>
                                        <input
                                            type="text"
                                            value={form.unidad}
                                            onChange={(e) => setForm({ ...form, unidad: e.target.value })}
                                            className="w-full p-2 bg-white dark:bg-zinc-900 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            placeholder="Ej: pack"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sección de Toppings */}
                        <div className="border-t border-gray-100 dark:border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                                    <span className="bg-orange-100 text-orange-700 p-1 rounded-lg"><Info size={16} /></span>
                                    Toppings y Extras
                                </label>
                                {loadingToppings && <Loader2 className="animate-spin text-orange-600" size={16} />}
                            </div>

                            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                {loadingToppings ? (
                                    <div className="space-y-3 opacity-50 pointer-events-none">
                                        {[1, 2].map(i => <div key={i} className="h-16 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl animate-pulse"></div>)}
                                    </div>
                                ) : (
                                    <>
                                        {toppingsGroups.map(grupo => (
                                            <div
                                                key={grupo.id}
                                                className={`rounded-2xl p-4 border transition-all duration-200 ${productoToppingsConfig[grupo.id]?.enabled
                                                    ? "bg-orange-50 border-orange-200 shadow-sm"
                                                    : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-white/10 hover:border-orange-100"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <label className="flex items-center gap-3 cursor-pointer w-full select-none">
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${productoToppingsConfig[grupo.id]?.enabled
                                                            ? "bg-orange-600 border-orange-600"
                                                            : "bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/15"
                                                            }`}>
                                                            {productoToppingsConfig[grupo.id]?.enabled && <div className="w-2 h-2 bg-white dark:bg-zinc-900 rounded-full" />}
                                                            <input
                                                                type="checkbox"
                                                                checked={productoToppingsConfig[grupo.id]?.enabled || false}
                                                                onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                    ...prev,
                                                                    [grupo.id]: { ...prev[grupo.id], enabled: e.target.checked }
                                                                }))}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                        <span className={`font-bold text-sm ${productoToppingsConfig[grupo.id]?.enabled ? "text-orange-900" : "text-gray-600 dark:text-zinc-400"}`}>
                                                            {grupo.nombre}
                                                        </span>
                                                        <span className="text-xs text-gray-400 dark:text-zinc-500 ml-auto whitespace-nowrap font-normal">
                                                            {grupo.toppings?.length || 0} opc.
                                                        </span>
                                                    </label>
                                                </div>

                                                {productoToppingsConfig[grupo.id]?.enabled && (
                                                    <div className="grid grid-cols-2 gap-3 pl-8 animate-in slide-in-from-top-2 duration-200">
                                                        <div>
                                                            <label className="text-[10px] uppercase text-orange-700 font-bold block mb-1">Mínimo</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={productoToppingsConfig[grupo.id]?.min ?? 0}
                                                                onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                    ...prev,
                                                                    [grupo.id]: { ...prev[grupo.id], min: e.target.value }
                                                                }))}
                                                                className="w-full bg-white dark:bg-zinc-900 p-2 rounded-xl border border-orange-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-bold text-center"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] uppercase text-orange-700 font-bold block mb-1">Máximo</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={productoToppingsConfig[grupo.id]?.max ?? 0}
                                                                onChange={(e) => setProductoToppingsConfig(prev => ({
                                                                    ...prev,
                                                                    [grupo.id]: { ...prev[grupo.id], max: e.target.value }
                                                                }))}
                                                                className="w-full bg-white dark:bg-zinc-900 p-2 rounded-xl border border-orange-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-bold text-center"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {toppingsGroups.length === 0 && (
                                            <div className="text-center py-8 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10">
                                                <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">No tenés grupos de toppings creados.</p>
                                                <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">Andá a la sección "Toppings" para crear uno.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6 bg-white dark:bg-zinc-900 sm:bg-gray-50 dark:bg-zinc-800/50 flex gap-3 sticky bottom-0 border-t border-gray-100 dark:border-white/10 mt-auto z-40 shrink-0 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] sm:shadow-none">
                    <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:bg-white/10 transition-all active:scale-95">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:bg-gray-400 disabled:shadow-none transition-all flex justify-center items-center gap-2 active:scale-95"
                    >
                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                        {isSubmitting ? "Guardando..." : "Guardar Producto"}
                    </button>
                </div>
            </div>
        </div>
    );
}
