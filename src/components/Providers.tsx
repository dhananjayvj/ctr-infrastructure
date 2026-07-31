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
  colors: {
    brand: {
      50: '#fdf8ed',
      100: '#f9edcf',
      200: '#f2d99e',
      300: '#e9c064',
      400: '#dfc291',
      500: '#c9a96e',
      600: '#b08a4a',
      700: '#8f6b3a',
      800: '#765734',
      900: '#63482f',
    },
    dark: {
      50: '#f5f5f5',
      100: '#a3a3a3',
      200: '#737373',
      300: '#525252',
      400: '#404040',
      500: '#262626',
      600: '#1a1a1a',
      700: '#141414',
      800: '#0a0a0a',
      900: '#000000',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'dark.800',
        color: 'dark.50',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '0',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
      variants: {
        outline: {
          border: '1px solid',
          borderColor: 'whiteAlpha.200',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
        accent: {
          bg: 'brand.500',
          color: 'dark.800',
          _hover: {
            bg: 'brand.400',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '400',
        letterSpacing: '-0.02em',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
