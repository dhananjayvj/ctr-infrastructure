import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CTR Infrastructure | Architecture & Design Excellence',
    template: '%s | CTR Infrastructure',
  },
  description: 'CTR Infrastructure is a multidisciplinary architecture and infrastructure firm dedicated to creating spaces that define cities and inspire communities. Specializing in commercial, residential, and infrastructure projects.',
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
  ],
  authors: [{ name: 'CTR Infrastructure' }],
  creator: 'CTR Infrastructure',
  publisher: 'CTR Infrastructure',
  metadataBase: new URL('https://ctrinfrastructure.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrinfrastructure.com',
    siteName: 'CTR Infrastructure',
    title: 'CTR Infrastructure | Architecture & Design Excellence',
    description: 'Creating extraordinary spaces that define cities and inspire communities. Specializing in architecture, infrastructure, and urban planning.',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
