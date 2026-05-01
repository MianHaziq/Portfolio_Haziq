"use client";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: MagneticOptions = {}
): RefObject<T | null> {
  const elRef = useRef<T | null>(null);
  const { strength = 0.4 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = elRef.current;
    if (!el) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) * strength;
      const distY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(async () => {
        const { gsap } = await import("@/lib/gsap");
        gsap.to(el, {
          x: distX,
          y: distY,
          duration: 0.4,
          ease: "power3.out",
        });
      });
    };

    const onMouseLeave = async () => {
      const { gsap } = await import("@/lib/gsap");
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return elRef;
}
