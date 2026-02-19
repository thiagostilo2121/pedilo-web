/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import api from "../api/api";

const adminService = {
    // Platform Stats
    getStats: async () => {
        const response = await api.get("/admin/stats");
        return response.data;
    },

    // Cache Management
    clearCache: async () => {
        const response = await api.post("/admin/cache/clear");
        return response.data;
    },

    // User Management
    getUsers: async (page = 0, limit = 20, search = "") => {
        const params = { skip: page * limit, limit };
        if (search) params.buscar = search;
        const response = await api.get("/admin/users", { params });
        return response.data;
    },

    togglePremium: async (userId) => {
        const response = await api.post(`/admin/users/${userId}/toggle-premium`);
        return response.data;
    },

    // Negocio & Badge Management
    getNegocios: async (page = 0, limit = 20, search = "") => {
        const params = { skip: page * limit, limit };
        if (search) params.buscar = search;
        const response = await api.get("/admin/negocios", { params });
        return response.data;
    },

    getBadgeDefinitions: async () => {
        const response = await api.get("/admin/badges/definitions");
        return response.data;
    },

    assignBadge: async (negocioId, badgeId) => {
        const response = await api.post(`/admin/negocios/${negocioId}/badges`, { badge_id: badgeId });
        return response.data;
    },

    removeBadge: async (negocioId, badgeId) => {
        const response = await api.delete(`/admin/negocios/${negocioId}/badges/${badgeId}`);
        return response.data;
    },

    // Bootstrap (One time use)
    startBootstrap: async (secret) => {
        const response = await api.post("/admin/bootstrap", { admin_secret: secret });
        return response.data;
    }
};

export default adminService;
