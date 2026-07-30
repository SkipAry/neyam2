import { menu, site } from "@/data/site";
import { KolamBorder, Separator } from "./Ornaments";
import Reveal from "./Reveal";

/**
 * MENU — set as a printed card, because that is how Neyam presents it.
 *
 * Prices are intentionally absent: the restaurant's own menu card carries
 * none, and inventing them would mislead customers. The moment a `price`
 * is added to an item in site.ts, the dotted leader and figure appear.
 */
export default function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-maroon py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 text-brass/30" aria-hidden="true">
        <KolamBorder height={16} uid="menu" />
      </div>

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow !text-brass">The full card</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold text-parchment-light">
            Everything we make
          </h2>
          <Separator className="mx-auto mt-6 text-parchment/40" />
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-parchment/70">
            A short menu, cooked properly, changed rarely.
          </p>
        </Reveal>

        {/* The card itself */}
        <Reveal
          variant="stamp"
          className="mx-auto mt-14 max-w-4xl"
        >
          <div className="rounded-sm bg-parchment-light px-6 py-10 shadow-[0_28px_60px_rgba(30,10,5,0.4)] sm:px-10 md:px-14 md:py-14">
            <div className="text-center">
              <p className="font-display text-2xl font-semibold tracking-[0.2em] text-maroon">
                NEYAM
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-caps text-terracotta-ink">
                {site.address.line2} · {site.address.city}
              </p>
              <Separator className="mx-auto mt-5 text-terracotta/45" />
            </div>

            <div className="mt-10 grid gap-x-14 gap-y-10 sm:grid-cols-2">
              {menu.map((section, i) => (
                <Reveal
                  key={section.id}
                  delay={Math.min(i * 0.06, 0.3)}
                  className="break-inside-avoid"
                >
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-maroon-deep">
                    {section.title}
                  </h3>
                  <p className="mt-1.5 text-xs italic leading-relaxed text-ink/75">
                    {section.blurb}
                  </p>

                  <ul className="mt-4 divide-y divide-maroon/10">
                    {section.items.map((item) => (
                      <li key={item.name} className="flex items-baseline py-2.5">
                        <span className="font-medium text-ink/90">{item.name}</span>
                        {item.price != null ? (
                          <>
                            <span className="leader" aria-hidden="true" />
                            <span className="font-display text-base font-semibold text-maroon">
                              ₹{item.price}
                            </span>
                          </>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Separator className="mx-auto text-terracotta/45" />
              <p className="mt-5 font-display text-base italic text-maroon">
                Let&rsquo;s make memories over good food and good times.
              </p>
              <p className="mt-4 text-xs text-ink/75">
                All vegetarian
                <span className="mx-2 text-terracotta/50">◆</span>
                {site.hours}, {site.openDays.toLowerCase()}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-parchment/80">
            Prices are shown at the counter. Typically {site.priceRange} per person.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
