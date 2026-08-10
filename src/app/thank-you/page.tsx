'use client';

import { Box, Button, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteFooter } from '@/components/SiteFooter';
import { pageTopPad, sectionPy } from '@/lib/spacing';

export default function ThankYouPage() {
  return (
    <Box as="main" bg="dark.900" overflowX="hidden">
      <Box pt={pageTopPad} pb={sectionPy}>
        <Container maxW="700px" textAlign="center">
          <Box textAlign="left">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Thank You' }]} />
          </Box>

          <VStack spacing={6} py={{ base: 10, md: 16 }}>
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

            <Heading fontSize="display-lg" fontWeight="300" lineHeight="1.1">
              Message received
            </Heading>

            <Text variant="lead" maxW="28rem" mx="auto" textAlign="center">
              Thank you for reaching out to CTR Infrastructure. We respond to
              every enquiry within 24 hours — a member of our team will be in
              touch shortly.
            </Text>

            <Link href="/" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                minH="48px"
                variant="solid"
                leftIcon={<FiArrowLeft />}
              >
                Return home
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
