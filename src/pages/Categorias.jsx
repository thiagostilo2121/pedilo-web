/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import api from "../api/api";
import { Plus, Pencil, Trash2, ImageIcon, Loader2, X } from "lucide-react";
import { useRequirePremium } from "../hooks/useRequirePremium";
import { useToast } from "../contexts/ToastProvider";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, DEFAULT_CATEGORY_IMAGE } from "../constants";
import ConfirmModal from "../components/ConfirmModal";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export default function CategoriasDashboard() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nombre: "", imagen_url: "" });
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Categorías</h1>
          <p className="text-gray-500">Organiza tu menú para que tus clientes compren más fácil.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-md shadow-orange-200"
        >
          <Plus size={20} />
          Crear Categoría
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-56 flex flex-col">
              <div className="bg-gray-200 h-40 w-full" />
              <div className="p-3 bg-gray-50 flex-1 flex gap-2">
                <div className="h-8 bg-gray-200 rounded-lg flex-1" />
                <div className="h-8 bg-gray-200 rounded-lg w-10" />
              </div>
            </div>
          ))}
        </div>
      ) : categorias.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No hay categorías</h3>
          <p className="text-gray-500 mb-6">Empezá creando una como "Hamburguesas" o "Bebidas".</p>
          <button onClick={() => openModal()} className="text-orange-600 font-semibold hover:underline">
            + Crear mi primera categoría
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((cat) => (
            <div key={cat.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE}
                  alt={cat.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-3 left-4 text-xl font-bold text-white">{cat.nombre}</h2>
              </div>
              <div className="p-3 flex gap-2 bg-white">
                <button
                  onClick={() => openModal(cat)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-600 transition-colors border border-gray-100"
                >
                  <Pencil size={16} />
                  <span className="text-sm font-medium">Editar</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm({ open: true, categoryId: cat.id })}
                  className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-600 hover:border-red-100 transition-colors border border-gray-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre de la categoría</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: Pizzas, Postres..."
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Imagen representativa</label>
                <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {form.imagen_url ? (
                    <div className="relative w-full">
                      <img src={form.imagen_url} className="w-full h-32 object-cover rounded-lg" alt="Preview" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        <p className="text-white text-xs font-bold">Cambiar imagen</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 z-10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-xs text-gray-500">Clic para subir (JPG, PNG)</p>
                    </div>
                  )}
                </div>
                {uploadingImage && <div className="flex items-center gap-2 mt-2 text-orange-600 text-sm font-medium"><Loader2 size={14} className="animate-spin" /> Subiendo a Cloudinary...</div>}
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button onClick={closeModal} className="flex-1 px-4 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-all">
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploadingImage || saving}
                className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all ${uploadingImage || saving ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700 shadow-orange-200"}`}
              >
                {editingCategoria ? "Actualizar" : "Crear Ahora"}
              </button>
            </div>
          </div>
        </div>
      )}

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
    </DashboardLayout>
  );
}
