import { useState, useEffect } from 'react';
import toppingPublicService from '../services/toppingPublicService';
import { toast } from 'react-hot-toast';

export function useCart(slug, negocio, initialToppingsCache = {}) {
  const [carrito, setCarrito] = useState([]);
  const [showToppingModal, setShowToppingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToppings, setProductToppings] = useState([]);
  const [toppingsCache, setToppingsCache] = useState({});
  const [addingProductId, setAddingProductId] = useState(null);

  // Load from local storage on mount/slug change
  useEffect(() => {
    if (slug) {
      const stored = localStorage.getItem(`carrito_${slug}`);
      if (stored) {
        setCarrito(JSON.parse(stored));
      } else {
        setCarrito([]);
      }
    }
  }, [slug]);

  // Persist to local storage
  useEffect(() => {
    if (slug) {
      localStorage.setItem(`carrito_${slug}`, JSON.stringify(carrito));
    }
  }, [carrito, slug]);

  // Initialize toppings cache
  useEffect(() => {
    if (Object.keys(initialToppingsCache).length > 0) {
      setToppingsCache(prev => ({ ...prev, ...initialToppingsCache }));
    }
  }, [initialToppingsCache]);

  const handleAddToCart = async (producto) => {
    if (!negocio?.acepta_pedidos) return;

    let toppings = toppingsCache[producto.id];
    if (toppings === undefined) {
      setAddingProductId(producto.id);
      try {
        toppings = await toppingPublicService.getProductoToppings(slug, producto.id);
        setToppingsCache(prev => ({ ...prev, [producto.id]: toppings }));
      } catch { 
        toppings = []; 
      } finally { 
        setAddingProductId(null); 
      }
    }

    if (toppings && toppings.length > 0) {
      setSelectedProduct(producto);
      setProductToppings(toppings);
      setShowToppingModal(true);
    } else {
      agregarAlCarritoSimple(producto);
      toast.success("Agregado al carrito", { 
        icon: '🛒', 
        style: { borderRadius: '20px', background: '#333', color: '#fff' } 
      });
    }
  };

  const agregarAlCarritoSimple = (producto) => {
    const cantMin = (negocio?.tipo_negocio === 'distribuidora' && producto.cantidad_minima > 1) 
      ? producto.cantidad_minima 
      : 1;
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id && !p.toppings?.length);
      if (existe) {
        return prev.map(p => p.id === producto.id && !p.toppings?.length 
          ? { ...p, cantidad: p.cantidad + 1 } 
          : p
        );
      }
      return [...prev, { ...producto, cantidad: cantMin, toppings: [], cartItemId: Date.now() }];
    });
  };

  const agregarConToppings = (producto, toppingsSeleccionados, cantidad) => {
    const precioToppings = toppingsSeleccionados.reduce((acc, t) => acc + (t.precio_extra || t.precio || 0), 0);
    setCarrito(prev => [
      ...prev, 
      { 
        ...producto, 
        cantidad, 
        toppings: toppingsSeleccionados, 
        precioConToppings: producto.precio + precioToppings, 
        cartItemId: Date.now() 
      }
    ]);
  };

  const agregarAlCarrito = (item) => {
    if (!negocio?.acepta_pedidos) return;
    setCarrito(prev => prev.map(p => 
      p.cartItemId === item.cartItemId ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const disminuirCantidad = (cartItemId) => {
    setCarrito(prev => prev.map(p => {
      if (p.cartItemId !== cartItemId) return p;
      const cantMin = (negocio?.tipo_negocio === 'distribuidora' && p.cantidad_minima > 1) 
        ? p.cantidad_minima 
        : 1;
      if (p.cantidad <= cantMin) return { ...p, cantidad: 0 }; 
      return { ...p, cantidad: p.cantidad - 1 };
    }).filter(p => p.cantidad > 0));
  };

  const handleUpdateQuantity = (producto, newQuantity) => {
    if (!negocio?.acepta_pedidos) return;

    if (newQuantity === 0) {
      setCarrito(prev => prev.filter(p => !(p.id === producto.id && !p.toppings?.length)));
      return;
    }

    setCarrito(prev => {
      const existing = prev.find(p => p.id === producto.id && !p.toppings?.length);
      if (existing) {
        return prev.map(p => p.cartItemId === existing.cartItemId ? { ...p, cantidad: newQuantity } : p);
      } else {
        return [...prev, { ...producto, cantidad: newQuantity, toppings: [], cartItemId: Date.now() }];
      }
    });
  };

  const clearCart = () => setCarrito([]);

  return {
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
    handleUpdateQuantity,
    clearCart
  };
}
