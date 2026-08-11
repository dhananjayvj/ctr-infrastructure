'use client';

import { SiteHeader } from '@/components/SiteHeader';
import { PageTransition } from '@/components/PageTransition';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { InitialLoader } from '@/components/InitialLoader';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <InitialLoader />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <StickyMobileCTA />
    </>
  );
}
