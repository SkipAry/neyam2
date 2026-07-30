"use client";

import { useEffect, useRef, useState } from "react";
import { mapsLink } from "@/data/site";

/**
 * Keeps the two highest-value actions within thumb reach on long mobile pages.
 * It stays out of the hero and footer so it never competes with their CTAs.
 */
export default function MobileQuickActions() {
  const [visible, setVisible] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const observeBody = new MutationObserver(() => {
      setNavOpen(document.body.classList.contains("mobile-nav-open"));
    });

    const measure = () => {
      frame = 0;
      const hero = document.getElementById("home");
      const visit = document.getElementById("visit");
      const footer = document.querySelector("footer");
      const destinationIsNear = [visit, footer].some(
        (node) => node != null && node.getBoundingClientRect().top < window.innerHeight - 16
      );
      const hasLeftHero = hero != null && hero.getBoundingClientRect().bottom <= 88;
      setVisible(hasLeftHero && !destinationIsNear);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    observeBody.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      observeBody.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = visible && !navOpen;

  useEffect(() => {
    if (!active && navRef.current?.contains(document.activeElement)) {
      const mobileMenu = document.querySelector<HTMLElement>(
        'header button[aria-controls="mobile-nav"]'
      );
      mobileMenu?.focus();
    }
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Quick actions"
      aria-hidden={!active}
      className={`mobile-quick-actions fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto grid max-w-sm grid-cols-2 gap-1.5 rounded-[1.35rem] border border-maroon/20 bg-parchment-light/95 p-1.5 shadow-[0_16px_38px_rgba(43,23,16,0.28)] backdrop-blur-md transition duration-300 ease-settle md:hidden motion-reduce:transition-none ${
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <a
        href="#menu"
        tabIndex={active ? 0 : -1}
        className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[1rem] px-4 text-sm font-semibold text-maroon-deep transition-colors hover:bg-parchment"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M5 6h14M5 12h14M5 18h9" strokeLinecap="round" />
        </svg>
        Menu
      </a>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={active ? 0 : -1}
        className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[1rem] bg-maroon px-4 text-sm font-semibold text-parchment-light transition-colors hover:bg-maroon-deep"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
        Directions
      </a>
    </nav>
  );
}
