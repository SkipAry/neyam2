"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mapsLink, site } from "@/data/site";

const links = [
  { href: "#signatures", label: "Signatures" },
  { href: "#menu", label: "Menu" },
  { href: "#philosophy", label: "Our Story" },
  { href: "#visit", label: "Visit" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const outside = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
    ].filter((node): node is HTMLElement => node != null);
    const outsideState = outside.map((node) => ({
      node,
      inert: node.inert,
      ariaHidden: node.getAttribute("aria-hidden"),
    }));
    const desktop = window.matchMedia("(min-width: 1024px)");
    const panel = document.getElementById("mobile-nav");
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus());
    const closeOnDesktop = () => desktop.matches && setOpen(false);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [
        toggleRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ].filter((node): node is HTMLElement => node != null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-nav-open");
    outside.forEach((node) => {
      node.inert = true;
      node.setAttribute("aria-hidden", "true");
    });
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(focusFrame);
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previous;
      document.body.classList.remove("mobile-nav-open");
      outsideState.forEach(({ node, inert, ariaHidden }) => {
        node.inert = inert;
        if (ariaHidden == null) node.removeAttribute("aria-hidden");
        else node.setAttribute("aria-hidden", ariaHidden);
      });
      if (panel?.contains(document.activeElement)) toggleRef.current?.focus();
    };
  }, [open]);

  const opaque = solid || open;
  const foreground = "text-maroon-deep";
  const muted = "text-terracotta-ink";
  const line = "bg-maroon";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-500 motion-reduce:transition-none ${
        opaque
          ? "border-maroon/15 bg-parchment/95 shadow-[0_8px_30px_rgba(43,23,16,0.08)] backdrop-blur-md"
          : "border-transparent bg-parchment-light/70 backdrop-blur-[2px]"
      }`}
    >
      <div className="relative z-20 mx-auto flex h-[4.25rem] max-w-site items-center justify-between px-4 sm:h-[4.75rem] sm:px-6 lg:px-8">
        <a href="#home" className="flex min-h-[44px] items-center gap-3" aria-label="Neyam — home">
          <Image
            src="/brand/mark-maroon.png"
            alt=""
            width={30}
            height={42}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span className="leading-none">
            <span className={`block font-display text-xl font-semibold tracking-[0.2em] ${foreground}`}>
              NEYAM
            </span>
            <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-caps ${muted}`}>
              Heritage dose &amp; kaapi
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 hover:bg-maroon/[0.07] ${foreground}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header-directions"
            className={`ml-2 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
              opaque
                ? "bg-maroon text-parchment-light hover:bg-maroon-deep"
                : "border border-maroon/25 bg-parchment-light/55 text-maroon-deep hover:bg-parchment-light"
            }`}
          >
            Get directions <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full sm:h-12 sm:w-12 lg:hidden"
        >
          <span className={`h-[2px] w-6 transition ${line} ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 transition ${line} ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 transition ${line} ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[4.25rem] z-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-200 sm:top-[4.75rem] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-nav"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="relative z-10 mx-3 max-h-[calc(100svh-5.75rem)] overflow-y-auto rounded-[1.5rem] border border-maroon/15 bg-parchment px-4 pb-6 shadow-[0_24px_70px_rgba(43,23,16,0.28)] sm:mx-5 sm:max-h-[calc(100svh-6.25rem)] sm:px-6 lg:hidden"
      >
        <p className="border-b border-maroon/10 py-4 text-[11px] font-semibold uppercase tracking-caps text-terracotta-ink">
          Model Colony, Pune · Daily 8 AM–10 PM
        </p>
        <nav aria-label="Main mobile">
          <ul className="divide-y divide-maroon/10">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="grid min-h-[58px] grid-cols-[2rem_1fr_auto] items-center gap-3 font-display text-xl text-maroon-deep"
                >
                  <span className="font-sans text-[11px] font-semibold tracking-caps text-terracotta-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                  <span aria-hidden="true" className="font-sans text-base text-maroon/45">↘</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="mobile-nav-directions"
          className="mt-6 flex min-h-[54px] items-center justify-center rounded-full bg-maroon px-6 text-sm font-semibold text-parchment-light"
        >
          Get directions <span className="ml-2" aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
