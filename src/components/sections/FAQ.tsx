"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { seoFaqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

/**
 * Visible FAQ accordion. Doubles as the on-page content backing the FAQPage
 * JSON-LD on the home route — Google requires the answers to be present on the
 * page, so every answer stays mounted in the DOM (SSR-rendered) and is only
 * *visually* collapsed via an animated height, never unmounted. That keeps the
 * copy crawlable while giving a smooth, premium open/close animation.
 */
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: EASE_EXPO }}
    >
      <div
        className="faq-card group relative overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: "var(--ph-glass-bg)",
          border: `1px solid ${
            isOpen ? "rgba(99,102,241,0.45)" : "var(--ph-glass-border)"
          }`,
          boxShadow: isOpen
            ? "0 20px 50px -20px rgba(99,102,241,0.45)"
            : "0 1px 0 rgba(255,255,255,0.02)",
        }}
      >
        {/* Animated left accent bar — GPU transform (scaleY), grows top→bottom */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-full"
          style={{
            background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
            transformOrigin: "top",
            transform: isOpen ? "scaleY(1)" : "scaleY(0)",
            opacity: isOpen ? 1 : 0,
            transition:
              "transform 0.52s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease",
          }}
        />

        {/* Soft top-corner highlight, brighter on hover/open */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-300"
          style={{
            opacity: isOpen ? 0.9 : 0,
            background:
              "radial-gradient(120% 90% at 15% 0%, rgba(99,102,241,0.14), transparent 70%)",
          }}
        />

        <h3 className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${index}`}
            className="relative flex w-full items-center gap-4 sm:gap-5 px-5 sm:px-7 py-5 text-left cursor-pointer"
          >
            {/* Gradient number badge */}
            <span
              className="grid place-items-center shrink-0 rounded-xl transition-all duration-300"
              style={{
                width: 38,
                height: 38,
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.82rem",
                color: isOpen ? "#fff" : "var(--ph-badge-text)",
                background: isOpen
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "var(--ph-badge-bg)",
                border: `1px solid ${
                  isOpen ? "transparent" : "var(--ph-badge-border)"
                }`,
                boxShadow: isOpen ? "0 8px 20px rgba(99,102,241,0.4)" : "none",
              }}
            >
              {num}
            </span>

            {/* Question */}
            <span
              className="flex-1 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                fontSize: "clamp(0.98rem, 1.6vw, 1.1rem)",
                lineHeight: 1.35,
                color: isOpen ? "var(--ph-t0)" : "var(--ph-t1)",
              }}
            >
              {faq.q}
            </span>

            {/* Morphing +/× toggle */}
            <span
              aria-hidden
              className="grid place-items-center shrink-0 rounded-full transition-all duration-300"
              style={{
                width: 34,
                height: 34,
                background: isOpen
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "var(--ph-surface-hover)",
                border: `1px solid ${
                  isOpen ? "transparent" : "var(--ph-glass-border)"
                }`,
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={isOpen ? "#fff" : "#6366f1"}
                strokeWidth={2.2}
                strokeLinecap="round"
                className="w-4 h-4"
                initial={false}
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{
                  duration: isOpen ? 0.52 : 0.38,
                  ease: isOpen ? [0.32, 0.72, 0, 1] : [0.4, 0, 0.2, 1],
                }}
              >
                <path d="M12 5v14M5 12h14" />
              </motion.svg>
            </span>
          </button>
        </h3>

        {/* Answer — always mounted (SEO). The reveal uses a pure-CSS
            grid-template-rows 0fr→1fr transition: no per-frame JS layout
            measurement, so it stays perfectly smooth. */}
        <div
          id={`faq-answer-${index}`}
          className="faq-answer"
          data-open={isOpen}
        >
          <div style={{ overflow: "hidden", minHeight: 0 }}>
            <div
              className="px-5 sm:px-7 pb-6 pl-5 sm:pl-[3.9rem]"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                // Synced to the panel reveal: on OPEN the content eases in a
                // beat behind the height so it arrives as space appears; on
                // CLOSE it fades out fast up-front so nothing lingers mid-collapse.
                transition: isOpen
                  ? "opacity 0.42s ease 0.12s, transform 0.52s cubic-bezier(0.32,0.72,0,1) 0.1s"
                  : "opacity 0.18s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {/* Gradient hairline divider */}
              <div
                aria-hidden
                className="mb-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.35), transparent)",
                }}
              />
              <p
                className="text-meta leading-relaxed"
                style={{ color: "var(--ph-t3)", fontFamily: "var(--font-body)" }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  // Independent items: each expands/collapses on its own so opening one never
  // shifts the others' positions — the clicked item stays put and only reveals
  // downward. First item open by default so the section reads as populated.
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section
      id="faq"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-0)" }}
    >
      {/* Ambient depth orbs */}
      <div
        className="absolute top-1/4 -left-20 w-125 h-125 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-125 h-125 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--ph-orb-2) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently Asked"
            accent="Questions"
            description="What I do, the stack I work in, and how to start a project."
            align="center"
          />
        </div>

        <div className="flex flex-col gap-3.5">
          {seoFaqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
