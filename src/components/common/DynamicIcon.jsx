/*
 * Copyright (C) 2026 Thiago Valentín Stilo Limarino
 */

import * as LucideIcons from "lucide-react";

export default function DynamicIcon({ name, ...props }) {
    const IconComponent = LucideIcons[name] || LucideIcons.Star; // Fallback to Star if not found

    if (!IconComponent) return null;

    return <IconComponent {...props} />;
}
