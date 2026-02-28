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

import api from "../api/api";

/**
 * Obtiene la URL de checkout de Mercado Pago para suscribirse.
 * El usuario debe estar autenticado.
 * 
 * @returns {Promise<{url: string|null, has_subscription: boolean, message?: string}>}
 */
export async function getCheckoutUrl(plan = "pro") {
    const res = await api.get(`/suscripcion/checkout-url?plan=${plan}`);
    return res.data;
}

/**
 * Obtiene la suscripción del usuario autenticado.
 * 
 * @returns {Promise<object|null>} Datos de la suscripción o null si no tiene
 */
export async function getMiSuscripcion() {
    const res = await api.get("/suscripcion");
    return res.data;
}
