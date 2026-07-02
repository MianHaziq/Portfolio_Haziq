"use client";

import { useEffect, useRef } from "react";
import { techStack } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

const categoryColors: Record<string, { bg: string; border: string; glow: string }> = {
  Frontend: {
    bg: "rgba(99, 102, 241, 0.1)",
    border: "rgba(99, 102, 241, 0.3)",
    glow: "rgba(99, 102, 241, 0.15)",
  },
  Backend: {
    bg: "rgba(139, 92, 246, 0.1)",
    border: "rgba(139, 92, 246, 0.3)",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  Databases: {
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.3)",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  "Real-time & Queues": {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.3)",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  "AI APIs": {
    bg: "rgba(244, 63, 94, 0.1)",
    border: "rgba(244, 63, 94, 0.3)",
    glow: "rgba(244, 63, 94, 0.15)",
  },
  Payments: {
    bg: "rgba(20, 184, 166, 0.1)",
    border: "rgba(20, 184, 166, 0.3)",
    glow: "rgba(20, 184, 166, 0.15)",
  },
  "Cloud & Tools": {
    bg: "rgba(96, 165, 250, 0.1)",
    border: "rgba(96, 165, 250, 0.3)",
    glow: "rgba(96, 165, 250, 0.15)",
  },
};

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      const section = sectionRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
        const commonST = { start: "top 85%", toggleActions: "play none none reverse" };

        const categoryLabels = section.querySelectorAll<HTMLElement>(".category-label");
        categoryLabels.forEach((label, i) => {
          gsap.fromTo(
            label,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: i * 0.15,
              scrollTrigger: { trigger: label, ...commonST },
            }
          );
        });

        const cardGroups = section.querySelectorAll<HTMLElement>(".tech-card-group");
        cardGroups.forEach((group, gi) => {
          const cards = group.querySelectorAll<HTMLElement>(".tech-card");
          gsap.fromTo(
            cards,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.4)",
              stagger: 0.06,
              delay: gi * 0.1,
              scrollTrigger: { trigger: group, ...commonST },
            }
          );
        });
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-0)" }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading
            eyebrow="What I Use"
            title="Tech"
            accent="Stack"
            description="Tools and technologies I work with daily to build production-ready applications."
            align="center"
          />
        </div>

        <div className="space-y-10">
          {Object.entries(techStack).map(([category, items], catIndex) => {
            const colors = categoryColors[category];
            return (
              <div key={category}>
                <div
                  className="category-label flex items-center gap-3 mb-6"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: colors.border.replace("0.3", "0.9") }}
                  />
                  <h3
                    className="text-eyebrow"
                    style={{
                      color: colors.border.replace("0.3", "0.9"),
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {category}
                  </h3>
                  <div
                    className="flex-1 h-px"
                    style={{ background: colors.border.replace("0.3", "0.12") }}
                  />
                </div>

                <div
                  className="tech-card-group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
                  data-category-index={catIndex}
                >
                  {items.map((tech) => (
                    <TechCard
                      key={tech.name}
                      tech={tech}
                      colors={colors}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechCard({
  tech,
  colors,
}: {
  tech: { name: string; icon: string; mono?: boolean };
  colors: { bg: string; border: string; glow: string };
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = async () => {
    const card = cardRef.current;
    if (!card) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(card, { scale: 1.08, y: -4, duration: 0.25, ease: "power2.out" });
    const glowEl = card.querySelector<HTMLElement>(".card-glow");
    if (glowEl) gsap.to(glowEl, { opacity: 1, duration: 0.2 });
  };

  const handleMouseLeave = async () => {
    const card = cardRef.current;
    if (!card) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(card, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
    const glowEl = card.querySelector<HTMLElement>(".card-glow");
    if (glowEl) gsap.to(glowEl, { opacity: 0, duration: 0.25 });
  };

  return (
    <div
      ref={cardRef}
      className="tech-card relative glass-card p-4 flex flex-col items-center gap-2 cursor-default overflow-hidden"
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover glow */}
      <div
        className="card-glow absolute inset-0 opacity-0 rounded-2xl"
        style={{ background: colors.glow }}
      />

      {/* Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.icon}
        alt={`${tech.name} logo`}
        width={36}
        height={36}
        loading="lazy"
        className={`relative z-10 w-9 h-9 object-contain${
          tech.mono ? " tech-icon-mono" : ""
        }`}
      />

      {/* Name */}
      <span
        className="relative z-10 text-meta text-center leading-tight"
        style={{ color: "var(--ph-t2)", fontFamily: "var(--font-body)" }}
      >
        {tech.name}
      </span>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{
          background: `linear-gradient(90deg, ${colors.border.replace("0.3", "0.8")}, transparent)`,
        }}
      />
    </div>
  );
}
