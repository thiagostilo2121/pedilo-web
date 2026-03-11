/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import apiPublic from "../api/apiPublic";

const negocioPublicService = {
    getNegocio: async (slug) => {
        const res = await apiPublic.get(`/${slug}`);
        return res.data;
    },
    
    getProductos: async (slug) => {
        const res = await apiPublic.get(`/${slug}/productos`);
        return res.data;
    },
    
    getCategorias: async (slug) => {
        const res = await apiPublic.get(`/${slug}/categorias`);
        return res.data;
    },

    getMenuCompleto: async (slug) => {
        const res = await apiPublic.get(`/${slug}/menu-completo`);
        return res.data;
    }
};

export default negocioPublicService;
