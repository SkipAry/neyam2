"use client";

import { useEffect, useRef } from "react";
import { mapsLink, site } from "@/data/site";
import { Gopuram, KolamBorder, Separator } from "./Ornaments";

function HeroFacts({ compact = false }: { compact?: boolean }) {
  const label = compact
    ? "text-[10px] uppercase tracking-caps text-terracotta-ink"
    : "text-[11px] uppercase tracking-caps text-parchment/80";
  const value = compact
    ? "mt-1 font-display text-sm text-maroon-deep"
    : "mt-1.5 font-display text-sm text-parchment-light sm:text-lg";

  return (
    <dl
      className={
        compact
          ? "grid grid-cols-3 gap-x-3"
          : "hero-facts-main mt-10 grid max-w-2xl grid-cols-3 gap-x-4 gap-y-5 border-t border-parchment/20 pt-6 short:mt-5 short:pt-4 sm:gap-x-6 sm:pt-8 lg:mt-14 short:lg:mt-8"
      }
    >
      <div>
        <dt className={label}>Open</dt>
        <dd className={value}>{site.hours}</dd>
      </div>
      <div>
        <dt className={label}>Days</dt>
        <dd className={value}>{site.openDays}</dd>
      </div>
      {site.googleRating != null && site.googleReviewCount != null ? (
        <div>
          <dt className={label}>On Google</dt>
          <dd className={value}>
            <a
              href={site.googleListing}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] items-center underline underline-offset-4 ${
                compact
                  ? "decoration-terracotta/40 hover:decoration-terracotta"
                  : "decoration-brass/60 hover:decoration-brass"
              }`}
            >
              {site.googleRating.toFixed(1)} ★
              <span className={`ml-1 text-xs ${compact ? "text-ink/70" : "text-parchment/85"}`}>
                ({site.googleReviewCount})
              </span>
            </a>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

/**
 * HERO — the podi-on-idli footage, held behind parchment.
 *
 * The video is muted, inline and looping, and it is *not* autoplayed
 * blindly: it only starts once it can actually play, and it pauses when
 * scrolled out of view so it costs nothing while the reader is further
 * down the page. Under prefers-reduced-motion the poster frame is used
 * and the video never loads at all.
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reduced motion: stop it dead and leave the poster frame showing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Some browsers reject play() until the tab is interacted with; that's
    // fine — the poster stays and nothing breaks.
    void video.play().catch(() => {});

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-[100svh] overflow-hidden bg-maroon-deep">
      {/* Footage */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
        // autoPlay is required as an attribute: a bare play() call is
        // rejected without a user gesture in several browsers, which left
        // the hero frozen on its poster. muted + playsInline make the
        // attribute permissible under autoplay policy.
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability scrim. Deep at the bottom where the type sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-maroon-deep/70 via-maroon-deep/45 to-maroon-deep/92"
      />

      {/* Gopuram watermark, barely there */}
      <Gopuram className="pointer-events-none absolute -right-10 bottom-24 hidden h-[30rem] w-auto text-parchment/[0.07] lg:block" />

      {/* Padding tightens twice: once for narrow screens, and again via the
          `short` height variant so a landscape tablet or short laptop still
          lands the stats row above the fold. */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-4 pb-14 pt-28 short:pb-8 short:pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pb-32 lg:pt-32 short:lg:pb-14 short:lg:pt-24">
        <p className="eyebrow !text-parchment/90">
          {site.address.line2} · {site.address.city}
        </p>

        {/* The size is capped against viewport *height* as well as width, so a
            short landscape window doesn't get 80px display type. */}
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.45rem,min(11vw,10.5vh),5.5rem)] font-semibold leading-[1.02] text-parchment-light short:mt-3 sm:text-[clamp(2.7rem,min(8vw,10.5vh),5.5rem)]">
          A slower corner of
          <br className="hidden sm:block" /> South India,
          <span className="italic text-brass"> brought to Pune.</span>
        </h1>

        <Separator className="mt-8 text-parchment/40 short:mt-4" />

        <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/90 short:mt-4 md:text-lg">
          Bangalore Benne Dose crisped in ghee, thatte idli under a dusting of
          podi, and filter kaapi poured the long way. Breakfast, unhurried.
        </p>

        <div className="mt-10 flex flex-col gap-3 short:mt-5 sm:flex-row sm:flex-wrap sm:gap-4">
          <a
            href="#menu"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-parchment-light px-8 text-base font-semibold text-maroon-deep transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[54px]"
          >
            See the Menu
          </a>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-parchment/40 px-8 text-base font-semibold text-parchment-light transition-colors hover:border-parchment hover:bg-parchment/10 sm:min-h-[54px]"
          >
            Get Directions
          </a>
        </div>

        <HeroFacts />
      </div>

      {/* Kolam run along the very bottom edge, as on the brand's artwork */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden text-brass/40" aria-hidden="true">
        <KolamBorder height={18} uid="hero" />
      </div>
      </section>
      <div className="hero-facts-short border-b border-maroon/10 bg-parchment-deep px-4 py-4">
        <div className="mx-auto max-w-site">
          <HeroFacts compact />
        </div>
      </div>
    </>
  );
}
