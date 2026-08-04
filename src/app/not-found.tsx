'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
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
      bg="dark.800"
      position="relative"
      pt={pageTopPad}
      pb={{ base: 16, md: 24 }}
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.04}
        bgImage="linear-gradient(rgba(133, 116, 86, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(133, 116, 86, 0.12) 1px, transparent 1px)"
        bgSize="100px 100px"
      />

      <Container maxW="md" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center">
          <Text
            fontFamily="heading"
            fontSize={{ base: '8rem', md: '12rem' }}
            fontWeight="300"
            color="brand.600"
            lineHeight="1"
            opacity={0.35}
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            404
          </Text>

          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="400"
            mt={-16}
          >
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
              bg="brand.600"
              color="white"
              _hover={{ bg: 'brand.500', transform: 'translateY(-1px)' }}
              leftIcon={<FiArrowLeft />}
            >
              Return home
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
