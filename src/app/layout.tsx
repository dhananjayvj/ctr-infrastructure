import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { AppShell } from '@/components/AppShell';
import { SITE_URL } from '@/lib/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CTR Infrastructure | Architecture & Design Excellence',
    template: '%s | CTR Infrastructure',
  },
  description: 'CTR Infrastructure is a South India architecture and infrastructure firm specializing in commercial, residential, institutional, and engineering projects across Tamil Nadu and Karnataka.',
  keywords: [
    'architecture',
    'infrastructure',
    'design',
    'construction',
    'urban planning',
    'commercial architecture',
    'residential design',
    'building design',
    'architectural firm',
    'CTR Infrastructure',
    'architects in Tamil Nadu',
    'architects in Karnataka',
    'South India infrastructure design',
  ],
  authors: [{ name: 'CTR Infrastructure' }],
  creator: 'CTR Infrastructure',
  publisher: 'CTR Infrastructure',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'CTR Infrastructure',
    title: 'CTR Infrastructure | Architecture & Design Excellence',
    description: 'Architecture and infrastructure projects across Tamil Nadu, Karnataka, and South India.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CTR Infrastructure - Architecture & Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTR Infrastructure | Architecture & Design Excellence',
    description: 'Creating extraordinary spaces that define cities and inspire communities.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
