"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterLink = () => {
      cursorRef.current?.classList.add("hover");
      followerRef.current?.classList.add("hover");
    };

    const onMouseLeaveLink = () => {
      cursorRef.current?.classList.remove("hover");
      followerRef.current?.classList.remove("hover");
    };

    const addLinkListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addLinkListeners();

    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Cursor snaps instantly
      if (cursorRef.current) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      }

      // Follower lerps smoothly
      if (followerRef.current) {
        followerPosRef.current.x +=
          (posRef.current.x - followerPosRef.current.x) * 0.12;
        followerPosRef.current.y +=
          (posRef.current.y - followerPosRef.current.y) * 0.12;
        followerRef.current.style.transform = `translate3d(${followerPosRef.current.x - 18}px, ${followerPosRef.current.y - 18}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
