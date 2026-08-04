'use client';

import { Box, Flex, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { NewsItem } from '@/lib/content';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';

const MotionGrid = motion(Grid);
const MotionBox = motion(Box);

type NewsSectionProps = {
  id?: string;
  title: string;
  description?: string;
  items: NewsItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function NewsSection({
  id = 'news',
  title,
  description,
  items,
  ctaHref = '/projects',
  ctaLabel = 'Open project portfolio',
}: NewsSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="section" id={id} py={{ base: 16, md: 24 }} bg="dark.800">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'flex-end' }}
        gap={6}
        px={{ base: 5, md: 14 }}
        mb={{ base: 10, md: 14 }}
      >
        <VStack align="flex-start" spacing={4} maxW="36rem">
          <Heading fontSize="display-lg" fontWeight="400">
            {title}
          </Heading>
          {description && (
            <Text variant="lead" maxW="none">
              {description}
            </Text>
          )}
        </VStack>
        <LearnMoreLink href={ctaHref}>{ctaLabel}</LearnMoreLink>
      </Flex>

      <MotionGrid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={0}
        borderTop="1px solid"
        borderColor="whiteAlpha.120"
        variants={staggerContainer}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {items.map((item) => (
          <MotionBox
            key={item.id}
            variants={staggerItem}
            display="grid"
            templateColumns={{ base: '1fr', sm: '180px 1fr' }}
            gap={0}
            borderBottom="1px solid"
            borderColor="whiteAlpha.120"
            _hover={{ bg: 'whiteAlpha.30' }}
            transition="background 0.35s"
            role="group"
          >
            <Box
              overflow="hidden"
              aspectRatio={{ base: 16 / 9, sm: 'auto' }}
              minH={{ sm: '160px' }}
            >
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                w="full"
                h="full"
                transition="transform 0.75s cubic-bezier(0.25, 0.1, 0.25, 1)"
                _groupHover={{ transform: 'scale(1.04)' }}
              />
            </Box>
            <VStack
              align="flex-start"
              justify="center"
              p={{ base: 6, md: 8 }}
              spacing={3}
              borderLeft={{ sm: '1px solid' }}
              borderColor="whiteAlpha.120"
            >
              <Flex gap={3} flexWrap="wrap" align="center">
                <Text variant="date">{item.date}</Text>
                <Text fontSize="xs" color="dark.300">
                  {item.category}
                </Text>
              </Flex>
              <Heading fontSize={{ base: 'md', md: 'lg' }} fontWeight="400" lineHeight="1.4">
                {item.title}
              </Heading>
              <LearnMoreLink href={item.href} size="sm" />
            </VStack>
          </MotionBox>
        ))}
      </MotionGrid>
    </Box>
  );
}
