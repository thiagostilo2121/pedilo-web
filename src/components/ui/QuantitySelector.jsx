import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector(props) {
    const {
        initialValue = 0,
        min = 0,
        max = 9999,
        step = 1,
        onChange,
        onConfirm,
        disabled = false,
        compact = false,
        color = '#ea580c',
        onIncrement,
        onDecrement
    } = props;
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setValue(initialValue);
        }
    }, [initialValue, isEditing]);

    const handleChange = (e) => {
        const val = e.target.value;
        // Allow empty string for better UX while typing
        if (val === '') {
            setValue('');
            return;
        }
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed)) {
            setValue(parsed);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        let finalVal = typeof value === 'number' ? value : 0;

        // Clamp
        if (finalVal < min) finalVal = min;
        if (finalVal > max) finalVal = max;

        setValue(finalVal);
        if (finalVal !== initialValue && onConfirm) {
            onConfirm(finalVal);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    const increment = (e) => {
        e.stopPropagation();
        if (onIncrement) {
            onIncrement();
            return;
        }

        const currentVal = typeof value === 'number' ? value : 0;
        const maxVal = Number(max);
        const stepVal = Number(step);

        if (currentVal >= maxVal) return;

        const newVal = Math.min(currentVal + stepVal, maxVal);
        setValue(newVal);
        if (onConfirm) onConfirm(newVal);
    };

    const decrement = (e) => {
        e.stopPropagation();
        if (onDecrement) {
            onDecrement();
            return;
        }

        const currentVal = typeof value === 'number' ? value : 0;
        const minVal = Number(min);
        const stepVal = Number(step);

        if (currentVal <= minVal) return;

        const newVal = Math.max(currentVal - stepVal, minVal);
        setValue(newVal);
        if (onConfirm) onConfirm(newVal);
    };

    // Increase touch target size
    const sizeClass = compact ? 'w-8 h-8' : 'w-10 h-10'; // Bigger buttons
    const iconSize = compact ? 16 : 18;
    const textSize = compact ? 'text-sm' : 'text-base';

    // Safety check for disabled state
    const isAtMin = (typeof value === 'number' ? value : 0) <= min;
    const isAtMax = (typeof value === 'number' ? value : 0) >= max;

    return (
        <div
            className={`flex items-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm overflow-hidden ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={e => e.stopPropagation()}
        >
            <button
                onClick={decrement}
                disabled={isAtMin}
                className={`${sizeClass} flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors border-r border-gray-100 touch-manipulation`}
                type="button"
            >
                <Minus size={iconSize} />
            </button>

            <div className="relative">
                <input
                    type="number"
                    value={value === '' ? '' : Number(value)}
                    min={typeof min === 'number' ? min : 0}
                    max={typeof max === 'number' ? max : 9999}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsEditing(true)}
                    className={`w-12 text-center font-bold text-gray-900 outline-none bg-transparent appearance-none m-0 ${textSize} ${isEditing ? 'bg-white z-10' : ''}`}
                    style={{
                        MozAppearance: 'textfield'
                    }}
                />
                {/* Hide spinner for webkit */}
                <style>{`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
        `}</style>
            </div>

            <button
                onClick={increment}
                disabled={isAtMax}
                className={`${sizeClass} flex items-center justify-center text-white hover:brightness-110 active:brightness-90 transition-colors border-l border-gray-100`}
                style={{ backgroundColor: color }}
                type="button"
            >
                <Plus size={iconSize} />
            </button>
        </div>
    );
}
