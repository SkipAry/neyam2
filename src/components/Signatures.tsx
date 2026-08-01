"use client";

import Image from "next/image";
import { useState } from "react";
import { signatures, site } from "@/data/site";
import Reveal from "./Reveal";

export default function Signatures() {
  const [active, setActive] = useState(0);
  const dish = signatures[active];

  return (
    <section id="signatures" className="relative overflow-hidden bg-maroon py-20 text-parchment-light md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden opacity-50" aria-hidden="true">
        <p className="whitespace-nowrap font-display text-[18vw] font-semibold italic leading-none text-maroon-light/30">
          the ghee edit · the ghee edit
        </p>
      </div>

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow !text-brass">Three reasons to arrive hungry</p>
            <h2 className="mt-4 max-w-[11ch] font-display text-[clamp(3.5rem,8vw,7.4rem)] font-semibold leading-[0.8] tracking-[-0.05em]">
              The ghee edit.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-parchment/82 md:text-right md:text-base">
            Pick a plate. Take a closer look. Then meet the real thing at Model Colony.
          </p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div className="signature-theatre relative min-h-[35rem] overflow-hidden rounded-[2rem] bg-parchment-light text-maroon-deep sm:min-h-[42rem] lg:min-h-[46rem]">
            <div className="signature-meta absolute inset-x-0 top-5 flex items-center justify-between px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta-ink sm:px-9">
              <span>Signature 0{active + 1}</span>
              <span>{site.priceRange} per person</span>
            </div>

            <p
              key={`type-${dish.name}`}
              aria-hidden="true"
              className="signature-type absolute left-1/2 top-[16%] w-[120%] -translate-x-1/2 text-center font-display text-[clamp(4.2rem,12vw,11rem)] font-semibold uppercase leading-[0.72] tracking-[-0.065em] text-maroon/[0.09] motion-safe:animate-[dish-type_.65s_cubic-bezier(.16,1,.3,1)]"
            >
              {dish.name}
            </p>

            <div className="signature-media dish-stage group/dish absolute left-1/2 top-[17%] h-[58%] w-[94%] -translate-x-1/2 sm:top-[13%] sm:h-[68%] lg:w-[72%]">
              <div className="absolute bottom-[7%] left-1/2 h-12 w-[62%] -translate-x-1/2 rounded-[50%] bg-maroon/20 blur-2xl" />
              <Image
                key={dish.image}
                src={dish.image}
                alt={dish.alt}
                fill
                sizes="(min-width: 1024px) 58rem, 94vw"
                className="dish-visual object-contain drop-shadow-[0_28px_36px_rgba(82,31,18,.27)] motion-safe:animate-[dish-in_.7s_cubic-bezier(.16,1,.3,1)]"
              />
            </div>

            <div className="signature-content absolute inset-x-5 bottom-5 grid gap-5 border-t border-maroon/15 pt-5 sm:inset-x-8 sm:bottom-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="signature-copy" aria-live="polite" aria-atomic="true">
                <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-semibold leading-none text-maroon">
                  {dish.name}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">{dish.line}</p>
              </div>

              <div
                className="signature-selectors grid grid-cols-3 gap-2"
                role="group"
                aria-label="Choose a signature dish"
              >
                {signatures.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={active === index}
                    aria-label={`Show ${item.name}`}
                    onClick={() => setActive(index)}
                    className={`min-h-[48px] min-w-[48px] cursor-pointer rounded-full border px-3 text-xs font-bold transition duration-300 sm:min-w-[56px] ${
                      active === index
                        ? "border-maroon bg-maroon text-parchment-light"
                        : "border-maroon/20 text-maroon hover:border-maroon hover:bg-parchment"
                    }`}
                  >
                    0{index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
