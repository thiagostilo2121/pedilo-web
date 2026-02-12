import { useEffect, useState, useRef } from "react";
import apiPublic from "../api/apiPublic";
import toppingPublicService from "../services/toppingPublicService";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Flame,
  Zap,
  Award,
  BadgeCheck,
  LayoutGrid, // NEW
  List        // NEW
} from "lucide-react";
import { DEFAULT_LOGO, DEFAULT_PRODUCT_IMAGE, DEFAULT_CATEGORY_IMAGE } from "../constants";
import ToppingSelector from "../components/ToppingSelector";
import { toast } from "react-hot-toast";
import ProductCard from "../components/ui/ProductCard";
import ProductCardList from "../components/ui/ProductCardList"; // NEW
import CartDrawer from "../components/ui/CartDrawer";
import Skeleton from "../components/ui/Skeleton";
import ProgressiveImage from "../components/ui/ProgressiveImage";
import { calcularTotalCarrito } from "../utils/precioUtils";

// --- COMPONENTES LOCALES (Premium UI) ---

const RecommendedCard = ({ product, negocio, cartItem, onAdd, onDecrease, isAdding }) => {
  const canAdd = product.stock && negocio?.acepta_pedidos;

  return (
    <div className="w-[260px] xs:w-[280px] sm:w-[320px] shrink-0 snap-center flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer" onClick={(e) => { e.stopPropagation(); onAdd(product); }}>
      {/* 60% Image Height */}
      <div className="h-40 xs:h-48 sm:h-56 relative w-full bg-gray-100">
        <ProgressiveImage
          src={product.imagen_url || DEFAULT_PRODUCT_IMAGE}
          alt={product.nombre}
          className={`w-full h-full object-cover transition-transform duration-700 ${!canAdd && "grayscale contrast-125"}`}
        />
        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 z-10 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-20">
          <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/40 tracking-wide uppercase">
            <Star size={10} fill="currentColor" /> POPULAR
          </span>
        </div>

        {/* Price Tag over Image (UberEats Style) */}
        <div className="absolute bottom-3 right-3 bg-white text-gray-900 px-3 py-1.5 rounded-full font-black text-sm shadow-xl flex items-center gap-1 z-20">
          ${product.precio}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1 line-clamp-1">{product.nombre}</h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{product.descripcion || "Una delicia esperando por vos."}</p>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          {canAdd ? (
            cartItem ? (
              <div className="flex items-center bg-gray-900 text-white rounded-full px-1 py-1 w-full justify-between shadow-lg shadow-gray-200" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); onDecrease(cartItem.cartItemId) }} className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 active:scale-90 transition-transform"><Minus size={14} /></button>
                <span className="font-bold text-sm">{cartItem.cantidad}</span>
                <button onClick={(e) => { e.stopPropagation(); onAdd(product) }} className="w-8 h-8 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-100 active:scale-90 transition-transform"><Plus size={14} /></button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onAdd(product) }}
                disabled={isAdding}
                className="w-full py-2.5 sm:py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-orange-700 group/btn text-sm sm:text-base"
              >
                Agregar <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
              </button>
            )
          ) : (
            <span className="w-full text-center text-xs font-bold text-gray-400 bg-gray-100 py-2 rounded-xl">NO DISPONIBLE</span>
          )}
        </div>
      </div>
    </div>
  );
};


export default function PublicNegocio({ slug }) {
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [activeCategory, setActiveCategory] = useState("todos"); // Category Selection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // NEW STATE

  // Estados para toppings
  const [showToppingModal, setShowToppingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToppings, setProductToppings] = useState([]);
  const [toppingsCache, setToppingsCache] = useState({});
  const [addingProductId, setAddingProductId] = useState(null);

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
        // NEW: Auto switch to list view for distribuidoras
        if (negocioRes.data.tipo_negocio === 'distribuidora') {
          setViewMode("list");
        }

        const sortedProducts = productosRes.data.sort((a, b) => (b.destacado === true) - (a.destacado === true));
        setProductos(sortedProducts);
        setCategorias(categoriasRes.data);

        document.title = `${negocioRes.data.nombre} | Pedilo`;

        // SEO Helpers
        const updateMeta = (name, content, attr = "name") => {
          let meta = document.querySelector(`meta[${attr}="${name}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute(attr, name);
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", content);
        };
        const bizDesc = negocioRes.data.descripcion || `Hacé tu pedido online en ${negocioRes.data.nombre}.`;
        updateMeta("description", bizDesc);

        // PWA Color
        const metaTheme = document.querySelector("meta[name=theme-color]");
        if (metaTheme && negocioRes.data.color_primario) {
          metaTheme.setAttribute("content", negocioRes.data.color_primario);
        }

        const storedCarrito = localStorage.getItem(`carrito_${slug}`);
        if (storedCarrito) setCarrito(JSON.parse(storedCarrito));

        // Pre-load toppings
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

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Persist
  useEffect(() => {
    localStorage.setItem(`carrito_${slug}`, JSON.stringify(carrito));
  }, [carrito, slug]);

  const handleAddToCart = async (producto) => {
    if (!negocio?.acepta_pedidos) return;

    let toppings = toppingsCache[producto.id];
    if (toppings === undefined) {
      setAddingProductId(producto.id);
      try {
        toppings = await toppingPublicService.getProductoToppings(slug, producto.id);
        setToppingsCache(prev => ({ ...prev, [producto.id]: toppings }));
      } catch { toppings = []; }
      finally { setAddingProductId(null); }
    }

    if (toppings && toppings.length > 0) {
      setSelectedProduct(producto);
      setProductToppings(toppings);
      setShowToppingModal(true);
    } else {
      agregarAlCarritoSimple(producto);
      toast.success("Agregado al carrito", { icon: '🛒', style: { borderRadius: '20px', background: '#333', color: '#fff' } });
    }
  };

  const agregarAlCarritoSimple = (producto) => {
    const cantMin = (negocio?.tipo_negocio === 'distribuidora' && producto.cantidad_minima > 1) ? producto.cantidad_minima : 1;
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id && !p.toppings?.length);
      if (existe) return prev.map((p) => p.id === producto.id && !p.toppings?.length ? { ...p, cantidad: p.cantidad + 1 } : p);
      return [...prev, { ...producto, cantidad: cantMin, toppings: [], cartItemId: Date.now() }];
    });
  };

  const agregarConToppings = (producto, toppingsSeleccionados, cantidad) => {
    const precioToppings = toppingsSeleccionados.reduce((acc, t) => acc + (t.precio_extra || t.precio || 0), 0);
    setCarrito((prev) => [...prev, { ...producto, cantidad, toppings: toppingsSeleccionados, precioConToppings: producto.precio + precioToppings, cartItemId: Date.now() }]);
  };

  const agregarAlCarrito = (item) => {
    if (!negocio?.acepta_pedidos) return;
    setCarrito((prev) => prev.map((p) => p.cartItemId === item.cartItemId ? { ...p, cantidad: p.cantidad + 1 } : p));
  };

  const disminuirCantidad = (cartItemId) => {
    setCarrito((prev) => prev.map((p) => {
      if (p.cartItemId !== cartItemId) return p;
      const cantMin = (negocio?.tipo_negocio === 'distribuidora' && p.cantidad_minima > 1) ? p.cantidad_minima : 1;
      if (p.cantidad <= cantMin) return { ...p, cantidad: 0 }; // will be filtered out
      return { ...p, cantidad: p.cantidad - 1 };
    }).filter((p) => p.cantidad > 0));
  };

  // NEW: Bulk Update Handler
  const handleUpdateQuantity = (producto, newQuantity) => {
    if (!negocio?.acepta_pedidos) return;

    if (newQuantity === 0) {
      // Remove item
      setCarrito(prev => prev.filter(p => !(p.id === producto.id && !p.toppings?.length)));
      return;
    }

    setCarrito(prev => {
      const existing = prev.find(p => p.id === producto.id && !p.toppings?.length);
      if (existing) {
        return prev.map(p => p.cartItemId === existing.cartItemId ? { ...p, cantidad: newQuantity } : p);
      } else {
        // Add new
        return [...prev, { ...producto, cantidad: newQuantity, toppings: [], cartItemId: Date.now() }];
      }
    });
  };


  // Filter Logic
  const getFilteredProducts = () => {
    let result = productos;

    // 1. Search Filter
    if (searchTerm) {
      result = result.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // 2. Category Filter (only if no search)
    else if (activeCategory !== "todos") {
      result = result.filter(p => p.categoria === activeCategory);
    }

    return result;
  };

  // --- SCROLL SPY & NAVIGATION LOGIC ---
  const categoryRefs = useRef({});

  const scrollToCategory = (categoryName) => {
    if (categoryName === "todos") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveCategory("todos");
      return;
    }
    const element = categoryRefs.current[categoryName];
    if (element) {
      const offset = 180; // Header offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveCategory(categoryName);
    }
  };

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    if (searchTerm) return; // Disable spy on search

    const observerOptions = {
      root: null,
      rootMargin: '-180px 0px -50% 0px', // Offset for header
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id.replace('cat-', ''));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all category sections
    Object.values(categoryRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categorias, searchTerm]);

  // Group Products by Category
  const productsByCategory = categorias.reduce((acc, cat) => {
    acc[cat.nombre] = productos.filter(p => p.categoria === cat.nombre);
    return acc;
  }, {});

  const displayedProducts = getFilteredProducts();

  const handleShareProduct = (e, producto) => {
    e.stopPropagation();
    const url = `${window.location.origin}/n/${slug}?p=${producto.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado");
  };

  const mostrarRecomendados = !searchTerm && productos.some(p => p.destacado);

  if (loading) return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
      <Skeleton className="w-16 h-16 rounded-full mb-6" />
      <Skeleton className="w-3/4 h-8 rounded-lg mb-2" />
      <Skeleton className="w-1/2 h-4 rounded-lg" />
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle size={48} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">{error}</h2>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans selection:bg-orange-100 selection:text-orange-900">

      {/* 0. SMART BANNER (ANUNCIO WEB) */}
      {negocio.anuncio_web && (
        <div className="relative z-[60] bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-bold shadow-lg animate-in slide-in-from-top-full duration-500">
          <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
            <Zap size={14} className="text-yellow-400 animate-pulse shrink-0" fill="currentColor" />
            <span className="truncate">{negocio.anuncio_web}</span>
          </div>
        </div>
      )}

      {/* 1. IMMERSIVE HEADER (Blurry Banner Effect) */}
      {/* Header Sticky Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className={`flex items-center gap-3 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {negocio.logo_url && <img src={negocio.logo_url} className="w-8 h-8 rounded-full border border-gray-200" alt="Logo" />}
            <span className="font-extrabold text-gray-900 text-sm truncate max-w-[150px]">{negocio.nombre}</span>
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={() => navigate(`/n/${slug}/pedidos`)} className={`p-2.5 rounded-full transition-colors ${scrolled ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-black/20 text-white backdrop-blur-md hover:bg-black/30'}`}>
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative w-full h-[45vh] max-h-[420px] min-h-[340px] bg-gray-900 overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src={negocio.banner_url || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"}
            className="w-full h-full object-cover opacity-90 blur-[2px] scale-105 group-hover:scale-100 transition-transform duration-[3s]" // Added blur-[2px] per user request
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 z-20 max-w-4xl mx-auto inset-x-0">
          <div className="flex items-end gap-5">
            <div className="relative shrink-0">
              <img src={negocio.logo_url || DEFAULT_LOGO} className="w-24 h-24 rounded-[1.8rem] border-[3px] border-white shadow-2xl object-cover bg-white" alt="Logo Big" />
              <div className={`absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md border border-white/10 ${negocio.acepta_pedidos ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                <span className={`w-2 h-2 rounded-full ${negocio.acepta_pedidos ? 'bg-white animate-pulse' : 'bg-white/50'}`}></span>
                {negocio.acepta_pedidos ? 'Abierto' : 'Cerrado'}
              </div>
            </div>

            <div className="flex-1 text-white mb-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black leading-none drop-shadow-lg">{negocio.nombre}</h1>

                {/* REPUTATION BADGES */}
                {negocio.insignias?.includes("VERIFICADO_50") && (
                  <div className="group/badge relative bg-blue-500 rounded-full p-1 cursor-help shadow-lg shadow-blue-500/30">
                    <BadgeCheck size={16} className="text-white" fill="currentColor" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      Verificado (+50 Ventas)
                    </div>
                  </div>
                )}
                {negocio.insignias?.includes("TOP_SELLER_100") && (
                  <div className="group/badge relative bg-yellow-500 rounded-full p-1 cursor-help shadow-lg shadow-yellow-500/30">
                    <Award size={16} className="text-white" fill="currentColor" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      Top Seller (+100 Ventas)
                    </div>
                  </div>
                )}
              </div>

              {/* Business Description - Responsive & Non-intrusive */}
              {negocio.descripcion && (
                <p className="text-sm sm:text-base font-medium text-white/90 line-clamp-2 max-w-2xl drop-shadow-md leading-relaxed mb-4 hidden xs:block">
                  {negocio.descripcion}
                </p>
              )}

              <div className="flex items-center flex-wrap gap-2 text-sm font-bold opacity-90 mt-5">
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer" onClick={() => setShowInfoModal(true)}>
                  <Clock size={14} style={{ color: negocio.color_primario || '#fdba74' }} /> {negocio.horario || "Ver horarios"}
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer" onClick={() => setShowInfoModal(true)}>
                  <MapPin size={14} style={{ color: negocio.color_primario || '#fdba74' }} /> Info
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto relative z-10 -mt-8 bg-gray-50 rounded-t-[2.5rem] min-h-screen pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pt-8">

        {/* Pedido Mínimo Banner (distribuidoras) */}
        {negocio.tipo_negocio === 'distribuidora' && negocio.pedido_minimo > 0 && (
          <div className="mx-4 mb-4 flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-2xl text-sm font-bold">
            <span className="text-lg">📦</span>
            <span>Pedido mínimo: <span className="font-black">${negocio.pedido_minimo.toLocaleString()}</span></span>
          </div>
        )}

        {/* Search */}
        <div className="px-4 mb-8">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
              size={20}
              style={{ color: searchTerm ? (negocio.color_primario || '#ea580c') : undefined }}
            />
            <input
              type="text"
              placeholder="Buscar delicias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl shadow-sm border border-gray-100 focus:ring-2 focus:border-transparent outline-none text-gray-800 font-bold transition-all placeholder:text-gray-300"
              style={{ '--tw-ring-color': negocio.color_primario || '#ea580c' }} // Custom focus ring color
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 bg-gray-100 rounded-full p-1"><X size={14} /></button>}
          </div>
        </div>

        {/* 2. RECOMENDADOS (Horizontal Scroll) */}
        {mostrarRecomendados && (
          <section className="mb-10 pl-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between pr-4 mb-4">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                Imperdibles <Flame className="text-orange-500 animate-pulse" size={24} fill="currentColor" />
              </h2>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-8 pr-4 -ml-4 pl-4 scrollbar-responsive snap-x pt-2">
              {productos.filter(p => p.destacado).map(prod => (
                <div key={prod.id} className="w-[260px] xs:w-[280px] sm:w-[320px] shrink-0 snap-center flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative group transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer" onClick={(e) => { e.stopPropagation(); handleAddToCart(prod); }}>
                  {/* 60% Image Height */}
                  <div className="h-40 xs:h-48 sm:h-56 relative w-full bg-gray-100">
                    <ProgressiveImage
                      src={prod.imagen_url || DEFAULT_PRODUCT_IMAGE}
                      alt={prod.nombre}
                      className={`w-full h-full object-cover transition-transform duration-700 ${!(prod.stock && negocio?.acepta_pedidos) && "grayscale contrast-125"}`}
                    />
                    {/* Gradients Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 z-10 pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-20">
                      <span
                        className="text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/40 tracking-wide uppercase"
                        style={{ backgroundColor: negocio.color_primario || '#f97316' }}
                      >
                        <Star size={10} fill="currentColor" /> POPULAR
                      </span>
                    </div>

                    {/* Price Tag over Image (UberEats Style) */}
                    <div className="absolute bottom-3 right-3 bg-white text-gray-900 px-3 py-1.5 rounded-full font-black text-sm shadow-xl flex items-center gap-1 z-20">
                      ${prod.precio}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1 line-clamp-1">{prod.nombre}</h3>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{prod.descripcion || "Una delicia esperando por vos."}</p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 flex items-center justify-between">
                      {(prod.stock && negocio?.acepta_pedidos) ? (
                        carrito.find(p => p.id === prod.id) ? (
                          <div className="flex items-center bg-gray-900 text-white rounded-full px-1 py-1 w-full justify-between shadow-lg shadow-gray-200" onClick={(e) => e.stopPropagation()}>
                            <button onClick={(e) => { e.stopPropagation(); disminuirCantidad(carrito.find(p => p.id === prod.id).cartItemId) }} className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 active:scale-90 transition-transform"><Minus size={14} /></button>
                            <span className="font-bold text-sm">{carrito.find(p => p.id === prod.id).cantidad}</span>
                            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(prod) }} className="w-8 h-8 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-100 active:scale-90 transition-transform"><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(prod) }}
                            disabled={addingProductId === prod.id}
                            className="w-full py-2.5 sm:py-3 text-white font-bold rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-110 group/btn text-sm sm:text-base"
                            style={{ backgroundColor: negocio.color_primario || '#ea580c' }}
                          >
                            Agregar <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
                          </button>
                        )
                      ) : (
                        <span className="w-full text-center text-xs font-bold text-gray-400 bg-gray-100 py-2 rounded-xl">NO DISPONIBLE</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MAIN CONTENT GRID (Sidebar + Feed) */}
        <div className="md:flex md:gap-8 px-4">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-10">
            <h3 className="font-bold text-gray-900 mb-4 px-2 text-lg">Categorías</h3>
            <div className="space-y-1">
              <button
                onClick={() => scrollToCategory('todos')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeCategory === 'todos' ? 'bg-white shadow text-gray-900 ring-1 ring-gray-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                Todas
              </button>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.nombre)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm flex items-center justify-between group ${activeCategory === cat.nombre ? 'bg-white shadow text-gray-900 ring-1 ring-gray-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  <span>{cat.nombre}</span>
                  {productsByCategory[cat.nombre]?.length > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat.nombre ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'}`}>
                      {productsByCategory[cat.nombre]?.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">

            {/* 3. CATEGORÍAS "INSTAGRAM STORIES" STYLE (MOBILE ONLY) */}
            {!searchTerm && categorias.length > 0 && (
              <div className="md:hidden sticky top-[72px] z-40 bg-gray-50/95 backdrop-blur-md pb-6 pt-3 -mx-4 px-4 mb-8 border-b border-gray-100/50 shadow-sm transition-all">
                <div className="flex gap-4 overflow-x-auto scrollbar-responsive pt-2 px-2 pb-2">
                  {/* 'Todos' Button - Scrolls to Top */}
                  <button
                    onClick={() => scrollToCategory("todos")}
                    className="flex flex-col items-center gap-2 group min-w-[72px]"
                  >
                    <div
                      className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${activeCategory === "todos" ? 'shadow-lg scale-105' : 'bg-gray-200 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0'}`}
                      style={activeCategory === "todos" ? { background: `linear-gradient(to top right, ${negocio.color_primario || '#f97316'}, ${negocio.color_secundario || '#ec4899'})` } : {}}
                    >
                      <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center overflow-hidden">
                        <span className="font-black text-[10px] uppercase text-gray-800">Menú</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold truncate max-w-[80px] ${activeCategory === "todos" ? 'text-gray-900' : 'text-gray-500'}`}>Todos</span>
                  </button>

                  {/* Categories Map */}
                  {categorias.map(cat => {
                    const isActive = activeCategory === cat.nombre;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => scrollToCategory(cat.nombre)}
                        className="flex flex-col items-center gap-2 group min-w-[72px]"
                      >
                        <div
                          className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${isActive ? 'shadow-lg scale-105' : 'bg-gradient-to-tr from-gray-200 to-gray-300 opacity-90 group-hover:scale-105'}`}
                          style={isActive ? { background: `linear-gradient(to top right, ${negocio.color_primario || '#f97316'}, ${negocio.color_secundario || '#ec4899'})` } : {}}
                        >
                          <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center overflow-hidden relative">
                            <img
                              src={cat.imagen_url || DEFAULT_CATEGORY_IMAGE || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                              alt={cat.nombre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className={`text-xs font-bold truncate max-w-[80px] ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{cat.nombre}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 3.5 VIEW TOGGLE (NEW) */}
            {productos.length > 0 && !searchTerm && (
              <div className="mb-4 flex justify-end">
                <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* 4. PRODUCT LIST (SCROLL SPY MODE) */}
            {!searchTerm ? (
              <div className="flex flex-col gap-10 min-h-[500px] pb-20">
                {categorias.map(cat => {
                  const catProducts = productsByCategory[cat.nombre];
                  if (!catProducts || catProducts.length === 0) return null;

                  return (
                    <section
                      key={cat.id}
                      id={`cat-${cat.nombre}`}
                      ref={el => categoryRefs.current[cat.nombre] = el}
                      className="scroll-mt-40"
                    >
                      <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        {cat.nombre}
                        <span
                          className="text-sm font-bold text-white px-2 py-1 rounded-full"
                          style={{ backgroundColor: negocio.color_secundario || '#9ca3af' }}
                        >
                          {catProducts.length}
                        </span>
                      </h3>

                      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-5' : 'grid-cols-1'}`}>
                        {catProducts.map(prod => (
                          viewMode === 'grid' ? (
                            <ProductCard
                              key={prod.id}
                              product={prod}
                              negocio={negocio}
                              cartItem={carrito.find(p => p.id === prod.id && !p.toppings?.length)}
                              onAdd={handleAddToCart}
                              onDecrease={disminuirCantidad}
                              onShare={handleShareProduct}
                              isAdding={addingProductId === prod.id}
                            />
                          ) : (
                            <ProductCardList
                              key={prod.id}
                              product={prod}
                              negocio={negocio}
                              cartItem={carrito.find(p => p.id === prod.id && !p.toppings?.length)}
                              onUpdateQuantity={handleUpdateQuantity}
                              onAdd={handleAddToCart}
                              onDecrease={disminuirCantidad}
                              onShare={handleShareProduct}
                              isAdding={addingProductId === prod.id}
                            />
                          )
                        ))}
                      </div>
                    </section>
                  );
                })}
                {/* If no categories or empty, show fallback */}
                {productos.length === 0 && (
                  <div className="text-center py-20 text-gray-500">No hay productos disponibles.</div>
                )}
              </div>
            ) : (
              /* SEARCH RESULTS MODE */
              <div className="px-4 flex flex-col gap-6 min-h-[500px]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-black text-gray-900">
                    Resultados: "{searchTerm}"
                  </h2>
                  <span className="text-xs font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">{displayedProducts.length} productos</span>
                </div>

                {displayedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                    {displayedProducts.map(prod => (
                      /* Search results always grid for now, or adapt based on viewMode too */
                      viewMode === 'list' ? (
                        <ProductCardList
                          key={prod.id}
                          product={prod}
                          negocio={negocio}
                          cartItem={carrito.find(p => p.id === prod.id && !p.toppings?.length)}
                          onUpdateQuantity={handleUpdateQuantity}
                          onAdd={handleAddToCart}
                          onDecrease={disminuirCantidad}
                          onShare={handleShareProduct}
                          isAdding={addingProductId === prod.id}
                        />
                      ) : (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          negocio={negocio}
                          cartItem={carrito.find(p => p.id === prod.id && !p.toppings?.length)}
                          onAdd={handleAddToCart}
                          onDecrease={disminuirCantidad}
                          onShare={handleShareProduct}
                          isAdding={addingProductId === prod.id}
                        />
                      )
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search size={30} className="text-gray-400" />
                    </div>
                    <p className="font-bold text-gray-500">No encontramos productos con ese nombre.</p>
                    <button onClick={() => setSearchTerm("")} className="mt-4 font-bold text-sm underline" style={{ color: negocio.color_primario || '#ea580c' }}>Ver todo el menú</button>
                  </div>
                )}
              </div>
            )}

          </div> {/* End Right Column */}
        </div>

        {/* Footer Minimalista */}
        <footer className="mt-20 border-t border-gray-200 pt-8 pb-20 text-center text-xs text-gray-400 font-medium">
          <p className="mb-2">
            Potenciado por <a href="https://pedilo.com.ar" target="_blank" className="font-bold hover:text-orange-500 transition-colors">Pedilo.</a>
          </p>
          <div className="flex justify-center gap-4">
            <a href="/terminos" target="_blank" className="hover:text-gray-600 transition-colors">Términos</a>
            <span>•</span>
            <a href="/privacidad" target="_blank" className="hover:text-gray-600 transition-colors">Privacidad</a>
          </div>
        </footer>
      </main>

      {/* Cart Drawer & Modals */}
      {
        carrito.length > 0 && (
          <div className="fixed bottom-6 inset-x-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-2xl mx-auto">
            <button
              onClick={() => setShowCart(true)}
              className="w-full text-white p-2 pl-6 pr-2 rounded-[2.5rem] shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl bg-opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ backgroundColor: negocio.color_primario || '#111827', boxShadow: `0 20px 25px -5px ${negocio.color_primario}40` }}
            >
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{carrito.reduce((acc, p) => acc + p.cantidad, 0)} ITEMS</span>
                <span className="text-xl font-black">${calcularTotalCarrito(carrito, negocio).toFixed(0)}</span>
                {/* Mini Progress Bar for Distribuidoras */}
                {negocio.tipo_negocio === 'distribuidora' && negocio.pedido_minimo > 0 && calcularTotalCarrito(carrito, negocio) < negocio.pedido_minimo && (
                  <div className="w-20 h-1 bg-black/20 rounded-full mt-1 overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-white/90 rounded-full"
                      style={{ width: `${Math.min(100, (calcularTotalCarrito(carrito, negocio) / negocio.pedido_minimo) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="bg-white text-gray-900 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                Ver Pedido <ShoppingBag size={18} />
              </div>
            </button>
          </div>
        )
      }

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} cart={carrito} negocio={negocio} onIncrease={agregarAlCarrito} onDecrease={disminuirCantidad} onCheckout={() => navigate(`/n/${slug}/checkout`)} total={calcularTotalCarrito(carrito, negocio)} count={carrito.reduce((acc, p) => acc + p.cantidad, 0)} />

      <ToppingSelector isOpen={showToppingModal} onClose={() => setShowToppingModal(false)} onConfirm={agregarConToppings} producto={selectedProduct} gruposToppings={productToppings} />

      {
        showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfoModal(false)}>
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-black text-xl text-gray-900">Información</h3>
                <button onClick={() => setShowInfoModal(false)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"><X size={18} /></button>
              </div>

              <div className="p-6 space-y-6">
                {/* Description in Modal (Full) */}
                {negocio.descripcion && (
                  <div className="bg-orange-50 p-4 rounded-2xl text-sm text-gray-700 leading-relaxed font-medium border border-orange-100">
                    {negocio.descripcion}
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_primario}20`, color: negocio.color_primario || '#ea580c' }}><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dirección</h4>
                    <p className="text-gray-600 text-sm">{negocio.direccion || "No especificada"}</p>
                    {negocio.direccion && <a href={`https://maps.google.com/?q=${negocio.direccion}`} target="_blank" className="text-xs font-bold mt-1 block" style={{ color: negocio.color_primario || '#ea580c' }}>Ver en Mapa</a>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_secundario}20`, color: negocio.color_secundario || '#3b82f6' }}><Clock size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Horarios</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{negocio.horario || "No especificados"}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0" style={{ backgroundColor: `${negocio.color_primario}20`, color: negocio.color_primario || '#22c55e' }}><Phone size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Contacto</h4>
                    <p className="text-gray-600 text-sm">{negocio.telefono || "No especificado"}</p>
                    {negocio.telefono && <a href={`https://wa.me/${negocio.telefono.replace(/\D/g, '')}`} target="_blank" className="text-xs font-bold mt-1 block" style={{ color: negocio.color_primario || '#22c55e' }}>Enviar WhatsApp</a>}
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
