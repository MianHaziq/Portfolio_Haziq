"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");

      const section = sectionRef.current;
      const line = timelineLineRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
        // Timeline line — draws from top with scrub
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
              },
            }
          );
        }

        // Experience cards — alternate slide-in from left/right
        const cards = section.querySelectorAll<HTMLElement>(".exp-card");
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Timeline dots — pulse animation when in view
        const dots = section.querySelectorAll<HTMLElement>(".timeline-dot");
        dots.forEach((dot) => {
          ScrollTrigger.create({
            trigger: dot,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.fromTo(
                dot,
                { scale: 0, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.4,
                  ease: "back.out(2)",
                  onComplete: () => {
                    // Subtle repeating pulse
                    gsap.to(dot, {
                      boxShadow: "0 0 24px rgba(99,102,241,0.9)",
                      repeat: -1,
                      yoyo: true,
                      duration: 1.2,
                      ease: "power1.inOut",
                    });
                  },
                }
              );
            },
            onLeaveBack: () => {
              gsap.killTweensOf(dot);
              gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
            },
          });
        });

        ScrollTrigger.refresh();
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)",
        }}
      />

      {/* Background orb left */}
      <div
        className="absolute top-1/2 left-0 w-100 h-100 -translate-y-1/2 blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="My Journey"
            title="Work"
            accent="Experience"
            align="center"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — draws on scroll via scrub */}
          <div
            ref={timelineLineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(180deg, #6366f1, #8b5cf6, rgba(139,92,246,0))",
              marginLeft: "-0.5px",
              transform: "scaleY(0)",
              willChange: "transform",
            }}
          />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-6 md:gap-0`}
                >
                  {/* Timeline dot */}
                  <div
                    className="timeline-dot absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 top-7 md:top-auto"
                    style={{
                      background: "#6366f1",
                      boxShadow: "0 0 16px rgba(99, 102, 241, 0.6)",
                      border: "2px solid rgba(10, 10, 15, 1)",
                      willChange: "transform, box-shadow",
                      opacity: 0,
                    }}
                  />

                  {/* Left spacer on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div
                    className={`exp-card ml-14 md:ml-0 w-full md:w-1/2 ${
                      isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                    style={{ opacity: 0, willChange: "transform" }}
                  >
                    <div
                      className="glass-card p-6 group hover:border-[rgba(99,102,241,0.2)] transition-all duration-300"
                      style={{ background: "rgba(255,255,255,0.025)" }}
                    >
                      {/* Period badge */}
                      <div className="mb-4">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: "rgba(99, 102, 241, 0.1)",
                            color: "#818cf8",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3
                        className="text-title mb-1"
                        style={{ color: "#f8fafc", fontFamily: "var(--font-heading)" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-meta mb-3"
                        style={{
                          color: "#6366f1",
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                        }}
                      >
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p
                        className="text-meta leading-relaxed mb-4"
                        style={{
                          color: "#64748b",
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                        }}
                      >
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, hi) => (
                          <li
                            key={hi}
                            className="flex items-start gap-2 text-meta"
                            style={{ color: "#94a3b8", fontFamily: "var(--font-body)" }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: "#6366f1" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
