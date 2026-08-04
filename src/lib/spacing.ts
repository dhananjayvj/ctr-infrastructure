/** Consistent vertical rhythm across breakpoints */
export const sectionPy = { base: 16, sm: 20, md: 24, lg: 28 } as const;

export const sectionPyLg = { base: 20, sm: 24, md: 28, lg: 36 } as const;

export const sectionPySm = { base: 12, sm: 14, md: 16, lg: 20 } as const;

/** Fixed header height — match SiteHeader flex h */
export const HEADER_HEIGHT = { base: '72px', md: '80px' } as const;

/** Top padding for pages below fixed header */
export const pageTopPad = { base: 20, sm: 24, md: 32, lg: 36 } as const;

/** Horizontal container padding (mirrors Chakra Container) */
export const containerPx = { base: 5, sm: 6, md: 8, lg: 10 } as const;

/** Grid gaps */
export const gridGap = { base: 6, md: 8, lg: 10 } as const;

/** Stack spacing in sections */
export const stackGap = { base: 5, md: 6, lg: 8 } as const;
