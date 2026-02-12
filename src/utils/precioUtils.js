/**
 * Calculates the effective unit price for a cart item,
 * considering wholesale pricing for distribuidoras.
 *
 * Wholesale price applies when:
 * - The product has precio_mayorista and cantidad_mayorista set
 * - The cart quantity >= cantidad_mayorista
 *
 * For items with toppings, the topping surcharge is added on top.
 */
export function calcularPrecioEfectivo(item) {
    const basePrice = item.precio;
    const hasWholesale = item.precio_mayorista && item.cantidad_mayorista;
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
 * Calculates the total for a cart array, using wholesale pricing when applicable.
 */
export function calcularTotalCarrito(carrito) {
    return carrito.reduce((acc, item) => acc + calcularPrecioEfectivo(item) * item.cantidad, 0);
}
