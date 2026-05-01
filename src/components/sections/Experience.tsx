"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/AnimatedText";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)",
        }}
      />

      {/* Background orb left */}
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 blur-[100px] pointer-events-none"
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
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(180deg, #6366f1, #8b5cf6, rgba(139,92,246,0))",
              transform: "scaleY(0)",
              marginLeft: "-0.5px",
            }}
          />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.2 + index * 0.2,
                    duration: 0.6,
                    ease: "easeOut" as const,
                  }}
                  className={`relative flex flex-col md:flex-row ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-6 md:gap-0`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 top-7 md:top-auto"
                    style={{
                      background: "#6366f1",
                      boxShadow: "0 0 16px rgba(99, 102, 241, 0.6)",
                      border: "2px solid rgba(10, 10, 15, 1)",
                    }}
                  />

                  {/* Left spacer on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 w-full md:w-1/2 ${
                      isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <div
                      className="glass-card p-6 group hover:border-[rgba(99,102,241,0.2)] transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                      }}
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
                        style={{ color: "#6366f1", fontFamily: "var(--font-body)", fontWeight: 600 }}
                      >
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p
                        className="text-meta leading-relaxed mb-4"
                        style={{ color: "#64748b", fontFamily: "var(--font-body)", fontWeight: 400 }}
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
                              className="w-4 h-4 flex-shrink-0 mt-0.5"
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
