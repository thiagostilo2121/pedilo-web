/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import productService from "../../services/productService";
import negocioService from "../../services/negocioService";
import { useRequirePremium } from "../../hooks/useRequirePremium";
import { useToast } from "../../contexts/ToastProvider";
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Star,
  ScanBarcode,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader";
import PrimaryButton from "../../components/dashboard/PrimaryButton";
import ViewToggle from "../../components/dashboard/ViewToggle";
import SearchInput from "../../components/dashboard/SearchInput";
import EmptyState from "../../components/dashboard/EmptyState";
import { DEFAULT_PRODUCT_IMAGE } from "../../constants";
import ConfirmModal from "../../components/ConfirmModal";
import ProductForm from "../../components/dashboard/ProductForm";
import BarcodeScanner from "../../components/dashboard/BarcodeScanner";
import ProductImportModal from "../../components/dashboard/ProductImportModal";
import Skeleton from "../../components/ui/Skeleton";

export default function ProductosDashboard() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [editingProducto, setEditingProducto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tipoNegocio, setTipoNegocio] = useState("minorista");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const toast = useToast();

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, productId: null });

  const [productoToppingsConfig, setProductoToppingsConfig] = useState({});
  const [gruposToppings, setGruposToppings] = useState([]);
  const [loadingToppings, setLoadingToppings] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, gruposRes, negocioRes] = await Promise.all([
        productService.getAll(),
        productService.getAllCategories(),
        productService.getGruposToppings(),
        negocioService.getMiNegocio(),
      ]);
      setProductos(prodRes);
      setCategorias(catRes);
      setGruposToppings(gruposRes || []);
      setTipoNegocio(negocioRes?.tipo_negocio || "minorista");
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

  const handleScanResult = (productData) => {
    // Buscar si ya existe un producto con el mismo nombre (case insensitive)
    const existing = productos.find(p => p.nombre.toLowerCase() === productData.nombre.toLowerCase());

    if (existing) {
      toast.success(`Producto existente encontrado: ${existing.nombre}`);
      setScannedData(productData);
      openModal(existing);
    } else {
      setScannedData(productData);
      openModal(null);
    }
  };

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

      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseInt(formData.precio),
        imagen_url: imageUrl,
        categoria: formData.categoria,
        stock: formData.stock,
        destacado: formData.destacado,
        unidad: formData.unidad || "unidad",
        cantidad_minima: parseInt(formData.cantidad_minima) || 1,
        precio_mayorista: formData.precio_mayorista ? parseInt(formData.precio_mayorista) : null,
        cantidad_mayorista: formData.cantidad_mayorista ? parseInt(formData.cantidad_mayorista) : null,
        sku: formData.sku || null,
        codigo_barras: formData.codigo_barras || null,
      };
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
      <div className="flex flex-col gap-6 mb-8">

        {/* Header Section */}
        <PageHeader
          title="Productos"
          subtitle="Administra el stock y precios de tu menú."
          actions={
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowScanner(true)}
                className="p-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl font-bold hover:bg-blue-100 transition-all active:scale-95 shrink-0 flex items-center justify-center"
                title="Escanear Código"
              >
                <ScanBarcode size={22} />
                <span className="hidden sm:inline text-sm ml-2">Escanear</span>
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="p-3 bg-green-50 text-green-700 border border-green-100 rounded-xl font-bold hover:bg-green-100 transition-all active:scale-95 shrink-0 flex items-center justify-center"
                title="Importar Excel"
              >
                <FileSpreadsheet size={22} />
                <span className="hidden sm:inline text-sm ml-2">Excel</span>
              </button>
              <PrimaryButton onClick={() => openModal()} icon={Plus} className="flex-1 sm:flex-none">
                <span className="text-sm border-l border-gray-700 dark:border-zinc-600 pl-2 ml-1 sm:border-none sm:pl-0 sm:ml-0 sm:text-base">Nuevo<span className="hidden sm:inline"> Producto</span></span>
              </PrimaryButton>
            </div>
          }
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre..."
          />
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {
        loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 p-4 space-y-3">
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-4 w-2/3 rounded-lg" />
                <Skeleton className="h-6 w-1/3 rounded-lg" />
              </div>
            ))}
          </div>
        ) : productos.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No hay productos"
            description='Tu catálogo está vacío. Empezá creando uno como "Hamburguesa" o "Pizza".'
            actionLabel="Crear mi primer producto"
            onAction={() => openModal()}
            actionStyle="button"
          />
        ) : (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {filteredProductos.map((prod) => (
                <div key={prod.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 relative">

                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-white/5">
                    <img
                      src={prod.imagen_url || DEFAULT_PRODUCT_IMAGE}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={prod.nombre}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                      {prod.destacado && (
                        <div className="bg-yellow-400 text-white p-1.5 rounded-lg shadow-sm w-fit animate-in zoom-in">
                          <Star size={14} fill="currentColor" />
                        </div>
                      )}
                      {!prod.stock && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm animate-in fade-in">
                          Agotado
                        </div>
                      )}
                    </div>

                    {/* Quick Actions (Desktop Hover) */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={(e) => { e.stopPropagation(); openModal(prod); }} className="p-2 bg-white/90 backdrop-blur text-gray-700 dark:text-zinc-300 hover:text-blue-600 rounded-xl shadow-md border border-gray-100 dark:border-white/10 hover:scale-105 transition-all">
                        <Pencil size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, productId: prod.id }); }} className="p-2 bg-white/90 backdrop-blur text-gray-700 dark:text-zinc-300 hover:text-red-500 rounded-xl shadow-md border border-gray-100 dark:border-white/10 hover:scale-105 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">{prod.categoria}</span>
                      </div>
                      <h2 className="font-bold text-gray-900 dark:text-zinc-100 text-lg leading-tight line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer" onClick={() => openModal(prod)}>{prod.nombre}</h2>
                      <p className="text-gray-400 dark:text-zinc-500 text-xs line-clamp-2 h-8">{prod.descripcion || "Sin descripción."}</p>
                    </div>

                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50 dark:border-white/5">
                      <div>
                        <span className="block text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase">Precio</span>
                        <span className="text-xl font-black text-gray-900 dark:text-zinc-100">${prod.precio}</span>
                      </div>

                      {/* Mobile Actions (Visible) */}
                      <div className="flex sm:hidden gap-1">
                        <button onClick={() => openModal(prod)} className="p-2 text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:bg-white/5">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => setDeleteConfirm({ open: true, productId: prod.id })} className="p-2 text-red-400 bg-red-50 rounded-lg hover:bg-red-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-50 dark:divide-white/5 pb-20 sm:pb-0">
              {filteredProductos.map((prod) => (
                <div key={prod.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-zinc-800/50 dark:hover:bg-white/5 dark:bg-white/5 transition-all group relative cursor-pointer" onClick={() => openModal(prod)}>

                  {/* Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <img
                      src={prod.imagen_url || DEFAULT_PRODUCT_IMAGE}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!prod.stock ? 'grayscale opacity-80' : ''}`}
                      alt={prod.nombre}
                    />
                    {!prod.stock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <span className="bg-red-500 text-white text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">Agotado</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-gray-200 dark:border-white/10">{prod.categoria}</span>
                      {prod.destacado && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-base sm:text-lg truncate">{prod.nombre}</h3>
                    <p className="text-gray-400 dark:text-zinc-500 text-xs sm:text-sm truncate hidden sm:block">{prod.descripcion || "Sin descripción disponible."}</p>
                    <div className="sm:hidden mt-1 font-black text-gray-900 dark:text-zinc-100 text-lg">${prod.precio}</div>
                  </div>

                  {/* Price Desktop */}
                  <div className="hidden sm:block text-right shrink-0 px-4">
                    <span className="block text-2xl font-black text-gray-900 dark:text-zinc-100">${prod.precio}</span>
                    <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium">Unidad</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0 border-l border-gray-50 dark:border-white/5 pl-4 sm:border-none sm:pl-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(prod); }}
                      className="p-2.5 text-gray-400 dark:text-zinc-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-95"
                      title="Editar"
                    >
                      <Pencil size={20} className="sm:w-5 sm:h-5 w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ open: true, productId: prod.id }); }}
                      className="p-2.5 text-gray-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                      title="Eliminar"
                    >
                      <Trash2 size={20} className="sm:w-5 sm:h-5 w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )
      }

      <ProductForm
        isOpen={showModal}
        onClose={() => { setShowModal(false); setScannedData(null); }}
        initialData={editingProducto}
        scannedData={scannedData}
        categories={categorias}
        toppingsGroups={gruposToppings}
        initialToppingsConfig={productoToppingsConfig}
        loadingToppings={loadingToppings}
        onSubmit={handleFormSubmit}
        isSubmitting={uploading}
        tipoNegocio={tipoNegocio}
      />

      <ProductImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={() => {
          fetchData();
          // Don't close immediately so user can see result
        }}
      />

      {/* Barcode Scanner */}
      <BarcodeScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        existingProducts={productos}
        onProductFound={handleScanResult}
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
        message="Esta acción no se puede deshacer. El producto será eliminado permanentemente del catálogo."
        confirmText="Sí, eliminar"
        variant="danger"
      />
    </DashboardLayout >
  );
}