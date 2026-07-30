import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/google-sans";
import "./globals.css";
import { faqs, fullAddress, menu, site } from "@/data/site";

/**
 * Fonts are self-hosted through @fontsource-variable rather than
 * next/font/google. On a network that blocks fonts.googleapis.com the
 * Google loader falls back silently to Arial at build time and the site
 * ships looking generic — which is exactly what happened on an earlier
 * project. Bundling the woff2 from npm removes that failure mode.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.cuisine} in Model Colony, Pune`,
    template: `%s · ${site.name}`,
  },
  description:
    "Neyam serves authentic Bangalore-style South Indian breakfast in Model Colony, Pune — Benne Dose, Davangere Dose, thatte idli and filter kaapi. Open 8 am to 10 pm, every day.",
  keywords: [
    "Neyam",
    "South Indian restaurant Pune",
    "Bangalore style dosa Pune",
    "Benne Dose Pune",
    "filter kaapi Pune",
    "Model Colony restaurant",
    "Shivajinagar breakfast",
    "thatte idli Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.cuisine} in Pune`,
    description:
      "A slower corner of South India, brought to Pune. Benne Dose, thatte idli and filter kaapi in Model Colony.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.cuisine} in Pune`,
    description: "A slower corner of South India, brought to Pune.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#71301F",
  width: "device-width",
  initialScale: 1,
};

/**
 * Restaurant schema. Every value traces to something verifiable — the
 * address and hours come from the Google Business listing, the rating is
 * the real one. No invented awards, no aspirational claims.
 *
 * aggregateRating is only emitted when both figures are present, because
 * a rating without a review count is the kind of thing Google flags.
 */
function schema() {
  const hasRating = site.googleRating != null && site.googleReviewCount != null;

  const restaurant: Record<string, unknown> = {
    "@type": "Restaurant",
    "@id": `${site.url}#restaurant`,
    name: site.name,
    description: `${site.cuisine} in Model Colony, Pune.`,
    servesCuisine: ["South Indian", "Karnataka", "Vegetarian"],
    priceRange: site.priceRange,
    url: site.url,
    image: `${site.url}hero-poster.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pincode,
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    sameAs: [site.instagram],
    hasMenu: {
      "@type": "Menu",
      name: `${site.name} Menu`,
      hasMenuSection: menu.map((section) => ({
        "@type": "MenuSection",
        name: section.title,
        description: section.blurb,
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.price
            ? {
                offers: {
                  "@type": "Offer",
                  price: item.price,
                  priceCurrency: "INR",
                },
              }
            : {}),
        })),
      })),
    },
  };

  if (site.phone) restaurant.telephone = site.phone;

  if (hasRating) {
    restaurant.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: site.googleRating,
      reviewCount: site.googleReviewCount,
      bestRating: 5,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      restaurant,
      {
        "@type": "FAQPage",
        "@id": `${site.url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" href="/brand/mark-maroon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/mark-maroon.png" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <script
          type="application/ld+json"
          // Static, build-time JSON from our own config — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }}
        />
      </head>
      <body>
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-maroon focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-parchment-light"
        >
          Skip to the menu
        </a>
        {children}
        <span className="sr-only">{fullAddress}</span>
      </body>
    </html>
  );
}
