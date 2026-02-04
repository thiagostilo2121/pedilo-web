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

// Default placeholder images - using local assets for reliability
export const DEFAULT_LOGO = "/images/default-logo.svg";
export const DEFAULT_PRODUCT_IMAGE = "/images/default-product.svg";
export const DEFAULT_CATEGORY_IMAGE = "/images/default-category.svg";

// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// File upload limits
export const MAX_FILE_SIZE_MB = 2;

// Refresh intervals
export const ORDERS_REFRESH_INTERVAL_MS = 15000;
export const ORDER_TRACKING_REFRESH_INTERVAL_MS = 30000;
