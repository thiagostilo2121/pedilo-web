import { useEffect, useState, useRef } from "react";
import apiPublic from "../api/apiPublic";
import toppingPublicService from "../services/toppingPublicService";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  ShoppingBag,
  AlertCircle,
  LayoutGrid,
  List
} from "lucide-react";
import ToppingSelector from "../components/ToppingSelector";
import { toast } from "react-hot-toast";
import ProductCard from "../components/ui/ProductCard";
import ProductCardList from "../components/ui/ProductCardList";
import CartDrawer from "../components/ui/CartDrawer";
import Skeleton from "../components/ui/Skeleton";
import { calcularTotalCarrito } from "../utils/precioUtils";

// Modular Components
import SmartAnuncio from "../components/public/SmartAnuncio";
import BusinessHero from "../components/public/BusinessHero";
import HighlyRecommended from "../components/public/HighlyRecommended";
import CategoryStoryBar from "../components/public/CategoryStoryBar";
import FloatingCartButton from "../components/public/FloatingCartButton";
import BusinessInfoModal from "../components/public/BusinessInfoModal";
import DynamicIcon from "../components/common/DynamicIcon";


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

      <SmartAnuncio anuncio={negocio.anuncio_web} />

      {/* 1. IMMERSIVE HEADER (Blurry Banner Effect) */}
      {/* Header Sticky Bar */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className={`flex items-center gap-3 transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {negocio.logo_url && <img src={negocio.logo_url} className="w-8 h-8 rounded-full border border-gray-200" alt="Logo" />}
            <span className="font-extrabold text-gray-900 text-sm truncate max-w-[150px]">{negocio.nombre}</span>
            {negocio.insignias?.some(b => b.id === 'FOUNDER') && (
              <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-200/50">
                <DynamicIcon name="Crown" size={10} fill="currentColor" />
                <span className="hidden sm:inline">Fundador</span>
              </span>
            )}
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={() => navigate(`/n/${slug}/pedidos`)} className={`p-2.5 rounded-full transition-colors ${scrolled ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-black/20 text-white backdrop-blur-md hover:bg-black/30'}`}>
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="-mt-[68px] sm:-mt-[80px]">
        <BusinessHero negocio={negocio} onShowInfo={() => setShowInfoModal(true)} />
      </div>

      <main className="max-w-6xl mx-auto relative z-10 -mt-8 bg-gray-50 rounded-t-[2.5rem] min-h-screen pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pt-8">

        {/* Pedido Mínimo Banner (distribuidoras) */}
        {negocio.tipo_negocio === 'distribuidora' && negocio.pedido_minimo > 0 && (
          <div className="mx-4 mb-4 bg-white border border-gray-100 px-4 py-4 rounded-3xl shadow-sm">
            {(() => {
              const currentTotal = calcularTotalCarrito(carrito, negocio);
              const progress = Math.min(100, (currentTotal / negocio.pedido_minimo) * 100);
              const reached = currentTotal >= negocio.pedido_minimo;

              return (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{reached ? '🎉' : '📦'}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {reached ? '¡Mínimo alcanzado!' : 'Pedido mínimo'}
                      </span>
                    </div>
                    <span className={`text-sm font-black ${reached ? 'text-green-500' : 'text-gray-900'}`}>
                      ${currentTotal.toLocaleString()} <span className="text-xs text-gray-400 font-medium">/ ${negocio.pedido_minimo.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${reached ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{
                        width: `${progress}%`,
                        backgroundColor: !reached ? (negocio.color_primario || '#f97316') : undefined
                      }}
                    ></div>
                  </div>

                  {!reached && (
                    <p className="text-[11px] text-gray-500 font-medium text-right mt-0.5">
                      Faltan <strong className="text-gray-900">${(negocio.pedido_minimo - currentTotal).toLocaleString()}</strong>
                    </p>
                  )}
                </div>
              );
            })()}
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

        <HighlyRecommended
          productos={productos}
          negocio={negocio}
          carrito={carrito}
          onAdd={handleAddToCart}
          onDecreaseQuantity={disminuirCantidad}
          isAddingId={addingProductId}
        />

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

            {!searchTerm && (
              <CategoryStoryBar
                categorias={categorias}
                activeCategory={activeCategory}
                onSelectCategory={scrollToCategory}
                colorPrimario={negocio.color_primario}
                colorSecundario={negocio.color_secundario}
              />
            )}

            {/* 3.5 VIEW TOGGLE (NEW) */}
            {productos.length > 0 && !searchTerm && (
              <div className="mb-4 flex justify-end">
                <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <LayoutGrid size={16} /> Grilla
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List size={16} /> Lista
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
                              totalQty={carrito.filter(p => p.id === prod.id).reduce((acc, c) => acc + c.cantidad, 0)}
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
                              totalQty={carrito.filter(p => p.id === prod.id).reduce((acc, c) => acc + c.cantidad, 0)}
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
            Potenciado por <a href="https://pediloarg.netlify.app" target="_blank" className="font-bold hover:text-orange-500 transition-colors">Pedilo.</a>
          </p>
          <div className="flex justify-center gap-4">
            <a href="/terminos" target="_blank" className="hover:text-gray-600 transition-colors">Términos</a>
            <span>•</span>
            <a href="/privacidad" target="_blank" className="hover:text-gray-600 transition-colors">Privacidad</a>
          </div>
        </footer>
      </main>

      {/* Cart Drawer & Modals */}
      <FloatingCartButton
        carrito={carrito}
        negocio={negocio}
        onClick={() => setShowCart(true)}
      />

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} cart={carrito} negocio={negocio} onIncrease={agregarAlCarrito} onDecrease={disminuirCantidad} onCheckout={() => navigate(`/n/${slug}/checkout`)} total={calcularTotalCarrito(carrito, negocio)} count={carrito.reduce((acc, p) => acc + p.cantidad, 0)} />

      <ToppingSelector isOpen={showToppingModal} onClose={() => setShowToppingModal(false)} onConfirm={agregarConToppings} producto={selectedProduct} gruposToppings={productToppings} />

      <BusinessInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        negocio={negocio}
      />
    </div >
  );
}
