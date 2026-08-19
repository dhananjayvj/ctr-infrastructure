'use client';

import { Box, Container, Flex, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { NewsItem } from '@/lib/content';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { gridGap } from '@/lib/spacing';

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
      <Container maxW="1440px">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'flex-end' }}
          gap={6}
          mb={{ base: 10, md: 14 }}
        >
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <Text variant="eyebrow">Project updates</Text>
            <Heading fontSize="display-lg" fontWeight="500">
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
          templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }}
          gap={gridGap}
          variants={staggerContainer}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {items.map((item, index) => (
            <MotionBox
              key={item.id}
              variants={staggerItem}
              display="grid"
              templateColumns={{ base: '1fr', sm: '220px 1fr' }}
              gridColumn={{ base: 'auto', lg: index === 0 ? 'span 7' : 'span 5' }}
              minH={{ base: 'auto', lg: index === 0 ? '360px' : '280px' }}
              bg="surface.100"
              border="1px solid"
              borderColor="whiteAlpha.120"
              overflow="hidden"
              _hover={{ bg: 'surface.200', borderColor: 'whiteAlpha.300' }}
              transition="background 0.35s, border-color 0.35s"
              role="group"
            >
              <Box overflow="hidden" minH={{ base: '220px', sm: '100%' }}>
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
                justify="space-between"
                p={{ base: 6, md: 8 }}
                spacing={5}
              >
                <VStack align="flex-start" spacing={3}>
                  <Flex gap={3} flexWrap="wrap" align="center">
                    <Text variant="date">{item.date}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="brand.300">
                      {item.category}
                    </Text>
                  </Flex>
                  <Heading
                    fontSize={{ base: 'lg', md: index === 0 ? 'display-md' : 'xl' }}
                    fontWeight="500"
                    lineHeight="1.12"
                  >
                    {item.title}
                  </Heading>
                </VStack>
                <LearnMoreLink href={item.href} size="sm" />
              </VStack>
            </MotionBox>
          ))}
        </MotionGrid>
      </Container>
    </Box>
  );
}
