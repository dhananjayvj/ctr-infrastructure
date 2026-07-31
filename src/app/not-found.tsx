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

export default function NotFound() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="dark.800"
      position="relative"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        bgImage="linear-gradient(rgba(201, 169, 110, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 110, 0.1) 1px, transparent 1px)"
        bgSize="100px 100px"
      />
      
      <Container maxW="md" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center">
          <Text
            fontFamily="heading"
            fontSize={{ base: '8rem', md: '12rem' }}
            fontWeight="300"
            color="brand.500"
            lineHeight="1"
            opacity={0.3}
          >
            404
          </Text>
          
          <Heading
            fontFamily="heading"
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="400"
            mt={-16}
          >
            Page Not Found
          </Heading>
          
          <Text color="dark.100" fontSize="lg" maxW="400px">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
          </Text>
          
          <Link href="/" passHref>
            <Button
              size="lg"
              bg="brand.500"
              color="dark.800"
              _hover={{ bg: 'brand.400' }}
              leftIcon={<FiArrowLeft />}
            >
              Return Home
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
