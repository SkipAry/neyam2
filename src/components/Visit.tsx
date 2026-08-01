import { fullAddress, mapsLink, site } from "@/data/site";
import { Gopuram, KolamBorder } from "./Ornaments";
import Reveal from "./Reveal";

export default function Visit() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(`Neyam, ${fullAddress}`)}&output=embed`;

  return (
    <section id="visit" className="relative overflow-hidden bg-maroon-deep py-20 md:py-28">
      <Gopuram className="pointer-events-none absolute -left-16 bottom-0 h-[30rem] text-parchment/[0.05]" />
      <div className="absolute inset-x-0 top-0 text-brass/35" aria-hidden="true">
        <KolamBorder height={16} uid="visit-new" />
      </div>

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow !text-brass">Your table is this way</p>
          <h2 className="mx-auto mt-5 max-w-[14ch] font-display text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.035em] text-parchment-light">
            A slower corner of South India, in Model Colony.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-parchment/80 md:text-lg">
            Come for breakfast, kaapi, or a late evening dose. We are open every
            day, a short walk from JW Marriott Pune.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-parchment/15 bg-maroon shadow-[0_35px_90px_rgba(20,6,3,.38)] lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-caps text-brass">Neyam, Pune</p>
              <address className="mt-5 not-italic font-display text-3xl font-semibold leading-tight text-parchment-light sm:text-4xl">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.pincode}
              </address>

              <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-parchment/15 py-6">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-caps text-brass">Hours</dt>
                  <dd className="mt-2 text-sm text-parchment-light">{site.hours}</dd>
                  <dd className="mt-1 text-xs text-parchment/65">{site.openDays}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-caps text-brass">Google</dt>
                  <dd className="mt-2 text-sm text-parchment-light">
                    {site.googleRating != null && site.googleReviewCount != null
                      ? `${site.googleRating.toFixed(1)} ★ · ${site.googleReviewCount} reviews`
                      : "See us on Google"}
                  </dd>
                  <dd className="mt-1 text-xs text-parchment/65">{site.priceRange} per person</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="visit-directions"
                className="flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full bg-parchment-light px-8 text-sm font-semibold text-maroon-deep transition duration-300 hover:-translate-y-0.5 hover:bg-parchment"
              >
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-4 text-center text-xs text-parchment/65">
                Coming with a group?{" "}
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="visit-group-instagram"
                  className="inline-flex min-h-[44px] items-center underline decoration-brass/60 underline-offset-4 hover:text-parchment-light"
                >
                  Message us on Instagram
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[26rem] bg-parchment">
            <iframe
              src={embed}
              title={`Map showing ${site.name} at ${fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[26rem] w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
