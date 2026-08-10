'use client';

import { Box, Container, Flex, Grid, HStack, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { sectionPySm } from '@/lib/spacing';

const footerNav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/#contact' },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Legal', href: '#' },
  { label: 'Imprint', href: '#' },
];

export function SiteFooter() {
  return (
    <Box as="footer" bg="dark.900" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px" py={sectionPySm}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={{ base: 10, md: 12 }}
          mb={{ base: 10, md: 14 }}
        >
          <VStack align="flex-start" spacing={4}>
            <HStack spacing={1}>
              {[0, 1, 2, 3].map((i) => (
                <Box
                  key={i}
                  w="7px"
                  h="7px"
                  borderRadius="full"
                  border="1.5px solid"
                  borderColor="dark.50"
                />
              ))}
            </HStack>
            <Text fontSize="sm" color="dark.300" lineHeight="1.7" maxW="18rem">
              Architecture and infrastructure for cities, campuses, and civic life.
            </Text>
          </VStack>

          <VStack align="flex-start" spacing={3}>
            <Text fontSize="xs" fontWeight="600" letterSpacing="0.08em" color="dark.300">
              Navigation
            </Text>
            {footerNav.map((item) => (
              <Link
                key={item.label}
                as={NextLink}
                href={item.href}
                fontSize="sm"
                color="dark.200"
                _hover={{ color: 'dark.50', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </VStack>

          <VStack align="flex-start" spacing={3}>
            <Text fontSize="xs" fontWeight="600" letterSpacing="0.08em" color="dark.300">
              Connect
            </Text>
            {['LinkedIn', 'Instagram', 'Behance'].map((item) => (
              <Link
                key={item}
                href="#"
                fontSize="sm"
                color="dark.200"
                _hover={{ color: 'dark.50' }}
              >
                {item}
              </Link>
            ))}
          </VStack>
        </Grid>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={4}
          pt={8}
          borderTop="1px solid"
          borderColor="whiteAlpha.120"
        >
          <Text fontSize="xs" color="dark.400">
            © 2026 CTR Infrastructure. All rights reserved.
          </Text>
          <HStack spacing={6}>
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                as={item.href.startsWith('/') ? NextLink : undefined}
                href={item.href}
                fontSize="xs"
                color="dark.400"
                _hover={{ color: 'dark.200' }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
