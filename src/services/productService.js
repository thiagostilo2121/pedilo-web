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
    }
};

export default productService;
