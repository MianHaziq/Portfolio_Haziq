"use client";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface RevealOptions {
  selector?: string;
  from?: Record<string, unknown>;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  delay?: number;
  animateSelf?: boolean;
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  const {
    selector = ".__reveal",
    from = { opacity: 0, y: 60 },
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    start = "top 85%",
    end = "top 40%",
    scrub = false,
    toggleActions = "play none none reverse",
    delay = 0,
    animateSelf = false,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import gsap to avoid SSR issues
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("@/lib/gsap");
      const { ScrollTrigger } = await import("@/lib/gsap");

      const container = containerRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
          // Simpler animations on mobile
          const mobileFrom = { opacity: 0, y: isMobile ? 30 : (from.y as number) ?? 0 };
          const targets = animateSelf
            ? container
            : container.querySelectorAll(selector);

          if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

          gsap.fromTo(
            targets,
            mobileFrom,
            {
              opacity: 1,
              y: 0,
              duration: duration * 0.8,
              ease,
              delay,
              stagger: animateSelf ? 0 : stagger * 0.8,
              scrollTrigger: {
                trigger: container,
                start,
                end,
                toggleActions,
                scrub: false,
              },
            }
          );
        });

        mm.add("(min-width: 768px)", () => {
          const targets = animateSelf
            ? container
            : container.querySelectorAll(selector);

          if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

          gsap.fromTo(
            targets,
            from,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              duration,
              ease,
              delay,
              stagger: animateSelf ? 0 : stagger,
              scrollTrigger: {
                trigger: container,
                start,
                end,
                toggleActions,
                scrub,
              },
            }
          );
        });
      }, container);
    };

    init();

    return () => {
      ctx?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
