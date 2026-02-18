import React, { useEffect, useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector(props) {
    const {
        initialValue = 0,
        min = 0,
        max = 9999,
        onConfirm,
        disabled = false,
        compact = false,
        color = '#ea580c'
    } = props;

    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);

    // Sync with props when not editing
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const commitChange = (newValue) => {
        let finalVal = parseInt(newValue, 10);
        if (isNaN(finalVal)) finalVal = min;

        if (finalVal < min) finalVal = min;
        if (finalVal > max) finalVal = max;

        setValue(finalVal);
        if (onConfirm) onConfirm(finalVal);
    };

    const handleBlur = (e) => {
        commitChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    const increment = (e) => {
        e.stopPropagation();
        if (props.onIncrement) {
            props.onIncrement();
            return;
        }
        const current = parseInt(value, 10) || min;
        if (current < max) {
            const newVal = current + 1;
            setValue(newVal);
            if (onConfirm) onConfirm(newVal);
        }
    };

    const decrement = (e) => {
        e.stopPropagation();
        if (props.onDecrement) {
            props.onDecrement();
            return;
        }
        const current = parseInt(value, 10) || min;
        if (current > min) {
            const newVal = current - 1;
            setValue(newVal);
            if (onConfirm) onConfirm(newVal);
        }
    };

    // Responsive Sizes
    const btnSize = compact ? 'w-8 h-8' : 'w-10 h-10';
    const iconSize = compact ? 16 : 18;
    const inputWidth = compact ? 'w-8 text-sm' : 'w-12 text-base';

    return (
        <div
            className={`flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden select-none ${disabled ? 'opacity-50 pointer-events-none grayscale' : ''}`}
            onClick={e => e.stopPropagation()}
        >
            <button
                type="button"
                onClick={decrement}
                disabled={value <= min}
                className={`${btnSize} flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-100 disabled:opacity-30`}
            >
                <Minus size={iconSize} strokeWidth={2.5} />
            </button>

            <div className={`relative h-full flex items-center justify-center bg-white ${inputWidth}`}>
                <input
                    ref={inputRef}
                    type="tel" // Better numeric keyboard on mobile
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full text-center font-bold text-gray-900 bg-transparent outline-none p-0 appearance-none m-0"
                    style={{ MozAppearance: 'textfield' }}
                />
            </div>

            <button
                type="button"
                onClick={increment}
                disabled={value >= max}
                className={`${btnSize} flex items-center justify-center text-white hover:brightness-110 active:brightness-90 transition-colors border-l border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: color }}
            >
                <Plus size={iconSize} strokeWidth={2.5} />
            </button>

            <style>{`
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
            `}</style>
        </div>
    );
}
