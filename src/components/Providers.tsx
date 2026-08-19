'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Manrope', -apple-system, BlinkMacSystemFont, sans-serif`,
    body: `'Manrope', -apple-system, BlinkMacSystemFont, sans-serif`,
  },
  fontSizes: {
    'display-xl': 'clamp(4rem, 9vw, 7rem)',
    'display-lg': 'clamp(2.5rem, 5vw, 4.25rem)',
    'display-md': 'clamp(1.875rem, 3vw, 2.75rem)',
  },
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e3a8a',
      900: '#172554',
    },
    accent: {
      red: '#2563eb',
    },
    dark: {
      50: '#f8fafc',
      100: '#e2e8f0',
      200: '#cbd5e1',
      300: '#94a3b8',
      400: '#64748b',
      500: '#334155',
      600: '#1e293b',
      700: '#131c2d',
      800: '#0b1322',
      900: '#060b13',
    },
    surface: {
      100: 'rgba(15, 23, 42, 0.48)',
      200: 'rgba(15, 23, 42, 0.72)',
      300: 'rgba(15, 23, 42, 0.88)',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'dark.900',
        color: 'dark.50',
      },
      '*': {
        scrollBehavior: 'smooth',
      },
      '::selection': {
        bg: 'brand.500',
        color: 'dark.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: '0',
        letterSpacing: '0.01em',
        textTransform: 'none',
        fontSize: 'sm',
        transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-brand-500)',
        },
        _active: {
          transform: 'translateY(1px)',
        },
      },
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'whiteAlpha.300',
          color: 'dark.50',
          bg: 'surface.100',
          _hover: {
            bg: 'surface.200',
            borderColor: 'brand.400',
          },
        },
        ghost: {
          color: 'dark.100',
          _hover: {
            bg: 'whiteAlpha.100',
            color: 'dark.50',
          },
        },
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.400',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '500',
        letterSpacing: '-0.035em',
        color: 'dark.50',
        textWrap: 'balance',
      },
    },
    Text: {
      variants: {
        eyebrow: {
          fontSize: 'xs',
          fontWeight: '700',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'brand.300',
        },
        lead: {
          fontSize: { base: 'md', md: 'xl' },
          fontWeight: '400',
          lineHeight: '1.75',
          color: 'dark.100',
          maxW: '42rem',
        },
        body: {
          fontSize: 'md',
          fontWeight: '400',
          lineHeight: '1.75',
          color: 'dark.100',
          maxW: '42rem',
        },
        caption: {
          fontSize: 'sm',
          fontWeight: '500',
          letterSpacing: '0.03em',
          color: 'dark.200',
        },
        stat: {
          fontSize: { base: '3xl', md: '4xl' },
          fontWeight: '600',
          color: 'dark.50',
          fontVariantNumeric: 'tabular-nums',
        },
        date: {
          fontSize: 'xs',
          fontWeight: '600',
          color: 'dark.200',
          sx: { fontVariantNumeric: 'tabular-nums' },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: '1440px',
        px: { base: 4, sm: 6, md: 8, lg: 12 },
      },
    },
    Link: {
      baseStyle: {
        transition: 'color 0.35s, opacity 0.35s',
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-brand-500)',
          outline: 'none',
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
