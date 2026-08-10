# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # static export to out/
npm run start    # serve the built out/ dir on :3000 (via npx serve)
npm run lint     # next lint (eslint-config-next core-web-vitals)
```

No test framework is configured. Verification = `npm run build` (catches TS + export errors) plus `npm run lint`.

## Architecture

Next.js 14 App Router site for the CTR Infrastructure architecture portfolio, built as a **fully static export** (`output: 'export'`, `trailingSlash: true`) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

Static-export constraints that shape everything:
- No server runtime — no API routes, no `next/image` optimization (`images.unoptimized: true`; Chakra's `<Image>` is used throughout, not `next/image`), no ISR/middleware/dynamic params without `generateStaticParams`.
- `src/app/sitemap.ts` and `src/app/robots.ts` emit static `sitemap.xml`/`robots.txt` at export. `next-sitemap.config.js` is vestigial — `next-sitemap` is not installed and no `postbuild` script runs it. When adding routes, update `sitemap.ts`.
- `public/CNAME` (ctrinfrastructure.com) is copied to `out/` and must stay for the custom domain.

### Three source-of-truth modules

Changes to look/feel almost always belong in `src/lib` or `Providers.tsx`, not scattered in components:

- **`src/components/Providers.tsx`** — the entire Chakra v2 design system: dark-only palette (`dark.*`, `brand.*`, `accent.red`), Manrope font stack, display font sizes, and component recipes. Text uses named variants (`eyebrow`, `lead`, `body`, `caption`, `stat`, `date`); Buttons are square (`borderRadius: '0'`). Prefer adding a variant here over one-off `sx` props.
- **`src/lib/motion.ts`** — all Framer Motion variants, easings, and springs (`fadeUp`, `staggerContainer`, `pageTransition`, `imageHover`, …), plus `navLinks`. `safeTransition(reducedMotion, t)` collapses to zero duration when the user prefers reduced motion — every animated component calls `useReducedMotion()` and routes through it.
- **`src/lib/spacing.ts`** — the vertical rhythm scale (`sectionPy`, `sectionPyLg`, `containerPx`, `gridGap`, `HEADER_HEIGHT`). Use these tokens instead of ad-hoc `py={{...}}` objects.

Content is hardcoded in **`src/lib/content.ts`** (typed arrays: `heroSlides`, `featureTiles`, `newsItems`, `services`, `stats`, `featuredProjects`, …) with Unsplash image URLs. There is no CMS; copy/image edits go here. `CONTENT_COLLECTION_CHECKLIST.md` tracks the real client content still to be gathered.

### Rendering structure

`app/layout.tsx` (server, holds all SEO metadata) → `Providers` (Chakra) → `AppShell` (client) → `SiteHeader` + `PageTransition`. `PageTransition` keys an `AnimatePresence` on `usePathname()` and also owns hash-anchor scrolling (`HEADER_SCROLL_OFFSET = 88`), since the single-page sections (`#about`, `#services`, `#contact`, `#news`) are linked from other routes.

Because nearly every page/component is `'use client'` (Chakra + Framer Motion), per-route `metadata` must live in a sibling server `layout.tsx` — see `app/projects/layout.tsx`, which exists only to export metadata.

`src/components/audi/*` are the homepage section primitives (`HeroCarousel`, `HorizontalStrip`, `FeatureGrid`, `NewsSection`, `LearnMoreLink`/`QuickNavPills`), modeled on Audi's site layout language. `Reveal` is the standard scroll-in wrapper.

### Version gotchas

- **framer-motion is v6**, not v10+. Use `motion(Box)` (not `motion.create`) and `<AnimatePresence exitBeforeEnter>` (not `mode="wait"`). Copying modern Framer Motion snippets will break the build.
- **Chakra UI v2** with Emotion — not Chakra v3 / Panda.

## Design skills

`.agents/skills/` vendors two pinned skills (`skills-lock.json`): `ui-ux-pro-max` (design-system data + reference rules) and `redesign-existing-projects`. Recent commits were driven by these; consult them before large visual reworks. Root `SKILL.md` is an unfilled template.

`.agents/skills/motion-design/SKILL.md` is a project-local (unpinned, not in `skills-lock.json`) skill covering Framer Motion/GSAP animation conventions — spring physics over fixed durations, `transform`/`opacity`-only animation, staggered entrances, `prefers-reduced-motion`. Consult it alongside `src/lib/motion.ts` (which already implements most of these conventions) when adding new animated components.
