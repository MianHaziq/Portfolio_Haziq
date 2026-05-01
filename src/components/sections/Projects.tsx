"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut" as const,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass-card overflow-hidden flex flex-col"
      style={{
        transition: "all 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        borderColor: hovered ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 20px 60px rgba(99,102,241,0.12), 0 8px 24px rgba(0,0,0,0.3)"
          : "none",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${
            project.gradient.includes("indigo")
              ? "#6366f1, #8b5cf6"
              : project.gradient.includes("violet")
              ? "#8b5cf6, #a855f7"
              : project.gradient.includes("sky")
              ? "#0ea5e9, #6366f1"
              : "#f43f5e, #ec4899"
          })`,
        }}
      />

      {/* Hover background glow */}
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
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
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

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#64748b",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#f8fafc")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#64748b")
              }
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#64748b",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#6366f1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#64748b")
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
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-title mb-2 transition-colors duration-300"
          style={{
            color: hovered ? "#f8fafc" : "#e2e8f0",
            fontFamily: "var(--font-heading)",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-meta leading-relaxed flex-1 mb-5"
          style={{ color: "#64748b", fontFamily: "var(--font-body)", fontWeight: 400 }}
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
                background: "rgba(99, 102, 241, 0.08)",
                color: "#818cf8",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                fontFamily: "var(--font-body)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0c0c14" }}
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
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="What I've Built"
            title="Featured"
            accent="Projects"
            description="A selection of projects I've built — from full-stack apps to open-source tools."
            align="center"
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/haziqnazeer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
            style={{ color: "#6366f1" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#a5b4fc")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#6366f1")
            }
          >
            View all projects on GitHub
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
