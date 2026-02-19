
import apiPublic from "../api/apiPublic";

export const getDemoStats = async () => {
    try {
        // apiPublic base URL is likely /api/public, so we append /stats/demo
        const response = await apiPublic.get('/stats/demo');
        return response.data;
    } catch (error) {
        console.error("Error fetching demo stats:", error);
        // Fallback to static data if API fails to avoid breaking Landing Page
        return {
            ventas: 1517800,
            pedidos: 145,
            ticket_promedio: 10467,
            desde: "2026-02-03",
            hasta: new Date().toISOString()
        };
    }
};
