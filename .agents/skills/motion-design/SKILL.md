---
name: motion-design
description: Guidelines for high-end web animations, micro-interactions, and transitions.
---

# Animation Guidelines
- Use **Framer Motion** or **GSAP** for complex web animations.
- Prefer spring physics over fixed durations for interactive elements (`stiffness: 300, damping: 30`).
- Ensure all entrance animations use staggered offsets (`staggerChildren: 0.1`).
- Avoid animating `width` or `height`. Always animate `transform` (scale, translate) and `opacity` to preserve GPU acceleration and hit 60fps.
- Implement `prefers-reduced-motion` media queries for accessibility.
