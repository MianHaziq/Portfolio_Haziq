"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/contexts/IntroContext";

export default function LoadingScreen() {
  const { setPhase } = useIntro();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  /*
   * When progress hits 100% we wait 400 ms (lets the bar visually settle at
   * 100), then flip BOTH state changes in the same render:
   *   1. setPhase("exiting") → tells Hero/Navbar to begin their entrance
   *   2. setLoading(false)   → AnimatePresence triggers loader's exit anim
   *
   * Because both fire in the same tick, the loader fade-out and the hero
   * fade-in start on the exact same frame → no blank screen, true overlap.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase("exiting");
            setLoading(false);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [setPhase]);

  const letters = "HAZIQ NAZEER".split("");

  return (
    <AnimatePresence onExitComplete={() => setPhase("ready")}>
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          /*
           * Exit choreography: gentle fade with a subtle outward scale and
           * micro upward drift — feels like the loader "lifts away" rather
           * than blinks off. Long enough (0.85s) to overlap meaningfully with
           * the hero entrance, expo-out so most of the dissolution happens
           * in the first 200 ms while the hero is still ramping in.
           */
          exit={{ opacity: 0, scale: 1.06, y: -8, filter: "blur(8px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
          style={{ background: "var(--ph-bg-0)", willChange: "opacity, transform, filter" }}
        >
          {/* Background gradient — brand colors, opacity tuned per theme */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, #6366f1 0%, #8b5cf6 50%, transparent 70%)",
                opacity: "var(--ph-loader-orb-opacity)",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Animated letters */}
            <div className="flex gap-1 overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.6,
                    ease: "easeOut" as const,
                  }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    letterSpacing: "0.12em",
                    color: letter === " " ? "transparent" : "var(--ph-t0)",
                    display: "inline-block",
                    minWidth: letter === " " ? "1rem" : "auto",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Role text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-eyebrow"
              style={{ color: "#6366f1", fontFamily: "var(--font-body)" }}
            >
              Software Engineer
            </motion.p>

            {/* Progress bar */}
            <div
              className="w-48 h-px relative overflow-hidden"
              style={{ background: "var(--ph-border)" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "linear" }}
                className="absolute top-0 left-0 h-full"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 10px rgba(99, 102, 241, 0.8)",
                }}
              />
            </div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-meta"
              style={{
                color: "var(--ph-t4)",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
              }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
