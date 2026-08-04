'use client';

import { Box, type BoxProps } from '@chakra-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, safeTransition, viewportOnce } from '@/lib/motion';

const MotionBox = motion(Box);

type RevealProps = BoxProps & {
  delay?: number;
  amount?: number;
};

export function Reveal({
  children,
  delay = 0,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionBox
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ ...viewportOnce, amount }}
      variants={fadeUp}
      transition={safeTransition(reducedMotion, {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      })}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
