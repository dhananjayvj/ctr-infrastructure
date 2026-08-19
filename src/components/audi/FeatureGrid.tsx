'use client';

import { Box, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { FeatureTile } from '@/lib/content';
import { staggerContainer, staggerItem, imageHover } from '@/lib/motion';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

type FeatureGridProps = {
  title: string;
  subtitle?: string;
  tiles: FeatureTile[];
};

export function FeatureGrid({ title, subtitle, tiles }: FeatureGridProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="dark.900">
      <VStack align="flex-start" spacing={4} px={{ base: 5, md: 14 }} mb={{ base: 10, md: 14 }}>
        <Heading fontSize="display-lg" fontWeight="400">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="lead" maxW="none" color="dark.200">
            {subtitle}
          </Text>
        )}
      </VStack>

      <MotionGrid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={0}
        variants={staggerContainer}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {tiles.map((tile) => (
          <MotionBox
            key={tile.id}
            variants={staggerItem}
            position="relative"
            overflow="hidden"
            aspectRatio={{ base: 4 / 3, md: 1 }}
            role="group"
            cursor="pointer"
            initial="rest"
            whileHover={reducedMotion ? undefined : 'hover'}
          >
            <MotionBox
              position="absolute"
              inset={0}
              variants={imageHover}
            >
              <Image
                src={tile.image}
                alt={tile.title}
                objectFit="cover"
                w="full"
                h="full"
              />
            </MotionBox>
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)"
            />
            <VStack
              align="flex-start"
              justify="flex-end"
              position="absolute"
              inset={0}
              p={{ base: 6, md: 8 }}
              spacing={3}
            >
              <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="400">
                {tile.title}
              </Heading>
              <Text fontSize="sm" color="dark.200" lineHeight="1.6" noOfLines={2}>
                {tile.subtitle}
              </Text>
              <LearnMoreLink href={tile.href} size="sm" />
            </VStack>
          </MotionBox>
        ))}
      </MotionGrid>
    </Box>
  );
}
