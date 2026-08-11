'use client';

import { Box, Button, HStack, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiMail } from 'react-icons/fi';

export function StickyMobileCTA() {
  return (
    <HStack
      as="nav"
      aria-label="Quick contact"
      display={{ base: 'flex', md: 'none' }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={90}
      spacing={0}
      bg="dark.900"
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      pb="env(safe-area-inset-bottom)"
    >
      <Box as={NextLink} href="/#contact" flex={1}>
        <Button w="full" variant="solid" minH="56px" borderRadius="0" leftIcon={<Icon as={FiMail} />}>
          Enquire
        </Button>
      </Box>
    </HStack>
  );
}
