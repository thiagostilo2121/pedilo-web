import React, { useState, useRef } from "react";
import { X, Upload, FileSpreadsheet, CheckCircle, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";
import productService from "../../services/productService";

export default function ProductImportModal({ isOpen, onClose, onSuccess }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            setResult(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await productService.importProducts(file);
            setResult(data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Error importing products:", err);
            setError("Hubo un error al procesar el archivo. Verificá el formato e intentá nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFile(null);
        setResult(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FileSpreadsheet className="text-green-600" size={24} />
                        Importar Productos
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {!result ? (
                        <>
                            <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2 text-sm">
                                    <AlertCircle size={16} /> Instrucciones
                                </h4>
                                <p className="text-sm text-blue-700 mb-3">
                                    Subí un archivo Excel (.xlsx) con las siguientes columnas:
                                </p>
                                <ul className="list-disc list-inside text-xs text-blue-600 space-y-1 font-mono bg-white/50 p-2 rounded-lg">
                                    <li>nombre (requerido)</li>
                                    <li>precio (requerido)</li>
                                    <li>descripcion (opcional)</li>
                                    <li>stock (opcional | 0 o 1)</li>
                                    <li>categoria (opcional | debe existir)</li>
                                    <li>sku (opcional)</li>
                                    <li>codigo_barras (opcional)</li>
                                </ul>
                                <p className="text-xs text-blue-500 mt-2">
                                    El sistema actualizará productos existentes si coinciden por SKU, Código de Barras o Nombre.
                                </p>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${file ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-orange-300 hover:bg-gray-50"
                                    }`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".xlsx, .xls"
                                    className="hidden"
                                />
                                {file ? (
                                    <>
                                        <FileSpreadsheet className="text-green-600 mb-3" size={48} />
                                        <p className="font-bold text-gray-800">{file.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                            }}
                                            className="mt-4 text-xs text-red-500 hover:text-red-700 font-bold underline"
                                        >
                                            Eliminar archivo
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="text-gray-400 mb-3" size={48} />
                                        <p className="font-bold text-gray-600">Hacé click para subir tu Excel</p>
                                        <p className="text-xs text-gray-400 mt-1">Soporta archivos .xlsx</p>
                                    </>
                                )}
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-2">
                                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">¡Importación completada!</h4>
                                <p className="text-gray-500">El proceso finalizó correctamente.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                                    <span className="block text-2xl font-bold text-green-700">{result.created}</span>
                                    <span className="text-xs font-bold text-green-600 uppercase">Creados</span>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
                                    <span className="block text-2xl font-bold text-blue-700">{result.updated}</span>
                                    <span className="text-xs font-bold text-blue-600 uppercase">Actualizados</span>
                                </div>
                            </div>

                            {result.errors && result.errors.length > 0 && (
                                <div className="bg-orange-50 rounded-xl border border-orange-100 overflow-hidden">
                                    <div className="p-3 bg-orange-100/50 border-b border-orange-100">
                                        <h5 className="font-bold text-orange-800 text-sm flex items-center gap-2">
                                            <AlertTriangle size={14} />
                                            Errores / Advertencias ({result.errors.length})
                                        </h5>
                                    </div>
                                    <div className="p-3 max-h-40 overflow-y-auto text-xs text-orange-700 font-mono space-y-1">
                                        {result.errors.map((err, idx) => (
                                            <div key={idx} className="border-b border-orange-100/50 last:border-0 pb-1 last:pb-0">
                                                • {err}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                    {!result ? (
                        <>
                            <button
                                onClick={handleClose}
                                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!file || loading}
                                className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center gap-2"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {loading ? "Procesando..." : "Subir Excel"}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleClose}
                            className="w-full py-3 rounded-xl font-bold text-white bg-gray-900 hover:bg-gray-800 shadow-lg transition-all"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
