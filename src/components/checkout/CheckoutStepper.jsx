import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
    { id: 1, name: 'Datos' },
    { id: 2, name: 'Pago' },
    { id: 3, name: 'Entrega' },
];

export default function CheckoutStepper({ currentStep, colorPrimario }) {
    const color = colorPrimario || '#ea580c';
    const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="w-full max-w-xs mx-auto mb-10 select-none">
            {/* Contenedor con posición relativa para la línea */}
            <div className="relative flex items-center justify-between">
                
                {/* Línea base gris — corre entre el primer y último ícono */}
                <div
                    className="absolute top-4 left-4 right-4 h-1 bg-gray-100 rounded-full"
                    style={{ zIndex: 0 }}
                />
                
                {/* Línea progreso de color */}
                <div
                    className="absolute top-4 left-4 h-1 rounded-full transition-all duration-500 ease-in-out"
                    style={{
                        zIndex: 0,
                        width: `calc((100% - 2rem) * ${progressPercent / 100})`,
                        backgroundColor: color,
                    }}
                />

                {/* Íconos */}
                {STEPS.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-1.5">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300
                                    ${isCompleted || isCurrent
                                        ? 'text-white border-transparent shadow-md'
                                        : 'bg-white text-gray-300 border-gray-200'
                                    }
                                    ${isCurrent ? 'scale-110 ring-4 ring-orange-100 dark:ring-white/10' : ''}
                                `}
                                style={{
                                    backgroundColor: isCompleted || isCurrent ? color : undefined,
                                    boxShadow: isCurrent ? `0 0 0 4px ${color}25` : undefined,
                                }}
                            >
                                {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
                            </div>
                            <span
                                className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300
                                    ${isCurrent ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}
                                `}
                            >
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
