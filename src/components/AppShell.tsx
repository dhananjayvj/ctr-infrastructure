'use client';

import { SiteHeader } from '@/components/SiteHeader';
import { PageTransition } from '@/components/PageTransition';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
