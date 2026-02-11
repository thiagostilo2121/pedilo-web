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
import { Plus, Pencil, Trash2, X, Cherry, Loader2, Check } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import Skeleton from "../components/ui/Skeleton";

export default function ToppingsDashboard() {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingGrupo, setEditingGrupo] = useState(null);
    const [form, setForm] = useState({ nombre: "", toppings: [] });
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

    const addTopping = () => {
        if (!nuevoTopping.nombre.trim()) return toast.warning("El topping necesita un nombre");
        setForm(prev => ({
            ...prev,
            toppings: [...prev.toppings, {
                nombre: nuevoTopping.nombre,
                precio: parseInt(nuevoTopping.precio) || 0,
                disponible: nuevoTopping.disponible,
                id: null // nuevo topping sin ID
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
        if (form.toppings.length === 0) return toast.warning("Agregá al menos un topping");

        setSaving(true);
        try {
            if (editingGrupo) {
                await productService.updateGrupoTopping(editingGrupo.id, {
                    nombre: form.nombre,
                    toppings: form.toppings.map(t => ({ nombre: t.nombre, precio_extra: parseInt(t.precio) || 0, disponible: t.disponible }))
                });
                toast.success("Grupo actualizado");
            } else {
                await productService.createGrupoTopping({
                    nombre: form.nombre,
                    toppings: form.toppings.map(t => ({ nombre: t.nombre, precio_extra: parseInt(t.precio) || 0, disponible: t.disponible }))
                });
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl text-gray-900 font-extrabold">Toppings</h1>
                    <p className="text-gray-500 text-sm">Grupos de extras para tus productos</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm shadow-orange-200 active:scale-95"
                >
                    <Plus size={18} /> Crear Grupo
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5 rounded-full" />
                                    <Skeleton className="h-6 w-32 rounded" />
                                </div>
                                <div className="flex gap-1">
                                    <Skeleton className="w-8 h-8 rounded-lg" />
                                    <Skeleton className="w-8 h-8 rounded-lg" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-3/4 rounded" />
                                <Skeleton className="h-4 w-5/6 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : grupos.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                    <Cherry className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900">No hay grupos de toppings</h3>
                    <p className="text-gray-500 mb-6">Creá grupos como "Salsas", "Extras" o "Sabores"</p>
                    <button onClick={() => openModal()} className="text-orange-600 font-semibold hover:underline">
                        + Crear mi primer grupo
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {grupos.map((grupo) => (
                        <div key={grupo.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <Cherry className="text-orange-600" size={20} />
                                    <h3 className="font-bold text-gray-900">{grupo.nombre}</h3>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openModal(grupo)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => setDeleteConfirm({ open: true, grupoId: grupo.id })} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                {(grupo.toppings || []).slice(0, 4).map((t, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-gray-600 ${t.disponible === false ? "line-through opacity-50" : ""}`}>{t.nombre}</span>
                                            {t.disponible === false && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-bold">Sin Stock</span>}
                                        </div>
                                        <span className="font-bold text-gray-900">{(t.precio_extra || t.precio) > 0 ? `+$${t.precio_extra || t.precio}` : "Gratis"}</span>
                                    </div>
                                ))}
                                {(grupo.toppings?.length || 0) > 4 && (
                                    <p className="text-xs text-gray-400">+{grupo.toppings.length - 4} más...</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Crear/Editar */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-4 md:p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-black">{editingGrupo ? "Editar Grupo" : "Nuevo Grupo"}</h2>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>

                        <div className="p-4 md:p-6 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Grupo</label>
                                <input
                                    type="text"
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="Ej: Salsas, Extras, Sabores..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Toppings</label>
                                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                                    {form.toppings.map((t, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                            {editingToppingIndex === i ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={t.nombre}
                                                        onChange={(e) => updateTopping(i, "nombre", e.target.value)}
                                                        className="flex-1 p-1.5 bg-white border border-orange-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                                        autoFocus
                                                    />
                                                    <input
                                                        type="number"
                                                        value={t.precio}
                                                        onChange={(e) => updateTopping(i, "precio", parseInt(e.target.value) || 0)}
                                                        className="w-16 p-1.5 bg-white border border-orange-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                                    />
                                                    <label className="flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={t.disponible !== false}
                                                            onChange={(e) => updateTopping(i, "disponible", e.target.checked)}
                                                            className="w-4 h-4 text-orange-600 rounded"
                                                        />
                                                    </label>
                                                    <button onClick={() => setEditingToppingIndex(null)} className="text-green-600 hover:text-green-700 p-1">
                                                        <Check size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span className={`flex-1 text-sm font-medium ${t.disponible === false ? "line-through text-gray-400" : ""}`}>{t.nombre}</span>
                                                    {t.disponible === false && <span className="text-[10px] text-red-500 font-bold whitespace-nowrap">Sin Stock</span>}
                                                    <span className="text-xs text-orange-600 font-bold">{t.precio > 0 ? `+$${t.precio}` : "Gratis"}</span>
                                                    <button onClick={() => setEditingToppingIndex(i)} className="text-gray-400 hover:text-orange-600 p-1">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button onClick={() => removeTopping(i)} className="text-red-500 hover:text-red-700 p-1">
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={nuevoTopping.nombre}
                                        onChange={(e) => setNuevoTopping({ ...nuevoTopping, nombre: e.target.value })}
                                        className="flex-1 p-3 bg-gray-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Nombre del topping"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={nuevoTopping.precio}
                                            onChange={(e) => setNuevoTopping({ ...nuevoTopping, precio: e.target.value })}
                                            className="w-20 p-3 bg-gray-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="$0"
                                        />
                                        <label className="flex items-center gap-1.5 bg-gray-50 px-3 rounded-lg cursor-pointer border border-transparent hover:border-gray-200 transition-colors select-none">
                                            <input
                                                type="checkbox"
                                                checked={nuevoTopping.disponible !== false}
                                                onChange={(e) => setNuevoTopping({ ...nuevoTopping, disponible: e.target.checked })}
                                                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
                                            />
                                            <span className="text-xs font-bold text-gray-500">Disp.</span>
                                        </label>
                                        <button onClick={addTopping} className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:scale-95 shadow-sm shadow-orange-200">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 bg-gray-50 flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500">Cancelar</button>
                            <button onClick={handleSubmit} disabled={saving} className="flex-1 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                                {saving && <Loader2 className="animate-spin" size={20} />}
                                {saving ? "Guardando..." : "Guardar"}
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
                message="Se eliminarán todos los toppings de este grupo."
                confirmText="Eliminar"
                variant="danger"
            />
        </DashboardLayout>
    );
}
