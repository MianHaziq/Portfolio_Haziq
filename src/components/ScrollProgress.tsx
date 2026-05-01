"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-[9990]"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        ref={barRef}
        className="h-full w-0 transition-none"
        style={{
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #60a5fa)",
          boxShadow: "0 0 10px rgba(99, 102, 241, 0.6)",
        }}
      />
    </div>
  );
}
