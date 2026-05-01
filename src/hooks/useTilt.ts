"use client";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface TiltOptions {
  maxAngle?: number;
  glare?: boolean;
  strength?: number;
}

interface TiltRefs<T> {
  cardRef: RefObject<T | null>;
  glareRef: RefObject<HTMLDivElement | null>;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
): TiltRefs<T> {
  const cardRef = useRef<T | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const { maxAngle = 12, glare = true, strength = 1 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = cardRef.current;
    if (!card) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      const rotateY = normX * maxAngle * strength;
      const rotateX = -normY * maxAngle * strength;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(async () => {
        const { gsap } = await import("@/lib/gsap");
        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out",
        });

        if (glare && glareRef.current) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
          gsap.to(glareRef.current, { opacity: 1, duration: 0.3 });
        }
      });
    };

    const onMouseLeave = async () => {
      cancelAnimationFrame(rafId);
      const { gsap } = await import("@/lib/gsap");
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      if (glare && glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
      }
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxAngle, glare, strength]);

  return { cardRef, glareRef };
}
