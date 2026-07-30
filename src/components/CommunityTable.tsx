import { site, statements } from "@/data/site";
import { ChittaraBand, Separator } from "./Ornaments";
import Reveal from "./Reveal";

/**
 * COMMUNITY TABLE — the fifth brand statement, given its own room.
 *
 * Also carries the hand-painted wall text from inside the restaurant,
 * set as it appears on the counter wall.
 */
export default function CommunityTable() {
  const shared = statements[statements.length - 1];

  return (
    <section className="relative overflow-hidden bg-terracotta py-20 md:py-28">
      <ChittaraBand className="absolute inset-x-0 top-0 text-parchment/20" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow !text-parchment/90">One long table</p>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-snug text-parchment-light">
            {shared.heading}
          </h2>
          <Separator className="mx-auto mt-7 text-parchment/40" />
          <div className="mt-7 space-y-3">
            {shared.lines.map((line) => (
              <p
                key={line}
                className="text-base leading-relaxed text-parchment/90 md:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </Reveal>

        {/* The wall text, set the way it is painted on the counter */}
        <Reveal delay={0.15} className="mt-16">
          <div className="mx-auto max-w-md border-y border-parchment/25 py-9">
            {site.wallText.map((line, i) => (
              <p
                key={line}
                className={`font-display text-lg leading-relaxed text-parchment-light md:text-xl ${
                  i === site.wallText.length - 1 ? "italic text-brass-light" : ""
                }`}
              >
                {line}
              </p>
            ))}
            <p className="mt-5 text-[11px] uppercase tracking-caps text-parchment/90">
              Painted on our counter wall
            </p>
          </div>
        </Reveal>
      </div>

      <ChittaraBand className="absolute inset-x-0 bottom-0 rotate-180 text-parchment/20" />
    </section>
  );
}
