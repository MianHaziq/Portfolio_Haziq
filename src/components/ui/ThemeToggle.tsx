"use client";

import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    const btn = btnRef.current;
    if (btn) {
      const { gsap } = await import("@/lib/gsap");
      gsap.fromTo(
        btn,
        { rotate: 0, scale: 1 },
        {
          rotate: 180,
          scale: 0.88,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            toggle();
            gsap.fromTo(
              btn,
              { rotate: 180, scale: 0.88 },
              { rotate: 360, scale: 1, duration: 0.3, ease: "back.out(1.6)" }
            );
          },
        }
      );
    } else {
      toggle();
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.1)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)"}`,
        color: isDark ? "#94a3b8" : "#6366f1",
        transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(99,102,241,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = isDark
          ? "rgba(255,255,255,0.06)"
          : "rgba(99,102,241,0.1)";
      }}
    >
      {isDark ? (
        /* Sun — shown in dark mode (click to go light) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            strokeLinecap="round"
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        /* Moon — shown in light mode (click to go dark) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
