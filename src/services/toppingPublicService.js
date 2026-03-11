/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import apiPublic from "../api/apiPublic";

const toppingPublicService = {
    getProductoToppings: async (slug, productoId) => {
        const res = await apiPublic.get(`/${slug}/productos/${productoId}/toppings`);
        return res.data;
    },
    getBulkProductoToppings: async (slug, productIds) => {
        if (!productIds || productIds.length === 0) return {};
        const res = await apiPublic.get(`/${slug}/toppings/bulk?product_ids=${productIds.join(',')}`);
        return res.data;
    }
};

export default toppingPublicService;
