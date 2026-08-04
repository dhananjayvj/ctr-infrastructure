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
    heading: `'Cormorant Garamond', Georgia, serif`,
    body: `'Outfit', -apple-system, BlinkMacSystemFont, sans-serif`,
  },
  fontSizes: {
    'display-xl': 'clamp(3.25rem, 7vw, 6.5rem)',
    'display-lg': 'clamp(2.5rem, 5vw, 4.5rem)',
    'display-md': 'clamp(2rem, 3.5vw, 3.25rem)',
  },
  colors: {
    brand: {
      50: '#f4f0ea',
      100: '#e6ddd1',
      200: '#cfc2ae',
      300: '#b5a488',
      400: '#9a8868',
      500: '#857456',
      600: '#6b5d45',
      700: '#544836',
      800: '#3d3428',
      900: '#2a231b',
    },
    dark: {
      50: '#f2f0ec',
      100: '#d8dde4',
      200: '#b0bac6',
      300: '#8896a6',
      400: '#5f6d7d',
      500: '#45505c',
      600: '#313a46',
      700: '#232a34',
      800: '#181d25',
      900: '#101319',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'dark.800',
        color: 'dark.50',
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
        fontWeight: '500',
        borderRadius: '0',
        letterSpacing: '0.08em',
        textTransform: 'none',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-dark-800), 0 0 0 4px var(--chakra-colors-brand-400)',
        },
        _active: {
          transform: 'translateY(1px) scale(0.99)',
        },
      },
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'whiteAlpha.300',
          color: 'dark.50',
          _hover: {
            bg: 'whiteAlpha.100',
            borderColor: 'brand.400',
            color: 'brand.200',
          },
        },
        accent: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.500',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '400',
        letterSpacing: '-0.03em',
        color: 'dark.50',
        textWrap: 'balance',
      },
    },
    Text: {
      variants: {
        eyebrow: {
          fontSize: 'xs',
          fontWeight: '600',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'brand.400',
        },
        lead: {
          fontSize: { base: 'lg', md: 'xl' },
          fontWeight: '300',
          lineHeight: '1.75',
          color: 'dark.100',
          maxW: '42rem',
        },
        body: {
          fontSize: 'md',
          fontWeight: '300',
          lineHeight: '1.8',
          color: 'dark.200',
          maxW: '38rem',
        },
        caption: {
          fontSize: 'sm',
          fontWeight: '500',
          letterSpacing: '0.06em',
          color: 'dark.300',
        },
        stat: {
          fontFamily: 'heading',
          fontSize: { base: '3xl', md: '4xl' },
          fontWeight: '400',
          color: 'brand.400',
          fontVariantNumeric: 'tabular-nums',
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 5, sm: 6, md: 8, lg: 10 },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
