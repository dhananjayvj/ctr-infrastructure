'use client';

import { Box, Container, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { FeatureTile } from '@/lib/content';
import { staggerContainer, staggerItem, imageHover } from '@/lib/motion';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { gridGap } from '@/lib/spacing';

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
      <Container maxW="1440px">
        <VStack align="flex-start" spacing={4} mb={{ base: 10, md: 14 }} maxW="42rem">
          <Text variant="eyebrow">Selected perspectives</Text>
          <Heading fontSize="display-lg" fontWeight="500">
            {title}
          </Heading>
          {subtitle && (
            <Text variant="lead" maxW="none" color="dark.100">
              {subtitle}
            </Text>
          )}
        </VStack>

        <MotionGrid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(12, 1fr)' }}
          autoRows={{ base: 'minmax(280px, auto)', lg: 'minmax(180px, 1fr)' }}
          gap={gridGap}
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {tiles.map((tile, index) => (
            <MotionBox
              key={tile.id}
              variants={staggerItem}
              position="relative"
              overflow="hidden"
              role="group"
              cursor="pointer"
              initial="rest"
              whileHover={reducedMotion ? undefined : 'hover'}
              gridColumn={{
                base: 'auto',
                lg:
                  index === 0
                    ? 'span 7'
                    : index === 1
                      ? 'span 5'
                      : index === 2
                        ? 'span 5'
                        : index === 3
                          ? 'span 7'
                          : 'span 6',
              }}
              gridRow={{
                base: 'auto',
                lg: index === 0 || index === 3 ? 'span 2' : 'span 1',
              }}
              minH={{ base: '320px', lg: index === 0 || index === 3 ? '500px' : '240px' }}
              border="1px solid"
              borderColor="whiteAlpha.120"
            >
              <MotionBox position="absolute" inset={0} variants={imageHover}>
                <Image src={tile.image} alt={tile.title} objectFit="cover" w="full" h="full" />
              </MotionBox>
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(6,11,19,0.98) 4%, rgba(6,11,19,0.32) 52%, rgba(6,11,19,0.14) 100%)"
              />
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(135deg, rgba(37, 99, 235, 0.16), transparent 48%)"
                opacity={index === 0 || index === 3 ? 1 : 0.8}
              />
              <VStack
                align="flex-start"
                justify="flex-end"
                position="absolute"
                inset={0}
                p={{ base: 6, md: 8 }}
                spacing={3}
                maxW={{ base: 'full', lg: index === 0 || index === 3 ? '30rem' : '22rem' }}
              >
                <Text variant="eyebrow">CTR insight {String(index + 1).padStart(2, '0')}</Text>
                <Heading
                  fontSize={{
                    base: 'xl',
                    md: index === 0 || index === 3 ? 'display-md' : '2xl',
                  }}
                  fontWeight="500"
                  lineHeight="1.08"
                >
                  {tile.title}
                </Heading>
                <Text fontSize="sm" color="dark.100" lineHeight="1.75" maxW="32rem">
                  {tile.subtitle}
                </Text>
                <LearnMoreLink href={tile.href} size="sm" />
              </VStack>
            </MotionBox>
          ))}
        </MotionGrid>
      </Container>
    </Box>
  );
}
