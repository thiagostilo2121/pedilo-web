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

import { useEffect, useState } from "react";
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
  Star
} from "lucide-react";
import { DEFAULT_PRODUCT_IMAGE } from "../constants";
import ConfirmModal from "../components/ConfirmModal";
import ProductForm from "../components/dashboard/ProductForm";
import Skeleton from "../components/ui/Skeleton";

export default function ProductosDashboard() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, productId: null });

  const [productoToppingsConfig, setProductoToppingsConfig] = useState({});
  const [gruposToppings, setGruposToppings] = useState([]);
  const [loadingToppings, setLoadingToppings] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, gruposRes] = await Promise.all([
        productService.getAll(),
        productService.getAllCategories(),
        productService.getGruposToppings(),
      ]);
      setProductos(prodRes);
      setCategorias(catRes);
      setGruposToppings(gruposRes || []);
    } catch (err) {
      console.error("Error al cargar datos", err);
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

    // Initial config for toppings
    const initialConfig = {};
    if (gruposToppings) {
      gruposToppings.forEach(g => {
        initialConfig[g.id] = { enabled: false, min: 0, max: g.toppings.length };
      });
    }
    setProductoToppingsConfig(initialConfig);

    if (producto) {
      setLoadingToppings(true);
      productService.getProductoToppings(producto.id)
        .then(configs => {
          if (configs && configs.length > 0) {
            const newConfig = { ...initialConfig };
            configs.forEach(c => {
              newConfig[c.grupo_id] = {
                enabled: true,
                min: c.min_selecciones,
                max: c.max_selecciones || 0
              };
            });
            setProductoToppingsConfig(newConfig);
          }
        })
        .catch(err => console.error("Error al cargar toppings", err))
        .finally(() => setLoadingToppings(false));
    } else {
      setLoadingToppings(false);
    }

    setShowModal(true);
  };

  const handleFormSubmit = async (formData, imageFile, toppingsConfig) => {
    if (!formData.nombre.trim() || !formData.precio) return toast.warning("Nombre y precio son obligatorios");

    setUploading(true);
    try {
      let imageUrl = formData.imagen_url;
      if (imageFile) imageUrl = await productService.uploadImage(imageFile);

      const payload = { ...formData, imagen_url: imageUrl };
      let productoId;

      if (editingProducto) {
        await productService.update(editingProducto.id, payload);
        productoId = editingProducto.id;
        toast.success("Producto actualizado");
      } else {
        const nuevo = await productService.create(payload);
        productoId = nuevo.id;
        toast.success("Producto creado");
      }

      // Guardar configuración de toppings
      const toppingsPayload = Object.entries(toppingsConfig)
        .filter(([_, config]) => config.enabled)
        .map(([grupoId, config]) => ({
          grupo_id: parseInt(grupoId),
          min_selecciones: parseInt(config.min) || 0,
          max_selecciones: parseInt(config.max) || 1
        }));

      await productService.configurarProductoToppings(productoId, toppingsPayload);

      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error(err);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm sm:text-base">Administra el stock y precios de tu menú.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
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
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-sm text-sm sm:text-base"
        />
      </div>

      {
        loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-80">
                <Skeleton className="h-44 w-full" />
                <div className="p-4 flex-1 flex flex-col space-y-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <div className="mt-auto pt-4 flex justify-between border-t border-gray-50 animate-pulse">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-20" />
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
                  {prod.destacado && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-white p-1.5 rounded-full shadow-md z-10">
                      <Star size={12} fill="currentColor" />
                    </div>
                  )}
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
        )
      }

      <ProductForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={editingProducto}
        categories={categorias}
        toppingsGroups={gruposToppings}
        initialToppingsConfig={productoToppingsConfig}
        loadingToppings={loadingToppings}
        onSubmit={handleFormSubmit}
        isSubmitting={uploading}
      />

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
    </DashboardLayout >
  );
}