import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/ProjectDetail';
import { completeProjects } from '@/data/projectCatalog';

export function generateStaticParams() {
  return completeProjects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = completeProjects.find((item) => item.id === params.slug);
  return {
    title: project ? `${project.title} | Projects` : 'Project | CTR Infrastructure',
    description: project?.description,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = completeProjects.find((item) => item.id === params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
