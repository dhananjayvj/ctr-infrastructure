'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import NextLink from 'next/link';
import type { HeroSlide } from '@/lib/content';
import { crossfade } from '@/lib/motion';
import { HEADER_HEIGHT } from '@/lib/spacing';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';

const MotionBox = motion(Box);

type HeroCarouselProps = {
  slides: HeroSlide[];
  tagline?: string;
  subtitle?: string;
};

const AUTO_ADVANCE_MS = 7000;

export function HeroCarousel({
  slides,
  tagline = 'Architecture, infrastructure, and planning with regional precision.',
  subtitle = 'CTR Infrastructure brings six decades of technical depth to civic, commercial, and residential work across South India.',
}: HeroCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (reducedMotion || slides.length <= 1) return;
    const timer = setInterval(() => goTo(activeIndex + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [activeIndex, goTo, reducedMotion, slides.length]);

  const slide = slides[activeIndex];

  return (
    <Box
      as="section"
      position="relative"
      minH={{ base: 'min(100dvh, 820px)', md: '100dvh' }}
      overflow="hidden"
      bg="dark.900"
    >
      <AnimatePresence exitBeforeEnter>
        <MotionBox
          key={slide.id}
          position="absolute"
          inset={0}
          variants={crossfade}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Box
            position="absolute"
            inset={0}
            bgImage={`url('${slide.image}')`}
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.38) saturate(0.9)"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-b, rgba(6,11,19,0.2) 0%, rgba(6,11,19,0.72) 48%, rgba(6,11,19,0.98) 100%)"
          />
        </MotionBox>
      </AnimatePresence>

      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at 18% 22%, rgba(37, 99, 235, 0.26), transparent 30%), radial-gradient(circle at 82% 18%, rgba(148, 163, 184, 0.12), transparent 24%)"
        zIndex={1}
      />

      <Container maxW="1440px" h="full" position="relative" zIndex={2}>
        <Flex
          direction="column"
          justify="space-between"
          minH={{ base: 'min(100dvh, 820px)', md: '100dvh' }}
          pt={HEADER_HEIGHT}
          pb={{ base: 12, md: 16 }}
        >
          <Grid
            templateColumns={{ base: '1fr', xl: 'minmax(0, 1.45fr) minmax(320px, 0.75fr)' }}
            gap={{ base: 12, xl: 16 }}
            alignItems="end"
            flex="1"
          >
            <VStack align="flex-start" justify="center" spacing={{ base: 6, md: 8 }} pt={{ base: 10, md: 16 }}>
              <Text variant="eyebrow">Built work, technical rigor, regional context</Text>
              <Heading
                as="h1"
                fontSize="display-xl"
                fontWeight="500"
                lineHeight={{ base: '0.98', md: '0.94' }}
                letterSpacing="-0.05em"
                maxW={{ base: '12ch', xl: '11ch' }}
              >
                {tagline}
              </Heading>
              <Text variant="lead" color="dark.50" maxW="36rem">
                {subtitle}
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Button
                  as={NextLink}
                  href="/projects"
                  size="lg"
                  minH="56px"
                  px={8}
                  variant="solid"
                >
                  Review selected projects
                </Button>
                <LearnMoreLink href="/#contact" color="dark.100">
                  Discuss a commission
                </LearnMoreLink>
              </HStack>
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }}
                gap={{ base: 4, sm: 6 }}
                w="full"
                maxW="42rem"
                pt={{ base: 4, md: 6 }}
              >
                {[
                  { value: '60+', label: 'Years of practice' },
                  { value: '150+', label: 'Projects delivered' },
                  { value: '4+', label: 'States served' },
                ].map((item) => (
                  <Box
                    key={item.label}
                    p={{ base: 4, md: 5 }}
                    bg="surface.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    backdropFilter="blur(18px)"
                  >
                    <Text variant="stat" fontSize={{ base: '2xl', md: '3xl' }} mb={1}>
                      {item.value}
                    </Text>
                    <Text variant="caption" color="dark.100">
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </VStack>

            <Box alignSelf={{ base: 'stretch', xl: 'end' }} maxW={{ xl: '28rem' }}>
              <Text variant="eyebrow" mb={4}>
                Current project spotlight
              </Text>
              <AnimatePresence exitBeforeEnter>
                <MotionBox
                  key={`content-${slide.id}`}
                  variants={crossfade}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  p={{ base: 6, md: 8 }}
                  bg="surface.200"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  backdropFilter="blur(24px)"
                >
                  <HStack spacing={3} flexWrap="wrap" mb={4}>
                    <Text variant="date">{slide.date}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="brand.300">
                      {slide.subtitle}
                    </Text>
                  </HStack>
                  <Heading
                    as="h2"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="500"
                    lineHeight="1.2"
                    mb={5}
                  >
                    {slide.title}
                  </Heading>
                  <LearnMoreLink href={slide.href}>Open project work</LearnMoreLink>
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Grid>
        </Flex>
      </Container>

      {slides.length > 1 && (
        <Flex
          position="absolute"
          bottom={{ base: 5, md: 8 }}
          right={{ base: 4, md: 12 }}
          zIndex={3}
          gap={2}
        >
          {slides.map((s, i) => (
            <Box
              key={s.id}
              as="button"
              aria-label={`Go to slide ${i + 1}`}
              w={i === activeIndex ? '44px' : '16px'}
              h="44px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => goTo(i)}
              cursor="pointer"
              _focusVisible={{
                boxShadow: '0 0 0 2px var(--chakra-colors-dark-900), 0 0 0 4px var(--chakra-colors-brand-500)',
              }}
            >
              <Box
                w="full"
                h="2px"
                bg={i === activeIndex ? 'brand.400' : 'whiteAlpha.400'}
                transition="all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}
