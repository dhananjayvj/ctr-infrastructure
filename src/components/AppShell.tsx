'use client';

import { SiteHeader } from '@/components/SiteHeader';
import { PageTransition } from '@/components/PageTransition';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { InitialLoader } from '@/components/InitialLoader';
import { SmoothScroll } from '@/components/SmoothScroll';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <InitialLoader />
      <SmoothScroll />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <StickyMobileCTA />
    </>
  );
}
