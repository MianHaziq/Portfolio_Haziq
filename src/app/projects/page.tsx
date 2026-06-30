import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import AllProjects from "@/components/AllProjects";

export const metadata: Metadata = {
  title: "All Projects — Haziq Nazeer",
  description:
    "The full catalogue of production systems Haziq Nazeer has shipped — full-stack platforms, scalable backends and client web work.",
  openGraph: {
    title: "All Projects — Haziq Nazeer",
    description:
      "The full catalogue of production systems Haziq Nazeer has shipped — full-stack platforms, scalable backends and client web work.",
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
