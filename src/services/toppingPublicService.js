/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import apiPublic from "../api/apiPublic";

const toppingPublicService = {
    getProductoToppings: async (slug, productoId) => {
        const res = await apiPublic.get(`/${slug}/productos/${productoId}/toppings`);
        return res.data;
    }
};

export default toppingPublicService;
