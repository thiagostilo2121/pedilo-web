import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Github,
    Code2,
    Cpu,
    Globe,
    ShieldCheck,
    GitBranch,
    ChevronLeft,
    Database,
    Zap,
    LayoutPanelTop,
    BarChart3,
    Heart
} from 'lucide-react';
import pkg from '../../../package.json';
import apiPublic from '../../api/apiPublic';

export default function About() {
    const navigate = useNavigate();
    const [apiStatus, setApiStatus] = React.useState('checking');

    React.useEffect(() => {
        document.title = "Ficha Técnica | Pedilo";

        // Verificar salud de la API
        const checkApi = async () => {
            try {
                // Un ping rápido al root de la API
                await apiPublic.get('/');
                setApiStatus('online');
            } catch (error) {
                // Si devuelve 404 o similar pero responde, está online (FastAPI suele tener root)
                if (error.response) {
                    setApiStatus('online');
                } else {
                    setApiStatus('offline');
                }
            }
        };

        checkApi();
    }, []);

    const buildDate = import.meta.env.VITE_BUILD_TIME
        ? new Date(import.meta.env.VITE_BUILD_TIME).toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : "N/A";

    const techStack = [
        { name: "React 19", category: "Core", description: "Biblioteca principal para la interfaz." },
        { name: "Vite 7", category: "Build Tool", description: "Entorno de desarrollo ultra rápido." },
        { name: "Tailwind CSS 4", category: "Styles", description: "Framework de diseño moderno." },
        { name: "Recharts", category: "Analytics", description: "Gráficos estadísticos e interactivos." },
        { name: "Vite PWA", category: "Mobile", description: "Tecnología de App instalable." },
        { name: "Lucide React", category: "Icons", description: "Set de iconos premium consistentes." },
        { name: "Axios", category: "Network", description: "Gestión de peticiones y sincronía." },
        { name: "React Router 7", category: "Routing", description: "Navegación dinámica y protegida." }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">

            {/* Mini Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-bold transition-colors"
                    >
                        <ChevronLeft size={20} /> Volver al Inicio
                    </button>
                    <span className="text-xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto space-y-12">

                {/* Hero Section */}
                <section className="text-center space-y-4">
                    <div className="inline-flex p-4 rounded-3xl bg-white shadow-xl shadow-orange-500/10 mb-4 animate-bounce">
                        <img src="/favicons/pedilo-black.png" alt="Pedilo Logo" className="w-16 h-16 object-contain" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Ficha Técnica</h1>
                    <p className="text-gray-500 font-medium max-w-lg mx-auto">
                        Arquitectura técnica, estado de los servicios y stack de desarrollo del ecosistema Pedilo.
                    </p>
                    <div className="pt-4 flex justify-center">
                        <a
                            href="https://github.com/thiagostilo2121/pedilo-web/blob/main/CONTRIBUTING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-3xl font-black shadow-lg shadow-orange-500/20 hover:scale-105 transition-all group"
                        >
                            <Heart size={20} className="fill-white group-hover:animate-pulse" />
                            Quiero ser parte de Pedilo
                        </a>
                    </div>
                </section>

                {/* Project Statistics Grid - Expanded to 4 columns on MD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Versión */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
                            <GitBranch size={18} />
                        </div>
                        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Versión</h3>
                        <p className="text-xl font-black text-gray-900">{pkg.version}</p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-bold">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Build: {buildDate}
                        </p>
                    </div>

                    {/* Licencia */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                            <ShieldCheck size={18} />
                        </div>
                        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Licencia</h3>
                        <p className="text-xl font-black text-gray-900">AGPL-3.0</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-bold italic">Software Libre</p>
                    </div>

                    {/* Backend Status */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                            <Database size={18} />
                        </div>
                        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Backend API</h3>
                        <p className="text-xl font-black text-gray-900">
                            {apiStatus === 'online' ? 'Conectado' : apiStatus === 'checking' ? '...' : 'Inaccesible'}
                        </p>
                        <div className="mt-1 flex items-center gap-1 font-bold italic">
                            <span className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : apiStatus === 'checking' ? 'bg-gray-300' : 'bg-red-500'}`}></span>
                            <span className={`text-[10px] ${apiStatus === 'online' ? 'text-green-500' : apiStatus === 'checking' ? 'text-gray-400' : 'text-red-500'}`}>
                                {apiStatus === 'online' ? 'Sincronizado' : apiStatus === 'checking' ? 'Verificando...' : 'Error de Link'}
                            </span>
                        </div>
                    </div>

                    {/* Environment */}
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                            <Globe size={18} />
                        </div>
                        <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Entorno</h3>
                        <p className="text-xl font-black text-gray-900">
                            {import.meta.env.PROD ? 'Cloud' : 'Local'}
                        </p>
                        <p className={`text-[10px] mt-1 font-black ${import.meta.env.PROD ? "text-green-600" : "text-orange-500"}`}>
                            {import.meta.env.PROD ? "PRODUCCIÓN" : "DESARROLLO"}
                        </p>
                    </div>
                </div>

                {/* Cloudinary & MP Check Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Multimedia</p>
                            <p className="font-bold text-gray-900">Cloudinary <span className="text-green-500 ml-1 text-xs">● Active</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <LayoutPanelTop size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pagos</p>
                            <p className="font-bold text-gray-900">Mercado Pago <span className="text-green-500 ml-1 text-xs">● Active</span></p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack List */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                            <Cpu className="text-orange-500" /> Stack Tecnológico
                        </h2>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-[9px] font-black uppercase text-gray-500 tracking-wider">
                                        {tech.category}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{tech.name}</h4>
                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Repositories & Contribution */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black leading-tight">Accedé al Código Fuente</h2>
                        <p className="text-gray-400 font-medium">
                            Pedilo es un proyecto de código abierto. Creemos en la transparencia y en compartir el conocimiento con la comunidad.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://github.com/thiagostilo2121/pedilo-web"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-2xl font-black hover:scale-105 transition-transform text-sm sm:text-base"
                            >
                                <Github size={20} /> GitHub Frontend
                            </a>
                            <a
                                href="https://github.com/thiagostilo2121/pedilo-api"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-2xl font-black hover:scale-105 border border-gray-700 transition-transform text-sm sm:text-base"
                            >
                                <Code2 size={20} /> GitHub Backend
                            </a>
                        </div>
                    </div>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-0 bg-orange-500 blur-[80px] opacity-20 rounded-full" />
                        <div className="relative bg-gray-800/50 border border-gray-700 p-6 rounded-3xl backdrop-blur-xl shrink-0">
                            <pre className="text-[10px] text-orange-300 font-mono leading-relaxed overflow-x-auto">
                                {`$ git clone https://github.com/thiagostilo2121/pedilo-web.git
$ cd pedilo-web
$ npm install
$ npm run dev`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Author Section */}
                <footer className="text-center pt-10 border-t border-gray-200">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">Desarrollado con ❤️ por</p>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-orange-500 overflow-hidden shrink-0">
                            <img src="https://github.com/thiagostilo2121.png" alt="Thiago Stilo" />
                        </div>
                        <span className="font-black text-gray-900">Thiago Stilo</span>
                        <span className="text-gray-300">|</span>
                        <a href="https://github.com/thiagostilo2121" target="_blank" className="text-orange-500 hover:scale-110 transition-transform">
                            <Globe size={18} />
                        </a>
                    </div>
                </footer>

            </div>
        </div>
    );
}

