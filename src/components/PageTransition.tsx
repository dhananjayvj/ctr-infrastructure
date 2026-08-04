'use client';

import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransition, pageTransitionReduced } from '@/lib/motion';

const MotionBox = motion(Box);

const HEADER_SCROLL_OFFSET = 88;

type PageTransitionProps = {
  children: React.ReactNode;
};

function scrollToHashOrTop(reducedMotion: boolean | null) {
  const hash = window.location.hash;
  if (hash.length > 1) {
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
      window.scrollTo({
        top: Math.max(0, y),
        left: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
      return;
    }
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? pageTransitionReduced : pageTransition;

  useEffect(() => {
    const delay = reducedMotion ? 0 : 300;
    const timer = window.setTimeout(() => scrollToHashOrTop(reducedMotion), delay);
    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <MotionBox
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        w="full"
        minH="100dvh"
        overflowX="hidden"
        position="relative"
        style={{ willChange: reducedMotion ? 'auto' : 'transform, opacity' }}
      >
        {children}
      </MotionBox>
    </AnimatePresence>
  );
}
