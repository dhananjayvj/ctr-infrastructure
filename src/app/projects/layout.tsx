import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore our portfolio of award-winning architectural and infrastructure projects. Commercial, residential, and public sector developments across Canada.',
  openGraph: {
    title: 'Projects | CTR Infrastructure',
    description: 'Explore our portfolio of award-winning architectural and infrastructure projects.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

