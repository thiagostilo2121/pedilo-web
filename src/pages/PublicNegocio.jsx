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
import apiPublic from "../api/apiPublic";
import toppingPublicService from "../services/toppingPublicService";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ChevronLeft,
  Plus,
  Minus,
  X,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  Share2,
  Search
} from "lucide-react";
import { DEFAULT_LOGO, DEFAULT_PRODUCT_IMAGE, DEFAULT_CATEGORY_IMAGE } from "../constants";
import ToppingSelector from "../components/ToppingSelector";
import { toast } from "react-hot-toast";



// Componente de Imagen Progresiva
const ProgressiveImage = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 will-change-transform ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
    </div>
  );
};

export default function PublicNegocio({ slug }) {
  // ... (Estados anteriores se mantienen igual)
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Estados para toppings
  const [showToppingModal, setShowToppingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToppings, setProductToppings] = useState([]);
  const [toppingsCache, setToppingsCache] = useState({});
  const [addingProductId, setAddingProductId] = useState(null);

  const DEFAULT_IMAGE = DEFAULT_PRODUCT_IMAGE;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [negocioRes, productosRes, categoriasRes] = await Promise.all([
          apiPublic.get(`/${slug}`),
          apiPublic.get(`/${slug}/productos`),
          apiPublic.get(`/${slug}/categorias`)
        ]);

        setNegocio(negocioRes.data);
        setProductos(productosRes.data);
        setCategorias(categoriasRes.data);

        // Optimización SEO/UX: Título Dinámico
        document.title = `${negocioRes.data.nombre} | Pedilo`;

        // PWA Theme Color Dinámico
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor && negocioRes.data.color_primario) {
          metaThemeColor.setAttribute("content", negocioRes.data.color_primario);
        }

        // Scroll to product if query param exists
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("p");
        if (productId) {
          setTimeout(() => {
            const element = document.getElementById(`producto-${productId}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              element.classList.add("ring-2", "ring-orange-500", "ring-offset-2");
              setTimeout(() => element.classList.remove("ring-2", "ring-orange-500", "ring-offset-2"), 3000);
            }
          }, 1000); // Small delay to ensure rendering
        }

        const storedCarrito = localStorage.getItem(`carrito_${slug}`);
        if (storedCarrito) setCarrito(JSON.parse(storedCarrito));

        // Pre-cargar toppings en background
        const productIds = productosRes.data.map(p => p.id);
        Promise.all(productIds.map(id =>
          toppingPublicService.getProductoToppings(slug, id)
            .then(toppings => ({ id, toppings }))
            .catch(() => ({ id, toppings: [] }))
        )).then(results => {
          const cache = {};
          results.forEach(({ id, toppings }) => { cache[id] = toppings || []; });
          setToppingsCache(cache);
        });

      } catch (_err) {
        setError("Este menú no está disponible actualmente.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  // --- SCROLL & CATEGORY LOGIC ---
  // Efecto para el header al scrollear
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Guardar carrito en LocalStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(`carrito_${slug}`, JSON.stringify(carrito));
  }, [carrito, slug]);

  // Seleccionar la primera categoría por defecto al cargar
  // Seleccionar la primera categoría por defecto no es necesario si queremos mostrar la grilla primero
  useEffect(() => {
    // Si quisiéramos redirigir o filtrar por defecto, iría acá. 
    // Por ahora lo dejamos limpio para que el usuario elija.
  }, [categorias]);

  // Función para agregar al carrito (verifica toppings)
  // Función para agregar al carrito (verifica toppings)
  const handleAddToCart = async (producto) => {
    if (!negocio?.acepta_pedidos) return;

    let toppings = toppingsCache[producto.id];

    // Si no está en caché, buscarlo on-demand
    if (toppings === undefined) {
      setAddingProductId(producto.id);
      try {
        toppings = await toppingPublicService.getProductoToppings(slug, producto.id);
        // Actualizar caché para la próxima
        setToppingsCache(prev => ({ ...prev, [producto.id]: toppings }));
      } catch (error) {
        console.error("Error fetching toppings", error);
        toppings = [];
      } finally {
        setAddingProductId(null);
      }
    }

    console.log("Product:", producto.nombre, "Toppings:", toppings);

    if (toppings && toppings.length > 0) {
      setSelectedProduct(producto);
      setProductToppings(toppings);
      setShowToppingModal(true);
    } else {
      agregarAlCarritoSimple(producto);
    }
  };

  const agregarAlCarritoSimple = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id && !p.toppings?.length);
      if (existe) {
        return prev.map((p) => p.id === producto.id && !p.toppings?.length ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prev, { ...producto, cantidad: 1, toppings: [], cartItemId: Date.now() }];
    });
  };

  const agregarConToppings = (producto, toppingsSeleccionados, cantidad) => {
    const precioToppings = toppingsSeleccionados.reduce((acc, t) => acc + (t.precio_extra || t.precio || 0), 0);
    setCarrito((prev) => [...prev, {
      ...producto,
      cantidad,
      toppings: toppingsSeleccionados,
      precioConToppings: producto.precio + precioToppings,
      cartItemId: Date.now()
    }]);
  };

  const agregarAlCarrito = (item) => {
    if (!negocio?.acepta_pedidos) return;
    setCarrito((prev) =>
      prev.map((p) => p.cartItemId === item.cartItemId ? { ...p, cantidad: p.cantidad + 1 } : p)
    );
  };

  const disminuirCantidad = (cartItemId) => {
    setCarrito((prev) =>
      prev.map((p) => p.cartItemId === cartItemId ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter((p) => p.cantidad > 0)
    );
  };

  const calcularPrecioItem = (item) => item.precioConToppings || item.precio;
  const total = carrito.reduce((acc, p) => acc + calcularPrecioItem(p) * p.cantidad, 0);
  const cantTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const productosFiltrados = searchTerm
    ? productos.filter(p =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : (!categoriaSeleccionada || categoriaSeleccionada === "todos")
      ? productos
      : productos.filter(p => p.categoria === categoriaSeleccionada);

  const handleShareProduct = (e, producto) => {
    e.stopPropagation();
    const url = `${window.location.origin}/n/${slug}?p=${producto.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado al portapapeles", {
      icon: "🔗",
      style: { borderRadius: "10px", background: "#333", color: "#fff" }
    });
  };

  const mostrarRecomendados = !searchTerm && productos.some(p => p.destacado);

  if (loading) return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans animate-pulse">
      {/* Skeleton Navbar */}
      <div className="h-16 bg-white shadow-sm mb-8"></div>

      {/* Skeleton Hero */}
      <div className="bg-white pb-4 pt-4 shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 flex gap-6 items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-2xl shrink-0"></div>
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-3xl"></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle size={48} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">{error}</h2>
      <p className="text-gray-500 mb-6">No pudimos cargar la información del negocio.</p>
      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans selection:bg-orange-100 selection:text-orange-600">

      {/* --- NAVBAR STICKY --- */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">

          {/* Logo & Name - Visible on Scroll or Always on Mobile? Let's make it smart */}
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
            <img src={negocio.logo_url || DEFAULT_LOGO} alt="Logo" className="w-10 h-10 object-cover rounded-xl shadow-sm" />
            <span className="font-extrabold text-gray-900 truncate max-w-[150px]">{negocio.nombre}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search / Status Button */}
            <button
              onClick={() => navigate(`/n/${slug}/pedidos`)}
              className={`flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-full transition-all ${scrolled ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'}`}
            >
              <Search size={18} />
              <span className="hidden sm:inline">Mis Pedidos</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Minimalist with Banner) --- */}
      <header className="relative w-full bg-white pb-4 pt-20 md:pt-24 shadow-sm border-b border-gray-100 overflow-hidden">
        {/* Banner Background */}
        {negocio.banner_url && (
          <div className="absolute inset-0 w-full h-full z-0">
            <img src={negocio.banner_url} className="w-full h-full object-cover blur-1xl opacity-30 scale-110" />
            <div className="absolute inset-0 bg-white/40"></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 relative z-10 transition-colors">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Logo Area */}
            <div className="relative shrink-0">
              <img
                src={negocio.logo_url || DEFAULT_LOGO}
                alt={negocio.nombre}
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-2xl shadow-lg border border-gray-100"
              />
              {!negocio.acepta_pedidos && (
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                  Cerrado
                </div>
              )}
            </div>

            {/* Text Area */}
            <div className="flex-1 text-center sm:text-left pt-2">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2 tracking-tight">{negocio.nombre}</h1>
              {negocio.descripcion && (
                <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-lg mx-auto sm:mx-0">
                  {negocio.descripcion}
                </p>
              )}

              {/* Metadata Tags */}
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-600 border border-gray-100">
                  <Clock size={14} className="text-orange-500" />
                  {negocio.horario || "Consultar horarios"}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-600 border border-gray-100">
                  <MapPin size={14} className="text-orange-500" />
                  {negocio.direccion || "Ubicación no especificada"}
                </div>
              </div>

              {/* BOTÓN MÁS INFO */}
              <button
                onClick={() => setShowInfoModal(true)}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <AlertCircle size={16} /> Más Info y Horarios
              </button>
            </div>
          </div>
        </div>
      </header>


      <main className="max-w-4xl mx-auto px-4 mt-8 pb-10">

        {/* --- BUSCADOR --- */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar productos (ej. Hamburguesa...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 outline-none text-gray-800 font-medium transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>


        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen pb-20">

          {/* 1. SECCIÓN RECOMENDADOS (Siempre visible si hay destacados y no hay búsqueda) */}
          {mostrarRecomendados && (
            <div className="mb-8">
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2 px-2">
                <span className="text-2xl">🔥</span> Recomendados
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x">
                {productos.filter(p => p.destacado).map(prod => (
                  <div key={prod.id} className="min-w-[280px] bg-white p-3 rounded-3xl shadow-sm border border-orange-100 hover:shadow-md transition-all snap-center flex flex-col relative overflow-hidden group">
                    {/* Badge Destacado Overlay */}
                    <div className="absolute top-0 right-0 bg-yellow-400 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl z-10 shadow-sm">
                      Top
                    </div>
                    <ProgressiveImage
                      src={prod.imagen_url || DEFAULT_IMAGE}
                      alt={prod.nombre}
                      className="h-40 rounded-2xl mb-3 bg-gray-100"
                    />
                    {!negocio.acepta_pedidos && <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 pointer-events-none mb-3 mx-3 rounded-2xl mt-3"><span className="text-white font-black uppercase text-xs">Cerrado</span></div>}

                    {/* ... resto del card de recomendados ... */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-lg truncate">{prod.nombre}</h3>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-tight min-h-[2.5em] mb-2">{prod.descripcion || "Sin descripción"}</p>
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <span className="text-xl font-black text-gray-900">${prod.precio}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(prod); }}
                          className="bg-orange-600 text-white p-2 rounded-full shadow-lg shadow-orange-200 active:scale-95 transition-all hover:bg-orange-700"
                          disabled={!negocio.acepta_pedidos}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. BARRA DE CATEGORÍAS (Sticky) */}
          {!searchTerm && (
            <div className="sticky top-[65px] z-30 bg-gray-50/95 backdrop-blur-md py-4 mb-6 shadow-sm -mx-4 px-4 transition-all">
              <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x items-start px-1 pb-2">
                <button
                  onClick={() => setCategoriaSeleccionada("todos")}
                  className={`flex flex-col items-center gap-2 group pt-[5px] min-w-[80px] snap-start transition-all ${(!categoriaSeleccionada || categoriaSeleccionada === "todos") ? "scale-105" : "opacity-70 hover:opacity-100"}`}
                >
                  <div className={`w-[70px] h-[70px] rounded-full p-[2px] transition-all ${(!categoriaSeleccionada || categoriaSeleccionada === "todos") ? "bg-gradient-to-tr from-orange-500 to-red-500 shadow-lg shadow-orange-200" : "bg-gray-200"}`}>
                    <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center">
                      <span className={`font-black text-xs ${(!categoriaSeleccionada || categoriaSeleccionada === "todos") ? "text-orange-600" : "text-gray-500"}`}>TODO</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold truncate w-full text-center ${(!categoriaSeleccionada || categoriaSeleccionada === "todos") ? "text-orange-600" : "text-gray-500"}`}>Ver Todo</span>
                </button>

                {categorias.map((cat) => {
                  const isSelected = categoriaSeleccionada === cat.nombre;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaSeleccionada(cat.nombre)}
                      className={`flex flex-col items-center gap-2 group pt-[5px] min-w-[80px] snap-start transition-all ${isSelected ? "scale-105" : "opacity-70 hover:opacity-100"}`}
                    >
                      <div className={`w-[70px] h-[70px] rounded-full p-[2px] transition-all ${isSelected ? "bg-gradient-to-tr from-orange-500 to-red-500 shadow-lg shadow-orange-200" : "bg-gray-200"}`}>
                        <div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden">
                          <img src={cat.imagen_url || DEFAULT_IMAGE} alt={cat.nombre} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className={`text-xs font-bold truncate w-full text-center max-w-[80px] ${isSelected ? "text-orange-600" : "text-gray-500"}`}>{cat.nombre}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. LISTA DE PRODUCTOS (Filtrados o Todos) */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-black text-gray-900">
                {searchTerm ? `Resultados para "${searchTerm}"` : (categoriaSeleccionada === "todos" || !categoriaSeleccionada ? "Menú Completo" : categoriaSeleccionada)}
              </h2>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">{productosFiltrados.length} productos</span>
            </div>

            {productosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productosFiltrados.map((prod) => {
                  const itemInCart = carrito.find(p => p.id === prod.id);
                  const canAdd = prod.stock && negocio.acepta_pedidos;

                  return (
                    <div id={`producto-${prod.id}`} key={prod.id} className="group bg-white p-3 md:p-4 rounded-3xl shadow-sm border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all flex gap-4 overflow-hidden relative">
                      {/* Imagen Progresiva */}
                      <ProgressiveImage
                        src={prod.imagen_url || DEFAULT_IMAGE}
                        alt={prod.nombre}
                        className={`w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-2xl bg-gray-50 ${!canAdd && "grayscale opacity-70"}`}
                      />

                      {/* Share Button */}
                      <button
                        onClick={(e) => handleShareProduct(e, prod)}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full text-gray-400 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-orange-600 hover:bg-orange-50 hover:scale-110 z-10"
                      >
                        <Share2 size={14} />
                      </button>

                      {!canAdd && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] pointer-events-none rounded-3xl z-0">
                          {/* Only overlay the image ideally, but this works for full card disabled feel */}
                        </div>
                      )}
                      {!canAdd && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="text-[10px] font-black text-white bg-black/60 px-2 py-1 rounded uppercase">Agotado</span>
                        </div>
                      )}

                      {/* ... resto del contenido del producto ... */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                        <div>
                          <h3 className="font-bold text-gray-900 truncate text-base md:text-lg">{prod.nombre}</h3>
                          <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mt-1 leading-snug">{prod.descripcion || "Sin descripción."}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-black text-gray-900">${prod.precio}</span>
                          {canAdd ? (
                            itemInCart ? (
                              <div className="flex items-center gap-2 bg-orange-50 rounded-full px-1 py-1 border border-orange-100">
                                <button onClick={() => disminuirCantidad(itemInCart.cartItemId)} className="w-7 h-7 flex items-center justify-center bg-white text-orange-600 rounded-full shadow-sm hover:bg-orange-100"><Minus size={14} /></button>
                                <span className="font-bold text-sm min-w-[16px] text-center">{itemInCart.cantidad}</span>
                                <button onClick={() => handleAddToCart(prod)} disabled={addingProductId === prod.id} className="w-7 h-7 flex items-center justify-center bg-orange-600 text-white rounded-full shadow-sm"> <Plus size={14} /> </button>
                              </div>
                            ) : (
                              <button onClick={() => handleAddToCart(prod)} disabled={addingProductId === prod.id} className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-orange-600 hover:text-white transition-colors shadow-sm border border-gray-100">
                                <Plus size={20} />
                              </button>
                            )
                          ) : (
                            <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-1 rounded">Sin Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 opacity-50">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <p className="font-bold text-gray-400">No hay productos en esta categoría.</p>
                <button onClick={() => setCategoriaSeleccionada("todos")} className="mt-4 text-orange-600 font-bold underline">Ver todo el menú</button>
              </div>
            )}
          </div>

        </div>
      </main>


      {/* --- CART FLOATING BAR (Mobile First) --- */}
      {
        carrito.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <button
              onClick={() => setShowCart(true)}
              className="w-full bg-gray-900 text-white p-2 pl-5 pr-2 rounded-[2rem] shadow-2xl shadow-gray-400 flex items-center justify-between border border-gray-800 backdrop-blur-xl bg-opacity-95"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{cantTotal} ITEM{cantTotal > 1 ? 'S' : ''}</span>
                <span className="text-xl font-black">${total.toFixed(0)}</span>
              </div>
              <div className="bg-orange-600 text-white px-6 py-3 rounded-3xl font-bold flex items-center gap-2 shadow-lg shadow-orange-900/50 hover:bg-orange-500 transition-colors">
                Ver Pedido <ShoppingBag size={18} />
              </div>
            </button>
          </div>
        )
      }


      {/* --- SLIDE-OVER CART (Full height on mobile) --- */}
      <div className={`fixed inset-0 z-50 ${showCart ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showCart ? "opacity-100" : "opacity-0"}`}
          onClick={() => setShowCart(false)}
        />

        {/* Drawer */}
        <div className={`absolute right-0 bottom-0 top-0 w-full sm:w-[450px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${showCart ? "translate-x-0" : "translate-x-full"}`}>

          <div className="p-5 border-b flex justify-between items-center bg-gray-50/50">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">Mi Pedido</h2>
            <button
              onClick={() => setShowCart(false)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-500 hover:text-black hover:border-gray-900 transition-all font-bold"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {carrito.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <ShoppingBag size={64} className="mb-4 text-gray-400" />
                <p className="font-bold text-xl">Carrito vacío</p>
                <p className="text-sm">¡Agregá algo rico!</p>
              </div>
            ) : (
              carrito.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-4 bg-white border border-gray-50 shadow-sm rounded-2xl relative group">
                  <img src={item.imagen_url || DEFAULT_IMAGE} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.nombre}</p>
                    {item.toppings?.length > 0 && (
                      <p className="text-xs text-gray-400 truncate">
                        +{(() => {
                          const counts = item.toppings.reduce((acc, t) => {
                            acc[t.nombre] = (acc[t.nombre] || 0) + 1;
                            return acc;
                          }, {});
                          return Object.entries(counts)
                            .map(([name, count]) => count > 1 ? `${count}x ${name}` : name)
                            .join(", ");
                        })()}
                      </p>
                    )}
                    <p className="text-orange-600 font-extrabold text-lg">${(calcularPrecioItem(item) * item.cantidad).toFixed(0)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                      <button onClick={() => disminuirCantidad(item.cartItemId)} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-gray-600 active:scale-95"><Minus size={12} /></button>
                      <span className="font-bold text-sm min-w-[16px] text-center">{item.cantidad}</span>
                      <button onClick={() => agregarAlCarrito(item)} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-orange-600 active:scale-95"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {carrito.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 pb-8 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total a pagar</p>
                  <p className="text-4xl font-black text-gray-900 tracking-tight">${total.toFixed(0)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold mb-1">{cantTotal} items</p>
                </div>
              </div>

              {negocio.acepta_pedidos ? (
                <button
                  onClick={() => navigate(`/n/${slug}/checkout`)}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-lg active:scale-[0.98] flex justify-between items-center px-6 group"
                >
                  <span>Confirmar Pedido</span>
                  <span className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors"><ChevronLeft className="rotate-180" size={20} /></span>
                </button>
              ) : (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold text-center text-sm">
                  <AlertCircle className="mx-auto mb-2" />
                  El local se encuentra cerrado.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Toppings */}
      <ToppingSelector
        isOpen={showToppingModal}
        onClose={() => setShowToppingModal(false)}
        onConfirm={agregarConToppings}
        producto={selectedProduct}
        gruposToppings={productToppings}
      />
      {/* Modal de Información y Horarios */}
      {
        showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfoModal(false)}>
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-black text-xl text-gray-900">Información del Local</h3>
                <button onClick={() => setShowInfoModal(false)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"><X size={18} /></button>
              </div>

              <div className="p-6 space-y-6">
                {/* Dirección */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dirección</h4>
                    <p className="text-gray-600 text-sm">{negocio.direccion || "No especificada"}</p>
                    {negocio.direccion && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(negocio.direccion)}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 text-xs font-bold mt-1 inline-block hover:underline">
                        Ver en Google Maps
                      </a>
                    )}
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Horarios de Atención</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                      {negocio.horario || "No especificados"}
                    </p>
                  </div>
                </div>

                {/* Contacto */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Contacto</h4>
                    <p className="text-gray-600 text-sm">{negocio.telefono || "No especificado"}</p>
                    {negocio.telefono && (
                      <a href={`https://wa.me/${negocio.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs font-bold mt-1 inline-block hover:underline">
                        Enviar mensaje al WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 text-center">
                <button onClick={() => setShowInfoModal(false)} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors">Entendido</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
