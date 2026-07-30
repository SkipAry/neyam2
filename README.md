# Neyam — website

Authentic Bangalore-style South Indian breakfast, Model Colony, Pune.

Next.js 15 static export. `npm run build` produces a plain `out/` folder of
HTML, CSS, JS, images and video — no server required.

---

## Everything editable lives in one file

**`src/data/site.ts`** holds the menu, hours, address, links, brand statements,
photo captions and FAQs. Change it there and the whole site follows, including
the Restaurant schema Google reads.

---

## Two things still to fill in

1. **Phone number** — `site.phone` and `site.phoneDisplay` are empty. Fill them
   and a call button appears in the header, the Visit section and the footer
   automatically. It is also worth adding to your Google listing, which
   currently has no phone number at all.

2. **Prices** — your menu card carries none, so none are shown. Add a `price`
   to any item in `site.ts` and the dotted leader and figure appear on their
   own. Google's "₹200–400 per person" band is surfaced instead, via
   `site.priceRange`.

---

## Facts on this site, and where they came from

Taken from the verified Google Business listing on 30 July 2026 — none of it
is estimated:

| Field | Value |
| --- | --- |
| Address | Pride Portal, Gokhale Rd, Model Colony, Shivajinagar, Pune 411016 |
| Hours | 8:00 AM – 10:00 PM, all seven days |
| Rating | 5.0 from 43 Google reviews |
| Price band | ₹200–400 per person |

If the rating changes, update `site.googleRating` and
`site.googleReviewCount` together — the schema only emits `aggregateRating`
when both are present, because a rating without a count gets flagged.

Search results also show a "Poloroche Business Avenue, Viman Nagar" address
against the name Neyam. That is a different business; the verified panel says
Model Colony.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes ./out
```

### If `npm install` is painfully slow or fails

This folder is inside OneDrive, and `node_modules` is tens of thousands of
tiny files that OneDrive tries to sync one by one. During development the
install had to be moved to local disk to complete at all. If you hit it:

- Right-click the `neyam-website` folder → **Always keep on this device** off,
  or better, exclude `node_modules` from syncing.
- Or copy the project to a non-synced folder (e.g. `C:\dev\neyam`) to work on
  it, and copy the source back when done.

The build output (`out/`) is small and syncs fine.

---

## Design notes

**Responsive behavior** — the compact hero tightens its type and spacing on
short screens. On mobile, signature dishes and reels become horizontal
scroll-snap rails, the printed menu gains category shortcuts, and a fixed
Menu/Directions dock appears only after the hero and retires before the Visit
section. Tablet and desktop layouts keep their multi-column grids. The mobile
drawer traps focus, closes with Escape or at the desktop breakpoint, and all
video reels provide an explicit play/pause control.

**21st design context** — `.21st/design.json` is the durable source for the
site's visual identity, responsive and accessibility constraints, and the
21st.dev references behind accepted interface decisions. Keep it aligned when
a future change alters the palette, typography, motifs or responsive direction.

**Palette** — parchment `#F5EDDC`, maroon `#71301F`, terracotta `#9A3714`,
lifted from the brand's own Instagram artwork. (The brief listed `#F5EDD`,
which is five hex digits; `#F5EDDC` is the assumed intent.)

**Brass was lightened.** The brand gold `#B8860B` only reaches 3.01:1 on
maroon and 2.20:1 on terracotta — below WCAG AA for the small caps labels it
was used for. `brass` is now `#DEB13A` (4.88:1 on maroon) and `brass.light`
`#EACB70` for the lightest ground. The original is kept as `brass.deep` for
large display type. The page currently passes AA with **zero** contrast
failures at 320/390/768/1440px.

**The stamp** (`components/Stamp.tsx`) is the signature device, echoing the
scalloped postage-stamp frames in the brand's artwork. Drawn as real SVG
geometry rather than CSS masks so the scallops stay circular at any aspect
ratio, with the count per edge adjusted so a whole number always fits.

**Chittara, not cave art.** The line work in `components/Ornaments.tsx` is
original geometry inspired by Chittara — the folk art of the Malnad region of
Karnataka — plus kolam dot-and-loop borders, a generic gopuram silhouette and
banana-leaf ribs. Karnataka was chosen deliberately over prehistoric rock art
because the menu is Karnataka's: Benne Dose, Davangere Dose, thatte idli,
Bisibele Baath, Puliyogare. No existing artwork was traced.

**Scroll storytelling** — `ScrollStage` publishes a section's scroll progress
as a CSS variable `--stage`, and children drift on it using the standalone
`translate` property. `translate` rather than `transform` on purpose:
`.reveal` already animates `transform`, and two rules writing one property
means one silently wins.

**Reveal reads geometry, not IntersectionObserver.** An observer-based version
reliably failed to fire for the Menu heading at 1440px, leaving real content
at opacity 0 forever. It now uses one shared rAF-throttled scroll listener for
the whole page; elements unregister once shown and the listener detaches when
the last one has revealed. Content never staying hidden matters more than the
elegance of the mechanism.

**Reduced motion** — verified: all 45 revealed elements are fully visible,
the hero video is paused on its poster, steam is off, and all drift is
disabled. Nothing is animation-dependent to be readable.

---

## Assets

| Source | Used as |
| --- | --- |
| `Untitled video.mp4` | hero background (silent, 1.5 MB, was 9.8 MB) + two food stills |
| `reel1.mp4` | ambience reel (silent loop) + four photographs |
| `reel3.mp4` | guest testimonial — keeps audio, starts muted, with play/pause and mute controls |
| `Ghee-*-No-Background.png` | the three floating signature dishes |
| `logo.jpg` | logo mark extracted to transparent PNG, cream and maroon |
| `3.webp` | the filter kaapi photograph, cropped out of the artwork |

**Not used, deliberately:**

- `700e3313025d80ea2a0b1bd5c9d14560.jpg` — a stock photo with **pngtree
  watermarks** tiled across it. Not ours to publish.
- `reel2.mp4` — the pre-launch teaser ("Heritage Benne Dosas are arriving
  soon"). Neyam is open, so it would read as stale.
- `1.webp`, `2.webp`, `4.webp` — the Instagram artwork already has its own
  scalloped frame and its own headline, so putting it inside a stamp gave a
  frame-within-a-frame and repeated copy. Kept in `public/brand/` in case you
  want it elsewhere.

Stills from `reel1` were cropped to `656×1080` from offset `32,150` to clear
the reel template's edge border and the logo watermark.

### Two files I could not delete

OneDrive refused the deletions, so they are excluded at build time instead:

- `public/reels/reel-3.mp4` — a 48-byte truncated encode. Nothing references it.
- `public/photos/*.jpg` — superseded by the `.webp` versions.

Delete them yourself when convenient, or leave them; they never reach `out/`.

---

## Deploying

Static export, so any static host works.

If you use **Appwrite Sites**, two things bit us on the last project:

1. Set the output directory to **`./out`**. Appwrite's Next.js preset defaults
   to `./.next`, which is for server-rendered apps and will not serve properly.
2. After every push, open the **Deployments** tab and check which row says
   *Active*. A new build sits at *Ready* and does **not** go live on its own —
   click **Activate** on it. And never mix a manual `code.tar.gz` upload with
   Git deploys: a manual deployment holding the Active slot silently blocks
   every later Git build from going live.

Set `site.url` to the real domain before the final build — it feeds the
canonical URL, Open Graph tags, the sitemap and the Restaurant schema.
