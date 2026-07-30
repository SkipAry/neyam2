import Image from "next/image";
import { mapsLink, site, telLink } from "@/data/site";
import { KolamBorder } from "./Ornaments";

const nav = [
  { href: "#story", label: "Our Story" },
  { href: "#signatures", label: "Signatures" },
  { href: "#menu", label: "Menu" },
  { href: "#kaapi", label: "Filter Kaapi" },
  { href: "#visit", label: "Visit" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-maroon pt-16">
      <div className="absolute inset-x-0 top-0 text-brass/30" aria-hidden="true">
        <KolamBorder height={16} uid="footer" />
      </div>

      <div className="mx-auto max-w-site px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/mark-cream.png"
                alt=""
                width={32}
                height={44}
                className="h-11 w-auto"
              />
              <span className="leading-none">
                <span className="block font-display text-xl font-semibold tracking-[0.22em] text-parchment-light">
                  NEYAM
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-caps text-brass">
                  {site.nameMeaning}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-parchment/80">
              {site.tagline}. {site.cuisine}, served in Model Colony.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] uppercase tracking-caps text-brass">Explore</h3>
            {/* Links now carry their own 44px touch height, so the list needs
                almost no extra gap on top of that. */}
            <ul className="mt-2 space-y-0">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-parchment/75 transition-colors hover:text-parchment-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Find us */}
          <div>
            <h3 className="text-[11px] uppercase tracking-caps text-brass">Find us</h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-parchment/75">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.pincode}
            </address>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center text-sm text-parchment/75 underline decoration-parchment/30 underline-offset-4 hover:text-parchment-light"
            >
              Google Maps
            </a>
          </div>

          {/* Hours + contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-caps text-brass">Hours</h3>
            <p className="mt-4 text-sm text-parchment/75">
              {site.hours}
              <br />
              {site.openDays}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {telLink ? (
                <a
                  href={telLink}
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold text-parchment-light hover:text-brass"
                >
                  {site.phoneDisplay}
                </a>
              ) : null}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-sm text-parchment/75 transition-colors hover:text-parchment-light"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-parchment/15 pt-7 text-xs text-parchment/75 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="italic">Let&rsquo;s make memories over good food and good times.</p>
        </div>
      </div>
    </footer>
  );
}
