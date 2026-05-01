"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Intro choreography phases — the single source of truth for the
 * preloader → hero handoff. Every entrance animation in the app keys off
 * this state instead of hardcoded mount-time delays, so the hero always
 * begins exactly when the loader begins exiting (no blank screen, no
 * collision between two unrelated timelines).
 *
 *   "loading"    → preloader visible, hero hidden
 *   "exiting"    → preloader fading out AND hero fading in (overlap)
 *   "ready"      → preloader fully removed, hero fully revealed
 */
export type IntroPhase = "loading" | "exiting" | "ready";

interface IntroContextValue {
  phase: IntroPhase;
  /** Convenience: true once the preloader has begun handing off */
  isIntroDone: boolean;
  setPhase: (p: IntroPhase) => void;
}

const IntroContext = createContext<IntroContextValue>({
  phase: "loading",
  isIntroDone: false,
  setPhase: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");

  return (
    <IntroContext.Provider
      value={{ phase, isIntroDone: phase !== "loading", setPhase }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
