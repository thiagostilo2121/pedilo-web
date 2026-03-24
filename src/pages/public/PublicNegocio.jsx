import { useEffect, useState, useRef } from "react";
import apiPublic from "../../api/apiPublic";
import negocioPublicService from "../../services/negocioPublicService";
import { useNavigate } from "react-router-dom";
import { Search, X, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

import ToppingSelector from "../../components/ToppingSelector";
import ProductCard from "../../components/ui/ProductCard";
import ProductCardList from "../../components/ui/ProductCardList";
import CartDrawer from "../../components/ui/CartDrawer";
import Skeleton from "../../components/ui/Skeleton";
import { calcularTotalCarrito } from "../../utils/precioUtils";

// Modular Components
import SmartAnuncio from "../../components/public/SmartAnuncio";
import BusinessHero from "../../components/public/BusinessHero";
import HighlyRecommended from "../../components/public/HighlyRecommended";
import CategoryStoryBar from "../../components/public/CategoryStoryBar";
import FloatingCartButton from "../../components/public/FloatingCartButton";
import BusinessInfoModal from "../../components/public/BusinessInfoModal";
import MinimumOrderBanner from "../../components/public/MinimumOrderBanner";
import StickyNavBar from "../../components/public/StickyNavBar";
import CatalogHeader from "../../components/public/CatalogHeader";

// Custom Hooks
import { useCart } from "../../hooks/useCart";

export default function PublicNegocio({ slug }) {
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [activeCategory, setActiveCategory] = useState("todos"); // Category Selection
  const [toppingsCache, setToppingsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const isFetching = useRef(false);

  // Initialize Cart Hook
  const {
    carrito,
    addingProductId,
    showToppingModal,
    setShowToppingModal,
    selectedProduct,
    productToppings,
    handleAddToCart,
    agregarConToppings,
    agregarAlCarrito,
    disminuirCantidad,
    handleUpdateQuantity
  } = useCart(slug, negocio, toppingsCache);

  // Fetch Data
  useEffect(() => {
    if (isFetching.current) return;

    async function fetchData() {
      if (!slug) return;
      isFetching.current = true;
      try {
        setLoading(true);
        const data = await negocioPublicService.getMenuCompleto(slug);

        setNegocio(data.negocio);
        if (data.negocio.tipo_negocio === 'distribuidora') {
          setViewMode("list");
        }

        const sortedProducts = data.productos.sort((a, b) => (b.destacado === true) - (a.destacado === true));
        setProductos(sortedProducts);
        setCategorias(data.categorias);
        
        if (data.toppings_cache) {
          setToppingsCache(data.toppings_cache);
        }

        document.title = `${data.negocio.nombre} | Pedilo`;

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
        const bizDesc = data.negocio.descripcion || `Hacé tu pedido online en ${data.negocio.nombre}.`;
        updateMeta("description", bizDesc);

        // PWA Color
        const metaTheme = document.querySelector("meta[name=theme-color]");
        if (metaTheme && data.negocio.color_primario) {
          metaTheme.setAttribute("content", data.negocio.color_primario);
        }

      } catch (_err) {
        setError("Este menú no está disponible actualmente.");
      } finally {
        setLoading(false);
        isFetching.current = false;
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

  // Filter Logic
  const getFilteredProducts = () => {
    let result = productos;
    if (searchTerm) {
      result = result.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (activeCategory !== "todos") {
      result = result.filter(p => p.categoria === activeCategory);
    }
    return result;
  };

  // Scroll Spy & Navigation
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
    if (searchTerm || categorias.length === 0) return; 

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

    Object.values(categoryRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categorias, searchTerm]);

  // Group Products
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

      <StickyNavBar negocio={negocio} slug={slug} scrolled={scrolled} carrito={carrito} />

      <div className="-mt-[100px]">
        <BusinessHero negocio={negocio} onShowInfo={() => setShowInfoModal(true)} />
      </div>

      <main className="max-w-[1600px] xl:w-[95%] mx-auto relative z-10 -mt-8 bg-gray-50 rounded-t-[2.5rem] min-h-screen pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pt-8">
        
        <MinimumOrderBanner carrito={carrito} negocio={negocio} />

        <div className="md:flex md:gap-8 px-4 md:px-8 lg:px-12">
          <aside className="hidden md:block w-64 shrink-0 sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pb-10 scrollbar-hide">
            <h3 className="font-black text-gray-900 mb-6 px-1 text-xl">Categorías</h3>
            <div className="space-y-1.5">
              <button
                onClick={() => scrollToCategory('todos')}
                className={`w-full text-left px-4 py-3 rounded-2xl transition-all font-bold text-[15px] ${activeCategory === 'todos' ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500 hover:bg-white/60 hover:text-gray-800'}`}
              >
                Todas
              </button>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.nombre)}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all font-bold text-[15px] flex items-center justify-between group ${activeCategory === cat.nombre ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-500 hover:bg-white/60 hover:text-gray-800'}`}
                >
                  <span className="truncate pr-2">{cat.nombre}</span>
                  {productsByCategory[cat.nombre]?.length > 0 && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${activeCategory === cat.nombre ? 'bg-gray-100 text-gray-900' : 'bg-gray-200/50 text-gray-400 group-hover:text-gray-600'}`}>
                      {productsByCategory[cat.nombre]?.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="mb-8 md:mb-10">
              <div className="relative group max-w-2xl">
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
                  style={{ '--tw-ring-color': negocio.color_primario || '#ea580c' }}
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

            {!searchTerm && (
              <CategoryStoryBar
                categorias={categorias}
                activeCategory={activeCategory}
                onSelectCategory={scrollToCategory}
                colorPrimario={negocio.color_primario}
                colorSecundario={negocio.color_secundario}
              />
            )}

            <CatalogHeader 
              negocio={negocio} 
              productosLength={productos.length} 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              searchTerm={searchTerm} 
            />

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
                          className="text-sm font-bold text-white px-2 py-1 rounded-full shadow-sm"
                          style={{ backgroundColor: negocio.color_secundario || '#9ca3af' }}
                        >
                          {catProducts.length}
                        </span>
                      </h3>

                      {/* Responsive Grid/List adaptation */}
                      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5' : 'grid-cols-1 lg:grid-cols-2 xl:gap-6 lg:gap-5'}`}>
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
                {productos.length === 0 && (
                  <div className="text-center py-20 text-gray-500 font-medium">No hay productos disponibles.</div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6 min-h-[500px]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-black text-gray-900">
                    Resultados: "{searchTerm}"
                  </h2>
                  <span className="text-xs font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                    {displayedProducts.length} productos
                  </span>
                </div>

                {displayedProducts.length > 0 ? (
                  <div className={`grid gap-4 animate-in fade-in duration-500 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5' : 'grid-cols-1 lg:grid-cols-2 xl:gap-6 lg:gap-5'}`}>
                    {displayedProducts.map(prod => (
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
          </div>
        </div>

        <footer className="mt-10 border-t border-gray-100 pt-8 pb-10 text-center text-xs text-gray-400 font-medium">
          <p className="mb-2">
            Potenciado por <a href="https://pediloarg.netlify.app" target="_blank" className="font-bold text-gray-500 hover:text-orange-500 transition-colors">Pedilo.</a>
          </p>
          <div className="flex justify-center gap-4">
            <a href="/terminos" target="_blank" className="hover:text-gray-600 transition-colors">Términos</a>
            <span>•</span>
            <a href="/privacidad" target="_blank" className="hover:text-gray-600 transition-colors">Privacidad</a>
          </div>
        </footer>
      </main>

      <FloatingCartButton
        carrito={carrito}
        negocio={negocio}
        onClick={() => setShowCart(true)}
      />

      <CartDrawer 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
        cart={carrito} 
        negocio={negocio} 
        onIncrease={agregarAlCarrito} 
        onDecrease={disminuirCantidad} 
        onCheckout={() => navigate(`/n/${slug}/checkout`)} 
        total={calcularTotalCarrito(carrito, negocio)} 
        count={carrito.reduce((acc, p) => acc + p.cantidad, 0)} 
      />

      <ToppingSelector 
        isOpen={showToppingModal} 
        onClose={() => setShowToppingModal(false)} 
        onConfirm={agregarConToppings} 
        producto={selectedProduct} 
        gruposToppings={productToppings} 
      />

      <BusinessInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        negocio={negocio}
      />
    </div>
  );
}
