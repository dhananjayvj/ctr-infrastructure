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
    'display-xl': 'clamp(2.75rem, 5.5vw, 4.5rem)',
    'display-lg': 'clamp(2rem, 4vw, 3.25rem)',
    'display-md': 'clamp(1.5rem, 2.75vw, 2.25rem)',
  },
  colors: {
    brand: {
      50: '#f5f5f5',
      100: '#e8e8e8',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
    accent: {
      red: '#bb0a30',
    },
    dark: {
      50: '#ffffff',
      100: '#f0f0f0',
      200: '#b3b3b3',
      300: '#808080',
      400: '#666666',
      500: '#4d4d4d',
      600: '#333333',
      700: '#1a1a1a',
      800: '#0a0a0a',
      900: '#000000',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'dark.900',
        color: 'dark.50',
      },
      '::selection': {
        bg: 'dark.50',
        color: 'dark.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '0',
        letterSpacing: '0.02em',
        textTransform: 'none',
        fontSize: 'sm',
        transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
        _focusVisible: {
          boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-dark-50)',
        },
        _active: {
          transform: 'scale(0.98)',
        },
      },
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'whiteAlpha.400',
          color: 'dark.50',
          bg: 'transparent',
          _hover: {
            bg: 'whiteAlpha.100',
            borderColor: 'dark.50',
          },
        },
        ghost: {
          color: 'dark.200',
          _hover: {
            bg: 'transparent',
            color: 'dark.50',
          },
        },
        solid: {
          bg: 'dark.50',
          color: 'dark.900',
          _hover: {
            bg: 'dark.100',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '400',
        letterSpacing: '-0.02em',
        color: 'dark.50',
        textWrap: 'balance',
      },
    },
    Text: {
      variants: {
        eyebrow: {
          fontSize: 'xs',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'none',
          color: 'dark.200',
        },
        lead: {
          fontSize: { base: 'md', md: 'lg' },
          fontWeight: '300',
          lineHeight: '1.7',
          color: 'dark.200',
          maxW: '40rem',
        },
        body: {
          fontSize: 'md',
          fontWeight: '300',
          lineHeight: '1.75',
          color: 'dark.200',
          maxW: '38rem',
        },
        caption: {
          fontSize: 'sm',
          fontWeight: '400',
          letterSpacing: '0.02em',
          color: 'dark.300',
        },
        stat: {
          fontSize: { base: '2xl', md: '3xl' },
          fontWeight: '300',
          color: 'dark.50',
          fontVariantNumeric: 'tabular-nums',
        },
        date: {
          fontSize: 'xs',
          fontWeight: '400',
          color: 'dark.300',
          sx: { fontVariantNumeric: 'tabular-nums' },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: '1440px',
        px: { base: 5, sm: 6, md: 10, lg: 14 },
      },
    },
    Link: {
      baseStyle: {
        transition: 'color 0.35s, opacity 0.35s',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
