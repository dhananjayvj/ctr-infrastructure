'use client';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

type LearnMoreLinkProps = {
  href: string;
  children?: string;
  color?: string;
  size?: 'sm' | 'md';
};

export function LearnMoreLink({
  href,
  children = 'Learn more',
  color = 'dark.50',
  size = 'md',
}: LearnMoreLinkProps) {
  return (
    <Flex
      as={NextLink}
      href={href}
      align="center"
      gap={2}
      color={color}
      fontSize={size === 'sm' ? 'sm' : 'md'}
      fontWeight="500"
      w="fit-content"
      role="group"
      _hover={{ textDecoration: 'none', opacity: 0.85 }}
    >
      <Text
        borderBottom="1px solid"
        borderColor="whiteAlpha.500"
        pb="2px"
        transition="border-color 0.35s"
        _groupHover={{ borderColor: 'dark.50' }}
      >
        {children}
      </Text>
      <Icon
        as={FiChevronRight}
        boxSize={size === 'sm' ? 4 : 5}
        transition="transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)"
        _groupHover={{ transform: 'translateX(4px)' }}
      />
    </Flex>
  );
}

type QuickNavPillsProps = {
  links: { label: string; href: string }[];
};

export function QuickNavPills({ links }: QuickNavPillsProps) {
  return (
    <Box
      as="nav"
      aria-label="Quick navigation"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="whiteAlpha.120"
      bg="dark.900"
    >
      <Flex className="audi-scroll-strip" gap={{ base: 7, md: 10 }} px={{ base: 5, md: 14 }}>
        {links.map((link) => (
          <Box
            key={link.label}
            as={NextLink}
            href={link.href}
            flexShrink={0}
            py={{ base: 4, md: 5 }}
            fontSize="sm"
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
            {link.label}
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
