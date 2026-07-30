import { photos } from "@/data/site";
import { Separator, Steam } from "./Ornaments";
import Reveal from "./Reveal";
import ScrollStage from "./ScrollStage";
import Stamp from "./Stamp";

/**
 * KAAPI — a quiet, single-idea section for the filter coffee.
 *
 * The steam is CSS-only and sits above the stamp. It is decorative, so it
 * is aria-hidden and disappears entirely under reduced-motion.
 */
export default function Kaapi() {
  return (
    <ScrollStage
      id="kaapi"
      className="relative overflow-hidden bg-parchment py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-site items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Copy */}
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">Brewed on the premises</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight text-maroon-deep">
            Filter kaapi,
            <br />
            poured the long way.
          </h2>
          <Separator className="mt-7 text-terracotta/50" />
          <p className="mt-7 text-base leading-relaxed text-ink/75 md:text-lg">
            Decoction dripped slowly through the filter, never rushed and never
            reheated. Then pulled between tumbler and davara until the froth
            builds and the temperature is exactly right to drink.
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
            Hot, or over ice for a Pune afternoon.
          </p>

          <ul className="mt-9 flex flex-wrap gap-3">
            {["Hot Filter Kaapi", "Cold Filter Kaapi"].map((label) => (
              <li
                key={label}
                className="rounded-full border border-maroon/25 px-5 py-2.5 text-sm font-medium text-maroon"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Stamp with steam */}
        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
          {/* steam drifts from just above the cup */}
          <Steam className="absolute left-1/2 top-[14%] z-10 -translate-x-1/2 text-parchment-light/70" />
          <Reveal variant="stamp" tilt={-2.5} className="stage-rise">
            <Stamp src={photos.kaapi.src} alt={photos.kaapi.alt} scallop={10} />
          </Reveal>
        </div>
      </div>
    </ScrollStage>
  );
}
