"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { GalleryShot, Project } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import TiltCard from "@/components/ui/TiltCard";
import Footer from "@/components/sections/Footer";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

/* Resolve a tailwind-ish gradient name (e.g. "from-sky-500 to-indigo-600")
   to two CSS color stops — mirrors the mapping used on the project cards. */
const GRADIENTS: Record<string, string> = {
  indigo: "#6366f1, #8b5cf6",
  violet: "#8b5cf6, #a855f7",
  sky: "#0ea5e9, #6366f1",
  emerald: "#10b981, #14b8a6",
  amber: "#f59e0b, #f97316",
  rose: "#f43f5e, #ec4899",
};
function gradientStops(gradient: string): string {
  const key = Object.keys(GRADIENTS).find((k) => gradient.includes(k)) ?? "indigo";
  return GRADIENTS[key];
}

/* ─── Small building blocks ──────────────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-10">
      <p className="text-eyebrow mb-3" style={{ color: "#6366f1" }}>
        {eyebrow}
      </p>
      <h2 className="text-display" style={{ color: "var(--ph-t0)" }}>
        {title}
      </h2>
    </Reveal>
  );
}

const PlaceholderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5L5 20" />
  </svg>
);

/* A macOS-style browser window used to frame web screenshots. */
function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--ph-glass-border)",
        boxShadow: "var(--ph-card-shadow-hover)",
        background: "var(--ph-surface)",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-4"
        style={{ height: 36, borderBottom: "1px solid var(--ph-border-subtle)", background: "var(--ph-surface-2)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <div className="ml-3 hidden sm:block h-4 flex-1 max-w-[55%] rounded-full" style={{ background: "var(--ph-glass-border)" }} />
      </div>
      {children}
    </div>
  );
}

/* A screenshot slot. Web shots sit inside a browser frame at the screenshots'
   native ~7:5 ratio (no awkward cropping); mobile shots are clean portrait
   tiles. Empty src → branded gradient placeholder. Captions are rendered by
   the caller, beneath the figure. */
function Shot({
  shot,
  gradient,
  className = "",
  media = "web",
}: {
  shot: GalleryShot;
  gradient: string;
  className?: string;
  media?: "web" | "mobile";
}) {
  const stops = gradientStops(gradient);

  const placeholder = (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
      style={{ background: `linear-gradient(135deg, ${stops})` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <span className="relative z-10" style={{ color: "rgba(255,255,255,0.92)" }}>{PlaceholderIcon}</span>
      <span className="relative z-10 text-meta" style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>{shot.caption}</span>
    </div>
  );

  if (media === "mobile") {
    return (
      <figure
        className={`group relative overflow-hidden rounded-3xl ${className}`}
        style={{ border: "1px solid var(--ph-glass-border)", background: `linear-gradient(135deg, ${stops})` }}
      >
        {shot.src ? (
          <Image
            src={shot.src}
            alt={shot.caption}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          placeholder
        )}
      </figure>
    );
  }

  return (
    <figure className={`group ${className}`}>
      <BrowserChrome>
        <div className="relative aspect-7/5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${stops})` }}>
          {shot.src ? (
            <Image
              src={shot.src}
              alt={shot.caption}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            placeholder
          )}
        </div>
      </BrowserChrome>
    </figure>
  );
}

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#6366f1" }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function ProjectCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const stops = gradientStops(project.gradient);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on the hero image as the page scrolls.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

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
          href="/#projects"
          className="flex items-center gap-2 group"
          style={{ color: "var(--ph-t2)" }}
          data-cursor-text="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 500 }}>
            All projects
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
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-20 left-[5%] w-125 h-125 rounded-full blur-[120px]"
            style={{ background: `radial-gradient(circle, ${stops.split(",")[0]}22 0%, transparent 70%)` }}
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

        <div className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          {/* Eyebrow: subtitle · period */}
          <motion.div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="text-eyebrow px-2.5 py-1 rounded-full"
              style={{ background: "var(--ph-badge-bg)", border: "1px solid var(--ph-badge-border)", color: "var(--ph-badge-text)" }}
            >
              {project.kind}
            </span>
            <span className="text-eyebrow" style={{ color: "#6366f1" }}>{project.subtitle}</span>
            <span style={{ color: "var(--ph-t5)" }}>•</span>
            <span className="text-eyebrow" style={{ color: "var(--ph-t4)" }}>{project.period}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-hero mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--ph-t0)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
          >
            {project.title}
          </motion.h1>

          {/* Summary */}
          <motion.p
            className="text-body max-w-2xl mb-8"
            style={{ color: "var(--ph-t3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {project.summary}
          </motion.p>

          {/* Meta row: role + links */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-meta"
              style={{ background: "var(--ph-badge-bg)", border: "1px solid var(--ph-badge-border)", color: "var(--ph-badge-text)" }}
            >
              {project.role}
            </span>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="Visit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full transition-transform duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.85rem", boxShadow: "0 8px 24px rgba(99,102,241,0.32)" }}
              >
                Visit live site
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="Code"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300"
                style={{ background: "var(--ph-surface)", border: "1px solid var(--ph-border-medium)", color: "var(--ph-t2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.85rem" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Source code
              </a>
            )}
          </motion.div>
        </div>

        {/* Hero image */}
        <div className="relative max-w-6xl mx-auto px-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
            style={{ y: imgY }}
          >
            <TiltCard maxAngle={5} glare strength={0.4} className="rounded-3xl">
              <motion.div style={{ scale: imgScale }}>
                {project.image ? (
                  project.media === "mobile" ? (
                    <div
                      className="relative aspect-video w-full overflow-hidden rounded-3xl flex items-center justify-center"
                      style={{ border: "1px solid var(--ph-glass-border)", boxShadow: "var(--ph-card-shadow-hover)", background: `linear-gradient(135deg, ${stops})` }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
                      />
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={508}
                        height={1100}
                        priority
                        sizes="(max-width: 768px) 60vw, 360px"
                        className="relative z-10 max-h-[88%] w-auto h-auto object-contain rounded-3xl"
                        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.12)" }}
                      />
                    </div>
                  ) : (
                    <BrowserChrome>
                      <div className="relative aspect-7/5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${stops})` }}>
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 900px"
                          className="object-cover object-top"
                        />
                      </div>
                    </BrowserChrome>
                  )
                ) : (
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-3xl flex items-center justify-center"
                    style={{ border: "1px solid var(--ph-glass-border)", boxShadow: "var(--ph-card-shadow-hover)", background: `linear-gradient(135deg, ${stops})` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
                    />
                    <span
                      className="relative z-10 select-none"
                      style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(4rem, 12vw, 9rem)", color: "rgba(255,255,255,0.95)", textShadow: "0 4px 40px rgba(0,0,0,0.3)" }}
                    >
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Overview ────────────────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionLabel eyebrow="01 — Overview" title="The project" />
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="text-body" style={{ color: "var(--ph-t2)", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: 1.7 }}>
                {project.overview}
              </p>
            </Reveal>
            {/* Quick facts */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { label: "Role", value: project.role },
                  { label: "Timeline", value: project.period },
                  { label: "Stack", value: `${project.tags.length} technologies` },
                ].map((f) => (
                  <div key={f.label} className="glass-card p-5">
                    <p className="text-eyebrow mb-2" style={{ color: "var(--ph-t4)" }}>{f.label}</p>
                    <p className="text-meta" style={{ color: "var(--ph-t1)", fontWeight: 600 }}>{f.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Problem & Solution ──────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="02 — Context" title="Problem & approach" />
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth={1.8} className="w-4.5 h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                  </span>
                  <h3 className="text-heading" style={{ color: "var(--ph-t0)" }}>The problem</h3>
                </div>
                <p className="text-body" style={{ color: "var(--ph-t3)" }}>{project.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={1.8} className="w-4.5 h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 13.5l2 2 3.5-4M12 3l1.9 3.9 4.3.6-3.1 3 .7 4.3L12 16.8l-3.8 2 .7-4.3-3.1-3 4.3-.6L12 3z" /></svg>
                  </span>
                  <h3 className="text-heading" style={{ color: "var(--ph-t0)" }}>My approach</h3>
                </div>
                <p className="text-body" style={{ color: "var(--ph-t3)" }}>{project.solution}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="03 — Showcase" title="A closer look" />
          {project.media === "mobile" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-7 max-w-3xl mx-auto">
              {project.gallery.map((shot, i) => (
                <Reveal key={shot.caption} delay={0.06 * i}>
                  <Shot shot={shot} gradient={project.gradient} media="mobile" className="aspect-9/19" />
                  <p className="text-meta mt-3 text-center px-1" style={{ color: "var(--ph-t4)" }}>{shot.caption}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured shot — full width */}
              <Reveal>
                <Shot shot={project.gallery[0]} gradient={project.gradient} media="web" />
                <p className="text-meta mt-3" style={{ color: "var(--ph-t4)" }}>{project.gallery[0].caption}</p>
              </Reveal>
              {/* Remaining shots — two up */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {project.gallery.slice(1).map((shot, i) => (
                  <Reveal key={shot.caption} delay={0.08 * (i + 1)}>
                    <Shot shot={shot} gradient={project.gradient} media="web" />
                    <p className="text-meta mt-3" style={{ color: "var(--ph-t4)" }}>{shot.caption}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Key features ────────────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="04 — Capabilities" title="Key features" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.features.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * i}>
                <div className="glass-card glass-card-hover p-6 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm"
                    style={{ background: `linear-gradient(135deg, ${stops})`, color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-title mb-2" style={{ color: "var(--ph-t0)" }}>{f.title}</h3>
                  <p className="text-meta leading-relaxed" style={{ color: "var(--ph-t3)" }}>{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── My role / contributions ─────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionLabel eyebrow="05 — Contribution" title="My role" />
            <Reveal>
              <p className="text-body" style={{ color: "var(--ph-t3)" }}>
                As <span style={{ color: "var(--ph-t1)", fontWeight: 600 }}>{project.role}</span>, here is exactly what I owned and delivered on this project.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal>
              <ul className="glass-card p-8 space-y-4">
                {project.contributions.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-body" style={{ color: "var(--ph-t2)" }}>
                    {CheckIcon}
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Challenges & solutions ──────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="06 — Engineering" title="Challenges I solved" />
          <div className="space-y-5">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="glass-card p-0 overflow-hidden grid md:grid-cols-2">
                  {/* Divider sits between the two halves: a bottom border when
                      stacked (mobile), a right border when side-by-side (md). */}
                  <div
                    className="p-6 sm:p-7 md:p-8 border-b md:border-b-0 md:border-r"
                    style={{ borderColor: "var(--ph-border-subtle)" }}
                  >
                    <p className="text-eyebrow mb-3" style={{ color: "#f43f5e" }}>Challenge</p>
                    <p className="text-body" style={{ color: "var(--ph-t2)" }}>{c.challenge}</p>
                  </div>
                  <div className="p-6 sm:p-7 md:p-8" style={{ background: "var(--ph-surface-2)" }}>
                    <p className="text-eyebrow mb-3" style={{ color: "#10b981" }}>Solution</p>
                    <p className="text-body" style={{ color: "var(--ph-t2)" }}>{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ──────────────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="07 — Toolbox" title="Built with" />
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-meta"
                  style={{ background: "var(--ph-badge-bg)", border: "1px solid var(--ph-badge-border)", color: "var(--ph-badge-text)", fontWeight: 600 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Outcomes ────────────────────────────────────────────────────────── */}
      <section className="relative section-padding overflow-hidden" style={{ background: "var(--ph-bg-1)" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 blur-[130px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${stops.split(",")[0]}1f 0%, transparent 70%)` }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <SectionLabel eyebrow="08 — Impact" title="Outcomes" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={0.08 * i}>
                <div className="glass-card p-8 text-center h-full">
                  <div
                    className="gradient-text mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", lineHeight: 1.1 }}
                  >
                    {o.value}
                  </div>
                  <p className="text-meta" style={{ color: "var(--ph-t3)" }}>{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next project + CTA ──────────────────────────────────────────────── */}
      <section className="relative section-padding" style={{ background: "var(--ph-bg-0)" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {/* Next project */}
          <Reveal>
            <Link
              href={`/projects/${next.slug}`}
              data-cursor-text="Open"
              className="group block glass-card glass-card-hover p-8 h-full"
            >
              <p className="text-eyebrow mb-4" style={{ color: "var(--ph-t4)" }}>Next project</p>
              <h3 className="text-heading mb-1 flex items-center gap-2" style={{ color: "var(--ph-t0)" }}>
                {next.title}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: "#6366f1" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </h3>
              <p className="text-meta" style={{ color: "var(--ph-t3)" }}>{next.subtitle}</p>
            </Link>
          </Reveal>

          {/* Contact CTA */}
          <Reveal delay={0.1}>
            <div
              className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <h3 className="text-heading mb-2" style={{ color: "#fff", fontFamily: "var(--font-heading)" }}>
                Want something like this built?
              </h3>
              <p className="text-meta mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                {/* Job-seeker copy (kept, commented out): I'm open to new opportunities. Let's build something great together. */}
                I&apos;m available for freelance work. Let&apos;s build yours.
              </p>
              <Link
                href="/#contact"
                data-cursor-text="Hire me"
                className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full transition-transform duration-300 hover:scale-105"
                style={{ background: "#fff", color: "#4f46e5", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.85rem" }}
              >
                {/* Job-seeker copy (kept, commented out): Get in touch */}
                Hire me
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
