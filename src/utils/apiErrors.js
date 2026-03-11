/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * Normalizes an Axios error into a predictable shape.
 * 
 * FastAPI errors come in various forms:
 * - { detail: "string" }
 * - { detail: [{ msg: "...", loc: [...] }] }
 * - { message: "string" }
 * 
 * This function handles all cases and returns a uniform object.
 * 
 * @param {Error} error - The Axios error object
 * @returns {{ message: string, code: number | null, field: string | null }}
 */
export function normalizeApiError(error) {
    const fallback = "Ocurrió un error inesperado. Intentá de nuevo.";

    if (!error.response) {
        // Network error or timeout
        return {
            message: "No se pudo conectar al servidor. Verificá tu conexión a internet.",
            code: null,
            field: null,
        };
    }

    const { data, status } = error.response;

    // FastAPI validation error (422)
    if (status === 422 && Array.isArray(data?.detail)) {
        const firstError = data.detail[0];
        const field = firstError?.loc?.slice(-1)[0] || null;
        const message = firstError?.msg || fallback;
        return { message, code: 422, field };
    }

    // FastAPI string detail
    if (typeof data?.detail === "string") {
        return { message: data.detail, code: status, field: null };
    }

    // Custom backend `message` field
    if (typeof data?.message === "string") {
        return { message: data.message, code: status, field: null };
    }

    return { message: fallback, code: status, field: null };
}
