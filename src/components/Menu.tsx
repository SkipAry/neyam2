import Image from "next/image";
import { menu, signatures, site } from "@/data/site";
import Reveal from "./Reveal";

export default function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-parchment-light py-20 text-maroon-deep md:py-28">
      <div className="absolute -left-24 top-32 h-72 w-72 rounded-full border-[3rem] border-brass/15" aria-hidden="true" />
      <div className="absolute -right-20 bottom-48 h-56 w-56 rounded-full bg-terracotta/[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">From the griddle &amp; the filter</p>
          <h2 className="mx-auto mt-5 max-w-[10ch] font-sans text-[clamp(3.6rem,9vw,8.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em]">
            What&apos;s on the table
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-display text-xl italic text-terracotta sm:text-2xl">
            A short menu. No shortcuts.
          </p>
        </Reveal>

        <Reveal className="relative mx-auto mt-8 h-[15rem] max-w-5xl sm:h-[21rem]" aria-hidden="true">
          {signatures.map((dish, index) => (
            <div
              key={dish.image}
              className={`absolute top-0 aspect-square w-[48%] sm:w-[38%] ${
                index === 0
                  ? "left-[1%] -rotate-[7deg]"
                  : index === 1
                    ? "left-1/2 z-10 -translate-x-1/2 rotate-[2deg]"
                    : "right-[1%] rotate-[8deg]"
              }`}
            >
              <Image
                src={dish.image}
                alt=""
                fill
                sizes="(min-width: 640px) 28rem, 48vw"
                className="object-contain drop-shadow-[0_22px_24px_rgba(82,31,18,.2)]"
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-4 border-y border-maroon/25">
          <div className="grid gap-x-10 lg:grid-cols-2">
            {menu.map((section, index) => (
              <section
                key={section.id}
                id={`menu-${section.id}`}
                className="scroll-mt-28 border-b border-maroon/20 py-7 last:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b-0"
                aria-labelledby={`menu-title-${section.id}`}
              >
                <div className="grid grid-cols-[3.2rem_1fr] gap-4 sm:grid-cols-[4.25rem_1fr]">
                  <p className="font-sans text-xs font-bold tracking-[0.18em] text-terracotta-ink" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3
                      id={`menu-title-${section.id}`}
                      className="font-display text-[1.75rem] font-semibold leading-none sm:text-[2.2rem]"
                    >
                      {section.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/62">{section.blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={item.name} className="flex items-center text-sm font-semibold text-ink/85 sm:text-base">
                          {itemIndex > 0 ? <span className="mr-3 text-brass-deep" aria-hidden="true">●</span> : null}
                          {item.name}
                          {item.price != null ? <span className="ml-2 text-maroon">₹{item.price}</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs leading-relaxed text-ink/58">
            Prices are available at the counter and may change.
          </p>
          <p className="font-display text-lg italic text-maroon">
            100% vegetarian · Typically {site.priceRange} per person
          </p>
        </Reveal>
      </div>
    </section>
  );
}
