import { useState } from "react";

const ProgressiveImage = ({ src, alt, className, style, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-white/5 ${className}`} style={style}>
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-110"
                    }`}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                {...props}
            />
            {!loaded && <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 animate-pulse z-10" />}
        </div>
    );
};

export default ProgressiveImage;
