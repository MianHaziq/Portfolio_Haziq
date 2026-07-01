"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { useIntro } from "@/contexts/IntroContext";
import HeroNameReveal from "@/components/sections/HeroNameReveal";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intro phase — gates every entrance animation in this section so they
  // begin exactly when the loader begins exiting (true overlap, no flash).
  const { isIntroDone } = useIntro();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      const section = sectionRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
        const st = { trigger: "#hero", start: "top top", end: "bottom top" };

        // Orbs keep their ambient CSS float (.orb-1/2/3). We intentionally do
        // NOT also drive them with a GSAP scroll-parallax — two systems writing
        // `transform` to the same element fight every frame and cause jank.
        // Only the content gets a (separate) scroll-linked parallax.
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -60,
            opacity: 0.6,
            scrollTrigger: { ...st, scrub: 1 },
          });
        }
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      /*
       * Cinematic envelope: a gentle 0.985 → 1 scale + opacity rise on the
       * whole section, played in parallel with the loader's exit. The slow
       * 1.4s expo-out curve makes the page feel like it "settles in" rather
       * than just appearing — the foundation under all the staggered text
       * reveals below.
       */
      initial={{ scale: 0.985, opacity: 0 }}
      animate={isIntroDone ? { scale: 1, opacity: 1 } : { scale: 0.985, opacity: 0 }}
      transition={{ duration: 1.4, ease: EASE_EXPO }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 md:pt-36 md:pb-28"
      style={{ background: "var(--ph-bg-0)", willChange: "transform, opacity" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-orb-1 orb-1 absolute top-[15%] left-[8%] w-140 h-140 rounded-full blur-[72px]"
          style={{
            background:
              "radial-gradient(circle, var(--ph-orb-1) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="hero-orb-2 orb-2 absolute bottom-[8%] right-[4%] w-160 h-160 rounded-full blur-[88px]"
          style={{
            background:
              "radial-gradient(circle, var(--ph-orb-2) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
        <div
          className="hero-orb-3 orb-3 absolute top-[48%] left-[48%] w-110 h-110 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, var(--ph-orb-3) 0%, transparent 70%)",
            willChange: "transform",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--ph-dot-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ willChange: "transform" }}
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={isIntroDone ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-eyebrow"
            style={{
              background: "var(--ph-badge-bg)",
              border: "1px solid var(--ph-badge-border)",
              color: "var(--ph-badge-text)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "#6366f1",
                boxShadow: "0 0 8px #6366f1",
                animation: "pulse 2s infinite",
              }}
            />
            {/* Job-seeker copy (kept, commented out): Available for opportunities */}
            {siteConfig.availability}
          </div>
        </motion.div>

        {/* Greeting */}
        <div className="mb-2 flex justify-center">
          <span
            className="word-mask inline-block"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              fontWeight: 400,
              color: "var(--ph-t4)",
              letterSpacing: "0.06em",
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={isIntroDone ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ delay: 0.08, duration: 0.7, ease: EASE_EXPO }}
            >
              Hi, I&apos;m
            </motion.span>
          </span>
        </div>

        {/* Hero name — cinematic split-reveal with the portrait as centerpiece.
            The visible reveal is animated/decorative, so the real, keyword-rich
            document <h1> lives here (screen-reader-only, strong SEO signal). */}
        <h1 className="sr-only">
          Haziq Nazeer — Software Engineer &amp; Freelance Backend / AI Developer
        </h1>
        <HeroNameReveal start={isIntroDone} />

        {/* Role */}
        <div
          className="mb-6 text-center"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.1rem, 2.8vw, 1.625rem)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
            color: "var(--ph-t3)",
          }}
        >
          <span className="word-mask inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={isIntroDone ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ delay: 0.46, duration: 0.72, ease: EASE_EXPO }}
            >
              Software
            </motion.span>
          </span>
          <span className="word-mask inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              style={{ color: "var(--ph-t2)" }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isIntroDone ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ delay: 0.54, duration: 0.72, ease: EASE_EXPO }}
            >
              Engineer
            </motion.span>
          </span>
          <span className="word-mask inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={isIntroDone ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ delay: 0.62, duration: 0.72, ease: EASE_EXPO }}
            >
              —
            </motion.span>
          </span>
          <span className="word-mask inline-block">
            <motion.span
              className="inline-block"
              style={{
                fontStyle: "italic",
                fontFamily: "var(--font-display)",
                fontSize: "1.08em",
                fontWeight: 400,
                color: "#6366f1",
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isIntroDone ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{ delay: 0.70, duration: 0.72, ease: EASE_EXPO }}
            >
              building things for the web
            </motion.span>
          </span>
        </div>

        {/* Bio */}
        <motion.p
          className="text-body max-w-[52ch] mx-auto mb-12"
          style={{ color: "var(--ph-t4)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.88, duration: 0.65, ease: "easeOut" }}
        >
          {/* Job-seeker bio (kept, commented out): {siteConfig.bio} */}
          {siteConfig.freelanceBio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 1.02, duration: 0.55, ease: "easeOut" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group relative px-9 py-3.5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.38), 0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <span className="relative z-10">View My Work</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="px-9 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            style={{
              background: "var(--ph-surface)",
              border: "1px solid var(--ph-border-medium)",
              color: "var(--ph-t2)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.9rem",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ph-surface-hover)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ph-border-strong)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--ph-surface)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ph-border-medium)";
            }}
          >
            {/* Job-seeker copy (kept, commented out): Get In Touch */}
            Hire Me
          </button>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex justify-center items-center gap-7"
          initial={{ opacity: 0 }}
          animate={isIntroDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.20, duration: 0.6 }}
        >
          <div
            className="h-px w-12 hidden sm:block"
            style={{ background: "var(--ph-border)" }}
          />
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-all duration-300 hover:scale-110"
              style={{ color: "var(--ph-t5)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#6366f1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--ph-t5)")
              }
            >
              {s.icon}
            </a>
          ))}
          <div
            className="h-px w-12 hidden sm:block"
            style={{ background: "var(--ph-border)" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isIntroDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.45, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-eyebrow"
          style={{ color: "var(--ph-t6)", letterSpacing: "0.3em" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: "var(--ph-border)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              background: "linear-gradient(180deg, #6366f1, transparent)",
              height: "50%",
            }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
