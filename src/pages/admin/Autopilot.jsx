import DashboardLayout from "../../layout/DashboardLayout";
import IntelligenceCard from "../../components/dashboard/IntelligenceCard";

export default function Autopilot() {
    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">Autopilot</h1>
                    <p className="text-gray-500 mt-1 font-bold text-sm sm:text-base">Motor de predicción y recomendación automática</p>
                </div>
                <IntelligenceCard />
            </div>
        </DashboardLayout>
    );
}
