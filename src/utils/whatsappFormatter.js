export const templates = {
    checkout: "\u00A1Hola *{nombre_negocio}*! \uD83D\uDC4B Acabo de realizar un pedido.\n\n\uD83D\uDD16 *C\u00F3digo:* {pedido_codigo}\n\uD83D\uDC64 *Cliente:* {nombre_cliente}\n\n\uD83D\uDED2 *Detalle:*\n{detalle_productos}\n\n\uD83D\uDCB3 *Pago:* {metodo_pago}\n\uD83D\uDEF5 *Entrega:* {tipo_entrega}\n{direccion_opcional}\n{notas_opcionales}\n\n\uD83D\uDCB0 *TOTAL: ${total}*",
    pedidos: "\u00A1Hola {nombre_cliente}! \uD83C\uDF7D\uFE0F\n\nEstado de tu pedido *#{pedido_codigo}*:\n{estado_texto}",
    estados: {
        pendiente: "\u23F3 Recibido, esperando confirmaci\u00F3n.",
        aceptado: "\u2705 \u00A1Aceptado! Estamos prepar\u00E1ndolo.",
        en_progreso: "\uD83C\uDF73 \u00A1En la cocina!",
        finalizado: "\uD83D\uDE80 \u00A1Listo para disfrutar!"
    }
};

/**
 * Reemplaza los placeholders {key} en un string con los valores de un objeto
 */
const formatMessage = (template, data) => {
    return template.replace(/{(\w+)}/g, (match, key) => {
        return data[key] !== undefined ? data[key] : "";
    });
};

export const getCheckoutMessage = (negocio, pedido) => {
    const itemsStr = pedido.items.map(item => {
        const toppingsSuffix = item.toppings_seleccionados?.length > 0
            ? ` (${item.toppings_seleccionados.map(t => t.nombre).join(", ")})`
            : "";
        return `\u2022 ${item.cantidad}x ${item.nombre_producto}${toppingsSuffix}`;
    }).join("\n");

    const data = {
        nombre_negocio: negocio.nombre,
        pedido_codigo: pedido.codigo,
        nombre_cliente: pedido.nombre_cliente,
        detalle_productos: itemsStr,
        metodo_pago: pedido.metodo_pago,
        tipo_entrega: pedido.tipo_entrega,
        direccion_opcional: (pedido.direccion_entrega || pedido.direccion) ? `\uD83D\uDCCD *Direcci\u00F3n:* ${pedido.direccion_entrega || pedido.direccion}` : "",
        notas_opcionales: pedido.notas ? `\uD83D\uDCDD *Notas:* ${pedido.notas}` : "",
        total: pedido.total
    };

    return formatMessage(templates.checkout, data).replace(/\n\n\n/g, "\n\n").trim();
};

export const getStatusUpdateMessage = (pedido) => {
    const data = {
        nombre_cliente: pedido.nombre_cliente,
        pedido_codigo: pedido.codigo || pedido.id,
        estado_texto: templates.estados[pedido.estado] || pedido.estado
    };

    return formatMessage(templates.pedidos, data);
};

/**
 * Genera la URL de WhatsApp de forma segura usando URLSearchParams
 */
export const BuildWhatsAppUrl = (phone, message) => {
    const baseUrl = "https://api.whatsapp.com/send";
    const params = new URLSearchParams();
    params.set("phone", phone.replace(/\D/g, ""));
    params.set("text", message);
    return `${baseUrl}?${params.toString()}`;
};
