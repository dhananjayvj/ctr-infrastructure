'use client';

import { Box, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { StripItem } from '@/lib/content';

type HorizontalStripProps = {
  title: string;
  items: StripItem[];
};

export function HorizontalStrip({ title, items }: HorizontalStripProps) {
  return (
    <Box as="section" py={{ base: 10, md: 14 }} bg="dark.900">
      <Text
        px={{ base: 5, md: 14 }}
        mb={{ base: 6, md: 8 }}
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="400"
      >
        {title}
      </Text>
      <Box className="audi-scroll-strip" px={{ base: 5, md: 14 }} gap={0}>
        {items.map((item, index) => (
          <Box
            key={item.id}
            as={NextLink}
            href={item.href}
            flexShrink={0}
            px={{ base: 5, md: 8 }}
            py={4}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="500"
            color="dark.200"
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="whiteAlpha.120"
            borderLeft={index === 0 ? '1px solid' : 'none'}
            borderRight="1px solid"
            whiteSpace="nowrap"
            transition="all 0.35s"
            _hover={{
              color: 'dark.50',
              bg: 'whiteAlpha.50',
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
