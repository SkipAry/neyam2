"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mapsLink, site, telLink } from "@/data/site";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#signatures", label: "Signatures" },
  { href: "#menu", label: "Menu" },
  { href: "#kaapi", label: "Filter Kaapi" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const homeRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the drawer is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const panel = document.getElementById("mobile-nav");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const previousOverflow = document.body.style.overflow;
    const focusFrame = requestAnimationFrame(() => {
      if (!panel?.hidden) firstMobileLinkRef.current?.focus();
    });
    const onDesktop = () => {
      if (!desktop.matches) return;
      homeRef.current?.focus();
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusable = [
        homeRef.current,
        toggleRef.current,
        ...Array.from(
          panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')
        ),
      ].filter((node): node is HTMLElement => node != null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-nav-open");

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("mobile-nav-open");
      if (panel?.contains(document.activeElement)) toggleRef.current?.focus();
    };
  }, [open]);

  const opaque = solid || open;

  /**
   * The hero is dark footage, so at the top of the page the header must be
   * light; once it has a parchment background it must be dark. Getting this
   * backwards makes the whole nav invisible over the video — which is
   * exactly what the first build did.
   */
  const wordmark = opaque ? "text-maroon" : "text-parchment-light";
  const subline = opaque ? "text-terracotta-ink" : "text-parchment/75";
  const navLink = opaque
    ? "text-maroon-deep hover:text-terracotta"
    : "text-parchment/90 hover:text-parchment-light";
  const cta = opaque
    ? "bg-maroon text-parchment-light hover:bg-maroon-deep"
    : "bg-parchment-light text-maroon-deep hover:bg-parchment";
  const bar = opaque ? "bg-maroon" : "bg-parchment-light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        opaque
          ? "border-b border-maroon/15 bg-parchment/95 backdrop-blur-md"
          : "bg-gradient-to-b from-maroon-deep/55 to-transparent"
      } motion-reduce:transition-none`}
    >
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          ref={homeRef}
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          {/* Two marks rather than a CSS filter, so each stays crisp */}
          <Image
            src={opaque ? "/brand/mark-maroon.png" : "/brand/mark-cream.png"}
            alt=""
            width={34}
            height={46}
            className="h-11 w-auto"
            priority
          />
          <span className="leading-none">
            <span
              className={`block font-display text-xl font-semibold tracking-[0.22em] transition-colors duration-500 ${wordmark}`}
            >
              NEYAM
            </span>
            <span
              className={`mt-1 block text-[11px] uppercase tracking-caps transition-colors duration-500 ${subline}`}
            >
              Model Colony · Pune
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-sm font-medium transition-colors duration-500 ${navLink}`}
            >
              {l.label}
            </a>
          ))}
          {telLink ? (
            <a
              href={telLink}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-500 ${cta}`}
            >
              {site.phoneDisplay}
            </a>
          ) : (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-500 ${cta}`}
            >
              Get Directions
            </a>
          )}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-[2px] w-6 transition-all duration-300 motion-reduce:transition-none ${bar} ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 transition-all duration-200 motion-reduce:transition-none ${bar} ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 transition-all duration-300 motion-reduce:transition-none ${bar} ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-maroon/15 bg-parchment px-4 pb-8 pt-2 sm:px-6 lg:hidden"
      >
        <nav aria-label="Main mobile">
          <ul className="divide-y divide-maroon/10">
            {links.map((l, index) => (
              <li key={l.href}>
                <a
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="grid min-h-[52px] grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-2 font-display text-lg text-maroon-deep"
                >
                  <span className="font-sans text-[10px] font-semibold tracking-caps text-terracotta-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{l.label}</span>
                  <span className="font-sans text-base text-maroon/45" aria-hidden="true">
                    ↘
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between border-b border-maroon/10 py-3 text-[10px] font-semibold uppercase tracking-caps text-terracotta-ink">
          <span>Open every day</span>
          <span>{site.hours}</span>
        </div>
        <a
          href={telLink || mapsLink}
          {...(telLink ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-maroon px-6 text-sm font-semibold text-parchment-light"
        >
          {telLink ? `Call ${site.phoneDisplay}` : "Get Directions"}
        </a>
      </div>
    </header>
  );
}
