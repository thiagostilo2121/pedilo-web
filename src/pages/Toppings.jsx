/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import productService from "../services/productService";
import { useToast } from "../contexts/ToastProvider";
import { useRequirePremium } from "../hooks/useRequirePremium";
import { Plus, Pencil, Trash2, X, Cherry, Loader2, Check, Layers, DollarSign, ListPlus, AlertCircle } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import Skeleton from "../components/ui/Skeleton";

export default function ToppingsDashboard() {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingGrupo, setEditingGrupo] = useState(null);
    const [form, setForm] = useState({ nombre: "", toppings: [] });
    // Nuevo Topping State
    const [nuevoTopping, setNuevoTopping] = useState({ nombre: "", precio: "", disponible: true });
    const [editingToppingIndex, setEditingToppingIndex] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, grupoId: null });
    const toast = useToast();

    useRequirePremium();

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await productService.getGruposToppings();
            setGrupos(data || []);
        } catch (err) {
            toast.error("Error al cargar grupos de toppings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (grupo = null) => {
        setEditingGrupo(grupo);
        if (grupo) {
            setForm({
                nombre: grupo.nombre,
                // Map precio_extra from backend to precio for frontend state
                toppings: (grupo.toppings || []).map(t => ({
                    ...t,
                    precio: t.precio_extra !== undefined ? t.precio_extra : t.precio,
                    disponible: t.disponible !== undefined ? t.disponible : true
                }))
            });
        } else {
            setForm({ nombre: "", toppings: [] });
        }
        setNuevoTopping({ nombre: "", precio: "", disponible: true });
        setShowModal(true);
    };

    const addTopping = (e) => {
        e.preventDefault(); // Prevent form submission if inside a form
        if (!nuevoTopping.nombre.trim()) return toast.warning("El topping necesita un nombre");

        setForm(prev => ({
            ...prev,
            toppings: [...prev.toppings, {
                nombre: nuevoTopping.nombre,
                precio: parseInt(nuevoTopping.precio) || 0,
                disponible: nuevoTopping.disponible ?? true, // Default true
                id: null
            }]
        }));
        setNuevoTopping({ nombre: "", precio: "", disponible: true });
    };

    const removeTopping = (index) => {
        setForm(prev => ({
            ...prev,
            toppings: prev.toppings.filter((_, i) => i !== index)
        }));
    };

    const updateTopping = (index, field, value) => {
        setForm(prev => ({
            ...prev,
            toppings: prev.toppings.map((t, i) => i === index ? { ...t, [field]: value } : t)
        }));
    };

    const handleSubmit = async () => {
        if (!form.nombre.trim()) return toast.warning("El grupo necesita un nombre");
        // Allow creating group without toppings initially if user wants, but warn? No, let's enforce at least one or allow empty.
        // It's better to allow empty groups for flexibility.

        setSaving(true);
        try {
            const payload = {
                nombre: form.nombre,
                toppings: form.toppings.map(t => ({
                    nombre: t.nombre,
                    precio_extra: parseInt(t.precio) || 0,
                    disponible: t.disponible
                }))
            };

            if (editingGrupo) {
                await productService.updateGrupoTopping(editingGrupo.id, payload);
                toast.success("Grupo actualizado");
            } else {
                await productService.createGrupoTopping(payload);
                toast.success("Grupo creado");
            }
            fetchData();
            setShowModal(false);
        } catch (err) {
            toast.error("Error al guardar");
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20 space-y-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            Toppings
                            <span className="hidden sm:inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-widest">
                                Adicionales
                            </span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium max-w-2xl text-lg">
                            Gestioná los grupos de extras (salsas, agregados, sabores) para tus productos.
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-bold">Crear Grupo</span>
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="w-10 h-10 rounded-xl" />
                                        <Skeleton className="h-6 w-32 rounded" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <Skeleton className="h-4 w-full rounded" />
                                    <Skeleton className="h-4 w-3/4 rounded" />
                                    <Skeleton className="h-4 w-5/6 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : grupos.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-dashed border-gray-200 p-12 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
                            <Layers size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes grupos de toppings</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mb-8">
                            Creá grupos como "Salsas", "Extras" o "Sabores de Empanadas" para que tus clientes personalicen sus pedidos.
                        </p>
                        <button
                            onClick={() => openModal()}
                            className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Crear mi primer grupo
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {grupos.map((grupo) => (
                            <div
                                key={grupo.id}
                                className="group bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                    <button
                                        onClick={() => openModal(grupo)}
                                        className="p-2 bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm border border-gray-100 transition-colors"
                                        title="Editar"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm({ open: true, grupoId: grupo.id })}
                                        className="p-2 bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-sm border border-gray-100 transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            <Cherry size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{grupo.nombre}</h3>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                {grupo.toppings?.length || 0} Opciones
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 flex-1">
                                        {(grupo.toppings || []).slice(0, 4).map((t, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                <div className="flex items-center gap-2 truncate">
                                                    <div className={`w-2 h-2 rounded-full shrink-0 ${t.disponible !== false ? 'bg-green-400' : 'bg-red-400'}`} />
                                                    <span className={`font-medium text-gray-700 truncate ${t.disponible === false ? "opacity-50 line-through" : ""}`}>
                                                        {t.nombre}
                                                    </span>
                                                </div>
                                                <span className="font-bold text-gray-900 shrink-0 ml-2">
                                                    {(t.precio_extra || t.precio) > 0 ? `+$${t.precio_extra || t.precio}` : "Gratis"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {(grupo.toppings?.length || 0) > 4 && (
                                        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                                            <p className="text-xs font-bold text-gray-400">+{grupo.toppings.length - 4} opciones más</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL CREAR/EDITAR */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
                        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-white shrink-0">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">{editingGrupo ? "Editar Grupo" : "Nuevo Grupo"}</h2>
                                    <p className="text-sm text-gray-400 font-medium">Configurá las opciones disponibles</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 flex-1">

                                {/* Section 1: Group Name */}
                                <div className="space-y-1.5 ">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nombre del Grupo</label>
                                    <input
                                        type="text"
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400 text-lg"
                                        placeholder="Ej: Salsas, Aderezos..."
                                        autoFocus
                                    />
                                </div>

                                {/* Section 2: Add New Topping Form */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ListPlus size={18} className="text-orange-500" />
                                        <h3 className="text-sm font-bold text-gray-800">Agregar Opción</h3>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 space-y-1">
                                            <input
                                                type="text"
                                                value={nuevoTopping.nombre}
                                                onChange={(e) => setNuevoTopping({ ...nuevoTopping, nombre: e.target.value })}
                                                onKeyDown={(e) => e.key === 'Enter' && addTopping(e)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                                                placeholder="Nombre (Ej. Cheddar)"
                                            />
                                        </div>
                                        <div className="w-full sm:w-32 space-y-1 relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</div>
                                            <input
                                                type="number"
                                                value={nuevoTopping.precio}
                                                onChange={(e) => setNuevoTopping({ ...nuevoTopping, precio: e.target.value })}
                                                onKeyDown={(e) => e.key === 'Enter' && addTopping(e)}
                                                className="w-full pl-7 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                                                placeholder="0"
                                            />
                                        </div>
                                        <button
                                            onClick={addTopping}
                                            disabled={!nuevoTopping.nombre.trim()}
                                            className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Section 3: Toppings List */}
                                <div>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Opciones ({form.toppings.length})</h3>
                                    </div>

                                    {form.toppings.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                            <p className="text-sm font-medium">Aún no agregaste opciones a este grupo.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {form.toppings.map((t, i) => (
                                                <div key={i} className="group flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm">

                                                    {/* Checkbox Stock */}
                                                    <label className="cursor-pointer relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors" title={t.disponible ? "En Stock" : "Sin Stock"}>
                                                        <input
                                                            type="checkbox"
                                                            checked={t.disponible !== false}
                                                            onChange={(e) => updateTopping(i, 'disponible', e.target.checked)}
                                                            className="peer sr-only"
                                                        />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400 peer-checked:bg-green-500 transition-colors shadow-sm"></div>
                                                    </label>

                                                    {editingToppingIndex === i ? (
                                                        /* EDIT MODE ROW */
                                                        <div className="flex-1 flex flex-col sm:flex-row gap-2 animate-in fade-in duration-200">
                                                            <input
                                                                type="text"
                                                                value={t.nombre}
                                                                onChange={(e) => updateTopping(i, "nombre", e.target.value)}
                                                                className="flex-1 px-3 py-1.5 bg-gray-50 border border-orange-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                                                autoFocus
                                                            />
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="number"
                                                                    value={t.precio}
                                                                    onChange={(e) => updateTopping(i, "precio", parseInt(e.target.value) || 0)}
                                                                    className="w-20 px-3 py-1.5 bg-gray-50 border border-orange-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                                                />
                                                                <button
                                                                    onClick={() => setEditingToppingIndex(null)}
                                                                    className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 shrink-0"
                                                                >
                                                                    <Check size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        /* VIEW MODE ROW */
                                                        <>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`font-medium text-gray-900 truncate ${t.disponible === false ? "opacity-50 line-through" : ""}`}>
                                                                    {t.nombre}
                                                                </p>
                                                            </div>
                                                            <div className="font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg text-sm shrink-0">
                                                                {(t.precio > 0) ? `+$${t.precio}` : 'Gratis'}
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => setEditingToppingIndex(i)}
                                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                    title="Editar"
                                                                >
                                                                    <Pencil size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeTopping(i)}
                                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Eliminar"
                                                                >
                                                                    <X size={16} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-50 bg-gray-50 flex flex-col-reverse sm:flex-row gap-4 shrink-0">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-100 transition-all active:scale-95 text-center"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    className="flex-1 px-6 py-3.5 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
                                >
                                    {saving && <Loader2 className="animate-spin" size={20} />}
                                    {saving ? "Guardando..." : "Guardar Grupo"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ConfirmModal
                    isOpen={deleteConfirm.open}
                    onClose={() => setDeleteConfirm({ open: false, grupoId: null })}
                    onConfirm={async () => {
                        try {
                            await productService.deleteGrupoTopping(deleteConfirm.grupoId);
                            fetchData();
                            toast.success("Grupo eliminado");
                        } catch (err) {
                            toast.error("Error al eliminar");
                        }
                    }}
                    title="¿Eliminar grupo?"
                    message="Se eliminarán todos los toppings de este grupo. Esta acción no se puede deshacer."
                    confirmText="Sí, eliminar"
                    variant="danger"
                />
            </div>
        </DashboardLayout>
    );
}
