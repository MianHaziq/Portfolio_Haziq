"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Intro choreography phases — the single source of truth for the
 * preloader → hero handoff. Every entrance animation in the app keys off
 * this state instead of hardcoded mount-time delays, so the hero always
 * begins exactly when the loader begins handing off (no blank screen, no
 * collision between two unrelated timelines).
 *
 *   "loading"    → preloader visible, counting; hero hidden
 *   "morphing"   → the "Haziq Nazeer" wordmark is physically morphing from its
 *                  preloader size/position into the hero heading's. The loader
 *                  chrome (orb, bar, %) fades, the hero SECTION + peripheral
 *                  text fade in to frame the arriving name — but the real hero
 *                  name stays invisible; the flying wordmark stands in for it.
 *   "ready"      → the wordmark has landed on the hero heading's resting spot.
 *                  The real hero name takes over (assembles → splits → portrait)
 *                  and the morphing clone + loader are removed.
 */
export type IntroPhase = "loading" | "morphing" | "ready";

interface IntroContextValue {
  phase: IntroPhase;
  /** true once the preloader has begun handing off (section + peripherals enter) */
  isIntroDone: boolean;
  /** true once the wordmark has landed — the real hero name reveals now */
  hasArrived: boolean;
  setPhase: (p: IntroPhase) => void;
}

const IntroContext = createContext<IntroContextValue>({
  phase: "loading",
  isIntroDone: false,
  hasArrived: false,
  setPhase: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");

  return (
    <IntroContext.Provider
      value={{
        phase,
        isIntroDone: phase !== "loading",
        hasArrived: phase === "ready",
        setPhase,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
