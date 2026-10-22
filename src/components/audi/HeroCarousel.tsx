'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { HeroSlide } from '@/lib/content';
import { crossfade, heroItem, heroStagger } from '@/lib/motion';
import { containerPx, HEADER_HEIGHT } from '@/lib/spacing';
import { LearnMoreLink } from '@/components/audi/LearnMoreLink';
import { ResponsiveImagePicture } from '@/components/ResponsiveImagePicture';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

type HeroCarouselProps = {
  slides: HeroSlide[];
  tagline?: string;
  subtitle?: string;
};

const AUTO_ADVANCE_MS = 7000;

export function HeroCarousel({
  slides,
  tagline = 'Built with intent.',
  subtitle = 'Architecture and engineering, from first idea to final detail.',
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
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet={slides[0].imageSources.avif.map((source) => `${source.src} ${source.width}w`).join(', ')}
        imageSizes="100vw"
        fetchPriority="high"
      />
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
          <Box position="absolute" inset={0}>
            <ResponsiveImagePicture
              alt=""
              sources={slide.imageSources}
              sizes="100vw"
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
            />
          </Box>
        </MotionBox>
      </AnimatePresence>

      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        pointerEvents="none"
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.12) 38%, rgba(0, 0, 0, 0.76) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0.12) 72%)"
      />

      <Container maxW="1440px" h="full" position="relative" zIndex={2}>
        <Flex
          direction="column"
          justify="space-between"
          minH={{ base: 'min(100dvh, 820px)', md: '100dvh' }}
          pt={HEADER_HEIGHT}
          pb={{ base: 24, md: 16 }}
          px={containerPx}
        >
          <MotionVStack
            align="flex-start"
            spacing={{ base: 4, md: 6 }}
            maxW="42rem"
            mt={{ base: 10, md: 20 }}
            variants={heroStagger}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
          >
            <MotionBox variants={heroItem} w={10} h="2px" bg="accent.red" />
            <MotionBox variants={heroItem}>
              <Heading
                as="h1"
                fontSize="display-xl"
                fontWeight="400"
                lineHeight="0.98"
                letterSpacing="-0.035em"
                maxW="12ch"
              >
                {tagline}
              </Heading>
            </MotionBox>
            <MotionBox variants={heroItem}>
              <Text fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.6" color="dark.100" maxW="31rem">
                {subtitle}
              </Text>
            </MotionBox>
            <MotionBox variants={heroItem} pt={{ base: 2, md: 3 }}>
              <LearnMoreLink href="/#contact">Discuss a project</LearnMoreLink>
            </MotionBox>
          </MotionVStack>

          <Box maxW={{ base: 'full', md: '540px' }} borderTop="1px solid" borderColor="whiteAlpha.600" pt={{ base: 4, md: 5 }}>
            <AnimatePresence exitBeforeEnter>
              <MotionBox
                key={`content-${slide.id}`}
                variants={crossfade}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Text variant="eyebrow" color="dark.100" mb={2}>
                  Selected project
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="400"
                  lineHeight="1.15"
                >
                  {slide.title}
                </Heading>
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Flex>
      </Container>

      {slides.length > 1 && (
        <Flex
          position="absolute"
          bottom={{ base: 2, md: 6 }}
          right={{ base: 5, md: 14 }}
          zIndex={3}
          gap={1}
        >
          {slides.map((s, i) => (
            <Box
              key={s.id}
              as="button"
              aria-label={`Show ${s.title}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="44px"
              h="44px"
              onClick={() => goTo(i)}
              cursor="pointer"
              _focusVisible={{ outline: '2px solid', outlineColor: 'dark.50', outlineOffset: '4px', boxShadow: '0 0 0 6px rgba(9, 11, 11, 0.95)' }}
            >
              <Box
                w="8px"
                h="2px"
                bg={i === activeIndex ? 'dark.50' : 'whiteAlpha.600'}
                transform={i === activeIndex ? 'scaleX(3.5)' : 'scaleX(1)'}
                transition="transform 220ms ease-out, background 220ms ease-out"
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}
