import type { Transition, Variants } from 'framer-motion';

/** ease-out for entering elements (UI/UX Pro Max) */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** ease-in for exiting — faster than enter */
export const easeIn = [0.4, 0, 1, 1] as const;

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
};

export const tweenEnter = (duration = 0.45): Transition => ({
  duration,
  ease: easeOut,
});

export const tweenExit = (duration = 0.25): Transition => ({
  duration,
  ease: easeIn,
});

/** Returns instant transition when user prefers reduced motion */
export function safeTransition(
  reduced: boolean | null,
  transition: Transition = tweenEnter()
): Transition {
  if (reduced) return { duration: 0 };
  return transition;
}

export const viewportOnce = {
  once: true,
  margin: '-64px 0px -64px 0px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenEnter(0.5),
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: tweenEnter(0.4),
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: tweenEnter(0.45),
  },
};

/** Stagger grid/list — motion dial 7 / back.out feel via spring */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const drawerVariants: Variants = {
  closed: { opacity: 0, x: '100%' },
  open: {
    opacity: 1,
    x: 0,
    transition: springSoft,
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: tweenExit(0.22),
  },
};

export const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: tweenEnter(0.2) },
  exit: { opacity: 0, transition: tweenExit(0.15) },
};

export const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.998,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.999,
    transition: {
      duration: 0.24,
      ease: easeIn,
    },
  },
};

export const pageTransitionReduced: Variants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: 0, scale: 1 },
};
