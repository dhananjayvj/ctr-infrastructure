import type { Transition, Variants } from 'framer-motion';

/** Audi-style smooth ease */
export const easeSmooth = [0.25, 0.1, 0.25, 1] as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 32,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

export const tweenEnter = (duration = 0.55): Transition => ({
  duration,
  ease: easeSmooth,
});

export const tweenExit = (duration = 0.35): Transition => ({
  duration,
  ease: easeIn,
});

export function safeTransition(
  reduced: boolean | null,
  transition: Transition = tweenEnter()
): Transition {
  if (reduced) return { duration: 0 };
  return transition;
}

export const viewportOnce = {
  once: true,
  margin: '-80px 0px -80px 0px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenEnter(0.65),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: tweenEnter(0.6),
  },
};

export const crossfade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: tweenEnter(0.75),
  },
  exit: {
    opacity: 0,
    transition: tweenExit(0.55),
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: tweenEnter(0.7),
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenEnter(0.55),
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeSmooth },
  },
};

export const drawerVariants: Variants = {
  closed: { opacity: 0, x: '100%' },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: tweenExit(0.35),
  },
};

export const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: tweenEnter(0.35) },
  exit: { opacity: 0, transition: tweenExit(0.25) },
};

export const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: easeIn },
  },
};

export const pageTransitionReduced: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

export const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.75, ease: easeSmooth } },
};
