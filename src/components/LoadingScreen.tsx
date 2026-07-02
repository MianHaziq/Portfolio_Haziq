"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate, useReducedMotion } from "framer-motion";
import { useIntro } from "@/contexts/IntroContext";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

// How large the wordmark reads on the preloader, as a fraction of its final
// hero size. It grows from this up to 1.0 as it flies into the heading.
const PRELOADER_SCALE = 0.62;

/**
 * Preloader → hero "morphing wordmark".
 *
 * ONE wordmark — the same "Haziq Nazeer." markup as the hero heading — is
 * animated continuously from its preloader look into its hero look. There is no
 * second copy and no cross-dissolve: the single element's own properties tween,
 * so the letters literally reshape and recolour in place.
 *
 * On the flight from the preloader spot to the hero heading it simultaneously:
 *   • tightens its tracking   (wide  → tight)
 *   • thickens its weight     (light → bold)     — a real font-shape change
 *   • grows + glides (FLIP)   (small → hero size / position)
 *   • blooms its gradient      by fading "Nazeer."'s solid fill to transparent,
 *     letting the shimmer gradient underneath show through — a smooth
 *     colour morph, not a blur swap.
 */
export default function LoadingScreen() {
  const { setPhase } = useIntro();
  const [scope, animate] = useAnimate();
  const prefersReduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Wordmark entrance (per-word mask-rise) + set the clone's starting scale so
  // the FLIP has a known transform to animate from.
  useEffect(() => {
    if (!scope.current) return;
    const clone = scope.current.querySelector("[data-morph]");
    if (!clone) return;

    animate(clone, { scale: PRELOADER_SCALE, x: 0, y: 0 }, { duration: 0 });

    if (prefersReduced) return;
    animate(
      "[data-morph-word]",
      { y: ["115%", "0%"], opacity: [0, 1] },
      { duration: 0.75, ease: EASE_EXPO, delay: (i: number) => 0.05 + i * 0.14 },
    );
  }, [animate, scope, prefersReduced]);

  // Progress counter — on hitting 100 we let the bar settle (400 ms) then fire
  // the morph exactly once.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // The morph itself. Runs once when `done` flips true.
  useEffect(() => {
    if (!done || !scope.current) return;
    let cancelled = false;

    const root = scope.current;
    const clone = root.querySelector("[data-morph]") as HTMLElement | null;
    const hero = document.querySelector("[data-hero-name]") as HTMLElement | null;

    // Reduced motion (or missing nodes) → skip the flight, just hand off.
    if (prefersReduced || !clone || !hero) {
      setPhase("morphing");
      setPhase("ready");
      setLoading(false);
      return;
    }

    const run = async () => {
      // Reveal the hero SECTION + peripheral text so the name flies into a
      // framed page. The real hero NAME stays invisible — the clone stands in.
      setPhase("morphing");

      // Dissolve the loader's own chrome (backdrop, orb, progress, %).
      animate("[data-loader-bg]", { opacity: 0 }, { duration: 0.55, ease: "easeOut" });
      animate("[data-loader-chrome]", { opacity: 0, y: 12 }, { duration: 0.4, ease: "easeOut" });

      // Measure both boxes at the SAME moment (consistent font metrics) → FLIP.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled) return;

      const c = clone.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      const cCx = c.left + c.width / 2;
      const cCy = c.top + c.height / 2;
      const hCx = h.left + h.width / 2;
      const hCy = h.top + h.height / 2;

      // Height is independent of tracking/weight, so this scale is exact.
      const naturalH = c.height / PRELOADER_SCALE;
      const targetScale = h.height / naturalH;

      // Current theme's ink colour — the solid fill "Nazeer." starts from
      // before it dissolves to reveal the gradient.
      const ink =
        getComputedStyle(document.documentElement).getPropertyValue("--ph-t0").trim() ||
        "#0a0a0f";

      const D = 1.5;

      // (1) The flight: grow + glide the whole wordmark onto the hero heading.
      const morph = animate(
        clone,
        { x: hCx - cCx, y: hCy - cCy, scale: targetScale },
        { duration: D, ease: EASE_EXPO },
      );

      // (2) The reshape — all on the SAME element, no crossfade:
      //   tracking tightens + weight thickens…
      animate(
        "[data-morph-word]",
        { letterSpacing: ["0.14em", "-0.02em"], fontWeight: [400, 700] },
        { duration: D * 0.8, ease: EASE_EXPO, delay: 0.08 },
      );
      //   …and "Nazeer."'s solid fill melts away to reveal its gradient.
      animate(
        "[data-morph-nazeer]",
        { WebkitTextFillColor: [ink, "rgba(127,127,127,0)"] },
        { duration: D * 0.7, ease: "easeInOut", delay: D * 0.22 },
      );

      // Hand to the real hero name a beat before touchdown so they overlap on
      // the same pixels → invisible handoff.
      const handoff = setTimeout(() => !cancelled && setPhase("ready"), D * 1000 - 350);

      await morph;
      clearTimeout(handoff);
      if (cancelled) return;

      await animate(clone, { opacity: 0 }, { duration: 0.3, ease: "easeOut" });
      if (cancelled) return;
      setLoading(false);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [done, animate, scope, prefersReduced, setPhase]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          ref={scope}
          key="loading"
          className="fixed inset-0 z-9999"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Backdrop + brand orb — fades away as the morph begins */}
          <div
            data-loader-bg
            className="absolute inset-0 overflow-hidden"
            style={{ background: "var(--ph-bg-0)" }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, #6366f1 0%, #8b5cf6 50%, transparent 70%)",
                opacity: "var(--ph-loader-orb-opacity)",
              }}
            />
          </div>

          {/* The morphing wordmark — a SINGLE copy of the hero markup. Its own
              properties (tracking, weight, fill, scale) animate into the hero
              look; nothing cross-dissolves. Centred by the flex wrapper; the
              FLIP transform lives on [data-morph]. */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              data-morph
              aria-hidden
              className="flex flex-col md:flex-row items-center justify-center gap-y-1"
              style={{ fontFamily: "var(--font-display)", willChange: "transform, opacity" }}
            >
              <span className="word-mask inline-block">
                <span
                  data-morph-word
                  className="inline-block text-hero"
                  style={{
                    transform: "translateY(115%)",
                    opacity: 0,
                    letterSpacing: "0.14em",
                    fontWeight: 400,
                    color: "var(--ph-t0)",
                  }}
                >
                  Haziq
                </span>
              </span>
              {/* Zero-width centre spacer — keeps the box identical to the hero
                  heading's assembled box so they overlay exactly. */}
              <span className="shrink-0 block w-[96px] h-0 md:w-0 md:h-[140px]" aria-hidden />
              <span className="word-mask inline-block">
                <span
                  data-morph-word
                  data-morph-nazeer
                  className="inline-block gradient-text-shimmer text-hero"
                  style={{
                    transform: "translateY(115%)",
                    opacity: 0,
                    letterSpacing: "0.14em",
                    fontWeight: 400,
                    fontStyle: "italic",
                    // Solid ink to start; the morph fades this to transparent so
                    // the gradient underneath blooms through.
                    WebkitTextFillColor: "var(--ph-t0)",
                  }}
                >
                  Nazeer.
                </span>
              </span>
            </div>
          </div>

          {/* Chrome: role · progress bar · percentage. Centred without a transform
              so the framer opacity tween never fights a translate. */}
          <div
            data-loader-chrome
            className="absolute left-0 right-0 bottom-[20%] flex flex-col items-center gap-6"
          >
            <p
              className="text-eyebrow"
              style={{ color: "#6366f1", fontFamily: "var(--font-body)" }}
            >
              Software Engineer
            </p>

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

            <span
              className="text-meta"
              style={{
                color: "var(--ph-t4)",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
              }}
            >
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
