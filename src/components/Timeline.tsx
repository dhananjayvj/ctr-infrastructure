'use client';

import { useEffect, useRef } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

const MotionBox = motion(Box);

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);
  const lineScale = useSpring(rawProgress, { stiffness: 260, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (reducedMotion) {
      rawProgress.set(1);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const triggerStart = viewportH * 0.85;
      const triggerEnd = viewportH * 0.3;
      const totalDistance = triggerStart - triggerEnd + rect.height;
      const raw = totalDistance > 0 ? (triggerStart - rect.top) / totalDistance : 0;
      rawProgress.set(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reducedMotion, rawProgress]);

  return (
    <Box ref={containerRef} position="relative">
      <Box
        position="absolute"
        left={{ base: '5px', md: '7px' }}
        top="6px"
        bottom="6px"
        w="1px"
        bg="whiteAlpha.200"
      />
      <MotionBox
        position="absolute"
        left={{ base: '5px', md: '7px' }}
        top="6px"
        bottom="6px"
        w="1px"
        bg="accent.red"
        style={{
          transformOrigin: 'top',
          scaleY: lineScale,
        }}
      />

      <MotionBox
        variants={staggerContainer}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
      >
        <VStack align="flex-start" spacing={{ base: 24, md: 48 }}>
          {items.map((item) => (
            <MotionBox key={item.year} variants={staggerItem} position="relative" pl={{ base: 10, md: 14 }} w="full">
              <Box
                position="absolute"
                left={0}
                top="6px"
                w={{ base: '13px', md: '17px' }}
                h={{ base: '13px', md: '17px' }}
                borderRadius="full"
                bg="dark.900"
                border="2px solid"
                borderColor="accent.red"
              />
              <Text variant="caption" mb={3} color="accent.red" fontSize={{ base: 'sm', md: 'md' }}>
                {item.year}
              </Text>
              <Heading fontSize={{ base: 'xl', md: 'display-md' }} fontWeight="400" mb={3}>
                {item.title}
              </Heading>
              <Text color="dark.200" lineHeight="1.7" fontSize={{ base: 'md', md: 'lg' }} maxW="36rem">
                {item.body}
              </Text>
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
}
