"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  DevOps: {
    bg: "rgba(96, 165, 250, 0.1)",
    border: "rgba(96, 165, 250, 0.3)",
    glow: "rgba(96, 165, 250, 0.15)",
  },
};

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0a0a0f" }}
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
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="What I Use"
            title="Tech"
            accent="Stack"
            description="Tools and technologies I work with daily to build production-ready applications."
            align="center"
          />
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {Object.entries(techStack).map(([category, items], catIndex) => {
            const colors = categoryColors[category];
            return (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: catIndex * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3 mb-6"
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
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {items.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{
                        delay: catIndex * 0.15 + i * 0.06,
                        duration: 0.4,
                        ease: "easeOut" as const,
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className="relative group glass-card p-4 flex flex-col items-center gap-2 cursor-default overflow-hidden"
                      style={{
                        borderColor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                        style={{ background: colors.glow }}
                      />

                      {/* Icon */}
                      <span
                        className="relative z-10 text-2xl leading-none"
                        style={{ fontFamily: "system-ui" }}
                      >
                        {tech.icon}
                      </span>

                      {/* Name */}
                      <span
                        className="relative z-10 text-meta text-center leading-tight"
                        style={{ color: "#94a3b8", fontFamily: "var(--font-body)" }}
                      >
                        {tech.name}
                      </span>

                      {/* Bottom accent bar on hover */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{
                          background: `linear-gradient(90deg, ${colors.border.replace("0.3", "0.8")}, transparent)`,
                        }}
                      />
                    </motion.div>
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
