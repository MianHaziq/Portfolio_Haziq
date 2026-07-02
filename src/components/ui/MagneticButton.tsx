"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export default function MagneticButton({
  children,
  strength = 0.4,
  className = "",
  style,
}: MagneticButtonProps) {
  const magnetRef = useMagnetic<HTMLDivElement>({ strength });
  const rippleLayerRef = useRef<HTMLDivElement>(null);

  // Keep the ripple's clip shape in sync with the button's OWN border-radius
  // (pill, rounded-xl, …). This lets the ripple stay contained inside the
  // button without wrapping the button in an overflow:hidden box — which was
  // clipping the button's rounded edges into square corners when it scaled up
  // on hover.
  useEffect(() => {
    const magnet = magnetRef.current;
    const layer = rippleLayerRef.current;
    const btn =
      magnet?.querySelector<HTMLElement>("a, button") ??
      (magnet?.firstElementChild as HTMLElement | null);
    if (layer && btn) layer.style.borderRadius = getComputedStyle(btn).borderRadius;
  });

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const layer = rippleLayerRef.current;
    if (!layer) return;

    const rect = layer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { gsap } = await import("@/lib/gsap");

    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.22);
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;
    layer.appendChild(ripple);

    gsap.to(ripple, {
      width: Math.max(rect.width, rect.height) * 2.5,
      height: Math.max(rect.width, rect.height) * 2.5,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });
  };

  return (
    <div
      ref={magnetRef}
      className={`relative inline-block ${className}`}
      style={style}
      onClick={handleClick}
    >
      <motion.div whileTap={{ scale: 0.95 }} style={{ display: "contents" }}>
        {children}
      </motion.div>

      {/* Ripple layer — overlays the button and clips only the ripple to the
          button's shape. It never wraps the button, so the button is free to
          scale on hover without being clipped. */}
      <div
        ref={rippleLayerRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}
