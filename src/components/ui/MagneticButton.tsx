"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
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
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const container = rippleContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
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
      background: rgba(255,255,255,0.2);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    `;
    container.appendChild(ripple);

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
      style={{ ...style, willChange: "transform" }}
      onClick={handleClick}
    >
      <div
        ref={rippleContainerRef}
        style={{ position: "relative", overflow: "hidden", borderRadius: "inherit" }}
      >
        <motion.div whileTap={{ scale: 0.95 }} style={{ display: "contents" }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
