import api from '../api/api';

export const statsService = {
    getOverview: async () => {
        const response = await api.get('/stats/overview');
        return response.data;
    },

    getSalesChart: async (days = 7) => {
        const response = await api.get(`/stats/sales-chart?days=${days}`);
        return response.data;
    },

    getTopProducts: async (limit = 5) => {
        const response = await api.get(`/stats/top-products?limit=${limit}`);
        return response.data;
    },

    getTopClients: async (limit = 5) => {
        const response = await api.get(`/stats/clients?limit=${limit}`);
        return response.data;
    },

    getPeakHours: async () => {
        const response = await api.get('/stats/hourly-sales');
        return response.data;
    }
};
