'use client';

import { SiteHeader } from '@/components/SiteHeader';
import { PageTransition } from '@/components/PageTransition';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <StickyMobileCTA />
    </>
  );
}
