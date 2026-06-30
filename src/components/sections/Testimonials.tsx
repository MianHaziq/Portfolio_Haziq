"use client";

import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

/* Accent → two CSS color stops, mirroring the project palette used site-wide. */
const ACCENTS: Record<Testimonial["accent"], string> = {
  sky: "#0ea5e9, #6366f1",
  emerald: "#10b981, #14b8a6",
  amber: "#f59e0b, #f97316",
  violet: "#8b5cf6, #a855f7",
  rose: "#f43f5e, #ec4899",
  indigo: "#6366f1, #8b5cf6",
};

const VerifiedBadge = (
  <span className="inline-flex items-center gap-1 text-eyebrow" style={{ color: "#10b981" }}>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2l2.4 1.8 3-.2 1 2.8 2.6 1.6-1 2.8 1 2.8-2.6 1.6-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3 16l1-2.8L3 10.4l2.6-1.6 1-2.8 3 .2L12 2zm-1.2 13.2l5-5-1.4-1.4-3.6 3.6-1.8-1.8L7.6 12l3.2 3.2z" />
    </svg>
    Verified
  </span>
);

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "var(--ph-border-strong)"}
          strokeWidth={1.5}
          className="w-[1.05rem] h-[1.05rem]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5l2.31 4.68 5.17.75-3.74 3.64.88 5.15-4.62-2.43-4.62 2.43.88-5.15-3.74-3.64 5.17-.75L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const stops = ACCENTS[t.accent];
  return (
    <figure
      className="solid-card group relative flex w-[300px] sm:w-[360px] shrink-0 flex-col rounded-2xl p-6 transition-colors duration-300"
      style={{ border: "1px solid var(--ph-glass-border)" }}
    >
      {/* Top: rating + verified */}
      <div className="flex items-center justify-between mb-4">
        <Stars rating={t.rating} />
        {VerifiedBadge}
      </div>

      <blockquote
        className="flex-1 mb-6"
        style={{ color: "var(--ph-t2)", fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.7 }}
      >
        “{t.quote}”
      </blockquote>

      {/* Author */}
      <figcaption className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid var(--ph-border-subtle)" }}>
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-base shrink-0"
          style={{
            background: `linear-gradient(135deg, ${stops})`,
            color: "#fff",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            boxShadow: `0 6px 16px ${stops.split(",")[0]}55`,
          }}
        >
          {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-meta truncate" style={{ color: "var(--ph-t1)", fontWeight: 600 }}>{t.name}</p>
          <p className="text-eyebrow truncate" style={{ color: "var(--ph-t4)" }}>{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / (testimonials.length || 1);
  // Duplicate the list so the marquee track can loop seamlessly at -50%.
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-1)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 max-w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-125 h-125 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-1) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Client Words"
            title="What People"
            accent="Say"
            description="Real outcomes and honest collaboration — a few words from the people I've built for."
            align="center"
          />
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12"
        >
          <div className="flex items-center gap-2">
            <Stars rating={Math.round(avg)} />
            <span className="text-meta" style={{ color: "var(--ph-t2)", fontWeight: 600 }}>{avg.toFixed(1)}/5 average</span>
          </div>
          <span className="hidden sm:block w-px h-5" style={{ background: "var(--ph-border)" }} />
          <span className="text-meta" style={{ color: "var(--ph-t3)" }}>{testimonials.length}+ happy clients</span>
          <span className="hidden sm:block w-px h-5" style={{ background: "var(--ph-border)" }} />
          <span className="text-meta" style={{ color: "var(--ph-t3)" }}>On-time delivery</span>
        </motion.div>
      </div>

      {/* Infinite marquee — full-bleed, edge-faded, pauses on hover */}
      <div
        className="ph-marquee relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="ph-marquee-track flex w-max gap-5" style={{ "--marquee-duration": "52s" } as React.CSSProperties}>
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
