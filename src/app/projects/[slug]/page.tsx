import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/ProjectDetail';
import { completeProjects } from '@/data/projectCatalog';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return completeProjects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = completeProjects.find((item) => item.id === params.slug);
  return {
    title: project ? `${project.title} | Projects` : 'Project | CTR Infrastructure',
    description: project?.description,
    alternates: project ? { canonical: `${SITE_URL}/projects/${project.id}/` } : undefined,
    openGraph: project ? {
      type: 'article',
      url: `${SITE_URL}/projects/${project.id}/`,
      title: `${project.title} | CTR Infrastructure`,
      description: project.description,
      images: project.cover ? [project.cover] : undefined,
    } : undefined,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = completeProjects.find((item) => item.id === params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
