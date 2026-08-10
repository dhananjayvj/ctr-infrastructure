'use client';

import { Box, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export type Crumb = {
  label: string;
  href?: string;
};

const SITE_URL = 'https://ctrinfrastructure.com';

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <Box as="nav" aria-label="Breadcrumb" mb={{ base: 6, md: 8 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HStack spacing={2} fontSize="xs" color="dark.300" flexWrap="wrap">
        {items.map((item, index) => (
          <HStack key={item.label} spacing={2}>
            {index > 0 && <FiChevronRight size={12} aria-hidden="true" />}
            {item.href ? (
              <ChakraLink as={NextLink} href={item.href} _hover={{ color: 'dark.50' }}>
                {item.label}
              </ChakraLink>
            ) : (
              <Text color="dark.50">{item.label}</Text>
            )}
          </HStack>
        ))}
      </HStack>
    </Box>
  );
}
