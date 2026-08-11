'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Image,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { pageTopPad } from '@/lib/spacing';

export default function NotFound() {
  return (
    <Box
      as="main"
      minH="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="dark.900"
      pt={pageTopPad}
      pb={{ base: 16, md: 24 }}
    >
      <Container maxW="md">
        <VStack spacing={8} textAlign="center">
          <Text
            fontSize={{ base: '6rem', md: '9rem' }}
            fontWeight="300"
            color="dark.600"
            lineHeight="1"
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            404
          </Text>

          <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="400" mt={-8}>
            Page not found
          </Heading>

          <Text variant="lead" maxW="24rem" mx="auto" textAlign="center">
            This page does not exist or has moved. Return to the homepage to
            explore our work.
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

          <Image src="/images/logo/ctr-logo-mark.png" alt="" h="24px" w="auto" opacity={0.6} pt={4} />
        </VStack>
      </Container>
    </Box>
  );
}
