import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy/' },
  title: 'Privacy Policy',
  description: 'How CTR Infrastructure collects, uses, and protects personal information submitted through this website.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: { url: '/privacy/', title: 'Privacy Policy | CTR Infrastructure' },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
