"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";
import MagneticButton from "@/components/ui/MagneticButton";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    label: siteConfig.githubHandle,
  },
  {
    name: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: siteConfig.linkedinHandle,
  },
];

function FocusInput({
  as: Tag = "input",
  ...props
}: { as?: "input" | "textarea" } & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const elRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const handleFocus = async () => {
    if (!elRef.current) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(elRef.current, {
      boxShadow:
        "0 0 0 2px rgba(99,102,241,0.25), inset 0 0 0 1px rgba(99,102,241,0.4), 0 0 20px rgba(99,102,241,0.1)",
      borderColor: "rgba(99,102,241,0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBlur = async () => {
    if (!elRef.current) return;
    const { gsap } = await import("@/lib/gsap");
    gsap.to(elRef.current, {
      boxShadow: "none",
      borderColor: "var(--ph-input-border)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Tag
      ref={elRef}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");

      const section = sectionRef.current;
      if (!section) return;

      ctx = gsap.context(() => {
        const commonST = { start: "top 85%", toggleActions: "play none none reverse" };

        if (formCardRef.current) {
          gsap.fromTo(
            formCardRef.current,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: formCardRef.current, ...commonST },
            }
          );
        }

        if (sidebarRef.current) {
          const cards = sidebarRef.current.querySelectorAll<HTMLElement>(".sidebar-card");
          gsap.fromTo(
            cards,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: sidebarRef.current, ...commonST },
            }
          );
        }

        ScrollTrigger.refresh();
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  const baseInputStyle: React.CSSProperties = {
    background: "var(--ph-input-bg)",
    border: "1px solid var(--ph-input-border)",
    color: "var(--ph-input-text)",
    outline: "none",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    width: "100%",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.3s ease",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--ph-bg-1)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, var(--ph-orb-1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading
            eyebrow="Say Hello"
            title="Get In"
            accent="Touch"
            description="Have a project in mind, a question, or just want to say hi? My inbox is always open."
            align="center"
          />
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact form */}
          <div
            ref={formCardRef}
            className="md:col-span-3"
            style={{ opacity: 0 }}
          >
            <div className="glass-card p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      background: "var(--ph-badge-bg)",
                      border: "1px solid var(--ph-badge-border)",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    className="text-heading"
                    style={{ color: "var(--ph-t0)", fontFamily: "var(--font-heading)" }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-meta text-center" style={{ color: "var(--ph-t3)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-eyebrow mb-2"
                        style={{ color: "var(--ph-t3)", fontFamily: "var(--font-body)" }}
                      >
                        Name
                      </label>
                      <FocusInput
                        as="input"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Your name"
                        style={baseInputStyle}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-eyebrow mb-2"
                        style={{ color: "var(--ph-t3)", fontFamily: "var(--font-body)" }}
                      >
                        Email
                      </label>
                      <FocusInput
                        as="input"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        style={baseInputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-eyebrow mb-2"
                      style={{ color: "var(--ph-t3)", fontFamily: "var(--font-body)" }}
                    >
                      Message
                    </label>
                    <FocusInput
                      as="textarea"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      placeholder="Tell me about your project or just say hi..."
                      style={{ ...baseInputStyle, resize: "none" }}
                    />
                  </div>

                  <MagneticButton strength={0.25} className="w-full">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 rounded-xl transition-opacity duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                      }}
                    >
                      {sending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray="32"
                              strokeDashoffset="10"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div
            ref={sidebarRef}
            className="md:col-span-2 flex flex-col gap-6"
          >
            {/* Email card */}
            <div className="sidebar-card glass-card p-6" style={{ opacity: 0 }}>
              <p
                className="text-xs uppercase tracking-widest font-medium mb-3"
                style={{ color: "var(--ph-t4)" }}
              >
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--ph-badge-text)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--ph-t0)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--ph-badge-text)")
                }
              >
                {siteConfig.email}
              </a>
            </div>

            {/* Social links */}
            <div
              className="sidebar-card glass-card p-6 flex flex-col gap-4"
              style={{ opacity: 0 }}
            >
              <p
                className="text-xs uppercase tracking-widest font-medium mb-2"
                style={{ color: "var(--ph-t4)" }}
              >
                Socials
              </p>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-all duration-200 group"
                  style={{ color: "var(--ph-t3)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--ph-icon-bg)",
                      border: "1px solid var(--ph-icon-border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(99, 102, 241, 0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--ph-icon-bg)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "var(--ph-icon-border)";
                    }}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--ph-t2)" }}>
                      {social.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--ph-t4)" }}>
                      {social.label}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability indicator */}
            <div
              className="sidebar-card glass-card p-5 flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  animation: "pulse 2s infinite",
                }}
              />
              <p className="text-sm" style={{ color: "var(--ph-t2)" }}>
                Currently{" "}
                <span style={{ color: "#22c55e" }}>open</span> to new
                opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
