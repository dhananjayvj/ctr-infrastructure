'use client';

import { Box, Container, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { StripItem } from '@/lib/content';

type HorizontalStripProps = {
  title: string;
  items: StripItem[];
};

export function HorizontalStrip({ title, items }: HorizontalStripProps) {
  return (
    <Box as="section" py={{ base: 10, md: 14 }} bg="dark.900">
      <Container maxW="1440px">
        <Flex align="center" gap={5} mb={{ base: 5, md: 7 }}>
          <Text variant="caption" whiteSpace="nowrap">{title}</Text>
          <Box flex="1" borderTop="1px solid" borderColor="whiteAlpha.120" />
        </Flex>
      </Container>
      <Box className="audi-scroll-strip" px={{ base: 5, md: 14 }} gap={{ base: 8, md: 12 }}>
        {items.map((item) => (
          <Box
            key={item.id}
            as={NextLink}
            href={item.href}
            flexShrink={0}
            py={2}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="500"
            color="dark.300"
            whiteSpace="nowrap"
            position="relative"
            transition="color 220ms ease-out"
            _after={{
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              h: '1px',
              bg: 'dark.50',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 220ms ease-out',
            }}
            _hover={{ color: 'dark.50', textDecoration: 'none', _after: { transform: 'scaleX(1)' } }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
