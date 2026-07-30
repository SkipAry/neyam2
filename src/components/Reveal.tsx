"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * REVEAL — scroll-in animation with a deterministic trigger.
 *
 * HISTORY / WHY NOT IntersectionObserver:
 * The first implementation used one IntersectionObserver per element with a
 * negative bottom rootMargin. In testing at 1440px one element — the Menu
 * section heading — reliably never received its callback and stayed at
 * opacity 0, permanently hiding real content. Observer callbacks are
 * delivered asynchronously and can be coalesced, which makes "did it fire?"
 * genuinely hard to guarantee.
 *
 * Content disappearing is a far worse failure than a slightly less elegant
 * mechanism, so this now reads geometry directly. To keep that cheap:
 *
 *  - ONE shared scroll/resize listener for the whole page, not one each;
 *  - reads are batched inside a single requestAnimationFrame, so the layout
 *    is flushed once per frame regardless of how many elements are waiting;
 *  - each element unregisters the moment it is shown, so the cost decays to
 *    zero once the reader has been down the page;
 *  - the listener detaches entirely when the last element has revealed.
 */

type Entry = { node: HTMLElement; margin: number; show: () => void };

const waiting = new Set<Entry>();
let frame = 0;
let listening = false;

function flush() {
  frame = 0;
  const vh = window.innerHeight;

  for (const entry of [...waiting]) {
    const rect = entry.node.getBoundingClientRect();
    // Reveal once the element has come up past the trigger line, or if it is
    // already above the viewport (the reader scrolled quickly past it).
    if (rect.top < vh - entry.margin && rect.bottom > 0) {
      waiting.delete(entry);
      entry.show();
    } else if (rect.bottom <= 0) {
      waiting.delete(entry);
      entry.show();
    }
  }

  if (waiting.size === 0) stop();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

type Variant = "fade" | "stamp" | "draw";

const VARIANT_CLASS: Record<Variant, string> = {
  fade: "reveal",
  stamp: "reveal-stamp",
  draw: "draw",
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "fade",
  /** Seconds of stagger. */
  delay = 0,
  /** Resting tilt for the stamp variant, in degrees. */
  tilt = 0,
  /** Pixels the element must rise above the viewport bottom before revealing. */
  margin = 90,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  tilt?: number;
  margin?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    const entry: Entry = { node, margin, show: () => setShown(true) };
    waiting.add(entry);
    start();

    // Evaluate immediately: anything already on screen at mount reveals now
    // rather than waiting for a scroll that may never happen.
    schedule();

    return () => {
      waiting.delete(entry);
      if (waiting.size === 0) stop();
    };
  }, [margin, shown]);

  const style: Record<string, string> = {};
  if (delay) style["--reveal-delay"] = `${Math.round(delay * 1000)}ms`;
  if (variant === "stamp") {
    style["--stamp-from"] = `${tilt - 7}deg`;
    style["--stamp-to"] = `${tilt}deg`;
  }

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`${VARIANT_CLASS[variant]} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
