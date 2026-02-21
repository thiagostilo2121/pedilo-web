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
import { ShieldCheck, Smartphone, CreditCard, UserCheck, AlertTriangle } from 'lucide-react';

const Terminos = () => {
  React.useEffect(() => {
    document.title = "Términos y Condiciones | Pedilo";
  }, []);

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
              <strong>Pedilo</strong> es una plataforma tecnológica (SaaS) diseñada para optimizar la toma de pedidos y proveer inteligencia de negocio a comercios de cercanía y mayoristas.
              Actuamos exclusivamente como proveedores de software y facilitadores tecnológicos entre el Comercio y el Cliente final.
              <strong> Importante:</strong> No somos una empresa de delivery, no poseemos flota logística, no procesamos pagos de comensales y no intervenimos en la preparación de productos.
            </p>
          </section>

          <section id="comercios" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">2</span>
              Cuentas, Gestión y Modos de Venta
            </h2>
            <p>
              Para acceder al Dashboard, el Comercio debe registrarse con datos válidos. Cada suscripción permite la gestión de un (1) único slug comercial. Al configurar su negocio, el local acepta las siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Datos y Catálogo:</strong> El Comercio es enteramente responsable de la carga de precios, stock, imágenes y descripciones. Pedilo no audita ni verifica la legalidad o veracidad de los datos del local.</li>
              <li><strong>Propiedad de Clientes:</strong> Pedilo reconoce explícitamente que los clientes finales que compran a través del sistema son clientes del Comercio, no de Pedilo. Los datos generados pertenecen al negocio titular.</li>
              <li><strong>Modo Mayorista:</strong> Si el Comercio opera como "Distribuidora", es el único responsable de configurar y hacer cumplir los montos mínimos de compra y los precios por volumen. Pedilo solo provee la herramienta técnica para limitar la continuación del pedido si no se alcanza dicho mínimo.</li>
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
              El uso del servicio para Comercios tiene un costo mensual fijo o anual acorde a las tarifas vigentes publicadas en nuestra sección de <Link to="/planes" className="text-orange-600 underline">Planes</Link>.
              Pedilo se reserva el derecho de modificar estas tarifas, notificando a los usuarios con 30 días de antelación.
              Este pago otorga acceso total e irrestricto al Dashboard, Tablero de Control de estadísticas (Business Intelligence), gestión de catálogo y recepción ilimitada de pedidos.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
              <p className="text-sm font-bold text-green-900">
                Garantía de 0% Comisión:
              </p>
              <p className="text-sm text-green-800 mt-1">
                Pedilo NO cobra ni cobrará jamás comisiones por pedido, ni retenciones sobre las ventas. El 100% de la facturación generada a través de la plataforma le pertenece directamente al Comercio.
              </p>
            </div>
          </section>

          <section id="prohibiciones" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">5</span>
              Política de Uso Aceptable
            </h2>
            <p>
              Queda estrictamente prohibido utilizar Pedilo para la venta de:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Sustancias ilegales, drogas o narcóticos.</li>
              <li>Armas de fuego, explosivos o municiones.</li>
              <li>Productos falsificados o que infrinjan derechos de propiedad intelectual.</li>
              <li>Cualquier otro bien o servicio que viole las leyes de la República Argentina.</li>
            </ul>
            <p className="mt-4 text-red-600 font-bold">
              Pedilo se reserva el derecho de suspender inmediatamente cualquier cuenta que viole esta política sin derecho a reembolso.
            </p>
          </section>

          <section id="cancelacion" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">6</span>
              Cancelación de Suscripción
            </h2>
            <p>
              El Comercio puede cancelar su suscripción en cualquier momento desde su panel de control.
              La cancelación detendrá los cobros futuros, pero el servicio permanecerá activo hasta el final del período ya abonado.
              No se realizan reembolsos parciales por meses no utilizados.
            </p>
          </section>

          <section id="responsabilidad" className="mb-12 pb-10 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-md">7</span>
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