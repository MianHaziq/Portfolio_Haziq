import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug, getNextProject } from "@/lib/data";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectCaseStudy from "@/components/case-study/ProjectCaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found — Haziq Nazeer" };

  return {
    title: `${project.title} — ${project.subtitle} · Haziq Nazeer`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <>
      {/* Reading progress bar for the case-study route. */}
      <ScrollProgress />
      <ProjectCaseStudy project={project} next={next} />
    </>
  );
}
