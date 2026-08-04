'use client';

import { Box } from '@chakra-ui/react';
import { SiteHeader } from '@/components/SiteHeader';
import { PageTransition } from '@/components/PageTransition';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Box className="grain-overlay" aria-hidden />
      <SiteHeader ctaHref="/#contact" />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
