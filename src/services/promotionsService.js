import api from '../api/api';

export const promotionsService = {
    getAll: async () => {
        const response = await api.get('/promociones');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/promociones', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.patch(`/promociones/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/promociones/${id}`);
        return response.data;
    }
};
