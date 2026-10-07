import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/projects/' },
  title: 'Projects',
  description: 'Explore CTR Infrastructure project case studies across commercial, residential, institutional, hospitality, and infrastructure sectors in South India.',
  openGraph: {
    url: '/projects/',
    title: 'Projects | CTR Infrastructure',
    description: 'Explore project case studies across commercial, residential, institutional, hospitality, and infrastructure sectors.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
