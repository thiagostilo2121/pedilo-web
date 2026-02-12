/**
 * Calculates the effective unit price for a cart item,
 * considering wholesale pricing ONLY for distribuidoras.
 */
export function calcularPrecioEfectivo(item, negocio) {
    const basePrice = item.precio;
    const isDistribuidora = negocio?.tipo_negocio === "distribuidora";

    // Wholesale Logic
    const hasWholesale = isDistribuidora && item.precio_mayorista && item.cantidad_mayorista;
    const qualifiesForWholesale = hasWholesale && item.cantidad >= item.cantidad_mayorista;

    const effectiveBasePrice = qualifiesForWholesale ? item.precio_mayorista : basePrice;

    // If precioConToppings exists, it was calculated as precio + toppingSurcharge
    // We need to recalculate using the effective base price
    if (item.precioConToppings && item.toppings?.length > 0) {
        const toppingSurcharge = item.precioConToppings - item.precio;
        return effectiveBasePrice + toppingSurcharge;
    }

    return effectiveBasePrice;
}

/**
 * Calculates the total for a cart array, using wholesale pricing when applicable (only for distribuidoras).
 */
export function calcularTotalCarrito(carrito, negocio) {
    return carrito.reduce((acc, item) => acc + calcularPrecioEfectivo(item, negocio) * item.cantidad, 0);
}
