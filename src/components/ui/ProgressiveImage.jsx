import { useState } from "react";

const ProgressiveImage = ({ src, alt, className, style }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <img
                src={src}
                alt={alt}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 will-change-transform ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"
                    }`}
                onLoad={() => setLoaded(true)}
                loading="lazy"
            />
            {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        </div>
    );
};

export default ProgressiveImage;
