import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Smartphone, CreditCard, UserCheck, AlertTriangle } from 'lucide-react';

const Terminos = () => {
  const secciones = [
    { id: 'servicio', titulo: 'Naturaleza del Servicio', icon: <Smartphone size={20} /> },
    { id: 'comercios', titulo: 'Cuentas de Comercio', icon: <UserCheck size={20} /> },
    { id: 'validación', titulo: 'Protocolo de WhatsApp', icon: <ShieldCheck size={20} /> },
    { id: 'pagos', titulo: 'Pagos y Suscripción', icon: <CreditCard size={20} /> },
    { id: 'responsabilidad', titulo: 'Limitación de Responsabilidad', icon: <AlertTriangle size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Simple */}
      <header className="bg-white border-b py-8 mb-10">
        <div className="max-w-5xl mx-auto px-6">
          <Link to="/" className="text-orange-600 font-bold mb-4 inline-block">← Volver a Pedilo</Link>
          <h1 className="text-4xl font-extrabold text-gray-900">Términos y Condiciones</h1>
          <p className="text-gray-500 mt-2">Última actualización: Febrero 2026</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Navegación Lateral Stickey */}
        <aside className="hidden md:block col-span-1">
          <nav className="sticky top-10 space-y-2">
            {secciones.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex items-center gap-3 p-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all"
              >
                {sec.icon}
                <span className="text-sm font-medium">{sec.titulo}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="col-span-1 md:col-span-3 prose prose-orange max-w-none text-gray-700">
          
          <section id="servicio" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">1</span> 
              Naturaleza del Servicio
            </h2>
            <p>
              <strong>Pedilo</strong> es una plataforma tecnológica (SaaS) diseñada para optimizar la toma de pedidos en comercios de cercanía. 
              Actuamos exclusivamente como facilitadores de comunicación entre el Comercio y el Cliente. 
              <strong> Importante:</strong> No somos una empresa de delivery, no poseemos flota logística y no intervenimos en la preparación de productos.
            </p>
          </section>

          <section id="comercios" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">2</span> 
              Cuentas y Gestión de Comercios
            </h2>
            <p>
              Para acceder al Dashboard, el Comercio debe registrarse con datos válidos. Cada suscripción permite la gestión de un (1) único slug comercial.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El Comercio es responsable de la carga de precios, stock e imágenes.</li>
              <li>Pedilo no verifica la veracidad de los datos del local (dirección, teléfono o legalidad del negocio).</li>
            </ul>
          </section>

          <section id="validación" className="mb-12 bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-600 text-white rounded-md">3</span> 
              Protocolo de Seguridad WhatsApp
            </h2>
            <p className="mt-4 font-semibold text-orange-900">
              Este es el punto más importante para la seguridad de tu operación:
            </p>
            <p>
              Dado que Pedilo no procesa pagos, la confirmación final del pedido depende del contacto directo vía WhatsApp. 
              <strong> El Comercio se reserva el derecho de rechazar cualquier pedido que no haya sido validado mediante un mensaje directo del Cliente.</strong> 
              Pedilo facilita un botón de acceso rápido al finalizar la orden para este fin.
            </p>
          </section>

          <section id="pagos" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">4</span> 
              Suscripción y Pagos del SaaS
            </h2>
            <p>
              El uso del servicio para Comercios tiene un costo mensual de <strong>$15.000 ARS</strong>. 
              Este pago otorga acceso al Dashboard, gestión de productos y recepción de pedidos ilimitados.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
              <p className="text-sm text-blue-800 italic">
                Nota: Pedilo NO cobra comisiones por venta. El pago es fijo por el uso de la herramienta tecnológica.
              </p>
            </div>
          </section>

          <section id="responsabilidad" className="mb-12 pb-10 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">5</span> 
              Limitación de Responsabilidad
            </h2>
            <p>
              Pedilo no se responsabiliza por:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Transacciones fallidas o falta de pago por parte de los Clientes.</li>
              <li>La calidad de los alimentos o productos entregados por el Comercio.</li>
              <li>Mal uso del slug comercial por parte de terceros.</li>
              <li>Datos incorrectos ingresados en el formulario de Checkout.</li>
            </ul>
          </section>

          <footer className="text-sm text-gray-500 italic">
            Al utilizar Pedilo, confirmas que has leído y aceptas estos términos de forma íntegra.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Terminos;