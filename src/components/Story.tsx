import { photos, site, statements } from "@/data/site";
import { ChittaraBand, ChittaraLattice, Separator } from "./Ornaments";
import Reveal from "./Reveal";
import ScrollStage from "./ScrollStage";
import Stamp from "./Stamp";

/**
 * STORY — the brand statements, verbatim from statements.txt.
 *
 * These are the strongest words the brand owns, so they get room and no
 * competing imagery beyond two stamps that drift on scroll.
 */
export default function Story() {
  return (
    <ScrollStage id="story" className="relative overflow-hidden bg-parchment py-20 md:py-28">
      <ChittaraLattice uid="story-l" className="pointer-events-none absolute -left-16 top-10 h-72 w-72 text-maroon/[0.06]" />
      <ChittaraLattice uid="story-r" className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 text-maroon/[0.06]" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">That&rsquo;s the kind of place we&rsquo;re building</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] text-maroon-deep">
            {site.tagline}.
          </h2>
          <Separator className="mx-auto mt-7 text-terracotta/50" />
        </Reveal>

        {/* The statements, alternating side with a drifting stamp between */}
        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-14">
          {/* left column */}
          <ul className="space-y-14">
            {statements.slice(0, 2).map((s, i) => (
              <Reveal as="li" key={s.heading} delay={i * 0.08}>
                <h3 className="font-display text-2xl font-semibold leading-snug text-maroon md:text-[1.7rem]">
                  {s.heading}
                </h3>
                <div className="mt-4 space-y-1.5">
                  {s.lines.map((line) => (
                    <p key={line} className="text-base leading-relaxed text-ink/75">
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </ul>

          {/* centre — two stamps that drift in opposite directions on scroll */}
          <div className="mx-auto flex w-full max-w-[15rem] flex-col gap-10 lg:w-[16rem] lg:max-w-none">
            <Reveal variant="stamp" tilt={-3} className="stage-drift-left">
              <Stamp src={photos.shrine.src} alt={photos.shrine.alt} tilt={0} />
            </Reveal>
            <Reveal variant="stamp" tilt={4} delay={0.12} className="stage-drift-right">
              <Stamp src={photos.gheePour.src} alt={photos.gheePour.alt} tilt={0} />
            </Reveal>
          </div>

          {/* right column */}
          <ul className="space-y-14">
            {statements.slice(2, 4).map((s, i) => (
              <Reveal as="li" key={s.heading} delay={i * 0.08}>
                <h3 className="font-display text-2xl font-semibold leading-snug text-maroon md:text-[1.7rem]">
                  {s.heading}
                </h3>
                <div className="mt-4 space-y-1.5">
                  {s.lines.map((line) => (
                    <p key={line} className="text-base leading-relaxed text-ink/75">
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <ChittaraBand className="mt-20 text-maroon/25" />
    </ScrollStage>
  );
}
