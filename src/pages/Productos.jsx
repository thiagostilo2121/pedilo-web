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
import productService from "../services/productService";
import { useRequirePremium } from "../hooks/useRequirePremium";
import { useToast } from "../contexts/ToastProvider";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Image as ImageIcon,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Tag
} from "lucide-react";
import { DEFAULT_PRODUCT_IMAGE } from "../constants";
import ConfirmModal from "../components/ConfirmModal";


export default function ProductosDashboard() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
    categoria: "",
    stock: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, productId: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getAll(),
        productService.getAllCategories(),
      ]);
      setProductos(prodRes);
      setCategorias(catRes);
    } catch (err) {
      console.error("Error al cargar datos");
      toast.error("Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Verificar suscripción premium y negocio
  useRequirePremium();

  const openModal = (producto = null) => {
    setEditingProducto(producto);
    setForm(producto ? { ...producto } : {
      nombre: "",
      descripcion: "",
      precio: "",
      imagen_url: "",
      categoria: categorias[0]?.nombre || "",
      stock: true,
    });
    setImageFile(null);
    setShowModal(true);
  };



  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.precio) return toast.warning("Nombre y precio son obligatorios");

    setUploading(true);
    try {
      let imageUrl = form.imagen_url;
      if (imageFile) imageUrl = await productService.uploadImage(imageFile);

      const payload = { ...form, imagen_url: imageUrl };
      if (editingProducto) {
        await productService.update(editingProducto.id, payload);
        toast.success("Producto actualizado");
      } else {
        await productService.create(payload);
        toast.success("Producto creado");
      }
      fetchData();
      setShowModal(false);
    } catch (err) {
      toast.error("Error al guardar producto");
    } finally {
      setUploading(false);
    }
  };


  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Productos</h1>
          <p className="text-gray-500">Administra el stock y precios de tu menú.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
        >
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      {/* Buscador y Filtros */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-sm"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-80">
              <div className="bg-gray-200 h-44 w-full" />
              <div className="p-4 flex-1 flex flex-col space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="mt-auto pt-4 flex justify-between border-t border-gray-50">
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-8 bg-gray-200 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : productos.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No hay productos</h3>
          <p className="text-gray-500 mb-6">Empezá creando uno como "Hamburguesa" o "Pizza".</p>
          <button onClick={() => openModal()} className="text-orange-600 font-semibold hover:underline">
            + Crear mi primer producto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProductos.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={prod.imagen_url || DEFAULT_PRODUCT_IMAGE}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={prod.nombre}
                />
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${prod.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {prod.stock ? "En Stock" : "Agotado"}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{prod.categoria}</span>
                  <h2 className="font-bold text-gray-900 truncate">{prod.nombre}</h2>
                  <p className="text-gray-500 text-xs line-clamp-2 mt-1">{prod.descripcion || "Sin descripción disponible."}</p>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                  <span className="text-lg font-black text-gray-900">${prod.precio}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openModal(prod)} className="p-2 text-orange-700 bg-orange-50 hover:bg-orange-100 hover:text-orange-600 rounded-lg transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => setDeleteConfirm({ open: true, productId: prod.id })} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Moderno */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingProducto ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lado Izquierdo: Imagen */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group">
                  {imageFile || form.imagen_url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : form.imagen_url}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setForm({ ...form, imagen_url: "" });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 z-10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="mx-auto text-gray-300 mb-2" size={40} />
                      <p className="text-xs text-gray-400">Click para subir foto del plato</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.checked })}
                    className="w-5 h-5 accent-orange-600"
                  />
                  <label className="text-sm font-bold text-orange-800">Disponible para la venta</label>
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
                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
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
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                    <select
                      value={form.categoria}
                      onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                      className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      {categorias.map(cat => <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>)}
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
                    placeholder="¿Qué trae el plato?"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500">Cancelar</button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="flex-1 py-3 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:bg-gray-400 transition-all"
              >
                {uploading ? "Guardando..." : "Guardar Producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, productId: null })}
        onConfirm={async () => {
          try {
            await productService.delete(deleteConfirm.productId);
            fetchData();
            toast.success("Producto eliminado");
          } catch (err) {
            toast.error("Error al eliminar");
          }
        }}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer. El producto será eliminado permanentemente."
        confirmText="Eliminar"
        variant="danger"
      />
    </DashboardLayout>
  );
}