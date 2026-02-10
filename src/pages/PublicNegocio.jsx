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
  Minus
} from "lucide-react";
import { DEFAULT_LOGO, DEFAULT_PRODUCT_IMAGE, DEFAULT_CATEGORY_IMAGE } from "../constants";
import ToppingSelector from "../components/ToppingSelector";
import { toast } from "react-hot-toast";
import ProductCard from "../components/ui/ProductCard";
import CartDrawer from "../components/ui/CartDrawer";
import Skeleton from "../components/ui/Skeleton";
import ProgressiveImage from "../components/ui/ProgressiveImage";

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
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id && !p.toppings?.length);
      if (existe) return prev.map((p) => p.id === producto.id && !p.toppings?.length ? { ...p, cantidad: p.cantidad + 1 } : p);
      return [...prev, { ...producto, cantidad: 1, toppings: [], cartItemId: Date.now() }];
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
    setCarrito((prev) => prev.map((p) => p.cartItemId === cartItemId ? { ...p, cantidad: p.cantidad - 1 } : p).filter((p) => p.cantidad > 0));
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
              <h1 className="text-3xl sm:text-4xl font-black leading-none mb-3 drop-shadow-lg">{negocio.nombre}</h1>
              <div className="flex items-center flex-wrap gap-2 text-sm font-bold opacity-90 mt-6">
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer" onClick={() => setShowInfoModal(true)}>
                  <Clock size={14} className="text-orange-300" /> {negocio.horario || "Ver horarios"}
                </span>
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/30 transition-colors cursor-pointer" onClick={() => setShowInfoModal(true)}>
                  <MapPin size={14} className="text-orange-300" /> Info
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto relative z-10 -mt-8 bg-gray-50 rounded-t-[2.5rem] min-h-screen pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pt-8">

        {/* Search */}
        <div className="px-4 mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Buscar delicias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl shadow-sm border border-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-800 font-bold transition-all placeholder:text-gray-300"
            />
            {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 bg-gray-100 rounded-full p-1"><X size={14} /></button>}
          </div>
        </div>

        {/* 2. RECOMENDADOS (Horizontal Scroll) */}
        {mostrarRecomendados && (
          <section className="mb-10 pl-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between pr-4 mb-4">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                Imperdibles <span className="text-2xl">🔥</span>
              </h2>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-8 pr-4 -ml-4 pl-4 scrollbar-responsive snap-x pt-2">
              {productos.filter(p => p.destacado).map(prod => (
                <RecommendedCard
                  key={prod.id}
                  product={prod}
                  negocio={negocio}
                  cartItem={carrito.find(p => p.id === prod.id)}
                  onAdd={handleAddToCart}
                  onDecrease={disminuirCantidad}
                  isAdding={addingProductId === prod.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* 3. CATEGORÍAS "INSTAGRAM STORIES" STYLE */}
        {!searchTerm && categorias.length > 0 && (
          <div className="sticky top-[72px] z-40 bg-gray-50/95 backdrop-blur-md pb-6 pt-3 mx-4 px-4 mb-8 border-b border-gray-100/50 shadow-sm transition-all">
            <div className="flex gap-4 overflow-x-auto scrollbar-responsive pt-2 px-2 pb-2">
              {/* 'Todos' Button - Scrolls to Top */}
              <button
                onClick={() => scrollToCategory("todos")}
                className="flex flex-col items-center gap-2 group min-w-[72px]"
              >
                <div className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${activeCategory === "todos" ? 'bg-gradient-to-tr from-orange-500 to-pink-500 shadow-lg shadow-orange-200 scale-105' : 'bg-gray-200 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0'}`}>
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
                    <div className={`w-[72px] h-[72px] rounded-full p-[2px] transition-all duration-300 ${isActive ? 'bg-gradient-to-tr from-orange-500 to-pink-500 shadow-lg shadow-orange-200 scale-105' : 'bg-gradient-to-tr from-gray-200 to-gray-300 opacity-90 group-hover:scale-105'}`}>
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

        {/* 4. PRODUCT LIST (SCROLL SPY MODE) */}
        {!searchTerm ? (
          <div className="px-4 flex flex-col gap-10 min-h-[500px] pb-20">
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
                    <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{catProducts.length}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {catProducts.map(prod => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        negocio={negocio}
                        cartItem={carrito.find(p => p.id === prod.id)}
                        onAdd={handleAddToCart}
                        onDecrease={disminuirCantidad}
                        onShare={handleShareProduct}
                        isAdding={addingProductId === prod.id}
                      />
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
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    negocio={negocio}
                    cartItem={carrito.find(p => p.id === prod.id)}
                    onAdd={handleAddToCart}
                    onDecrease={disminuirCantidad}
                    onShare={handleShareProduct}
                    isAdding={addingProductId === prod.id}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={30} className="text-gray-400" />
                </div>
                <p className="font-bold text-gray-500">No encontramos productos con ese nombre.</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-orange-600 font-bold text-sm underline">Ver todo el menú</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer & Modals */}
      {
        carrito.length > 0 && (
          <div className="fixed bottom-6 inset-x-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-2xl mx-auto">
            <button
              onClick={() => setShowCart(true)}
              className="w-full bg-gray-900 text-white p-2 pl-6 pr-2 rounded-[2.5rem] shadow-2xl shadow-gray-900/40 flex items-center justify-between border border-gray-800 backdrop-blur-xl bg-opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{carrito.reduce((acc, p) => acc + p.cantidad, 0)} ITEMS</span>
                <span className="text-xl font-black">${carrito.reduce((acc, p) => acc + (p.precioConToppings || p.precio) * p.cantidad, 0).toFixed(0)}</span>
              </div>
              <div className="bg-white text-gray-900 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                Ver Pedido <ShoppingBag size={18} />
              </div>
            </button>
          </div>
        )
      }

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} cart={carrito} negocio={negocio} onIncrease={agregarAlCarrito} onDecrease={disminuirCantidad} onCheckout={() => navigate(`/n/${slug}/checkout`)} total={carrito.reduce((acc, p) => acc + (p.precioConToppings || p.precio) * p.cantidad, 0)} count={carrito.reduce((acc, p) => acc + p.cantidad, 0)} />

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
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dirección</h4>
                    <p className="text-gray-600 text-sm">{negocio.direccion || "No especificada"}</p>
                    {negocio.direccion && <a href={`https://maps.google.com/?q=${negocio.direccion}`} target="_blank" className="text-xs font-bold text-orange-600 mt-1 block">Ver en Mapa</a>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Clock size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Horarios</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{negocio.horario || "No especificados"}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Phone size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Contacto</h4>
                    <p className="text-gray-600 text-sm">{negocio.telefono || "No especificado"}</p>
                    {negocio.telefono && <a href={`https://wa.me/${negocio.telefono.replace(/\D/g, '')}`} target="_blank" className="text-xs font-bold text-green-600 mt-1 block">Enviar WhatsApp</a>}
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
