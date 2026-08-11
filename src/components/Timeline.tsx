'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
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

  return (
    <MotionBox
      position="relative"
      variants={staggerContainer}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Box
        position="absolute"
        left={{ base: '5px', md: '7px' }}
        top="6px"
        bottom="6px"
        w="1px"
        bg="whiteAlpha.200"
      />

      <VStack align="flex-start" spacing={{ base: 10, md: 12 }}>
        {items.map((item) => (
          <MotionBox key={item.year} variants={staggerItem} position="relative" pl={{ base: 8, md: 10 }} w="full">
            <Box
              position="absolute"
              left={0}
              top="6px"
              w={{ base: '11px', md: '15px' }}
              h={{ base: '11px', md: '15px' }}
              borderRadius="full"
              bg="dark.900"
              border="2px solid"
              borderColor="accent.red"
            />
            <Text variant="caption" mb={2} color="accent.red">
              {item.year}
            </Text>
            <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="500" mb={2}>
              {item.title}
            </Heading>
            <Text color="dark.200" lineHeight="1.7" maxW="42rem">
              {item.body}
            </Text>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  );
}
