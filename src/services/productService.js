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

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const productService = {
    // --- API Methods ---
    getAll: async () => {
        const res = await api.get("/productos");
        return res.data;
    },

    getAllCategories: async () => {
        const res = await api.get("/categorias");
        return res.data;
    },

    create: async (producto) => {
        const res = await api.post("/productos", producto);
        return res.data;
    },

    update: async (id, producto) => {
        const res = await api.put(`/productos/${id}`, producto);
        return res.data;
    },

    delete: async (id) => {
        await api.delete(`/productos/${id}`);
    },

    // --- Cloudinary Helper ---
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!res.ok) throw new Error("Error al subir imagen");
        const data = await res.json();
        return data.secure_url;
    },

        // --- Toppings API ---
    getGruposToppings: async () => {
        const res = await api.get("/grupos-topping");
        return res.data;
    },

    createGrupoTopping: async (data) => {
        const res = await api.post("/grupos-topping", data);
        return res.data;
    },

    updateGrupoTopping: async (id, data) => {
        const res = await api.put(`/grupos-topping/${id}`, data);
        return res.data;
    },

    deleteGrupoTopping: async (id) => {
        await api.delete(`/grupos-topping/${id}`);
    },

    // --- Producto-Topping Config ---
    getProductoToppings: async (productoId) => {
        const res = await api.get(`/productos/${productoId}/toppings/`);
        return res.data;
    },

    configurarProductoToppings: async (productoId, configs) => {
        const res = await api.put(`/productos/${productoId}/toppings/`, configs);
        return res.data;
    }
};

export default productService;
