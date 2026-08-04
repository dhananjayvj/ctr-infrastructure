'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import { fadeUp, safeTransition } from '@/lib/motion';

const MotionBox = motion(Box);

type RevealProps = BoxProps & {
  children: React.ReactNode;
  delay?: number;
};

export function Reveal({ children, delay = 0, ...rest }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionBox
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      transition={safeTransition(reducedMotion, { delay })}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
