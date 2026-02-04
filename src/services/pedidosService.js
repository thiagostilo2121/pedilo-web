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
import apiPublic from "../api/apiPublic";

const pedidosService = {
    // --- Dashboard (Privado) ---
    getAll: async (limit = 40) => {
        const response = await api.get(`/pedidos?limit=${limit}`);
        return response.data;
    },

    updateEstado: async (id, accion) => {
        // El backend espera endpoints de acción: /pedidos/:id/aceptar, /pedidos/:id/rechazar, etc.
        const response = await api.patch(`/pedidos/${id}/${accion}`);
        return response.data;
    },

    // --- Público (Clientes) ---
    getByCode: async (slug, codigo) => {
        const response = await apiPublic.get(`/${slug}/pedidos/${codigo}`);
        return response.data;
    },

    create: async (slug, orderData) => {
        const response = await apiPublic.post(`/${slug}/pedidos`, orderData);
        return response.data;
    }
};

export default pedidosService;
