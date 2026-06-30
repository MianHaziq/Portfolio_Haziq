"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";
import ProjectCard from "@/components/sections/ProjectCard";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Projects() {
  // Home spotlights the featured work; the full catalogue (including the
  // smaller / supporting builds) lives on the dedicated /projects page.
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-1)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      {/* Background orb */}
      <div
        className="absolute top-1/2 right-0 w-125 h-125 -translate-y-1/2 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--ph-orb-1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading
            eyebrow="What I've Built"
            title="Featured"
            accent="Projects"
            description="Production systems I've built — full-stack platforms first, then the scalable backends behind them."
            align="center"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all projects → full catalogue page */}
        <div className="mt-14 flex justify-center">
          <MagneticButton>
            <Link
              href="/projects"
              data-cursor-text="Browse"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full transition-transform duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.9rem",
                boxShadow: "0 10px 30px rgba(99,102,241,0.32)",
              }}
            >
              View all projects
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-eyebrow"
                style={{ background: "rgba(255,255,255,0.22)" }}
              >
                {projects.length}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
