"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { siteConfig } from "@/lib/data";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

type Presence = {
  name: string;
  handle: string;
  blurb: string;
  href: string;
  accent: string;
  tint: string;
  external: boolean;
  icon: React.ReactNode;
};

const links: Presence[] = [
  {
    name: "GitHub",
    handle: siteConfig.githubHandle,
    blurb: "Source code, open source & commit history",
    href: siteConfig.github,
    accent: "var(--ph-t0)",
    tint: "rgba(148, 163, 184, 0.14)",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Muhammad Haziq Nazeer",
    blurb: "Experience, recommendations & network",
    href: siteConfig.linkedin,
    accent: "#0A66C2",
    tint: "rgba(10, 102, 194, 0.14)",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: siteConfig.email,
    blurb: "Direct line — I reply within a day",
    href: `mailto:${siteConfig.email}`,
    accent: "#6366f1",
    tint: "rgba(99, 102, 241, 0.14)",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Presence() {
  return (
    <section
      id="presence"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-0)" }}
    >
      {/* Top divider — matches the site's section rhythm */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Ambient orb */}
      <div
        className="absolute top-1/3 right-0 w-125 h-125 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-2) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Verified Online"
            title="Find Me"
            accent="Everywhere"
            description="Search my name and even Google's AI knows who I am — here's how it describes me, and the real profiles behind the work."
            align="center"
          />
        </div>

        {/* Google AI Overview — verbatim quote of how Google's AI describes me
            (captured from a live "who is muhammad haziq nazeer" search). */}
        <motion.figure
          className="glass-card relative overflow-hidden max-w-3xl mx-auto p-7 md:p-9 mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
        >
          {/* Soft brand wash */}
          <span
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)" }}
          />

          <figcaption className="flex items-center gap-3 mb-5 relative z-10">
            <span
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {/* Gemini-style sparkle */}
              <svg viewBox="0 0 24 24" fill="#fff" className="w-5 h-5">
                <path d="M12 2c.4 3.6 2.4 5.6 6 6-3.6.4-5.6 2.4-6 6-.4-3.6-2.4-5.6-6-6 3.6-.4 5.6-2.4 6-6z" />
                <path d="M19 14c.2 1.6 1 2.4 2.5 2.6-1.5.2-2.3 1-2.5 2.6-.2-1.6-1-2.4-2.5-2.6 1.5-.2 2.3-1 2.5-2.6z" opacity="0.85" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-title" style={{ color: "var(--ph-t1)", fontFamily: "var(--font-heading)" }}>
                Google AI Overview
              </p>
              <p className="text-meta truncate" style={{ color: "var(--ph-t5)" }}>
                in response to “who is muhammad haziq nazeer”
              </p>
            </div>
          </figcaption>

          <blockquote
            className="relative z-10"
            style={{
              color: "var(--ph-t2)",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.05rem, 1.6vw, 1.28rem)",
              lineHeight: 1.75,
            }}
          >
            Muhammad Haziq Nazeer is{" "}
            <span
              className="rounded px-1.5 py-0.5"
              style={{ background: "rgba(99,102,241,0.16)", color: "var(--ph-t0)" }}
            >
              a professional Software Engineer based in Lahore, Pakistan
            </span>
            . He specializes in building scalable web applications with the MERN
            stack (MongoDB, Express.js, React.js, Node.js), and is highly skilled
            in <span style={{ color: "var(--ph-t1)", fontWeight: 600 }}>TypeScript</span>{" "}
            and <span style={{ color: "var(--ph-t1)", fontWeight: 600 }}>Next.js</span>.
            He works as a Software Engineer at{" "}
            <span style={{ color: "var(--ph-t1)", fontWeight: 600 }}>Tecaudex</span>,
            a technology company based in Lahore.
          </blockquote>

          {/* Cited sources */}
          <div className="flex flex-wrap items-center gap-2 mt-6 relative z-10">
            <span className="text-meta" style={{ color: "var(--ph-t6)" }}>
              Sourced from
            </span>
            {["LinkedIn", "The Org"].map((s) => (
              <span
                key={s}
                className="text-meta px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--ph-surface)",
                  border: "1px solid var(--ph-border-medium)",
                  color: "var(--ph-t4)",
                }}
              >
                {s}
              </span>
            ))}
            <span className="text-meta" style={{ color: "var(--ph-t6)" }}>
              &amp; more
            </span>
          </div>
        </motion.figure>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={`${link.name} — ${link.handle}`}
              className="group glass-card glass-card-hover p-6 flex items-start gap-4 relative overflow-hidden"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px", amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE_EXPO }}
            >
              {/* Icon tile */}
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: link.tint, color: link.accent }}
              >
                {link.icon}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-title"
                    style={{ color: "var(--ph-t1)", fontFamily: "var(--font-heading)" }}
                  >
                    {link.name}
                  </span>
                  {/* External arrow — nudges on hover */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: link.accent }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
                  </svg>
                </div>
                <p
                  className="text-meta truncate mt-0.5"
                  style={{ color: "var(--ph-t3)" }}
                >
                  {link.handle}
                </p>
                <p className="text-meta mt-2" style={{ color: "var(--ph-t5)" }}>
                  {link.blurb}
                </p>
              </div>

              {/* Bottom accent line on hover */}
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: `linear-gradient(90deg, ${link.accent}, transparent)` }}
              />
            </motion.a>
          ))}
        </div>

        {/* Honest authenticity note — the site publishes Person structured data,
            so search engines & AI assistants can identify who I am. */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full max-w-full"
            style={{
              background: "var(--ph-badge-bg)",
              border: "1px solid var(--ph-badge-border)",
              color: "var(--ph-badge-text)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-meta" style={{ fontFamily: "var(--font-body)" }}>
              Published with verified structured data — recognizable to search engines &amp; AI assistants as a real person.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
