/* /home/stiloou/repos/PEDILO/pedilo-web/src/components/marketing/FlyerGenerator.jsx */

// ... (inicio del archivo sin cambios hasta el componente)

export default function FlyerGenerator({ negocio }) {
    const toast = useToast();
    const flyerRef = useRef(null);

    const [ctaText, setCtaText] = useState("Escaneá y pedí online");
    const [isBrandMode, setIsBrandMode] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const brandColor = negocio?.color_principal || "#ea580c";

    // Evitamos el problema de CORS en preview agregando una pequeña marca de tiempo
    // que obliga al navegador a validar el permiso de nuevo sin usar caché vieja
    const logoUrlPreview = negocio?.logo_url ? `${negocio.logo_url}${negocio.logo_url.includes('?') ? '&' : '?'}v=flyer` : null;

    const handleDownloadFlyer = async () => {
        if (!flyerRef.current) return;
        try {
            setDownloading(true);
            const dataUrl = await toPng(flyerRef.current, {
                cacheBust: true,
                pixelRatio: 3, // 3x es ideal para impresión A4/A5 sin pesar de más
                quality: 1.0,
                backgroundColor: isBrandMode ? brandColor : "#ffffff"
            });
            const link = document.createElement("a");
            link.download = `Flyer-${negocio.slug || "negocio"}.png`;
            link.href = dataUrl;
            link.click();
            toast.success("Flyer descargado con éxito");
        } catch (err) {
            console.error("Error generando flyer:", err);
            toast.error("Error al generar la imagen. Intenta de nuevo.");
        } finally {
            setDownloading(false);
        }
    };

    // ... (copyLink igual)

    return (
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-white/10">
                <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-zinc-200">
                    <Share2 className="text-orange-600" size={20} />
                    Flyer del Negocio
                </h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                    Diseñá y descargá un cartel profesional para tu local.
                </p>
            </div>

            <div className="p-4 sm:p-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start">

                {/* --- SECCIÓN DE VISTA PREVIA --- */}
                <div className="w-full flex-1 flex justify-center bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 sm:p-12 border border-dashed border-gray-200 dark:border-white/10 overflow-hidden">
                    <div
                        ref={flyerRef}
                        className={`
                            relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-center text-center p-8 justify-between transition-all duration-300
                            ${isBrandMode ? 'text-white' : 'bg-white text-gray-900 border border-gray-100'}
                        `}
                        style={{ backgroundColor: isBrandMode ? brandColor : "#ffffff" }}
                    >
                        {/* 1. Header: Logo con fix de visibilidad */}
                        <div className="w-full flex flex-col items-center justify-center pt-4 z-10">
                            {negocio.logo_url ? (
                                <div className="bg-white p-2.5 rounded-3xl shadow-xl">
                                    <img
                                        src={logoUrlPreview}
                                        alt="Logo"
                                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-2xl"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                            ) : (
                                <h3 className={`font-black text-2xl sm:text-3xl tracking-tight ${isBrandMode ? 'text-white' : 'text-gray-900'}`}>{negocio.nombre}</h3>
                            )}
                        </div>

                        {/* 2. Cuerpo: QR */}
                        <div className="flex-1 flex items-center justify-center w-full my-4 z-10">
                            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <QRCodeSVG
                                    value={`${window.location.origin}/n/${negocio.slug}`}
                                    size={160}
                                    level="H"
                                    fgColor={isBrandMode ? brandColor : "#000000"}
                                />
                            </div>
                        </div>

                        {/* 3. Footer */}
                        <div className="space-y-4 w-full z-10 pb-2">
                             <h4 className="font-black text-xl sm:text-2xl leading-tight px-2">{ctaText}</h4>
                             <div className="flex items-center justify-center gap-2 opacity-60">
                                <div className="h-px w-8 bg-current" />
                                <span className="text-[10px] font-black tracking-widest uppercase">PEDILO</span>
                                <div className="h-px w-8 bg-current" />
                             </div>
                        </div>

                        {/* Background Effects */}
                        {isBrandMode && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
                                <div className="absolute top-0 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 -left-20 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
                            </>
                        )}
                    </div>
                </div>

                {/* --- CONTROLES (Sin cambios mayores, solo espaciado) --- */}
                <div className="w-full lg:w-80 space-y-6 shrink-0">
                    {/* ... (resto del componente con los selectores y botones) ... */}
                </div>
            </div>
        </section>
    );
}
