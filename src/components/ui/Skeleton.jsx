import React from "react";

export default function Skeleton({ className, ...props }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] rounded-2xl ${className}`}
            style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            {...props}
        />
    );
}
