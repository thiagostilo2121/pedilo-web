import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, X, Loader2, ScanBarcode, Keyboard, Search, Plus } from "lucide-react";
import { useToast } from "../../contexts/ToastProvider";

/**
 * Looks up a barcode in Open Food Facts API.
 * Returns { nombre, descripcion, imagen_url, marca } or null.
 */
async function lookupBarcode(barcode) {
    try {
        // Usamos v0 API para evitar 404 en consola cuando no existe (retorna status: 0)
        const res = await fetch(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json?fields=product_name,brands,image_url,generic_name,categories_tags,quantity`
        );
        if (!res.ok) return null;
        const data = await res.json();
        if (data.status !== 1 || !data.product) return null;

        const p = data.product;
        return {
            nombre: p.product_name || "",
            descripcion: [p.generic_name, p.quantity].filter(Boolean).join(" — ") || "",
            imagen_url: p.image_url || "",
            marca: p.brands || "",
        };
    } catch {
        return null;
    }
}

export default function BarcodeScanner({ isOpen, onClose, onProductFound, existingProducts }) {
    const [mode, setMode] = useState("camera"); // "camera" | "manual"
    const [manualCode, setManualCode] = useState("");
    const [scanning, setScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { barcode, product, existingMatch }
    const toast = useToast();
    const scannerRef = useRef(null);
    const containerRef = useRef(null);

    // Refs for stable state access in event listener
    const stateRef = useRef({ loading, result, mode });
    useEffect(() => { stateRef.current = { loading, result, mode }; }, [loading, result, mode]);

    // Start camera scanner
    useEffect(() => {
        if (!isOpen || mode !== "camera") {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(() => { });
            }
            return;
        }

        let html5Qrcode = null;
        let mounted = true;

        const startScanner = async () => {
            // Check for camera support
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.warn("Camera API not available");
                setMode("manual");
                return;
            }

            try {
                setScanning(true);
                html5Qrcode = new Html5Qrcode("barcode-reader");
                scannerRef.current = html5Qrcode;

                await html5Qrcode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 280, height: 150 },
                        aspectRatio: 1.5,
                    },
                    (decodedText) => {
                        if (mounted) {
                            handleBarcode(decodedText);
                            if (html5Qrcode.isScanning) {
                                html5Qrcode.stop().catch(() => { });
                            }
                        }
                    },
                    () => { }
                );
            } catch (err) {
                console.error("Camera error:", err);
                if (mounted) {
                    setScanning(false);
                    setMode("manual");
                    const msg = err?.message || "";
                    if (msg.includes("passphrase") || msg.includes("Permission")) {
                        toast.error("Permiso de cámara denegado.");
                    } else if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
                        toast.error("La cámara requiere conexión HTTPS.");
                    } else {
                        toast.error("Error al iniciar cámara. Usá modo manual.");
                    }
                }
            }
        };

        const timer = setTimeout(startScanner, 300);

        return () => {
            mounted = false;
            clearTimeout(timer);
            if (html5Qrcode && html5Qrcode.isScanning) {
                html5Qrcode.stop().catch(() => { });
            }
        };
    }, [isOpen, mode]);

    // Keyboard listener for USB scanners
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyPress = (e) => {
            const { loading, result } = stateRef.current;

            if (!loading && !result) {
                if (e.target.tagName === "INPUT") return;
                if (e.key.length === 1 && /[0-9]/.test(e.key)) {
                    setMode("manual");
                    setManualCode(prev => prev + e.key);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isOpen]);

    const handleBarcode = async (barcode) => {
        setScanning(false);
        setLoading(true);

        // 1. Check if product exists locally
        const existingMatch = existingProducts?.find(
            (p) => p.nombre?.toLowerCase().includes(barcode) || barcode.includes(String(p.id))
        );

        // 2. Look up in Open Food Facts
        const productData = await lookupBarcode(barcode);

        setResult({
            barcode,
            product: productData,
            existingMatch: null, // We will let the user decide
        });
        setLoading(false);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualCode.trim()) {
            handleBarcode(manualCode.trim());
        }
    };

    const handleUseProduct = () => {
        if (result?.product) {
            onProductFound({
                nombre: result.product.nombre,
                descripcion: result.product.descripcion,
                imagen_url: result.product.imagen_url,
                codigo_barras: result.barcode,
                sku: "",
            });
        }
        handleReset();
        onClose();
    };

    const handleCreateEmpty = () => {
        onProductFound({
            nombre: "",
            descripcion: "",
            imagen_url: "",
            codigo_barras: result?.barcode || "",
            sku: "",
        });
        handleReset();
        onClose();
    };

    const handleReset = () => {
        setResult(null);
        setManualCode("");
        setLoading(false);
    };

    const handleClose = () => {
        handleReset();
        if (scannerRef.current) {
            if (scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(() => { });
            }
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-5 border-b flex justify-between items-center bg-gray-50 dark:bg-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-xl">
                            <ScanBarcode size={22} className="text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Escanear Código</h2>
                            <p className="text-xs text-gray-500 dark:text-zinc-400">Escaneá o ingresá un código de barras</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {/* Mode Toggle */}
                    {!result && !loading && (
                        <div className="flex gap-2 mb-5">
                            <button
                                onClick={() => setMode("camera")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "camera"
                                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                                    : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:bg-white/10"
                                    }`}
                            >
                                <Camera size={16} /> Cámara
                            </button>
                            <button
                                onClick={() => {
                                    if (scannerRef.current) {
                                        scannerRef.current.stop().catch(() => { });
                                    }
                                    setMode("manual");
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "manual"
                                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                                    : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:bg-white/10"
                                    }`}
                            >
                                <Keyboard size={16} /> Manual
                            </button>
                        </div>
                    )}

                    {/* Camera Mode */}
                    {mode === "camera" && !result && !loading && (
                        <div>
                            <div
                                id="barcode-reader"
                                ref={containerRef}
                                className="rounded-2xl overflow-hidden border-2 border-dashed border-orange-200 bg-gray-900 min-h-[250px]"
                            />
                            <p className="text-center text-xs text-gray-400 dark:text-zinc-500 mt-3 font-medium">
                                Apuntá la cámara al código de barras del producto
                            </p>
                        </div>
                    )}

                    {/* Manual Mode */}
                    {mode === "manual" && !result && !loading && (
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2 block">
                                    Código de barras (EAN/UPC)
                                </label>
                                <div className="relative">
                                    <ScanBarcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={18} />
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={manualCode}
                                        onChange={(e) => setManualCode(e.target.value)}
                                        placeholder="7790001234567"
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-lg font-mono tracking-widest"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!manualCode.trim()}
                                className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Search size={18} /> Buscar Producto
                            </button>
                        </form>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="p-4 bg-orange-50 rounded-full animate-pulse">
                                <Loader2 size={32} className="text-orange-600 animate-spin" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-900 dark:text-zinc-100">Buscando producto...</p>
                                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Consultando base de datos global</p>
                            </div>
                        </div>
                    )}

                    {/* Result */}
                    {result && (
                        <div className="space-y-5">
                            {/* Barcode Display */}
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 text-center">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Código</p>
                                <p className="text-xl font-mono font-bold text-gray-900 dark:text-zinc-100 tracking-widest">{result.barcode}</p>
                            </div>

                            {result.product ? (
                                <>
                                    {/* Product Found */}
                                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                                        <div className="flex items-start gap-4">
                                            {result.product.imagen_url && (
                                                <img
                                                    src={result.product.imagen_url}
                                                    alt={result.product.nombre}
                                                    className="w-20 h-20 object-contain rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-1"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">
                                                    ✓ Producto encontrado
                                                </p>
                                                <p className="font-bold text-gray-900 dark:text-zinc-100 text-sm leading-tight">{result.product.nombre}</p>
                                                {result.product.marca && (
                                                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">{result.product.marca}</p>
                                                )}
                                                {result.product.descripcion && (
                                                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{result.product.descripcion}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button
                                            onClick={handleUseProduct}
                                            className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <Plus size={18} /> Usar estos datos
                                        </button>
                                        <button
                                            onClick={handleCreateEmpty}
                                            className="w-full py-3 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:bg-white/10 transition-all text-sm"
                                        >
                                            Crear producto vacío
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Product Not Found */}
                                    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 text-center">
                                        <div className="text-3xl mb-2">🔍</div>
                                        <p className="font-bold text-gray-900 dark:text-zinc-100 text-sm">
                                            Producto no encontrado en la base global
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                                            Podés crear el producto manualmente con este código
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleCreateEmpty}
                                        className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} /> Crear producto nuevo
                                    </button>
                                </>
                            )}

                            <button
                                onClick={handleReset}
                                className="w-full py-2.5 text-gray-500 dark:text-zinc-400 font-bold text-sm hover:text-gray-700 dark:text-zinc-300 transition-colors"
                            >
                                Escanear otro código
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
