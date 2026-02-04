/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Database, Server, Shield, Globe } from 'lucide-react';

const Privacidad = () => {
  const puntosClave = [
    { id: 'recoleccion', titulo: 'Datos Recolectados', icon: <Database size={20} /> },
    { id: 'imagenes', titulo: 'Almacenamiento de Imágenes', icon: <Server size={20} /> },
    { id: 'uso', titulo: 'Uso de la Información', icon: <Eye size={20} /> },
    { id: 'seguridad', titulo: 'Protección de Datos', icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b py-8 mb-10">
        <div className="max-w-5xl mx-auto px-6">
          <Link to="/" className="text-orange-600 font-bold mb-4 inline-block">← Volver a Pedilo</Link>
          <h1 className="text-4xl font-extrabold text-gray-900">Política de Privacidad</h1>
          <p className="text-gray-500 mt-2">Cómo cuidamos la información de negocios y clientes en Pedilo.</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Nav Lateral */}
        <aside className="hidden md:block col-span-1">
          <nav className="sticky top-10 space-y-2">
            {puntosClave.map((punto) => (
              <a
                key={punto.id}
                href={`#${punto.id}`}
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all"
              >
                {punto.icon}
                <span className="text-sm font-medium">{punto.titulo}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Contenido */}
        <main className="col-span-1 md:col-span-3 prose prose-orange max-w-none text-gray-700">
          
          <section id="recoleccion" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">1. Datos que recolectamos</h2>
            <p>En <strong>Pedilo</strong> diferenciamos dos tipos de usuarios:</p>
            <ul className="list-disc pl-5">
              <li><strong>Comercios:</strong> Recolectamos correo electrónico, nombre del negocio, teléfono y datos de configuración del local necesarios para la prestación del servicio SaaS.</li>
              <li><strong>Clientes:</strong> Al realizar un pedido, se solicitan datos básicos (nombre, teléfono, dirección) que son transferidos al Comercio para procesar la orden. Pedilo no almacena estos datos con fines de marketing.</li>
            </ul>
          </section>

          <section id="imagenes" className="mb-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <Server size={24} /> 2. Almacenamiento de Archivos e Imágenes
            </h2>
            <p className="text-blue-900/80 mt-4">
              Las imágenes cargadas por el Comercio (logotipos, fotos de productos y categorías) se almacenan en <strong>servidores de terceros especializados en hosting de infraestructura</strong>. 
            </p>
            <p className="text-blue-900/80">
              Al subir contenido, el Comercio acepta que sus archivos sean alojados en estos servicios externos. Pedilo garantiza que el acceso a dichas imágenes es público únicamente para los fines de mostrar el catálogo al Cliente final.
            </p>
          </section>

          <section id="uso" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">3. Uso de la Información</h2>
            <p>La información recolectada se utiliza exclusivamente para:</p>
            <ul className="list-disc pl-5">
              <li>Permitir el funcionamiento de la plataforma de pedidos.</li>
              <li>Facilitar la comunicación directa vía WhatsApp entre Cliente y Comercio.</li>
              <li>Gestionar el cobro de la suscripción mensual del servicio SaaS.</li>
            </ul>
          </section>

          <section id="seguridad" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">4. Seguridad</h2>
            <p>
              Implementamos medidas técnicas para proteger la integridad de los datos en nuestro Dashboard. Sin embargo, al ser un servicio que conecta con WhatsApp (una aplicación externa), Pedilo no se responsabiliza por la seguridad de los datos una vez que la conversación se traslada fuera de nuestra plataforma.
            </p>
          </section>

          <section id="cookies" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900">5. Enlaces a Terceros</h2>
            <p>
              Nuestra web contiene enlaces a servicios externos (WhatsApp, plataformas de pago externas del negocio, servicios de hosting). No tenemos control sobre las políticas de privacidad de dichos sitios y recomendamos leer sus propios términos.
            </p>
          </section>

          <footer className="text-sm text-gray-500 border-t pt-6">
            Para dudas sobre tus datos, contáctanos a través de nuestro canal de soporte oficial.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Privacidad;