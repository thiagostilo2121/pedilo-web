/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Github,
    Code2,
    Cpu,
    Globe,
    ShieldCheck,
    GitBranch,
    ChevronLeft
} from 'lucide-react';
import { DEFAULT_LOGO } from '../constants';
import pkg from '../../package.json';

export default function About() {
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Ficha Técnica | Pedilo";
    }, []);

    const techStack = [
        { name: "React 19", category: "Core", description: "Biblioteca principal para la interfaz." },
        { name: "Vite 7", category: "Build Tool", description: "Entorno de desarrollo ultra rápido." },
        { name: "Tailwind CSS 4", category: "Styles", description: "Framework de diseño moderno." },
        { name: "Lucide React", category: "Icons", description: "Set de iconos limpios y consistentes." },
        { name: "Axios", category: "Network", description: "Gestión de peticiones HTTP." },
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
                        Detalles internos y stack tecnológico que hace posible la experiencia de Pedilo.
                    </p>
                </section>

                {/* Project Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                            <GitBranch size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Versión</h3>
                        <p className="text-2xl font-black text-orange-600">{pkg.version}</p>
                        <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider underline decoration-orange-300">Rama Estable</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Licencia</h3>
                        <p className="text-xl font-black text-gray-800">AGPL-3.0</p>
                        <p className="text-xs text-gray-400 mt-1">Open Source & Libre</p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                            <Globe size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Estado</h3>
                        <p className="text-xl font-black text-gray-800">Producción</p>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1 font-bold italic">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                        </p>
                    </div>
                </div>

                {/* Tech Stack List */}
                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                            <Cpu className="text-orange-500" /> Stack Tecnológico
                        </h2>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                        {tech.category}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{tech.name}</h4>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">{tech.description}</p>
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
