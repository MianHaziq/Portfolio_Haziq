"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAnimate, useReducedMotion } from "framer-motion";

/**
 * Cinematic hero wordmark.
 *
 * This wordmark is the LANDING target of the preloader→hero morph: the loader's
 * flying "Haziq Nazeer" clone comes to rest exactly over this element (which is
 * why the container carries `data-hero-name` — the loader measures it). So the
 * usual mask-slide entrance is skipped here; by the time `start` flips true the
 * assembly has already been shown by the morphing clone. We pick up mid-story:
 *
 *   1. The already-assembled wordmark simply resolves in (a soft opacity/scale
 *      settle) as the clone crossfades out over the same pixels — seamless.
 *   2. After a beat, the two words split apart on a weighted spring, opening a
 *      real layout gap in the centre — the words ride outward, never overlapped.
 *   3. The portrait materialises into that reserved gap: a circular mask-wipe
 *      (clip-path) + scale-up from 0.82 + blur-to-sharp, landing perfectly
 *      centred so the composition reads  Haziq · {portrait} · Nazeer.
 *   4. Once settled, the portrait drifts on a slow, infinite micro-float.
 *
 * The gap is a flex child whose size is animated (width on desktop, height on
 * the mobile vertical stack), so space is reserved cleanly — the image appears
 * because the space opened, it doesn't push or cover the text.
 *
 * prefers-reduced-motion → everything snaps to the final composition instantly.
 */

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// Portrait + open-gap dimensions (px). Kept in sync with the Tailwind size
// classes below so the spring animates to exactly the reserved box.
const MOBILE = { portrait: 96, gap: 124 };
const DESKTOP = { portrait: 140, gap: 184 };

export default function HeroNameReveal({ start }: { start: boolean }) {
  const [scope, animate] = useAnimate();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!start || !scope.current) return;
    let cancelled = false;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const dims = isDesktop ? DESKTOP : MOBILE;
    // Open along the layout axis: width when the words sit side-by-side
    // (desktop), height when they stack (mobile).
    const open = isDesktop ? { width: dims.gap } : { height: dims.gap };
    const settled = {
      scale: 1,
      opacity: 1,
      clipPath: "circle(72% at 50% 50%)",
      filter: "blur(0px)",
    };

    if (prefersReduced) {
      animate("[data-name-word]", { y: "0%", opacity: 1, filter: "blur(0px)" }, { duration: 0 });
      animate("[data-name-gap]", open, { duration: 0 });
      animate("[data-name-deco]", { opacity: 1 }, { duration: 0 });
      animate("[data-name-portrait]", settled, { duration: 0 });
      return;
    }

    const run = async () => {
      await animate([
        // 1 — the assembly is ALREADY on screen (the morphing loader clone just
        // landed here). We only resolve the real name in over the same pixels —
        // a soft opacity + micro-scale settle, no slide — while the clone
        // crossfades out. This is the seamless handoff, not a fresh entrance.
        [
          // opacity ONLY — no scale/translate/blur — so the real name resolves
          // in exactly where the loader's clone landed, and the handoff between
          // the (already sharp) clone and the real name is seamless.
          "[data-name-word]",
          { y: "0%", opacity: [0, 1] },
          { duration: 0.45, ease: EASE_EXPO },
        ],
        // 2 — hold on the assembled wordmark, then split apart on a weighted spring
        ["[data-name-gap]", open, { type: "spring", stiffness: 120, damping: 18, mass: 1.05, at: "+0.55" }],
        // 3 — portrait materialises as the gap opens (explicit keyframes)
        ["[data-name-deco]", { opacity: [0, 1] }, { duration: 0.7, ease: "easeOut", at: "<0.25" }],
        [
          "[data-name-portrait]",
          {
            scale: [0.82, 1],
            opacity: [0, 1],
            clipPath: ["circle(0% at 50% 50%)", "circle(72% at 50% 50%)"],
            filter: ["blur(10px)", "blur(0px)"],
          },
          { duration: 0.95, ease: EASE_EXPO, at: "<0.05" },
        ],
      ]);
      if (cancelled) return;
      // 4 — settle into a slow, infinite micro-float
      animate(
        "[data-name-portrait]",
        { y: [0, -7, 0] },
        { duration: 5, ease: "easeInOut", repeat: Infinity },
      );
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [start, prefersReduced, animate, scope]);

  return (
    <div
      ref={scope}
      data-hero-name
      aria-label="Haziq Nazeer"
      className="mb-5 flex flex-col md:flex-row items-center justify-center gap-y-1"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {/* Haziq — starts assembled (y:0) but invisible: the morphing loader clone
          stands in for it until it lands, then this resolves in over the top. */}
      <span className="word-mask inline-block" aria-hidden>
        <span
          data-name-word="left"
          className="inline-block text-hero"
          style={{ transform: "translateY(0%)", opacity: 0, color: "var(--ph-t0)" }}
        >
          Haziq
        </span>
      </span>

      {/* Reserved centre gap — its size animates open; the portrait lives here */}
      <span
        data-name-gap
        className="relative shrink-0 block w-[96px] h-0 md:w-0 md:h-[140px]"
        aria-hidden
      >
        {/* Soft glow halo */}
        <span
          data-name-deco
          className="absolute left-1/2 top-1/2 w-[136px] h-[136px] -ml-[68px] -mt-[68px] md:w-[188px] md:h-[188px] md:-ml-[94px] md:-mt-[94px] rounded-full blur-2xl pointer-events-none"
          style={{
            opacity: 0,
            background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)",
          }}
        />
        {/* Gradient ring */}
        <span
          data-name-deco
          className="absolute left-1/2 top-1/2 w-[104px] h-[104px] -ml-[52px] -mt-[52px] md:w-[150px] md:h-[150px] md:-ml-[75px] md:-mt-[75px] rounded-full pointer-events-none"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
          }}
        />
        {/* Portrait */}
        <Image
          data-name-portrait
          src="/haziq-portrait.jpg"
          alt="Haziq Nazeer"
          width={140}
          height={140}
          priority
          sizes="(max-width: 768px) 96px, 140px"
          className="absolute left-1/2 top-1/2 w-[96px] h-[96px] -ml-12 -mt-12 md:w-[140px] md:h-[140px] md:-ml-[70px] md:-mt-[70px] rounded-full object-cover"
          style={{
            opacity: 0,
            transform: "scale(0.82)",
            clipPath: "circle(0% at 50% 50%)",
            filter: "blur(10px)",
            border: "3px solid var(--ph-bg-0)",
            willChange: "transform, clip-path, opacity",
          }}
        />
      </span>

      {/* Nazeer */}
      <span className="word-mask inline-block" aria-hidden>
        <span
          data-name-word="right"
          className="inline-block gradient-text-shimmer text-hero"
          style={{ transform: "translateY(0%)", opacity: 0, fontStyle: "italic" }}
        >
          Nazeer.
        </span>
      </span>
    </div>
  );
}
