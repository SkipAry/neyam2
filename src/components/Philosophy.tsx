import Image from "next/image";
import { photos, site, statements } from "@/data/site";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-parchment-deep py-20 text-maroon-deep md:py-28">
      <div className="absolute -right-[8vw] top-6 font-display text-[34vw] italic leading-none text-brass/[0.22]" aria-hidden="true">
        ney
      </div>

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-6 border-b border-maroon/25 pb-10 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <div className="grid h-28 w-28 place-items-center rounded-full border border-maroon/25 bg-brass text-center shadow-[0_18px_45px_rgba(82,31,18,.12)] sm:h-36 sm:w-36">
            <span className="font-display text-2xl font-semibold italic sm:text-3xl">
              ney
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.2em]">means ghee</span>
            </span>
          </div>
          <h2 className="max-w-[13ch] font-display text-[clamp(3.4rem,7.5vw,7.2rem)] font-semibold leading-[0.84] tracking-[-0.05em]">
            The taste of true tradition
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="organic-photo relative aspect-[4/5] overflow-hidden border-[6px] border-parchment-light/80">
              <Image
                src={photos.arriving.src}
                alt={photos.arriving.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-1 w-[48%] rotate-[4deg] border-4 border-parchment-light bg-parchment-light p-2 shadow-[0_20px_40px_rgba(82,31,18,.2)] sm:-right-8">
              <div className="relative aspect-square">
                <Image src={photos.kaapi.src} alt={photos.kaapi.alt} fill sizes="18rem" className="object-cover" />
              </div>
            </div>
          </Reveal>

          <div className="pb-4 lg:pb-0">
            <Reveal>
              <p className="font-display text-[clamp(2.4rem,4.8vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
                {statements[1].heading}
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/72 sm:text-lg">
                {statements[1].lines.join(" ")} Good food does not need to be loud. It only needs someone to care enough to make it well.
              </p>
            </Reveal>

            <Reveal className="mt-12 border-l-2 border-maroon/35 pl-6 sm:pl-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-terracotta-ink">
                One long community table
              </p>
              <p className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Meals are meant to be shared.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/68">
                {statements[4].lines.join(" ")}
              </p>
            </Reveal>

            <Reveal className="mt-12 border-y border-maroon/25 py-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-terracotta-ink">
                Painted on the counter
              </p>
              <div className="mt-4 space-y-1 font-display text-2xl italic leading-tight sm:text-3xl">
                {site.wallText.map((line) => <p key={line}>{line}</p>)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
