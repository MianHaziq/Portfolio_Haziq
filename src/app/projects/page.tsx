import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import AllProjects from "@/components/AllProjects";

const PROJECTS_DESCRIPTION =
  "The full catalogue of production systems Haziq Nazeer has shipped — full-stack platforms, scalable backends and client web work.";

export const metadata: Metadata = {
  title: "All Projects",
  description: PROJECTS_DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "All Projects — Haziq Nazeer",
    description: PROJECTS_DESCRIPTION,
    url: "/projects",
    type: "website",
  },
};

export default function AllProjectsPage() {
  return (
    <>
      <ScrollProgress />
      <AllProjects />
    </>
  );
}
