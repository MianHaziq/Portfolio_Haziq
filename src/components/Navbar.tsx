"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useIntro } from "@/contexts/IntroContext";
import { scrollToId } from "@/lib/lenis";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const logoRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Tied to the intro phase so the navbar slides in alongside the loader exit
  // and the hero entrance — single coordinated handoff, not a third timeline.
  const { isIntroDone } = useIntro();

  // Logo elastic bounce — fires once when the intro hands off
  useEffect(() => {
    if (typeof window === "undefined" || !isIntroDone) return;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");

      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.6)",
            delay: 0.25,
          }
        );
      }
    };

    init();
  }, [isIntroDone]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    scrollToId(href.slice(1));
    setMenuOpen(false);
  };

  const handleLinkEnter = async (index: number) => {
    const underline = underlineRefs.current[index];
    if (!underline) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.fromTo(
      underline,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.22, ease: "power2.out" }
    );
  };

  const handleLinkLeave = async (index: number) => {
    const underline = underlineRefs.current[index];
    if (!underline) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(underline, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.18,
      ease: "power2.in",
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isIntroDone ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" as const }}
        className="fixed top-0 left-0 right-0 z-900 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          background: scrolled ? "var(--ph-nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--ph-border-subtle)"
            : "1px solid transparent",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          ref={logoRef}
          onClick={() => scrollToId("top")}
          className="flex items-center gap-2 group"
          style={{ opacity: 0 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            H
          </div>
          <span
            className="block"
            style={{
              color: "var(--ph-t0)",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "-0.01em",
            }}
          >
            Haziq Nazeer
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                onClick={() => scrollTo(link.href)}
                onMouseEnter={() => handleLinkEnter(i)}
                onMouseLeave={() => handleLinkLeave(i)}
                className="relative transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: isActive ? "#6366f1" : "var(--ph-t3)",
                }}
              >
                {link.label}
                <span
                  ref={(el) => { underlineRefs.current[i] = el; }}
                  className="absolute -bottom-0.5 left-0 w-full h-px"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* CTA + ThemeToggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => scrollTo("#contact")}
            className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile: ThemeToggle + menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "var(--ph-t0)",
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "",
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "var(--ph-t0)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "var(--ph-t0)",
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim backdrop — tap to close */}
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex: 898,
                background: "rgba(0,0,0,0.4)",
                willChange: "opacity",
              }}
            />

            {/* Floating glass panel */}
            <motion.div
              key="nav-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-18 left-3 right-3 z-899 md:hidden overflow-hidden rounded-2xl p-2"
              style={{
                background: "var(--ph-mobile-menu-bg)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--ph-border-medium)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.2)",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.03 + i * 0.035,
                    }}
                    onClick={() => scrollTo(link.href)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: isActive ? "#6366f1" : "var(--ph-t1)",
                      background: isActive ? "var(--ph-badge-bg)" : "transparent",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-opacity duration-200"
                        style={{ background: "#6366f1", opacity: isActive ? 1 : 0 }}
                      />
                      {link.label}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" style={{ color: "var(--ph-t4)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}

              <div className="px-2 pt-2 pb-1">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-transform duration-200 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    fontFamily: "var(--font-heading)",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                  }}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
