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
    <Flex
      className="audi-scroll-strip"
      gap={0}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="whiteAlpha.120"
      bg="dark.900"
    >
      {links.map((link) => (
        <Box
          key={link.label}
          as={NextLink}
          href={link.href}
          flexShrink={0}
          px={{ base: 5, md: 8 }}
          py={{ base: 4, md: 5 }}
          fontSize="sm"
          fontWeight="500"
          color="dark.200"
          borderRight="1px solid"
          borderColor="whiteAlpha.120"
          whiteSpace="nowrap"
          transition="all 0.35s"
          _hover={{
            color: 'dark.50',
            bg: 'whiteAlpha.50',
            textDecoration: 'none',
          }}
          _last={{ borderRight: 'none' }}
        >
          {link.label}
        </Box>
      ))}
    </Flex>
  );
}
