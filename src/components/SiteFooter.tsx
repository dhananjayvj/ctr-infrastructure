'use client';

import { Box, Container, Flex, Grid, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { sectionPySm } from '@/lib/spacing';

const footerNav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/#contact' },
];

const legalLinks = [{ label: 'Privacy', href: '/privacy' }];

export function SiteFooter() {
  return (
    <Box as="footer" bg="dark.900" borderTop="1px solid" borderColor="whiteAlpha.120">
      <Container maxW="1440px" py={sectionPySm}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 10, md: 12 }}
          mb={{ base: 10, md: 14 }}
        >
          <VStack align="flex-start" spacing={4}>
            <Image src="/images/logo/ctr-logo-mark.png" alt="CTR Infrastructure" h="28px" w="auto" />
            <Text fontSize="sm" color="dark.100" lineHeight="1.7" maxW="22rem">
              Architecture, infrastructure, and planning for civic, commercial, and residential environments across South India.
            </Text>
          </VStack>

          <VStack align="flex-start" spacing={3}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="brand.300">
              Navigation
            </Text>
            {footerNav.map((item) => (
              <Link
                key={item.label}
                as={NextLink}
                href={item.href}
                fontSize="sm"
                color="dark.100"
                _hover={{ color: 'dark.50', textDecoration: 'none' }}
              >
                {item.label}
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
          <Text fontSize="xs" color="dark.300">
            © 2026 CTR Infrastructure. All rights reserved.
          </Text>
          <HStack spacing={6}>
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                as={NextLink}
                href={item.href}
                fontSize="xs"
                color="dark.300"
                _hover={{ color: 'dark.100' }}
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
