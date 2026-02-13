import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ShoppingBag,
    Tags,
    TrendingUp,
    Settings,
    Plus,
    Command,
    X,
    LayoutDashboard,
    Pizza,
    ArrowRight,
    Loader2
} from "lucide-react";
import productService from "../../services/productService";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Initial navigation options
    const pages = [
        { name: "Ver Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} />, type: "Navegación" },
        { name: "Gestionar Pedidos", path: "/dashboard/pedidos", icon: <ShoppingBag size={18} />, type: "Navegación" },
        { name: "Lista de Productos", path: "/dashboard/productos", icon: <Pizza size={18} />, type: "Navegación" },
        { name: "Categorías", path: "/dashboard/categorias", icon: <Tags size={18} />, type: "Navegación" },
        { name: "Configuración", path: "/dashboard/configuracion", icon: <Settings size={18} />, type: "Navegación" },
    ];

    const actions = [
        { name: "Crear Nuevo Producto", action: () => navigate("/dashboard/productos"), icon: <Plus size={18} />, type: "Acción" },
    ];

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            // Pre-fetch products for searching
            productService.getAll().then(data => setProducts(data)).catch(() => { });
        } else {
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([...pages, ...actions]);
            setSelectedIndex(0);
            return;
        }

        const filteredPages = pages.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        const filteredProducts = products
            .filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map(p => ({
                name: p.nombre,
                path: `/dashboard/productos`, // In a real app index, maybe deep link or open modal
                icon: <Tags size={18} className="text-orange-600" />,
                type: "Producto",
                price: p.precio
            }));

        setResults([...filteredPages, ...filteredProducts]);
        setSelectedIndex(0);
    }, [query, products]);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            const selected = results[selectedIndex];
            if (selected) {
                if (selected.action) selected.action();
                else if (selected.path) navigate(selected.path);
                setIsOpen(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 backdrop-blur-sm bg-black/20 animate-in fade-in duration-200">
            <div
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300"
                onKeyDown={handleKeyDown}
            >
                {/* Search Input Area */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                    <Search className="text-gray-400" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar páginas, productos o acciones..."
                        className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                        ESC
                    </div>
                </div>

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {results.length > 0 ? (
                        <div className="space-y-1">
                            {results.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (item.action) item.action();
                                        else if (item.path) navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${index === selectedIndex ? "bg-orange-600 text-white shadow-lg shadow-orange-100 translate-x-1" : "hover:bg-gray-50 text-gray-700"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${index === selectedIndex ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                                            {item.icon}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">{item.name}</p>
                                            <p className={`text-[10px] uppercase font-black tracking-widest ${index === selectedIndex ? "text-orange-100" : "text-gray-400"}`}>
                                                {item.type} {item.price ? `• $${item.price}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                    {index === selectedIndex && <ArrowRight size={16} className="animate-in slide-in-from-left-2" />}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-gray-300" size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">No encontramos resultados para "{query}"</p>
                            <p className="text-xs text-gray-400 mt-1">Intentá con otras palabras clave.</p>
                        </div>
                    )}
                </div>

                {/* Footer / Tip Area */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <span className="bg-white border border-gray-200 px-1 rounded-sm shadow-xs text-gray-500">↑↓</span> Navegar
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="bg-white border border-gray-200 px-1 rounded-sm shadow-xs text-gray-500">ENTER</span> Seleccionar
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Command size={10} /> <span className="uppercase tracking-tighter">K</span> para abrir
                    </div>
                </div>
            </div>
        </div>
    );
}
