'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/** Keeps scrolling tactile while leaving native keyboard and anchor navigation intact. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1,
    });

    let frameId = 0;
    const onFrame = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(onFrame);
    };
    const onResize = () => lenis.resize();

    frameId = window.requestAnimationFrame(onFrame);
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      lenis.destroy();
    };
  }, []);

  return null;
}
