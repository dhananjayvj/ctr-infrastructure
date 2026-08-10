import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your enquiry has been received by CTR Infrastructure.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
