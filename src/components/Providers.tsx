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
      50: '#f5f0e8',
      100: '#e8dfd0',
      200: '#d4c4ad',
      300: '#c0a888',
      400: '#ad9168',
      500: '#96784f',
      600: '#7a6140',
      700: '#5f4c33',
      800: '#453727',
      900: '#2e251a',
    },
    dark: {
      50: '#f0eeea',
      100: '#c5ccd6',
      200: '#9aa5b3',
      300: '#738090',
      400: '#556070',
      500: '#3d4654',
      600: '#2a3140',
      700: '#1e2430',
      800: '#141820',
      900: '#0c0f14',
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
          borderColor: 'whiteAlpha.300',
          color: 'dark.50',
          _hover: {
            bg: 'whiteAlpha.100',
            borderColor: 'brand.400',
            color: 'brand.300',
          },
        },
        accent: {
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
        fontWeight: '400',
        letterSpacing: '-0.02em',
        color: 'dark.50',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
