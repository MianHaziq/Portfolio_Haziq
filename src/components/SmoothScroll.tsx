"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

/**
 * Site-wide smooth scrolling.
 *
 * Lenis and GSAP ScrollTrigger must share a single render loop, otherwise the
 * page scrolls on one frame and scroll-driven animations update on another —
 * which reads as stutter / "hang". We drive Lenis from GSAP's ticker (one rAF
 * for the whole app) and push every Lenis scroll event into ScrollTrigger so
 * scrub/reveal animations stay locked to the scroll position.
 *
 * Respects prefers-reduced-motion: when set, we don't smooth at all and let the
 * browser scroll natively.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let cancelled = false;

    const init = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;

      lenis = new Lenis({
        // Slightly long, expo-style glide — smooth without feeling heavy.
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Leave touch unsmoothed — native momentum feels better on phones.
        touchMultiplier: 1.5,
      });

      setLenis(lenis);

      // Keep ScrollTrigger in sync on every Lenis tick.
      lenis.on("scroll", ScrollTrigger.update);

      // Single shared loop: GSAP ticker advances Lenis (ms → s conversion).
      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      // Disable GSAP's lag smoothing so Lenis owns the timing.
      gsap.ticker.lagSmoothing(0);

      // Triggers may have been created with stale measurements before Lenis
      // took over the scroll — recompute once it's wired in.
      ScrollTrigger.refresh();

      // Web fonts load with `display: swap`, which reflows text after first
      // paint and shifts every trigger's start/end. One refresh once fonts are
      // ready fixes all of them — this replaces the per-section refresh() calls
      // that each forced a separate global reflow.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      }
    };

    init();

    return () => {
      cancelled = true;
      if (tickerFn) {
        import("@/lib/gsap").then(({ gsap }) => gsap.ticker.remove(tickerFn!));
      }
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
