import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    Award, 
    ShieldCheck, 
    Star, 
    Trophy, 
    Gem,
    TrendingUp,
    Store,
    CheckCircle2,
    Users
} from 'lucide-react';
import DynamicIcon from '../../components/common/DynamicIcon';
import { getBadgeMetadata } from '../../utils/badgeUtils';

export default function Insignias() {
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = "Sistema de Insignias | Pedilo";
        window.scrollTo(0, 0);
    }, []);

    const levels = [
        {
            id: 'CERTIFICADO_1000',
            req: 'Negocios con más de 1000 pedidos completados con éxito.',
            perk: 'Máximo nivel de confianza y excelente servicio garantizado.'
        },
        {
            id: 'VETERANO_500',
            req: 'Negocios con más de 500 pedidos completados.',
            perk: 'Reconocimiento como pilar de la comunidad Pedilo.'
        },
        {
            id: 'TOP_SELLER_100',
            req: 'Negocios que han superado las 100 ventas.',
            perk: 'Sello de popularidad y buen servicio garantizado.'
        },
        {
            id: 'VERIFICADO_50',
            req: 'Identidad validada y primeras 50 ventas exitosas.',
            perk: 'Garantía de que es un negocio real y activo.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            {/* Mini Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-bold transition-colors"
                    >
                        <ChevronLeft size={20} /> Volver
                    </button>
                    <span className="text-xl font-black text-gray-900">Pedilo<span className="text-orange-600">.</span></span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto space-y-16">
                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <div className="inline-flex p-4 rounded-full bg-orange-100 text-orange-600 mb-2">
                        <Award size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Nuestro Sistema de <span className="text-orange-600">Insignias</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        En Pedilo, la confianza es nuestra prioridad. Cada insignia representa un hito real en la trayectoria y el compromiso de cada negocio.
                    </p>
                </section>

                {/* Badges Catalog */}
                <div className="grid grid-cols-1 gap-6">
                    {levels.map((level) => {
                        const meta = getBadgeMetadata({ id: level.id, name: level.name, description: level.description });
                        if (!meta) return null;

                        return (
                            <div 
                                key={level.id}
                                className="group bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center md:items-start gap-8"
                            >
                                {/* Badge Preview */}
                                <div className="shrink-0 scale-125 md:scale-[1.5] py-6 lg:mr-4">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-md ${meta.fullBadgeStyle}`}>
                                        <DynamicIcon name={meta.icon} size={18} className="text-white" />
                                        <span className="text-[12px] font-bold text-white whitespace-nowrap">
                                            {meta.shortDesc || (level.id === 'FOUNDER' ? 'FUNDADOR' : '')}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <h3 className={`text-2xl font-black ${meta.titleColor.replace('text-', 'text-opacity-100 text-') || 'text-gray-900'}`}>
                                            {meta.name}
                                        </h3>
                                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                                            Nivel de Certificación
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 justify-center md:justify-start">
                                                <TrendingUp size={12} /> Requerimiento
                                            </p>
                                            <p className="text-sm font-bold text-gray-700">{level.req}</p>
                                        </div>
                                        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 flex items-center gap-1.5 justify-center md:justify-start">
                                                <Star size={12} fill="currentColor" /> Beneficio Visual
                                            </p>
                                            <p className="text-sm font-bold text-gray-700">{level.perk}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Footer Section */}
                <section className="bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white border border-gray-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShieldCheck size={160} />
                    </div>
                    
                    <div className="relative z-10 space-y-8">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-3xl font-black">Transparencia Total</h2>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                Estas insignias se otorgan de forma automática basándose en datos reales procesados por nuestra plataforma. No se pueden comprar; se ganan con esfuerzo, responsabilidad y excelente atención al cliente.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-xl text-orange-500">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Datos Reales</h4>
                                    <p className="text-xs text-gray-500">Basado en transacciones exitosas.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-xl text-violet-500">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Actualización</h4>
                                    <p className="text-xs text-gray-500">El sistema recalcula los niveles a diario.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/10 rounded-xl text-emerald-500">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Comunidad</h4>
                                    <p className="text-xs text-gray-500">Respaldo de miles de usuarios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-center pt-10">
                    <p className="text-gray-400 text-sm font-medium">
                        ¿Sos dueño de un negocio? <span className="text-orange-600 font-black cursor-pointer hover:underline" onClick={() => navigate('/crear-negocio')}>Empezá hoy</span> a construir tu reputación.
                    </p>
                </footer>
            </div>
        </div>
    );
}
