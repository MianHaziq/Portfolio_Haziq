import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  projects,
  getProjectBySlug,
  getNextProject,
  SITE_URL,
} from "@/lib/data";
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
  if (!project) return { title: "Project not found" };

  const path = `/projects/${slug}`;
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.summary,
      url: path,
      type: "article",
      // og image supplied automatically by ./opengraph-image.tsx
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
  const path = `${SITE_URL}/projects/${slug}`;

  // Per-project structured data: the case study as a CreativeWork authored by
  // Haziq, plus breadcrumbs for the Home › Projects › <project> trail.
  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${path}#project`,
    name: `${project.title} — ${project.subtitle}`,
    headline: project.title,
    description: project.summary,
    url: path,
    // Social/preview image for the case study (the generated per-project OG).
    image: `${path}/opengraph-image`,
    keywords: project.tags.join(", "),
    about: project.tags,
    ...(project.live ? { sameAs: project.live } : {}),
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE_URL}/projects`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: path },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([creativeWorkLd, breadcrumbLd]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      {/* Reading progress bar for the case-study route. */}
      <ScrollProgress />
      <ProjectCaseStudy project={project} next={next} />
    </>
  );
}
