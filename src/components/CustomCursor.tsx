"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Raw mouse position
  const mousePos = useRef({ x: -200, y: -200 });
  // Lerped follower position
  const followerPos = useRef({ x: -200, y: -200 });
  // Previous position for velocity calc
  const prevPos = useRef({ x: -200, y: -200 });
  // Velocity
  const velocity = useRef({ x: 0, y: 0 });

  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const labelTextRef = useRef("");

  useEffect(() => {
    // Only activate on non-touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const LERP_FACTOR = 0.12;
    const RING_NORMAL_SIZE = 40;
    const RING_HOVER_SIZE = 64;
    const RING_NORMAL_COLOR = "rgba(99,102,241,0)";
    const RING_HOVER_COLOR = "rgba(99,102,241,0.1)";

    let currentRingSize = RING_NORMAL_SIZE;
    let targetRingSize = RING_NORMAL_SIZE;

    const onMouseMove = (e: MouseEvent) => {
      const prev = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };
      velocity.current = {
        x: e.clientX - prev.x,
        y: e.clientY - prev.y,
      };
    };

    const setHoverState = (hovering: boolean, text?: string) => {
      isHoveringRef.current = hovering;
      targetRingSize = hovering ? RING_HOVER_SIZE : RING_NORMAL_SIZE;
      labelTextRef.current = text ?? "";

      if (ring) {
        ring.style.background = hovering ? RING_HOVER_COLOR : RING_NORMAL_COLOR;
        ring.style.borderColor = hovering
          ? "rgba(99,102,241,0.5)"
          : "rgba(99,102,241,0.45)";
      }

      if (dot) {
        dot.style.transform = `translate3d(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px, 0) scale(${hovering ? 1.5 : 1})`;
      }

      if (label) {
        label.style.opacity = text ? "1" : "0";
        label.textContent = text ?? "";
      }
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.getAttribute("data-cursor-text") ?? undefined;
      setHoverState(true, text);
    };

    const onLeaveInteractive = () => {
      setHoverState(false);
    };

    const addListeners = () => {
      document
        .querySelectorAll<HTMLElement>(
          "a, button, [role='button'], input, textarea, [data-cursor-hover]"
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnterInteractive);
          el.removeEventListener("mouseleave", onLeaveInteractive);
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    };

    addListeners();

    const mutationObserver = new MutationObserver(addListeners);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Dot snaps exactly to cursor
      const { x, y } = mousePos.current;
      if (dot) {
        const scale = isHoveringRef.current ? 1.5 : 1;
        dot.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0) scale(${scale})`;
      }

      // Follower lerps behind
      followerPos.current.x += (x - followerPos.current.x) * LERP_FACTOR;
      followerPos.current.y += (y - followerPos.current.y) * LERP_FACTOR;

      // Smooth ring size
      currentRingSize += (targetRingSize - currentRingSize) * 0.15;
      const halfRing = currentRingSize / 2;

      // Velocity-based stretching — squash/stretch the follower ring
      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      );
      const maxSpeed = 30;
      const stretchFactor = Math.min(speed / maxSpeed, 1);
      const scaleX = 1 + stretchFactor * 0.35;
      const scaleY = 1 - stretchFactor * 0.15;

      // Angle of movement for rotation
      let angle = 0;
      if (speed > 0.5) {
        angle =
          (Math.atan2(velocity.current.y, velocity.current.x) * 180) / Math.PI;
      }

      if (ring) {
        ring.style.width = `${currentRingSize}px`;
        ring.style.height = `${currentRingSize}px`;
        ring.style.transform = `translate3d(${followerPos.current.x - halfRing}px, ${followerPos.current.y - halfRing}px, 0) rotate(${angle}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
      }

      // Move label with cursor
      if (label && labelTextRef.current) {
        label.style.transform = `translate3d(${x + 16}px, ${y - 10}px, 0)`;
      }

      // Decay velocity
      velocity.current.x *= 0.8;
      velocity.current.y *= 0.8;
      prevPos.current = { x, y };

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps to cursor, mix-blend-mode: difference */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          background: "#6366f1",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "transform 0.08s ease, scale 0.2s ease",
        }}
      />

      {/* Follower ring — lags behind with lerp */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: "1px solid rgba(99,102,241,0.45)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          background: "rgba(99,102,241,0)",
          willChange: "transform, width, height",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Cursor text label */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10000,
          background: "rgba(99,102,241,0.9)",
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          padding: "3px 8px",
          borderRadius: "4px",
          willChange: "transform, opacity",
          transition: "opacity 0.2s ease",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-body)",
        }}
      />
    </>
  );
}
