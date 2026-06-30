"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/sections/ProjectCard";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/sections/Footer";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

export default function AllProjects() {
  const groups = [
    { eyebrow: "Full-stack", title: "Platforms & web apps", items: projects.filter((p) => p.kind === "Full-stack") },
    { eyebrow: "Backend", title: "Backends built to scale", items: projects.filter((p) => p.kind === "Backend") },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--ph-bg-0)" }}>
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-900 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          background: "var(--ph-nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--ph-border-subtle)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 group"
          style={{ color: "var(--ph-t2)" }}
          data-cursor-text="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 500 }}>
            Home
          </span>
        </Link>

        <Link href="/" className="flex items-center gap-2" data-cursor-text="Home">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            H
          </div>
          <span
            className="hidden sm:block"
            style={{ color: "var(--ph-t0)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem" }}
          >
            Haziq Nazeer
          </span>
        </Link>

        <ThemeToggle />
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 left-[5%] w-125 h-125 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, #6366f122 0%, transparent 70%)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(var(--ph-dot-color) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-10">
          <motion.p
            className="text-eyebrow mb-4"
            style={{ color: "#6366f1" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            The full catalogue
          </motion.p>
          <motion.h1
            className="text-hero mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--ph-t0)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
          >
            All projects
          </motion.h1>
          <motion.p
            className="text-body max-w-2xl"
            style={{ color: "var(--ph-t3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Every production system I&apos;ve shipped — full-stack platforms and the scalable
            backends behind them, plus the client work in between. Tap any card for the full case study.
          </motion.p>
        </div>
      </section>

      {/* ── Catalogue ───────────────────────────────────────────────────────── */}
      <section className="relative section-padding pt-4" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {groups.map((group, gi) => (
            <div key={group.eyebrow} className="mb-20 last:mb-0">
              <div className="mb-10">
                <p className="text-eyebrow mb-3" style={{ color: "#6366f1" }}>{group.eyebrow}</p>
                <h2 className="text-display" style={{ color: "var(--ph-t0)" }}>{group.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {group.items.map((project, i) => (
                  // Offset the reveal index by prior group sizes so stagger stays coherent.
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={(gi === 0 ? 0 : groups[0].items.length) + i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
