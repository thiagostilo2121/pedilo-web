/**
 * Centralized utility for business badges/insignias styling and metadata.
 * Consistent logic for both BusinessHero and Sticky Navbar.
 */

export const getBadgeMetadata = (badge) => {
    if (!badge || !badge.id) return null;

    const id = badge.id;
    const isFounder = id === 'FOUNDER';
    const isCertified = id === 'CERTIFICADO_1000';
    const isVeteran = id === 'VETERANO_500';
    const isTopSeller = id === 'TOP_SELLER_100' || id.includes('TOP_SELLER');
    const isVerified = id === 'VERIFICADO_50' || id.includes('VERIFICADO');

    let bgGradient = 'from-gray-400 to-gray-500';
    let shadowColor = 'shadow-gray-500/50';
    let textColor = 'text-white';
    let titleColor = 'text-white';
    let shortDesc = 'Insignia';
    let extraClasses = '';

    if (isFounder) {
        bgGradient = 'from-amber-400 to-orange-500';
        shadowColor = 'shadow-orange-500/50';
        titleColor = 'text-yellow-400';
        shortDesc = '';
        extraClasses = 'animate-pulse-slow';
    } else if (isCertified) {
        bgGradient = 'from-violet-400 to-violet-600';
        shadowColor = 'shadow-violet-500/50';
        titleColor = 'text-violet-400';
        shortDesc = '+1000 Ventas';
    } else if (isVeteran) {
        bgGradient = 'from-yellow-400 to-yellow-600';
        shadowColor = 'shadow-yellow-500/50';
        titleColor = 'text-yellow-400';
        shortDesc = '+500 Ventas';
    } else if (isTopSeller) {
        bgGradient = 'from-blue-400 to-blue-600';
        shadowColor = 'shadow-blue-500/50';
        titleColor = 'text-blue-400';
        shortDesc = '+100 Ventas';
    } else if (isVerified) {
        bgGradient = 'from-emerald-400 to-emerald-600';
        shadowColor = 'shadow-emerald-500/50';
        titleColor = 'text-emerald-400';
        shortDesc = '+50 Ventas';
    }

    return {
        id,
        name: badge.name || 'Insignia',
        description: badge.description || '',
        icon: badge.icon || 'Award',
        bgGradient,
        shadowColor,
        textColor,
        titleColor,
        shortDesc,
        extraClasses,
        fullBadgeStyle: `bg-gradient-to-br ${bgGradient} ${shadowColor} ${extraClasses}`
    };
};
