"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const letters = "HAZIQ NAZEER".split("");

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
          /*
           * Background reads var(--ph-bg-0) which is resolved against the
           * data-theme attribute set by the inline script in layout.tsx
           * BEFORE React hydrates. No FOUC, no theme mismatch on refresh.
           */
          style={{ background: "var(--ph-bg-0)" }}
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

            {/* Role text — brand indigo works in both themes */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-eyebrow"
              style={{ color: "#6366f1", fontFamily: "var(--font-body)" }}
            >
              Software Engineer
            </motion.p>

            {/* Progress bar — track is theme-aware, fill stays brand */}
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
