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

    getPeakHours: async (days = 7) => {
        const response = await api.get(`/stats/hourly-sales?days=${days}`);
        return response.data;
    },

    getWeeklyHeatmap: async (days = 30) => {
        const response = await api.get(`/stats/heatmap?days=${days}`);
        return response.data;
    },

    getProductInsights: async (days = 30) => {
        const response = await api.get(`/stats/product-insights?days=${days}`);
        return response.data;
    }
};
