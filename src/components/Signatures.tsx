"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signatures, site } from "@/data/site";
import { BananaLeaf } from "./Ornaments";
import Reveal from "./Reveal";
import ScrollStage from "./ScrollStage";

/**
 * SIGNATURES — the three background-removed dishes, floating.
 *
 * This is the one section that leans on the reference design's
 * "cutout dish on a plain ground" treatment. Each dish rises at a
 * slightly different rate as the section passes, which is what makes
 * them read as floating rather than pasted.
 */
export default function Signatures() {
  const [mobileRail, setMobileRail] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setMobileRail(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <ScrollStage
      id="signatures"
      className="relative overflow-hidden bg-parchment-deep py-20 md:py-28"
    >
      <BananaLeaf className="pointer-events-none absolute -left-24 top-1/4 h-[34rem] w-auto text-leaf/[0.12]" />
      <BananaLeaf className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-auto rotate-12 text-leaf/[0.1]" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Built on ghee</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight text-maroon-deep">
            The name is the ingredient.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
            <em>Neyam</em> comes from <em>ney</em> — ghee. It is the first thing
            the griddle sees and the reason the dose crackles at the edge.
          </p>
        </Reveal>

        <ul
          aria-label="Signature dishes"
          aria-describedby={mobileRail ? "signature-rail-hint" : undefined}
          tabIndex={mobileRail ? 0 : -1}
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-8 focus-visible:ring-inset sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-8"
        >
          {signatures.map((dish, i) => (
            <Reveal
              as="li"
              key={dish.name}
              delay={i * 0.1}
              className="group w-[82vw] max-w-[20rem] shrink-0 snap-center text-center sm:w-auto sm:max-w-none"
            >
              {/* Each dish rises a little differently — index drives the offset */}
              <div
                className="signature-drift relative mx-auto aspect-square w-full max-w-[20rem]"
                style={{ translate: `0 calc(var(--stage) * ${-3 - i * 1.6}rem)` }}
              >
                {/* soft ground shadow so the cutout doesn't float in a void */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-[8%] left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-[50%] bg-maroon/20 blur-xl"
                />
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                  className="object-contain drop-shadow-[0_18px_28px_rgba(82,31,18,0.28)] transition-transform duration-700 ease-settle group-hover:scale-[1.04]"
                />
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold text-maroon">
                {dish.name}
              </h3>
              <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-ink/70">
                {dish.line}
              </p>
            </Reveal>
          ))}
        </ul>
        <p id="signature-rail-hint" className="sr-only">
          On small screens, swipe horizontally or use the left and right arrow keys to see every
          dish.
        </p>

        {/* Google's own price band — a real figure, not one we made up. */}
        <Reveal className="mt-16 text-center">
          <p className="text-sm text-ink/75">
            Typically {site.priceRange} per person
            <span className="mx-2 text-terracotta/50">◆</span>
            <a
              href={site.googleListing}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center underline decoration-terracotta/40 underline-offset-4 hover:decoration-terracotta"
            >
              as listed on Google
            </a>
          </p>
        </Reveal>
      </div>
    </ScrollStage>
  );
}
