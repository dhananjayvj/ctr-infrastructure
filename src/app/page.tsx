import type { Metadata } from 'next';
import { HomePageContent } from '@/components/HomePageContent';

export const metadata: Metadata = {
  title: 'Architecture & Infrastructure Design Across South India',
  description: 'CTR Infrastructure provides architecture, infrastructure engineering, and urban planning across Tamil Nadu and Karnataka.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Architecture & Infrastructure Design Across South India | CTR Infrastructure',
    description: 'Architecture, infrastructure engineering, and urban planning across Tamil Nadu and Karnataka.',
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
