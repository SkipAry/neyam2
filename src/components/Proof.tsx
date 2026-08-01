"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photos, reels, site } from "@/data/site";
import Reveal from "./Reveal";

const atmosphere = reels.find((reel) => !reel.hasAudio) ?? reels[0];

export default function Proof() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section id="proof" className="relative overflow-hidden bg-terracotta py-20 text-parchment-light md:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-8 border-b border-parchment/25 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow !text-brass-light">Pune has spoken</p>
            <h2 className="mt-4 max-w-[11ch] font-sans text-[clamp(3.2rem,7vw,7rem)] font-bold uppercase leading-[0.8] tracking-[-0.065em]">
              The neighbourhood&apos;s new ritual.
            </h2>
          </div>
          <a
            href={site.googleListing}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="proof-google-reviews"
            className="group flex min-h-[112px] items-end gap-5 text-parchment-light sm:min-h-[140px]"
          >
            <span className="font-sans text-[clamp(5rem,11vw,9.5rem)] font-bold leading-[0.68] tracking-[-0.08em]">
              {site.googleRating != null ? site.googleRating.toFixed(1) : "★"}
            </span>
            <span className="pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-parchment/90 sm:pb-2">
              <span className="block text-brass-light">★★★★★</span>
              {site.googleReviewCount != null ? `${site.googleReviewCount} Google reviews` : "See us on Google"}
              <span className="ml-1 inline-block transition group-hover:translate-x-1" aria-hidden="true">↗</span>
            </span>
          </a>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="relative overflow-hidden bg-maroon-deep">
            <video
              ref={videoRef}
              className="block aspect-[4/5] h-full max-h-[43rem] min-h-[30rem] w-full object-cover"
              poster={atmosphere.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={atmosphere.label}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={atmosphere.src} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? "Pause restaurant film" : "Play restaurant film"}
              className="absolute bottom-5 left-5 inline-flex min-h-[50px] cursor-pointer items-center justify-center rounded-full bg-parchment-light px-6 text-xs font-bold text-maroon-deep shadow-lg transition-colors duration-200 hover:bg-parchment"
            >
              {playing ? "Pause film" : "Play the room"}
            </button>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal className="relative min-h-[24rem] overflow-hidden sm:col-span-2 sm:min-h-[30rem]">
              <Image
                src={photos.guests.src}
                alt={photos.guests.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-deep/80 to-transparent px-6 pb-6 pt-24">
                <p className="max-w-xl font-display text-3xl font-semibold italic leading-tight sm:text-4xl">
                  “Come for the crisp edge. Stay for the slower hour.”
                </p>
              </div>
            </Reveal>
            <Reveal className="border-t border-parchment/30 py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass-light">Seen at Neyam</p>
              <p className="mt-3 font-display text-2xl font-semibold">Podi in the air. Kaapi on the table.</p>
            </Reveal>
            <Reveal className="border-t border-parchment/30 py-6 sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass-light">Follow the day</p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="proof-instagram"
                className="mt-3 inline-flex min-h-[44px] items-center font-display text-2xl font-semibold underline decoration-parchment/35 underline-offset-8"
              >
                {site.instagramHandle} <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
