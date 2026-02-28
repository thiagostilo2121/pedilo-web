/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import api from "../../api/api";
import { Plus, Pencil, Trash2, ImageIcon, Loader2, X } from "lucide-react";
import { useRequirePremium } from "../../hooks/useRequirePremium";
import { useToast } from "../../contexts/ToastProvider";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, DEFAULT_CATEGORY_IMAGE } from "../../constants";
import ConfirmModal from "../../components/ConfirmModal";
import Skeleton from "../../components/ui/Skeleton";
import PageHeader from "../../components/dashboard/PageHeader";
import PrimaryButton from "../../components/dashboard/PrimaryButton";
import ViewToggle from "../../components/dashboard/ViewToggle";
import EmptyState from "../../components/dashboard/EmptyState";
import ModalShell from "../../components/dashboard/ModalShell";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function CategoriasDashboard() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nombre: "", imagen_url: "" });
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const fileInputRef = useRef(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, categoryId: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categorias");
      if (!Array.isArray(res.data)) throw new Error("Formato de respuesta inválido");
      setCategorias(res.data);
    } catch (err) {
      console.error("Error al cargar categorías", err);
      toast.error("No se pudieron cargar las categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Verificar suscripción premium y negocio
  useRequirePremium();
  const toast = useToast();


  const openModal = (categoria = null) => {
    setEditingCategoria(categoria);
    setForm(categoria ? { ...categoria } : { nombre: "", imagen_url: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategoria(null);
    setUploadingImage(false);
    setSaving(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: "POST", body: data });
      if (!res.ok) throw new Error("Falló la subida");

      const json = await res.json();
      if (!json.secure_url) throw new Error("Cloudinary no devolvió URL");

      setForm((prev) => ({ ...prev, imagen_url: json.secure_url }));
      toast.success("Imagen subida correctamente.");
    } catch (err) {
      console.error("Error al subir imagen", err);
      toast.error("Error al subir la imagen. Probá otra vez.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) return toast.error("El nombre es obligatorio");
    if (saving) return;

    setSaving(true);
    try {
      if (editingCategoria) {
        await api.put(`/categorias/${editingCategoria.id}`, form);
        toast.success("Categoría actualizada con éxito");
      } else {
        await api.post("/categorias", form);
        toast.success("Categoría creada con éxito");
      }
      await fetchData();
      closeModal();
    } catch (err) {
      console.error("Error al guardar", err);
      const msg = err?.response?.data?.message || "Error al guardar la categoría.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categorias/${id}`);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Categoría eliminada.");
    } catch (err) {
      console.error("Error al borrar", err);
      const msg = err?.response?.data?.message || "Error al borrar la categoría.";
      toast.error(msg);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, imagen_url: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <PageHeader
          title="Categorías"
          subtitle="Organiza tu menú para que tus clientes compren más fácil."
          actions={
            <>
              <ViewToggle value={viewMode} onChange={setViewMode} />
              <PrimaryButton onClick={() => openModal()} icon={Plus}>
                <span className="hidden sm:inline">Nueva Categoría</span>
                <span className="sm:hidden">Crear</span>
              </PrimaryButton>
            </>
          }
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 p-4 space-y-4">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : categorias.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No hay categorías"
          description='Creá categorías como "Hamburguesas" o "Bebidas" para organizar tus productos.'
          actionLabel="Crear mi primera categoría"
          onAction={() => openModal()}
        />
      ) : (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categorias.map((cat) => (
              <div key={cat.id} className="group bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 relative cursor-pointer" onClick={() => openModal(cat)}>

                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
                  <img
                    src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                    alt={cat.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md truncate">{cat.nombre}</h2>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-wider mt-1">Categoría</p>
                  </div>

                  {/* Hover Actions Desktop */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(cat); }}
                      className="p-2 bg-white/90 backdrop-blur text-gray-700 dark:text-zinc-300 hover:text-blue-600 rounded-xl shadow-lg hover:scale-110 transition-all border border-gray-100 dark:border-white/10"
                      title="Editar"
                    >
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, categoryId: cat.id }); }}
                      className="p-2 bg-white/90 backdrop-blur text-gray-700 dark:text-zinc-300 hover:text-red-500 rounded-xl shadow-lg hover:scale-110 transition-all border border-gray-100 dark:border-white/10"
                      title="Eliminar"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Mobile visible footer for actions, since hover doesn't exist */}
                <div className="p-3 flex gap-2 sm:hidden border-t border-gray-50 dark:border-white/5">
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(cat); }}
                    className="flex-1 py-2.5 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-zinc-300 font-bold rounded-xl text-xs uppercase tracking-wider border border-gray-200 dark:border-white/10 active:scale-95 transition-transform"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, categoryId: cat.id }); }}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl border border-red-100 active:scale-95 transition-transform"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {categorias.map((cat) => (
              <div key={cat.id} className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer" onClick={() => openModal(cat)}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 relative">
                  <img
                    src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={cat.nombre}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-0.5">Categoría</span>
                  <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-lg leading-tight truncate">{cat.nombre}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(cat); }}
                    className="p-3 text-gray-400 dark:text-zinc-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                  >
                    <Pencil size={20} strokeWidth={2} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, categoryId: cat.id }); }}
                    className="p-3 text-gray-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modal */}
      <ModalShell
        isOpen={showModal}
        onClose={closeModal}
        title={editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
        subtitle="Información básica"
        footer={
          <div className="flex gap-3">
            <button onClick={closeModal} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/15 transition-all active:scale-95">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploadingImage || saving}
              className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${uploadingImage || saving ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"}`}
            >
              {saving && <Loader2 size={18} className="animate-spin" />}
              {editingCategoria ? "Guardar" : "Crear"}
            </button>
          </div>
        }
      >
        <div className="p-6 space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Pizzas, Postres..."
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent rounded-xl focus:bg-white dark:focus:bg-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold text-gray-900 dark:text-zinc-100 placeholder:font-normal placeholder:text-gray-400 dark:placeholder:text-zinc-500 text-lg"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Imagen</label>
            <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-zinc-800 hover:border-orange-300 transition-all cursor-pointer relative group min-h-[160px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              {form.imagen_url ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                  <img src={form.imagen_url} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 p-4 text-center">
                    <ImageIcon className="text-white mb-1 mx-auto" size={24} />
                    <p className="text-white text-xs font-bold uppercase tracking-wider">Toca para cambiar</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-white dark:bg-zinc-900 text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 z-30 transition-transform hover:scale-110 border border-gray-100 dark:border-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="bg-white dark:bg-zinc-900 p-4 rounded-full shadow-sm inline-block mb-3">
                    <ImageIcon className="text-gray-300" size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">Tocá para subir una imagen</p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
            {uploadingImage && (
              <div className="flex items-center gap-2 mt-2 text-orange-600 text-sm font-bold bg-orange-50 p-3 rounded-xl justify-center animate-pulse border border-orange-100">
                <Loader2 size={16} className="animate-spin" /> Subiendo a la nube...
              </div>
            )}
          </div>
        </div>
      </ModalShell>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, categoryId: null })}
        onConfirm={() => handleDelete(deleteConfirm.categoryId)}
        title="¿Eliminar categoría?"
        message="Los productos asociados a esta categoría se moverán a la categoría 'Otros'. Esta acción no se puede deshacer."
        confirmText="Eliminar"
        variant="danger"
      />
    </DashboardLayout >
  );
}
