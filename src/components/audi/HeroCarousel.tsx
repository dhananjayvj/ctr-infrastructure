'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  tagline = 'Discover CTR Infrastructure',
  subtitle = 'Company. People. Innovations.',
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
            filter="brightness(0.55)"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.5) 100%)"
          />
        </MotionBox>
      </AnimatePresence>

      <Container maxW="1440px" h="full" position="relative" zIndex={2}>
        <Flex
          direction="column"
          justify="space-between"
          minH={{ base: 'min(100dvh, 820px)', md: '100dvh' }}
          pt={HEADER_HEIGHT}
          pb={{ base: 24, md: 16 }}
        >
          <VStack align="flex-start" spacing={3} pt={{ base: 8, md: 16 }}>
            <Heading
              as="h1"
              fontSize="display-xl"
              fontWeight="300"
              lineHeight="1.1"
              maxW="14ch"
            >
              {tagline}
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="400" color="dark.200">
              {subtitle}
            </Text>
          </VStack>

          <Box maxW={{ base: 'full', md: '540px', lg: '620px' }}>
            <AnimatePresence exitBeforeEnter>
              <MotionBox
                key={`content-${slide.id}`}
                variants={crossfade}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Text variant="date" mb={3}>
                  {slide.date}
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="400"
                  lineHeight="1.35"
                  mb={6}
                >
                  {slide.title}
                </Heading>
                <LearnMoreLink href={slide.href} />
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Flex>
      </Container>

      {slides.length > 1 && (
        <Flex
          position="absolute"
          bottom={{ base: 6, md: 10 }}
          right={{ base: 5, md: 14 }}
          zIndex={3}
          gap={2}
        >
          {slides.map((s, i) => (
            <Box
              key={s.id}
              as="button"
              aria-label={`Go to slide ${i + 1}`}
              w={i === activeIndex ? '32px' : '8px'}
              h="2px"
              bg={i === activeIndex ? 'dark.50' : 'whiteAlpha.400'}
              transition="all 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
              onClick={() => goTo(i)}
              cursor="pointer"
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}
