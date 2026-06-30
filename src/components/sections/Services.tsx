"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";
import TiltCard from "@/components/ui/TiltCard";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

/* Inline icons keyed by Service.icon — single-stroke, matches the site's line style. */
const ICONS: Record<Service["icon"], React.ReactNode> = {
  backend: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7a7 3 0 0014 0 7 3 0 00-14 0v10a7 3 0 0014 0V7M5 12a7 3 0 0014 0" />
  ),
  ai: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m3.34-5.66l1.42 1.42m8.48 8.48l1.42 1.42m0-11.32l-1.42 1.42M7.76 16.24l-1.42 1.42M12 8a4 4 0 100 8 4 4 0 000-8z" />
  ),
  fullstack: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v9A2.25 2.25 0 0118.75 16.5H5.25A2.25 2.25 0 013 14.25v-9zM8 21h8m-4-4.5V21" />
  ),
  realtime: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h3l2.25-7.5L13.5 19.5l2.25-7.5h4.5" />
  ),
  performance: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
  ),
  payments: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V9zM6 15.75h3" />
  ),
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.09, ease: EASE_EXPO }}
      className="h-full"
    >
      {/* TiltCard: 3D tilt + glare on hover (GPU transforms, hover-only — zero idle cost).
          svc-card: animated gradient ring (masked → never bleeds) + glow on hover. */}
      <TiltCard maxAngle={7} glare strength={0.6} className="h-full rounded-2xl">
      <div className="svc-card group relative h-full rounded-2xl">
        {/* Card surface (opaque flat — no backdrop-filter, keeps scrolling smooth) */}
        <div
          className="solid-card relative h-full flex flex-col rounded-2xl p-7 overflow-hidden"
          style={{ border: "1px solid var(--ph-glass-border)" }}
        >
          {/* Soft top highlight for depth */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60"
            style={{ background: "radial-gradient(120% 80% at 20% 0%, rgba(99,102,241,0.10), transparent 70%)" }}
          />

          {/* Faint index numeral */}
          <span
            className="pointer-events-none absolute top-4 right-5 select-none leading-none transition-opacity duration-300 opacity-[0.06] group-hover:opacity-[0.12]"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2.75rem", color: "var(--ph-t0)" }}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Icon */}
          <div
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 22px rgba(99,102,241,0.35)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.6} className="w-6 h-6">
              {ICONS[service.icon]}
            </svg>
          </div>

          <p className="relative text-eyebrow mb-1.5" style={{ color: "#6366f1", fontFamily: "var(--font-heading)" }}>
            {service.tagline}
          </p>
          <h3 className="relative text-title mb-3" style={{ color: "var(--ph-t0)", fontFamily: "var(--font-heading)" }}>
            {service.title}
          </h3>
          <p className="relative text-meta leading-relaxed mb-5 flex-1" style={{ color: "var(--ph-t3)" }}>
            {service.description}
          </p>

          {/* Deliverables */}
          <div className="relative flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span
                key={d}
                className="px-2.5 py-0.5 rounded-full text-eyebrow"
                style={{
                  background: "var(--ph-badge-bg)",
                  color: "var(--ph-badge-text)",
                  border: "1px solid var(--ph-badge-border)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Animated gradient border ring (overlay, masked to a thin ring) */}
        <span aria-hidden className="svc-ring pointer-events-none absolute inset-0 rounded-2xl" />
      </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-0)" }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-0 w-125 h-125 -translate-y-1/2 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-125 h-125 blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-2) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading
            eyebrow="How I Can Help"
            title="What I"
            accent="Build For You"
            description="Productised services backed by real, shipped systems. Hire me for a focused build, an ongoing contract, or to rescue something that's outgrowing its codebase."
            align="center"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-meta" style={{ color: "var(--ph-t4)" }}>
            Not sure which fits? Tell me about your project and I&apos;ll scope it with you.
          </p>
          <MagneticButton>
            <Link
              href="/#contact"
              data-cursor-text="Let's talk"
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
              Start a project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
