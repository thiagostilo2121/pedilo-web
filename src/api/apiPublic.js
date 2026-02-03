import axios from "axios";

// Cliente API para endpoints públicos (sin autenticación)
const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_API_PUBLIC_URL,
});

export default apiPublic;
