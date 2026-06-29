// Module-level handle to the single Lenis instance so any component (e.g. the
// Navbar) can drive programmatic scrolling without prop-drilling or context.
// SmoothScroll owns the lifecycle and registers/clears the instance here.
import type Lenis from "lenis";

let instance: Lenis | null = null;

// Height of the fixed navbar (h-16 = 64px) plus a little breathing room, so
// anchored sections stop *below* the bar instead of tucking under it.
const NAV_OFFSET = -88;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/**
 * Smoothly scroll to a section by id, or to the top when id is "top".
 * Falls back to native scrolling when Lenis isn't active (reduced motion,
 * not yet mounted), so navigation always works.
 */
export function scrollToId(id: string) {
  if (instance) {
    if (id === "top") {
      instance.scrollTo(0, { offset: 0 });
    } else {
      instance.scrollTo(`#${id}`, { offset: NAV_OFFSET });
    }
    return;
  }

  // Fallback — no smooth engine available.
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
