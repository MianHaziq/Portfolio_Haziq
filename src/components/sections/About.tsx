"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig, skills } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: "#cbd5e1" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color: "#6366f1" }}>
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: 0.1 + index * 0.07,
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            background: `linear-gradient(90deg, #6366f1, #8b5cf6)`,
            boxShadow: "0 0 8px rgba(99, 102, 241, 0.5)",
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "#6366f1" }}
          >
            Who I Am
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: "#f8fafc" }}
          >
            About{" "}
            <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – bio & education */}
          <div className="space-y-8">
            <motion.div
              custom={0}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="glass-card p-8"
            >
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "#94a3b8" }}
              >
                {siteConfig.bio}
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#94a3b8" }}
              >
                I thrive at the intersection of design and engineering — making things look great and work even better. Whether it&apos;s a silky smooth UI or a rock-solid API, I care deeply about the craft.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: "1+", label: "Year Exp" },
                { value: "10+", label: "Projects" },
                { value: "∞", label: "Curiosity" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-5 text-center"
                >
                  <div
                    className="text-2xl font-bold mb-1 gradient-text"
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "#475569" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                🎓
              </div>
              <div>
                <h3
                  className="font-semibold text-sm mb-0.5"
                  style={{ color: "#f8fafc" }}
                >
                  {siteConfig.education.degree}
                </h3>
                <p className="text-sm" style={{ color: "#6366f1" }}>
                  {siteConfig.education.institution}
                </p>
                <p className="text-xs mt-1" style={{ color: "#475569" }}>
                  Class of {siteConfig.education.year}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right – skill bars */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="glass-card p-8 space-y-6"
          >
            <h3
              className="font-semibold text-base mb-6"
              style={{ color: "#f8fafc" }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
