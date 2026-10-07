import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/faq/' },
  title: 'FAQs',
  description: 'Answers to common questions about CTR Infrastructure’s architecture and infrastructure services, project timelines, coverage area, and enquiry response times.',
  openGraph: {
    url: '/faq/',
    title: 'Frequently Asked Questions | CTR Infrastructure',
    description: 'Answers to common questions about our architecture and infrastructure services, timelines, and how to get started.',
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
