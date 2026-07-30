"use client";

import { useEffect, useRef, useState } from "react";
import { reels } from "@/data/site";
import { Separator } from "./Ornaments";
import Reveal from "./Reveal";

/**
 * REELS — vertical video, played only while on screen.
 *
 * Autoplay policy means a video must be muted to start on its own, so
 * every reel begins muted. The one with speech gets an explicit unmute
 * control; the silent ambience clip has no audio track at all and so has
 * no control, because offering one that does nothing is worse than none.
 */
function ReelCard({
  src,
  poster,
  label,
  hasAudio,
  index,
}: {
  src: string;
  poster: string;
  label: string;
  hasAudio: boolean;
  index: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.45 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) void video.play().catch(() => {});
  };

  const togglePlayback = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <Reveal
      as="li"
      variant="stamp"
      tilt={index % 2 === 0 ? -2 : 2.5}
      delay={index * 0.1}
      className="relative w-[82vw] max-w-[21rem] shrink-0 snap-center sm:w-auto sm:max-w-none"
    >
      <div className="relative overflow-hidden rounded-sm border-[6px] border-maroon bg-maroon shadow-[0_20px_44px_rgba(30,10,5,0.32)]">
        <video
          ref={ref}
          className="block aspect-[9/16] w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-deep/85 text-parchment-light backdrop-blur transition-colors hover:bg-maroon-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              {playing ? (
                <path d="M7 6h4v12H7zM13 6h4v12h-4z" />
              ) : (
                <path d="m8 5 11 7-11 7V5Z" />
              )}
            </svg>
          </button>
          {hasAudio ? (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!muted}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-deep/85 text-parchment-light backdrop-blur transition-colors hover:bg-maroon-deep"
            >
              <span className="sr-only">{muted ? "Unmute video" : "Mute video"}</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M3 10v4h4l5 4V6L7 10H3z" />
                {muted ? (
                  <path
                    d="M16 8l5 5m0-5l-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M15.5 8.5a4.5 4.5 0 0 1 0 7M18 6a8 8 0 0 1 0 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-center font-display text-base text-maroon">{label}</p>
    </Reveal>
  );
}

export default function Reels() {
  return (
    <section className="bg-parchment-deep py-20 md:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Moving pictures</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold text-maroon-deep">
            A look inside
          </h2>
          <Separator className="mx-auto mt-6 text-terracotta/50" />
        </Reveal>

        <ul
          aria-label="Restaurant videos"
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-8 pt-10 sm:mx-auto sm:mt-14 sm:grid sm:max-w-3xl sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0"
        >
          {reels.map((reel, i) => (
            <ReelCard key={reel.id} {...reel} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
