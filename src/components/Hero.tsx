"use client";

import Image from "next/image";
import { useRef } from "react";
import { mapsLink, site } from "@/data/site";
import { NeyamWordmark } from "./neyam-wordmark";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const moveDish = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || event.pointerType === "touch") return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--hero-rx", `${(-y * 3).toFixed(2)}deg`);
    stage.style.setProperty("--hero-ry", `${(x * 4).toFixed(2)}deg`);
    stage.style.setProperty("--hero-x", `${(x * 6).toFixed(1)}px`);
    stage.style.setProperty("--hero-y", `${(y * 5).toFixed(1)}px`);
    stage.style.setProperty("--hero-sx", `${(-x * 3).toFixed(1)}px`);
    stage.style.setProperty("--hero-sy", `${(-y * 2).toFixed(1)}px`);
  };

  const resetDish = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.removeProperty("--hero-rx");
    stage.style.removeProperty("--hero-ry");
    stage.style.removeProperty("--hero-x");
    stage.style.removeProperty("--hero-y");
    stage.style.removeProperty("--hero-sx");
    stage.style.removeProperty("--hero-sy");
  };

  return (
    <section
      id="home"
      className="hero-golden relative isolate min-h-[100svh] overflow-hidden bg-parchment-light text-maroon-deep"
    >
      <div className="hero-paper absolute inset-0" aria-hidden="true" />
      {/* This strip is absolutely positioned, so a second line would land on
          top of the wordmark eyebrow rather than pushing it down. Below 360px
          the two labels can't hold 0.2em tracking on one line, so the tracking
          tightens there instead of letting them wrap. */}
      <div className="absolute inset-x-0 top-[5.4rem] z-20 flex items-center justify-between whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.04em] text-maroon/70 xs:tracking-[0.2em] sm:px-7 lg:px-10">
        <span>Model Colony · Pune</span>
        <span className="hidden sm:inline">Daily · 8 AM–10 PM</span>
        <span>100% vegetarian</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-20 text-center sm:top-[18%]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-terracotta-ink sm:text-xs">
          Heritage Bangalore breakfast
        </p>
        <h1 className="hero-wordmark text-maroon-deep">
          <NeyamWordmark className="mx-auto w-[clamp(17rem,62vw,60rem)]" />
        </h1>
        <p className="sr-only">
          Neyam serves Bangalore-style benne dose, idli and filter kaapi in Model Colony, Pune.
        </p>
      </div>

      <div
        ref={stageRef}
        onPointerMove={moveDish}
        onPointerLeave={resetDish}
        className="hero-stage absolute left-1/2 top-[27%] z-10 -translate-x-1/2 sm:top-[27%] lg:left-[69%] lg:top-[34%] xl:left-[62%]"
        aria-hidden="true"
      >
        <div className="hero-sun absolute left-1/2 top-[52%] aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-deep">
          <svg
            viewBox="0 0 200 200"
            className="hero-orbit absolute -inset-[10%] h-[120%] w-[120%] overflow-visible"
          >
            <defs>
              <path
                id="ghee-orbit"
                d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
              />
            </defs>
            <text className="fill-maroon-deep text-[7px] font-semibold uppercase tracking-[0.18em]">
              <textPath href="#ghee-orbit">
                Kaapi in the tumbler · Bengaluru in Pune · Poured the long way ·
              </textPath>
            </text>
          </svg>
        </div>

        <div className="hero-dish absolute inset-0">
          <div className="hero-shadow absolute bottom-[7%] left-[8%] h-[8%] w-[84%] rounded-[50%] bg-maroon/20 blur-2xl" />
          <Image
            src="/food/hero-kaapi-v3.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 20rem, 72vw"
            className="hero-dish-media object-contain drop-shadow-[0_30px_30px_rgba(82,31,18,.3)]"
          />
        </div>

        <div className="hero-stamp absolute -right-[14%] top-[34%] grid h-[5.7rem] w-[5.7rem] rotate-[8deg] place-items-center rounded-full border-2 border-maroon bg-parchment-light text-center text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-maroon shadow-[0_10px_24px_rgba(82,31,18,.18)] sm:h-[7rem] sm:w-[7rem]">
          Poured
          <br />
          the long way
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[4.6rem] z-20 mx-auto grid max-w-site items-end gap-5 px-4 sm:px-7 md:grid-cols-[1fr_auto] lg:px-8">
        <div className="hero-copy-block max-w-[31rem]">
          <p className="hero-copy-headline font-display text-[clamp(1.55rem,2.7vw,2.45rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
            Bringing the authentic flavors of Bengaluru&apos;s breakfasts to the heart of Pune
          </p>
          <p className="hero-supporting-copy mt-2 hidden text-sm leading-relaxed text-ink/65 sm:block">
            Crisp benne dose, soft thatte idli, and filter kaapi poured the long way.
          </p>
        </div>

        <div className="flex items-center gap-3 md:justify-end">
          {site.googleRating != null ? (
            <a
              href={site.googleListing}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[50px] items-center px-3 text-sm font-semibold text-maroon sm:inline-flex"
            >
              {site.googleRating.toFixed(1)} <span className="ml-1 text-brass-deep">★</span>
            </a>
          ) : null}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="hero-directions"
            className="inline-flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-maroon px-7 text-sm font-semibold text-parchment-light shadow-[0_12px_30px_rgba(82,31,18,.22)] transition duration-300 hover:-translate-y-1 hover:bg-maroon-deep md:flex-none"
          >
            Find your table <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-ticker absolute inset-x-0 bottom-0 z-30 overflow-hidden bg-maroon py-3 text-parchment-light">
        <div className="hero-ticker-track flex w-max items-center text-[11px] font-semibold uppercase tracking-[0.24em]">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center whitespace-nowrap">
              <span className="mx-7">Benne dose with crisp edges</span>
              <span className="text-brass">●</span>
              <span className="mx-7">Thatte idli soft at heart</span>
              <span className="text-brass">●</span>
              <span className="mx-7">Filter kaapi poured long</span>
              <span className="text-brass">●</span>
              <span className="mx-7">Breakfast until dinner</span>
              <span className="text-brass">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
