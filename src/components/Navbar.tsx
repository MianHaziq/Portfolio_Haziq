"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Logo bounce on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

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
            delay: 2.2,
          }
        );
      }
    };

    init();
  }, []);

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
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" as const }}
        className="fixed top-0 left-0 right-0 z-900 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          background: scrolled ? "rgba(10, 10, 15, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          ref={logoRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            A
          </div>
          <span
            className="hidden sm:block"
            style={{
              color: "#f8fafc",
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
                  color: isActive ? "#6366f1" : "#64748b",
                }}
              >
                {link.label}
                {/* GSAP-powered underline — faster than CSS */}
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

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "#f8fafc",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "#f8fafc",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "#f8fafc",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "",
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-x-0 z-899 flex flex-col gap-0 md:hidden"
            style={{
              background: "rgba(10, 10, 15, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                className="px-8 py-4 text-left transition-colors duration-200 border-b"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color:
                    activeSection === link.href.slice(1) ? "#6366f1" : "#94a3b8",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="px-8 py-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full px-4 py-3 rounded-full text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
