# Neyam — Golden Morning

Premium, directions-first landing page for Neyam, an authentic Bangalore-style
South Indian breakfast restaurant in Model Colony, Pune.

The site is a Next.js 15 static export. `npm run build` produces a plain `out/`
folder of HTML, CSS, JavaScript, images, and video; no application server is
required.

---

## Page and conversion strategy

The seven-section journey is intentionally short:

1. **Hero** — a light, logo-first brand canvas with an unobstructed wordmark, a
   brass filter-kaapi cutout derived from Neyam's real photograph, restrained
   pointer depth, circular Bengaluru-to-Pune orbit, Google proof, and one
   dominant directions action.
2. **Signatures** — one large dish theatre with three accessible selectors
   instead of a grid of repeated cards.
3. **Menu** — unboxed numbered categories with food cutouts and large,
   responsive typography. Item prices stay hidden until verified.
4. **Philosophy** — consolidates Neyam's craft, filter-kaapi ritual, and community
   table into one narrative.
5. **Proof** — consolidates owned film, restaurant photography, Google proof, and
   the Instagram route without invented testimonials.
6. **Visit** — repeats the dominant Directions action beside the full practical
   details and map.
7. **FAQ** — answers local-intent questions and supplies matching FAQ schema.

The header and mobile quick-action dock keep Directions prominent throughout
the journey. The dock appears only after the hero and retires before Visit so it
does not compete with the final conversion block.

---

## Content and verified facts

Editable menu items, hours, address, links, brand statements, photo captions,
FAQs, metadata, and Restaurant schema inputs are centralized in
**`src/data/site.ts`**.

Google Business details verified **1 August 2026**:

| Field | Value |
| --- | --- |
| Address | Pride Portal, Gokhale Road, Model Colony, Shivajinagar, Pune 411016 |
| Hours | 8:00 AM–10:00 PM, every day |
| Rating | 5.0 from 46 Google reviews |
| Price band | ₹200–400 per person |
| Google listing | `https://share.google/JiP7hxIOy696TR17s` |

Update `site.googleRating` and `site.googleReviewCount` together. The schema emits
`aggregateRating` only when both values exist.

### Intentional omissions and outstanding content

- Contact number — intentionally blank. Do not add one unless the owner supplies
  it; call controls remain absent meanwhile.
- Item-level menu prices — only Google's verified ₹200–400 per-person band is
  shown.
- Production domain — none is configured. Until a real, cafe-owned domain is
  supplied, the build emits no canonical URL, absolute Open Graph URL, or sitemap
  listing and remains `noindex` with crawler access disallowed.

Do not invent or infer any missing value.

---

## Design system and interaction

The completed **Golden Morning Editorial** direction preserves Neyam's
parchment `#F5EDDC`, maroon `#71301F`, terracotta `#9A3714`, brass `#DEB13A`,
and ink `#2B1710` palette. Cormorant Garamond now carries display headlines,
quotes, and editorial moments; Google Sans carries body copy, facts, navigation,
and controls. This clearer serif/sans hierarchy improves scanning without
losing the warm, printed character.

Oversized brand statements, real food cutouts, the ghee-sun motif, tactile
paper, and restrained kolam details keep the regional identity specific. The
Philosophy section uses a calmer parchment surface and more deliberate spacing,
giving the story a pause between the dark menu and high-energy proof sections.
All text and controls use WCAG AA-safe color pairings; brass remains decorative
where it would not support small-text contrast.

The **21st UI Explore/Build** workflow supplied project-aware cinematic-brand,
kinetic-type, product-spotlight, and touch-navigation references. **UI/UX Pro
Max** guided the immersive restaurant pattern, responsive fallback, type scale,
touch targets, and CTA hierarchy. Patterns were adapted to Neyam's design
language; generic SaaS cards, glass-heavy styling, and decorative gradients were
excluded. Accepted decisions and references live in **`.21st/design.json`**.

3D is limited to the hero kaapi tumbler and signature food spotlight. Both use
restrained CSS perspective without scroll hijacking. Entrance reveals are slow
and finite, while continuous motion is reserved for subtle decorative elements.
Everything becomes fully static whenever reduced motion is requested.

The circular kaapi orbit remains visible at every supported width with the
exact message `✦ Authentic Bengaluru dosa ✦ Now serving Pune ✦ Est. 2026 ✦`.
From 320–767.98 px it uses tighter 114% geometry and a calm 56-second rotation;
from 768 px upward it retains the original 120% geometry and 42-second rotation.
Under `prefers-reduced-motion` the full ring stays visible but does not rotate.

### Accessibility and responsive behavior

- Responsive from 320 px mobile through iPad, laptop, and 1440 px desktop. A
  dedicated short-laptop breakpoint (`min-width: 1024px` and
  `max-height: 760px`) protects the hero copy, wordmark, kaapi, and CTA.
- Visible `:focus-visible` treatment and touch targets of at least 44 px.
- Skip link, semantic headings/landmarks, descriptive media alternatives, and
  keyboard-safe menu navigation.
- The mobile drawer is an `aria-modal` dialog with a dismissible backdrop. It
  traps focus, makes page content inert and hidden from assistive technology
  while open, locks background scroll, closes with Escape or at the desktop
  breakpoint, and restores focus and document state on exit.
- Videos expose play/pause and mute controls where relevant.
- `prefers-reduced-motion` pauses hero/video autoplay, disables drift, steam,
  reveal, transition, and perspective effects, and leaves all content visible.
  The decorative kaapi orbit remains present as a static ring.

---

## Verification

Final local verification:

| Check | Result |
| --- | --- |
| Responsive browser matrix | **15/15 passed** across phone, narrow tablet, iPad, laptop, and desktop |
| Focused orbit matrix | **11/11 viewport checks passed** from 320×568 through 1440×900 |
| Production build | **Passed** — `npm run build` |
| TypeScript | **Passed** — `npx tsc --noEmit` |
| 21st inspection | **0 errors, 0 warnings** |
| Final design/code review | **9.8/10** |
| Dependency audit | **0 vulnerabilities** |

The production static build completes successfully, and the page runs locally
without runtime errors.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes ./out
```

This repository is inside OneDrive. If dependency installation is unusually
slow or fails, keep the project on local disk or exclude `node_modules` from
syncing. The small `out/` directory can remain synced.

---

## Assets

The site uses Neyam-owned brand marks, food cutouts, restaurant footage, reel
posters, and stills in `public/`. The watermarked stock image and stale
pre-launch reel are deliberately excluded. Superseded/truncated media that
OneDrive would not delete is not referenced and does not reach `out/`.

---

## Deployment

**Netlify** is the deployment target. Settings live in `netlify.toml` rather
than the dashboard, so the build is reproducible: `npm run build`, publish
`out/`, Node pinned to 22. Pushing to `main` on `SkipAry/neyam2` redeploys.

No redirect rules are needed — the export writes `out/404.html`, which Netlify
serves for unmatched routes, and `trailingSlash: true` makes directory URLs
resolve on their own.

The build is a plain static export, so any static host *could* serve `out/`.
Note that a subpath host (GitHub Pages project sites, for example) additionally
needs `basePath`/`assetPrefix` set, because a handful of asset references —
the favicon links in `app/layout.tsx` and the brand marks in the header and
footer — are absolute from `/` and are not rewritten automatically.

When the cafe has a real owned production domain, set `site.url` before the
public launch. That enables the canonical URL, absolute Open Graph URL, sitemap
listing, indexing, and the corresponding absolute Restaurant schema URLs.
