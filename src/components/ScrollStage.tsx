"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * SCROLLSTAGE — scroll-linked storytelling.
 *
 * Publishes the section's own scroll progress as a CSS custom property
 * `--stage` (0 → 1) on its root node. Children then position themselves
 * with plain CSS `calc()` on that variable — see `.stage-drift-*` and
 * `.stage-rise` in globals.css.
 *
 * Why a CSS variable rather than setting transforms from JS:
 *  - one rAF-throttled write per frame, no per-child style thrash;
 *  - reduced-motion is handled purely in CSS, so it needs no JS branch;
 *  - children stay declarative and easy to retune without touching logic.
 *
 * Uses scroll + rAF rather than IntersectionObserver because we need a
 * continuous value, not a threshold crossing.
 */
export default function ScrollStage({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honour the OS setting: publish a fixed neutral value and never listen.
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) {
      node.style.setProperty("--stage", "0");
      return;
    }

    let frame = 0;
    let running = true;

    const measure = () => {
      frame = 0;
      if (!running) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // 0 when the section's top edge reaches the bottom of the viewport,
      // 1 when its bottom edge reaches the top. Clamped both ends.
      const span = rect.height + vh;
      const travelled = vh - rect.top;
      const p = Math.min(1, Math.max(0, travelled / span));

      node.style.setProperty("--stage", p.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
