'use client';

import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import styles from './InitialLoader.module.css';

const DISPLAY_MS = 2800;
const FADE_MS = 450;
const REDUCED_MOTION_DISPLAY_MS = 200;

export function InitialLoader() {
  const reducedMotion = useReducedMotion();
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const displayMs = reducedMotion ? REDUCED_MOTION_DISPLAY_MS : DISPLAY_MS;
    const fadeTimer = setTimeout(() => setFading(true), displayMs);
    const hideTimer = setTimeout(() => setVisible(false), displayMs + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={200}
      bg="dark.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={fading ? 0 : 1}
      transition={`opacity ${FADE_MS}ms ease`}
      pointerEvents={fading ? 'none' : 'auto'}
      aria-hidden="true"
    >
      <div className={styles.loader}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.box} />
        ))}
      </div>
    </Box>
  );
}
