"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/data";
import TiltCard from "@/components/ui/TiltCard";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      const card = cardRef.current;
      if (!card) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: (index % 2) * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, card);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [index]);

  const handleMouseEnter = async () => {
    setHovered(true);
    const bar = topBarRef.current;
    if (!bar) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(bar, { scaleX: 1.03, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = async () => {
    setHovered(false);
    const bar = topBarRef.current;
    if (!bar) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(bar, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  };

  const GRADIENTS: Record<string, string> = {
    indigo: "#6366f1, #8b5cf6",
    violet: "#8b5cf6, #a855f7",
    sky: "#0ea5e9, #6366f1",
    emerald: "#10b981, #14b8a6",
    amber: "#f59e0b, #f97316",
    rose: "#f43f5e, #ec4899",
  };
  const gradientKey =
    Object.keys(GRADIENTS).find((k) => project.gradient.includes(k)) ?? "indigo";
  const gradientColors = GRADIENTS[gradientKey];

  return (
    <TiltCard maxAngle={8} glare strength={0.7} className="flex flex-col h-full">
      <article
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative glass-card overflow-hidden flex flex-col h-full"
        style={{
          opacity: 0,
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          borderColor: hovered ? "rgba(99,102,241,0.25)" : "var(--ph-glass-border)",
          boxShadow: hovered ? "var(--ph-card-shadow-hover)" : "var(--ph-card-shadow)",
        }}
      >
        {/* Top gradient bar */}
        <div
          ref={topBarRef}
          className="h-1 w-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${gradientColors})`,
          }}
        />

        {/* Media — screenshot if provided, branded gradient placeholder otherwise */}
        <div
          className="relative w-full aspect-video overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${gradientColors})` }}
        >
          {project.image ? (
            project.media === "mobile" ? (
              // Portrait phone screenshot — float it as a centered product shot
              // so it never gets sliced into the widescreen card.
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <Image
                  src={project.image}
                  alt={`${project.title} app screenshot`}
                  width={508}
                  height={1100}
                  sizes="(max-width: 768px) 40vw, 240px"
                  className="absolute left-1/2 top-6 w-2/5 h-auto rounded-2xl transition-transform duration-500"
                  style={{
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
                    transform: hovered ? "translateX(-50%) scale(1.04)" : "translateX(-50%) scale(1)",
                  }}
                />
              </>
            ) : (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-top transition-transform duration-500"
                style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
              />
            )
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 20px rgba(0,0,0,0.25)",
                }}
              >
                {project.title.charAt(0)}
              </span>
            </>
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.28) 100%)",
            }}
          />

          {/* Kind badge (Full-stack / Backend) */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-eyebrow"
            style={{
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
            }}
          >
            {project.kind}
          </span>
        </div>

        {/* Whole-card link to the case study. Absolute overlay (z-20) keeps it a
            real <a> without nesting inside the github/live anchors (z-30). */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View the ${project.title} case study`}
          data-cursor-text="View"
          className="absolute inset-0 z-20"
        />

        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
              style={{
                background: "var(--ph-icon-bg)",
                border: "1px solid var(--ph-icon-border)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-5 h-5"
                style={{ color: "#6366f1" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
            </div>

            {/* Links — only render those that exist. relative z-30 sits above
                the whole-card overlay link so these stay clickable. */}
            <div className="relative z-30 flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--ph-icon-bg)", color: "var(--ph-t3)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--ph-t0)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--ph-t3)")
                  }
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--ph-icon-bg)", color: "var(--ph-t3)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#6366f1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--ph-t3)")
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Role */}
          <span
            className="text-eyebrow mb-1.5"
            style={{ color: "#6366f1", fontFamily: "var(--font-heading)" }}
          >
            {project.role}
          </span>

          {/* Title */}
          <h3
            className="text-title mb-1 transition-colors duration-300"
            style={{
              color: hovered ? "var(--ph-t0)" : "var(--ph-t1)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-meta mb-3"
            style={{ color: "var(--ph-t4)", fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-meta leading-relaxed flex-1 mb-5"
            style={{ color: "var(--ph-t3)", fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-eyebrow"
                style={{
                  background: "var(--ph-badge-bg)",
                  color: "var(--ph-badge-text)",
                  border: "1px solid var(--ph-badge-border)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View case study affordance — overlay link above handles the click */}
          <div
            className="mt-5 pt-4 flex items-center gap-1.5 text-eyebrow"
            style={{
              borderTop: "1px solid var(--ph-border-subtle)",
              color: hovered ? "#818cf8" : "#6366f1",
              fontFamily: "var(--font-heading)",
              transition: "color 0.3s ease",
            }}
          >
            View case study
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-3.5 h-3.5"
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
