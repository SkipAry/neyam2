import { fullAddress, mapsLink, site, telLink } from "@/data/site";
import { Gopuram, Separator } from "./Ornaments";
import Reveal from "./Reveal";

/**
 * VISIT — address, hours and the map.
 *
 * The map is a plain iframe embed with no API key (Google's /maps?output=embed
 * endpoint), loaded lazily so it costs nothing until scrolled to.
 */
export default function Visit() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(
    `Neyam, ${fullAddress}`
  )}&output=embed`;

  return (
    <section id="visit" className="relative overflow-hidden bg-maroon-deep py-20 md:py-28">
      <Gopuram className="pointer-events-none absolute -left-16 top-16 hidden h-[26rem] w-auto text-parchment/[0.06] lg:block" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow !text-brass">Come and sit</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold text-parchment-light">
            Visit us
          </h2>
          <Separator className="mt-6 text-parchment/40" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Details */}
          <Reveal className="space-y-9">
            <div>
              <h3 className="text-[11px] uppercase tracking-caps text-brass">Address</h3>
              <address className="mt-3 not-italic text-lg leading-relaxed text-parchment/90">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.pincode}
              </address>
              <p className="mt-2 text-sm text-parchment/80">{site.address.landmark}</p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[48px] items-center rounded-full bg-parchment-light px-7 text-sm font-semibold text-maroon-deep transition-transform duration-300 hover:-translate-y-0.5"
              >
                Open in Google Maps
              </a>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-caps text-brass">Hours</h3>
              <p className="mt-3 font-display text-lg text-parchment-light">{site.hours}</p>
              <p className="mt-1 text-sm text-parchment/80">{site.openDays}</p>
            </div>

            {telLink ? (
              <div>
                <h3 className="text-[11px] uppercase tracking-caps text-brass">Phone</h3>
                <a
                  href={telLink}
                  className="mt-3 block font-display text-lg text-parchment-light underline decoration-brass/50 underline-offset-4"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            ) : null}

            <div>
              <h3 className="text-[11px] uppercase tracking-caps text-brass">Find us online</h3>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-parchment/85 underline decoration-parchment/30 underline-offset-4 transition-colors hover:text-parchment-light"
                >
                  Instagram — {site.instagramHandle}
                </a>
                <a
                  href={site.googleListing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-parchment/85 underline decoration-parchment/30 underline-offset-4 transition-colors hover:text-parchment-light"
                >
                  {site.googleRating != null
                    ? `${site.googleRating.toFixed(1)} ★ on Google (${site.googleReviewCount} reviews)`
                    : "See us on Google"}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-sm border-[6px] border-parchment-light/90 shadow-[0_24px_50px_rgba(20,6,3,0.45)]">
              <iframe
                src={embed}
                title={`Map showing ${site.name} at ${fullAddress}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full md:h-[30rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
