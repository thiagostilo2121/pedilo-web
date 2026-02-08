/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { Share2, Download, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "../../contexts/ToastProvider";

export default function QRPanel({ negocio }) {
    const toast = useToast();

    const handleDownloadQR = async () => {
        // Asegurarnos que la fuente esté cargada antes de dibujar
        await document.fonts.load("900 80px Montserrat");
        await document.fonts.load("600 30px Montserrat");
        await document.fonts.load("bold 50px Montserrat");

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const qrElement = document.getElementById("negocio-qr");

        if (!qrElement) return;

        // Configuración del Canvas (High Res)
        const width = 800;
        const height = 1000;

        canvas.width = width;
        canvas.height = height;

        // 1. Fondo Gradiente Premium (Naranja a Rojo)
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#fb923c"); // Orange 400
        gradient.addColorStop(1, "#ea580c"); // Orange 600
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 2. Título "Pedilo" con Sombra
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 80px Montserrat, sans-serif"; // Montserrat font
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Pedilo", width / 2, 80);

        // Reset shadow para textos normales
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // 3. Subtexto
        ctx.font = "600 30px Montserrat, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fillText("Escaneá para ver el menú", width / 2, 150);

        // 4. Nombre del Negocio (Bottom)
        ctx.font = "bold 50px Montserrat, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(negocio.nombre, width / 2, height - 100);

        // 5. Dibujar QR en Tarjeta Blanca con Sombra
        const svgData = new XMLSerializer().serializeToString(qrElement);
        const img = new Image();
        // Convertir SVG a base64
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const qrSize = 500;
            const cardPadding = 60;
            const cardSize = qrSize + cardPadding;
            const x = (width - cardSize) / 2;
            const y = (height - cardSize) / 2; // Centrado verticalmente

            // Sombra de la tarjeta
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 30;
            ctx.shadowOffsetY = 15;

            // Tarjeta Blanca con Bordes Redondeados (Manual)
            ctx.fillStyle = "#ffffff";
            const radius = 40;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + cardSize - radius, y);
            ctx.quadraticCurveTo(x + cardSize, y, x + cardSize, y + radius);
            ctx.lineTo(x + cardSize, y + cardSize - radius);
            ctx.quadraticCurveTo(x + cardSize, y + cardSize, x + cardSize - radius, y + cardSize);
            ctx.lineTo(x + radius, y + cardSize);
            ctx.quadraticCurveTo(x, y + cardSize, x, y + cardSize - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();

            // Reset shadow para el QR
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;

            // Dibujar QR centrado en la tarjeta
            ctx.drawImage(img, x + cardPadding / 2, y + cardPadding / 2, qrSize, qrSize);

            // Descargar
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `QR-${negocio.slug}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    return (
        <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Share2 className="text-blue-500" size={20} /> Compartir Tienda
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
                <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
                    {negocio.slug && (
                        <QRCodeSVG
                            id="negocio-qr"
                            value={`${window.location.origin}/n/${negocio.slug}`}
                            size={150}
                            level="H"
                            includeMargin={false}
                        />
                    )}
                </div>

                <div className="flex gap-2 w-full">
                    <button
                        onClick={handleDownloadQR}
                        className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                    >
                        <Download size={16} /> Descargar QR
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/n/${negocio.slug}`);
                            toast.success("Link copiado al portapapeles");
                        }}
                        className="flex-none bg-white border border-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Copiar Link"
                    >
                        <Copy size={20} />
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
                Descarga la imagen para imprimir stickers o compartir en redes.
            </p>
        </section>
    );
}
