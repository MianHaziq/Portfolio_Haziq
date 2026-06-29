"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  const handleClick = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const btn = btnRef.current;
    const rect = btn?.getBoundingClientRect();
    const ox = Math.round(rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const oy = Math.round(rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    // Pass origin to the CSS keyframe so the circle starts from the button centre
    document.documentElement.style.setProperty("--vt-ox", `${ox}px`);
    document.documentElement.style.setProperty("--vt-oy", `${oy}px`);

    // Button micro-bounce — visible immediately, before the View Transition
    // captures the "before" snapshot.
    if (btn) {
      const { gsap } = await import("@/lib/gsap");
      gsap.fromTo(
        btn,
        { scale: 0.76 },
        { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.42)", delay: 0.03 }
      );
    }

    // Reduced-motion: instant toggle, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      toggle();
      isAnimating.current = false;
      return;
    }

    // Older browsers: instant toggle
    if (!("startViewTransition" in document)) {
      toggle();
      isAnimating.current = false;
      return;
    }

    // View Transition: browser screenshots the page, runs flushSync(toggle) to
    // commit the new theme synchronously, screenshots again, then runs the CSS
    // @keyframes circle reveal from globals.css.
    //
    // Performance: the `vt-running` class on <html> pauses every continuous
    // CSS animation on the page for the duration of the transition, freeing
    // the main thread so the compositor can hold a steady 60fps on the
    // clip-path animation.
    document.documentElement.classList.add("vt-running");

    const vt = (
      document as Document & {
        startViewTransition: (cb: () => void) => { finished: Promise<void> };
      }
    ).startViewTransition(() => {
      flushSync(() => toggle());
    });

    vt.finished.finally(() => {
      document.documentElement.classList.remove("vt-running");
      isAnimating.current = false;
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        background:  isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.10)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.20)"}`,
        color:       isDark ? "#94a3b8" : "#6366f1",
        transition:  "background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = isDark ? "rgba(255,255,255,0.11)" : "rgba(99,102,241,0.18)";
        el.style.boxShadow  = isDark
          ? "0 0 14px rgba(255,255,255,0.07), 0 0 6px rgba(99,102,241,0.12)"
          : "0 0 14px rgba(99,102,241,0.20)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.10)";
        el.style.boxShadow  = "none";
      }}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
