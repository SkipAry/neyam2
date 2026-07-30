"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the drawer is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
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
      }`}
    >
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
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
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-[2px] w-6 transition-all duration-300 ${bar} ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 transition-all duration-200 ${bar} ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 transition-all duration-300 ${bar} ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-maroon/15 bg-parchment px-4 pb-8 pt-2 sm:px-6 lg:hidden"
      >
        <nav aria-label="Main mobile">
          <ul className="divide-y divide-maroon/10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-lg text-maroon-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
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
