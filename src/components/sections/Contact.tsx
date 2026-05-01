"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    label: "@haziqnazeer",
    color: "#f8fafc",
  },
  {
    name: "LinkedIn",
    href: siteConfig.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "Haziq Nazeer",
    color: "#0077b5",
  },
  {
    name: "Twitter",
    href: siteConfig.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
    label: "@haziqnazeer",
    color: "#1d9bf0",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0c0c14" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-3"
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
                      background: "rgba(99, 102, 241, 0.15)",
                      border: "1px solid rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    className="text-heading"
                    style={{ color: "#f8fafc", fontFamily: "var(--font-heading)" }}
                  >
                    Message sent!
                  </h3>
                  <p className="text-meta text-center" style={{ color: "#64748b" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-eyebrow mb-2"
                        style={{ color: "#64748b", fontFamily: "var(--font-body)" }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#f8fafc",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "rgba(99, 102, 241, 0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="block text-eyebrow mb-2"
                        style={{ color: "#64748b", fontFamily: "var(--font-body)" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#f8fafc",
                          outline: "none",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "rgba(99, 102, 241, 0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-eyebrow mb-2"
                      style={{ color: "#64748b", fontFamily: "var(--font-body)" }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      placeholder="Tell me about your project or just say hi..."
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#f8fafc",
                        outline: "none",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "rgba(99, 102, 241, 0.5)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.08)")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem" }}
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "#fff",
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
                </form>
              )}
            </div>
          </motion.div>

          {/* Right sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            {/* Email card */}
            <div className="glass-card p-6">
              <p
                className="text-xs uppercase tracking-widest font-medium mb-3"
                style={{ color: "#475569" }}
              >
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "#a5b4fc" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#a5b4fc")
                }
              >
                {siteConfig.email}
              </a>
            </div>

            {/* Social links */}
            <div className="glass-card p-6 flex flex-col gap-4">
              <p
                className="text-xs uppercase tracking-widest font-medium mb-2"
                style={{ color: "#475569" }}
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
                  style={{ color: "#64748b" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(99, 102, 241, 0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.06)";
                    }}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#94a3b8" }}
                    >
                      {social.name}
                    </p>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      {social.label}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="glass-card p-5 flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  animation: "pulse 2s infinite",
                }}
              />
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Currently{" "}
                <span style={{ color: "#22c55e" }}>open</span> to new
                opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
