"use client";

import { type ReactNode, type CSSProperties } from "react";
import { useTilt } from "@/hooks/useTilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxAngle?: number;
  glare?: boolean;
  strength?: number;
}

export default function TiltCard({
  children,
  className = "",
  style,
  maxAngle = 12,
  glare = true,
  strength = 1,
}: TiltCardProps) {
  const { cardRef, glareRef } = useTilt<HTMLDivElement>({ maxAngle, glare, strength });

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            opacity: 0,
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
}
