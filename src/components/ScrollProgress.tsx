"use client";

import { useEffect, useRef } from "react";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");

      const bar = barRef.current;
      const glow = glowRef.current;
      if (!bar) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self: ScrollTriggerType) => {
            const progress = self.progress;
            // scaleX is composited on the GPU — no layout/paint per scroll
            // frame (unlike animating `width`, which reflows every tick).
            bar.style.transform = `scaleX(${progress})`;
            if (glow) {
              glow.style.transform = `scaleX(${progress})`;
              glow.style.opacity = progress > 0.01 ? "1" : "0";
            }
          },
        });
      });
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full z-9990"
      style={{ height: "2px", background: "rgba(255,255,255,0.04)" }}
    >
      {/* Progress bar — indigo to violet gradient */}
      <div
        ref={barRef}
        className="h-full w-full absolute top-0 left-0"
        style={{
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
          transition: "none",
        }}
      />
      {/* Subtle glow below the bar */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-full opacity-0"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 8px 2px rgba(99,102,241,0.7), 0 0 20px 4px rgba(139,92,246,0.4)",
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
