/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import { QRCodeSVG } from "qrcode.react";
import {
    CheckCircle2,
    XCircle,
    Smartphone,
    Zap,
    Printer,
    Check,
    X
} from "lucide-react";

export default function Brochure() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 print:py-0 print:bg-white font-sans text-gray-900 overflow-hidden">

            {/* Botón Flotante para Imprimir (Oculto en Impresión) */}
            <button
                onClick={handlePrint}
                className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all z-50 flex items-center gap-2 font-bold group print:hidden"
            >
                <Printer size={24} />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
                    Guardar como PDF
                </span>
            </button>

            {/* --- HOJA A4 (210mm x 297mm) --- */}
            <div className="bg-white w-[210mm] h-[297mm] shadow-2xl print:shadow-none print:w-full print:h-full p-[15mm] flex flex-col items-stretch border border-gray-100 print:border-none relative overflow-hidden box-border">

                {/* Decoración de Fondo (Patrón de Puntos Sutil) */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* --- HEADER --- */}
                <header className="flex justify-between items-center mb-10 relative z-10 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-4">
                        <img src="/favicons/p-black.png" alt="Pedilo Logo" className="mb-4 w-10 h-10" />
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter text-gray-950 leading-none">PEDILO<span className="text-orange-600">.</span></h1>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-4">Software Gastronómico</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-gray-950 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Solución 2026
                        </div>
                    </div>
                </header>

                {/* --- TITULAR & VALOR --- */}
                <section className="text-center mb-8 relative z-10">
                    <h2 className="text-[42px] font-black text-gray-950 mb-3 leading-[1.1] tracking-tight">
                        Tu sistema de pedidos.<br />
                        <span className="text-orange-600">Sin intermediarios.</span>
                    </h2>
                    <p className="text-sm text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                        La plataforma todo-en-uno para recibir pedidos online, gestionar tu menú y fidelizar clientes sin pagar comisiones por venta.
                    </p>
                </section>

                {/* --- FEATURE MATRIX (COMPARATIVA) --- */}
                <section className="mb-4 relative z-10">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-xs uppercase font-black tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 w-1/3">Características</th>
                                    <th className="px-6 py-3 w-1/3 text-center text-red-400">Apps de Delivery</th>
                                    <th className="px-6 py-3 w-1/3 text-center text-orange-600 bg-orange-50/50">Pedilo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                <tr>
                                    <td className="px-6 py-3 font-bold">Comisión por venta</td>
                                    <td className="px-6 py-3 text-center text-red-500 font-bold bg-red-50/10">15% - 35%</td>
                                    <td className="px-6 py-3 text-center text-green-600 font-black bg-orange-50/50">0% (Gratis)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3">Disponibilidad del dinero</td>
                                    <td className="px-6 py-3 text-center bg-red-50/10">15 a 30 días</td>
                                    <td className="px-6 py-3 text-center font-bold bg-orange-50/50">Al instante</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3">Datos del Cliente</td>
                                    <td className="px-6 py-3 text-center bg-red-50/10"><div className="mx-auto w-fit text-red-400"><X size={18} /></div></td>
                                    <td className="px-6 py-3 text-center bg-orange-50/50"><div className="mx-auto w-fit text-green-600"><Check size={20} strokeWidth={3} /></div></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-3">Sitio Web Propio</td>
                                    <td className="px-6 py-3 text-center bg-red-50/10"><div className="mx-auto w-fit text-red-400"><X size={18} /></div></td>
                                    <td className="px-6 py-3 text-center bg-orange-50/50"><div className="mx-auto w-fit text-green-600"><Check size={20} strokeWidth={3} /></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* --- DEMO SECTION (PHONE MOCKUP) --- */}
                <section className="flex items-center gap-8 mb-4 relative z-10 bg-gray-50 rounded-[2rem] p-6 border border-gray-100 overflow-hidden">
                    {/* Abstract Circle Background */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                            <Zap size={12} fill="currentColor" className="text-orange-500" /> Demo en Vivo
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">
                            Tus clientes compran en <span className="text-orange-600">segundos</span>.
                        </h3>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-xs">
                            Sin descargar apps. Escaneá el QR para probar la experiencia de compra real como si fueras un cliente.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                <QRCodeSVG value={`${window.location.origin}/n/pedilo-oficial`} size={60} level="M" />
                            </div>
                            <div className="text-[10px] uppercase font-black text-gray-400 tracking-widest w-24 leading-relaxed">
                                Escaneá para probar
                            </div>
                        </div>
                    </div>

                    {/* CSS Phone Mockup */}
                    <div className="relative w-[140px] h-[280px] bg-gray-900 rounded-[2rem] shadow-2xl border-[4px] border-gray-800 shrink-0 transform rotate-[-3deg] mr-4">
                        {/* Screen */}
                        <div className="absolute inset-1 bg-white rounded-[1.7rem] overflow-hidden flex flex-col">
                            {/* Header Mockup */}
                            <div className="h-12 bg-orange-600 w-full mb-2"></div>
                            {/* Content Mockup */}
                            <div className="p-2 space-y-2">
                                <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse"></div>
                                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse"></div>
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    <div className="h-16 bg-gray-100 rounded-lg"></div>
                                    <div className="h-16 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>
                            {/* Bottom Button Mockup */}
                            <div className="mt-auto m-2 h-8 bg-green-500 rounded-lg"></div>
                        </div>
                        {/* Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-800 rounded-full"></div>
                    </div>
                </section>

                {/* --- PRICING & OFFER --- */}
                <section className="mt-auto relative z-10 flex gap-4">
                    {/* Price Box */}
                    <div className="flex-1 bg-gray-900 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-orange-600 w-1 h-full left-0 top-0"></div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Costo Mensual</p>
                            <div className="text-3xl font-black">$17.000 <span className="text-sm font-medium text-gray-400">/mes</span></div>
                        </div>
                        <div className="mt-3 text-[10px] font-medium text-gray-400 flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-green-500" /> Cancelás cuando quieras
                        </div>
                    </div>

                    {/* Offer Box */}
                    <div className="flex-[1.5] border-2 border-dashed border-orange-200 bg-orange-50 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-orange-600 font-black uppercase text-xs tracking-widest mb-1">Oferta Lanzamiento</p>
                            <h4 className="text-xl font-black text-gray-900">14 Días de Prueba Gratis</h4>
                            <p className="text-[10px] text-gray-500 font-bold mt-1 max-w-[180px]">
                                Te configuramos el menú y el QR sin cargo inicial.
                            </p>
                        </div>
                        <div className="w-full text-right">
                            <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Pedir Demo</div>
                            <div className="text-sm font-black text-gray-900">+54 9 11 2386-0316</div>
                            <div className="text-[10px] text-gray-500 font-medium">pediloarg.netlify.app</div>
                        </div>
                    </div>
                </section>

                {/* Footer Legal */}
                <div className="text-center mt-6 border-t border-gray-100 pt-3">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-gray-300 font-semibold">
                        © 2026 Pedilo Argentina • Potenciando el comercio local
                    </p>
                </div>

            </div>

            <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .min-h-screen {
            background: white !important;
            padding: 0 !important;
            height: 297mm;
            overflow: hidden;
          }
          /* Ocultar scrollbars */
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>
        </div>
    );
}
