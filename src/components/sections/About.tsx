"use client";

import { useEffect, useRef } from "react";
import { siteConfig, skills } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      const bar = barRef.current;
      const fill = fillRef.current;
      if (!bar || !fill) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1,
            ease: "power3.out",
            delay: 0.1 + index * 0.07,
            scrollTrigger: {
              trigger: bar,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, bar);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [level, index]);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span
          className="text-meta font-medium"
          style={{ color: "var(--ph-t1)", fontFamily: "var(--font-body)" }}
        >
          {name}
        </span>
        <span
          className="text-meta"
          style={{ color: "#6366f1", fontFamily: "var(--font-heading)", fontWeight: 600 }}
        >
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--ph-skill-bg)" }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.5)",
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const skillsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      ctx = gsap.context(() => {
        const commonST = { start: "top 85%", toggleActions: "play none none reverse" };

        if (bioRef.current) {
          gsap.fromTo(
            bioRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: bioRef.current, ...commonST } }
          );
        }

        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll(".stat-card"),
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: statsRef.current, ...commonST },
            }
          );
        }

        if (eduRef.current) {
          gsap.fromTo(
            eduRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: eduRef.current, ...commonST } }
          );
        }

        if (skillsPanelRef.current) {
          gsap.fromTo(
            skillsPanelRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: skillsPanelRef.current, ...commonST } }
          );
        }
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="about"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-0)" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading
            eyebrow="Who I Am"
            title="About"
            accent="Me"
            align="center"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – bio & education */}
          <div className="space-y-8">
            {/* Bio card */}
            <div ref={bioRef} className="glass-card p-8" style={{ opacity: 0 }}>
              <p className="text-body mb-5" style={{ color: "var(--ph-t2)" }}>
                {siteConfig.bio}
              </p>
              <p className="text-body" style={{ color: "var(--ph-t3)" }}>
                I&apos;m equally at home on both ends of the stack. On the
                backend I love real-time pipelines, AI integrations, secure
                authentication and clean data models; on the frontend I love
                turning ideas into smooth, pixel-perfect websites with thoughtful
                motion and detail. Whether it&apos;s a streaming inference
                pipeline or a landing page that has to feel alive, I follow modern
                industry best practices, sweat the details, and ship work
                I&apos;m proud to put my name on.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {[
                { value: "1+", label: "Year Exp" },
                { value: "6+", label: "Projects" },
                { value: "∞", label: "Curiosity" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card glass-card p-3 sm:p-5 text-center"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="gradient-text mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-eyebrow"
                    style={{ color: "var(--ph-t4)", letterSpacing: "0.06em", fontSize: "clamp(0.5rem, 1.9vw, 0.68rem)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div
              ref={eduRef}
              className="glass-card p-6 flex items-start gap-4"
              style={{ opacity: 0 }}
            >
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "var(--ph-icon-bg)",
                  border: "1px solid var(--ph-icon-border)",
                }}
              >
                🎓
              </div>
              <div>
                <h3
                  className="text-title mb-0.5"
                  style={{ color: "var(--ph-t0)", fontFamily: "var(--font-heading)" }}
                >
                  {siteConfig.education.degree}
                </h3>
                <p className="text-meta" style={{ color: "#6366f1", fontWeight: 500 }}>
                  {siteConfig.education.institution}
                </p>
                <p className="text-meta mt-1" style={{ color: "var(--ph-t4)", fontWeight: 400 }}>
                  Class of {siteConfig.education.year}
                </p>
              </div>
            </div>
          </div>

          {/* Right – skill bars panel */}
          <div
            ref={skillsPanelRef}
            className="glass-card p-8 space-y-6"
            style={{ opacity: 0 }}
          >
            <h3
              className="text-title mb-6"
              style={{ color: "var(--ph-t0)", fontFamily: "var(--font-heading)" }}
            >
              Core Skills
            </h3>
            {skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
