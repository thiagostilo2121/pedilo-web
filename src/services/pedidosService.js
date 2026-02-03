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
