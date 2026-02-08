/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import api from "../api/api";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const MAX_FILE_SIZE_MB = 2;

const negocioService = {
    getMiNegocio: async () => {
        const res = await api.get("/negocios/me");
        return res.data;
    },

    updateMiNegocio: async (data) => {
        const res = await api.put("/negocios/me", data);
        return res.data;
    },

    uploadImage: async (file) => {
        if (!file) throw new Error("No hay archivo");
        if (!file.type.startsWith("image/")) throw new Error("El archivo no es una imagen válida");
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) throw new Error("La imagen supera los 2MB");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Error al subir la imagen");
        const data = await res.json();
        if (!data.secure_url) throw new Error("Respuesta inválida de Cloudinary");
        return data.secure_url;
    }
};

export default negocioService;
