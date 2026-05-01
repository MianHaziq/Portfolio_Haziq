"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  /** When true, animation fires each time the element enters the viewport */
  inViewTrigger?: boolean;
  stagger?: number;
}

/**
 * Splits text into words and slides each up from a mask — the classic
 * editorial "text reveal" seen on Awwwards-winning sites.
 * Bidirectional: replays on scroll up and scroll down.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.75,
  inViewTrigger = false,
  stagger = 0.09,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // once: false so animation replays every time element enters viewport
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 });
  const shouldAnimate = inViewTrigger ? isInView : true;

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-mask mr-[0.28em] last:mr-0"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={shouldAnimate ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: EASE_EXPO,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      {/* Accessible text for screen readers */}
      <span className="sr-only">{text}</span>
    </span>
  );
}

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  inViewTrigger?: boolean;
}

/**
 * Character-by-character staggered reveal — for short, impactful
 * headings where you want maximum drama (hero section only).
 * Bidirectional: replays on scroll up and scroll down.
 */
export function CharReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.55,
  stagger = 0.035,
  inViewTrigger = false,
}: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // once: false so animation replays every time element enters viewport
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 });
  const shouldAnimate = inViewTrigger ? isInView : true;

  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="word-mask"
          style={{ marginRight: char === " " ? "0.25em" : "0" }}
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: 40 }}
            animate={
              shouldAnimate
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "110%", opacity: 0, rotateX: 40 }
            }
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: EASE_EXPO,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  /** First (white) part of the heading */
  title: string;
  /** Accent word rendered in italic Cormorant Garamond + gradient */
  accent?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  inViewTrigger?: boolean;
  delay?: number;
}

/**
 * Reusable premium section heading used across every section.
 * Pattern: small caps eyebrow → large Sora heading → italic serif gradient accent
 * Bidirectional: all animations replay on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className = "",
  align = "center",
  inViewTrigger = true,
  delay = 0,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once: false so animation replays bidirectionally
  const inView = useInView(ref, { once: false, margin: "-100px", amount: 0.3 });
  const shouldAnimate = inViewTrigger ? inView : true;

  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} ${className}`}>
      {/* Eyebrow */}
      <motion.p
        className="text-eyebrow mb-4"
        style={{ color: "#6366f1" }}
        initial={{ opacity: 0, y: 12 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
      >
        {eyebrow}
      </motion.p>

      {/* Heading */}
      <h2 className="text-display overflow-hidden">
        {/* White main title words — also bidirectional */}
        <WordReveal
          text={title}
          delay={delay + 0.08}
          inViewTrigger={inViewTrigger}
          stagger={0.07}
          className="text-display"
          duration={0.72}
        />
        {accent && (
          <>
            {" "}
            <span
              className="word-mask inline-block"
              style={{ marginLeft: "0.18em" }}
            >
              <motion.span
                className="inline-block text-serif-italic gradient-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  fontWeight: 400,
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={shouldAnimate ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  delay: delay + 0.18 + title.split(" ").length * 0.07,
                  duration: 0.72,
                  ease: EASE_EXPO,
                }}
              >
                {accent}
              </motion.span>
            </span>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <motion.p
          className="text-body mt-5 max-w-lg"
          style={{ color: "var(--ph-t4)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: delay + 0.35, duration: 0.6, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
