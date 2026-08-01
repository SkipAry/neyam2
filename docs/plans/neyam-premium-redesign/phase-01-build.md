# Phase 01 — Build

## Overview

- Priority: P1
- Status: Completed
- Effort: 10h
- Depends on: existing assets and current Next.js 15 static-export setup
- Goal: implement the original “The Ghee House” foundation, then the current “Golden Morning” redesign, without adding backend scope

## Context

- [Plan](./plan.md)
- App guide: `site/README.md`
- Design source: `site/.21st/design.json`
- Content source: `site/src/data/site.ts`
- Existing composition: `site/src/app/page.tsx`

## File ownership

One implementer owns each file during this phase to avoid overlapping edits.

| Owner | Action | File | Responsibility |
|---|---|---|---|
| Data/SEO | Modify | `site/src/data/site.ts` | 5.0/46, supplied Google link, centralized facts |
| Data/SEO | Modify | `site/src/app/layout.tsx` | metadata, valid schema image URL, JSON-LD consistency |
| Data/SEO | Review | `site/src/app/robots.ts`, `site/src/app/sitemap.ts` | shared base URL; no duplicate hard-coded domain |
| Composition | Modify | `site/src/app/page.tsx` | new narrative order; remove duplicate sections |
| Conversion UI | Modify | `site/src/components/Header.tsx` | light logo-first state, Directions emphasis, accessible drawer |
| Conversion UI | Modify | `site/src/components/Hero.tsx` | Golden Morning wordmark, ghee sun, generated filter-kaapi 3D, single Directions CTA |
| Conversion UI | Create | `site/src/components/neyam-wordmark.tsx` | accessible hand-traced vector reproduction of Neyam's custom lettering |
| Food UI | Modify | `site/src/components/Signatures.tsx` | responsive signature-food theatre and accessible selectors |
| Food UI | Modify | `site/src/components/Menu.tsx` | unboxed editorial menu rows and readable content |
| Story UI | Create/modify | `site/src/components/Philosophy.tsx` | parchment-deep editorial narrative with brass accents, Kaapi, and Community |
| Proof UI | Create/modify | `site/src/components/Proof.tsx` | monumental 5.0/46 Google proof, owned film, imagery, and Instagram |
| Conversion UI | Modify | `site/src/components/Visit.tsx` | address/hours/rating/action-led closing block |
| Conversion UI | Modify | `site/src/components/Footer.tsx` | concise local NAP and verified links |
| Conversion UI | Modify | `site/src/components/MobileQuickActions.tsx` | Directions-first dock; no overlap with Visit |
| System UI | Modify | `site/src/app/globals.css` | responsive layout, Golden Morning paper/3D effects, focus, and reduced motion |
| System UI | Review/modify | `site/tailwind.config.ts` | reuse existing tokens; add only necessary semantic utilities |
| System UI | Modify | `site/.21st/design.json` | record Golden Morning direction, 21st references, motion discipline, and constraints |
| Cleanup | Delete after migration | `Story.tsx`, `Kaapi.tsx`, `CommunityTable.tsx`, `Reels.tsx`, `Posts.tsx` | remove only after all used content/behavior moves |

All paths above are under `C:\Users\udgar\OneDrive\Desktop\Projects\neyam_dosa\`.

## Implementation checklist — Iteration 1 history

Preserved from the completed “The Ghee House” build. Golden Morning supersedes its visual direction; see the current iteration checklist below.

### 1. Correct the source of truth

- [x] Change `googleReviewCount` from 43 to **46**; keep `googleRating` at **5.0**.
- [x] Replace all Google listing destinations with `https://share.google/JiP7hxIOy696TR17s`.
- [x] Keep address, daily 8:00 AM–10:00 PM hours, and ₹200–400 band unchanged.
- [x] Leave phone and item prices empty; conditional UI must not render blanks.
- [x] Keep the production base URL in one config field; leave it empty and noindex until the cafe confirms an owned domain. `neyam.in` is not owned by the cafe.
- [x] Build the schema image URL with a slash-safe URL join when the production domain is configured; omit it safely before then.

### 2. Recompose the conversion journey

- [x] Order: Header → Hero → Signatures → Menu → Philosophy → Proof → Visit → FAQ → Footer.
- [x] Remove repeated story/proof sections from the rendered composition after content migration.
- [x] Keep each section purposeful: desire, consideration, trust, action.

### 3. Build the split cinematic hero

- [ ] Literal H1 includes food + place, e.g. Bangalore-style benne dose in Model Colony, Pune.
- [x] Place short emotional brand line below; do not make poetry replace local clarity.
- [x] Primary button: Get Directions. Secondary: Explore the Menu.
- [ ] Display Model Colony, open daily 8–10, ₹200–400, and 5.0 Google / 46 reviews above fold.
- [x] Use owned hero video/poster; muted inline playback; poster and readable overlay fallback.
- [x] Keep first meaningful CTA reachable on 320 px short screens.

### 4. Make food and menu the consideration engine

- [ ] Desktop signature section uses one sticky visual spotlight with sequential dish copy.
- [x] Mobile uses horizontal snap cards with visible next-card affordance and screen-reader hint.
- [x] Menu category navigation is native anchors or buttons with correct active/focus state.
- [x] Menu remains fully usable without JavaScript; names never hidden behind interaction.
- [x] If item prices are absent, render no empty leaders; mention only verified ₹200–400 band.

### 5. Consolidate narrative and proof

- [x] Philosophy combines craft statements, kaapi ritual, and community table into one paced section.
- [x] Use existing stamp/Chittara/kolam motifs as framing, not visual noise.
- [ ] Proof combines owned reels, restaurant photos, 5.0/46 Google proof, and Instagram CTA.
- [ ] Videos expose play/pause; audio video starts muted and exposes mute state.
- [x] Do not invent testimonials or quote review text not supplied in the audit.

### 6. Close on the visit decision

- [ ] Visit leads with “Visit Neyam in Model Colony” and a dominant Directions action.
- [x] Show full address, landmark, hours, price band, rating, and Instagram.
- [x] Omit Call everywhere and preserve spacing; the business confirmed phone must remain blank.
- [x] Footer repeats compact NAP and verified links without introducing competing CTAs.

### 7. SEO, resilience, and polish

- [x] Metadata title/H1/description target relevant local intent naturally.
- [x] Restaurant and FAQ JSON-LD mirror visible content and shared config.
- [x] Preserve one H1, logical H2 order, useful image alt text, and descriptive link labels.
- [x] Use existing optimized WebP/posters and lazy-load below-fold media.
- [x] Preserve visible focus, 44 px targets, reduced-motion fallbacks, and static export.
- [x] Update `.21st/design.json` with “The Ghee House,” CTA hierarchy, and merged section decision.

## Acceptance criteria — Iteration 1 history

- [x] First screen answers what, where, when, price range, reputation, and next action.
- [x] Directions visually outranks Menu; both work with keyboard and touch.
- [x] No stale 43-review reference or old Google share link remains in `site/src`.
- [ ] No duplicate business facts outside the centralized data source unless derived from it.
- [x] No empty phone/price controls and no fabricated content.
- [ ] New merged sections preserve all useful content and required video controls.
- [x] Build remains dependency-light and compatible with `output: "export"`.

## Risks and mitigations

- Hero media hurts LCP → poster first, compressed media, no oversized preload.
- Sticky sequence becomes awkward on mobile → disable sticky and use snap rail below desktop.
- Decorative contrast/readability conflict → keep text on solid brand grounds; validate AA.
- Merge drops copy or accessibility behavior → migration checklist before deleting old components.
- No cafe-owned domain yet → keep centralized URL empty, omit canonical/absolute schema URLs, and noindex until ownership is confirmed.

## Security/privacy

- No forms, cookies, user input, tracking, or secrets added.
- External links use safe attributes where new tabs are used.
- JSON-LD remains build-time data only; no unsanitized runtime injection.

## Golden Morning redesign iteration — initial

### Hero

- [x] Use a light parchment, logo-first hero with oversized NEYAM typography.
- [x] Show Model Colony, daily hours, vegetarian positioning, and cuisine context.
- [x] Place a transparent brass filter-kaapi cutout, derived from Neyam's real photo, over a brass ghee sun.
- [x] Apply restrained pointer-responsive CSS 3D; ignore touch input and disable decorative motion under reduced motion.
- [x] Keep NEYAM above the decorative artwork layer and spatially clear of the animated kaapi.
- [x] Use breakpoint- and height-aware kaapi sizing/positioning so the subject clears copy and CTA on short phones, iPad, laptop, and desktop.
- [x] Keep one dominant hero conversion CTA to the verified Google destination.
- [x] Preserve a screen-reader local-intent statement even though the visual H1 is the NEYAM wordmark.

### Food, menu, philosophy, and proof

- [x] Use one signature theatre with real dish cutouts and three `aria-pressed` selectors.
- [x] Use an unboxed, readable menu with native section structure and conditional item prices.
- [x] Use a full brass Philosophy field with monumental typography, owned photography, kaapi, community-table copy, and wall text.
- [x] Use monumental Google proof showing 5.0 and 46 reviews.
- [x] Keep owned film play/pause control, restaurant photography, and Instagram route in Proof.

### System and acceptance

- [x] Preserve the existing page order, centralized facts, static export, pre-domain noindex safeguards, and no-phone behavior.
- [x] Update `.21st/design.json` with Golden Morning hero, full-page art direction, and motion-discipline decisions.
- [x] Production build passes.
- [x] Six tested viewport/height combinations have no horizontal overflow or hero collisions.
- [x] At 1440×900, the wordmark, kaapi, Directions CTA, and copy have motion-safe clearance.
- [x] Mobile drawer focus and Escape behavior pass.
- [x] Rendered output contains no `tel:` link and no `neyam.in`.
- [x] Dependency audit reports 0 vulnerabilities.

## Golden Morning Editorial final polish

### Accessibility

- [x] Use a two-color `:focus-visible` treatment that remains visible on both light and dark brand surfaces.
- [x] Give the vector wordmark an accessible name and retain screen-reader local-intent hero copy.
- [x] Mark ticker and decorative hero artwork appropriately so they do not duplicate content for assistive technology.
- [x] Announce signature-dish changes through an atomic polite live region while retaining `aria-pressed` selectors.
- [x] Preserve at least 44 px touch targets and verify drawer modal, focus, inert-background, Escape, and focus-return behavior.
- [x] Keep FAQ interaction native and keyboard accessible.

### Typography and surfaces

- [x] Replace the hero's font approximation with `NeyamWordmark`, a crisp hand-traced SVG matching the custom brand lettering.
- [x] Apply the editorial display face to major food/story headings while retaining sans-serif utility labels and proof numerals.
- [x] Raise microcopy to 11 px where needed, balance headings, and strengthen muted-copy contrast.
- [x] Move Philosophy from the initial full-brass field to parchment-deep, retaining brass through the medallion and oversized ghost word.

### Motion and short-height behavior

- [x] Reduce pointer response to restrained hero rotation/translation and keep touch input static.
- [x] Slow orbit/ticker loops and use short settle transitions without scroll hijacking.
- [x] Disable hero depth, dish animation, reveal motion, ticker/orbit motion, and transitions under `prefers-reduced-motion`.
- [x] Add the 1024×700 short-laptop composition through the desktop short-height media query: compact kaapi stage, clear wordmark, hidden supporting copy, and unobstructed CTA.

### Final acceptance evidence

- [x] Next.js 15.5.22 production build and **6/6** static pages pass.
- [x] Standalone `npx tsc --noEmit` passes.
- [x] Nine viewport/height combinations pass with no overflow or hero collision.
- [x] At 1024×700, wordmark/kaapi and copy/CTA remain clear with zero overflow.
- [x] 21st review: 26 files, 0 errors, 0 warnings, 24 informational hardcoded-color suggestions, no blockers.
- [x] Final code review: 9.7/10, 0 critical findings.

## Iteration 1 reconciliation history

The original phase was complete and accepted by tester/reviewer. Its exact plan-to-code variances remain above as unchecked historical items:

- H1 is “Bangalore mornings, served in Pune”; food and Model Colony appear in the immediately preceding eyebrow, not inside the H1 itself.
- Hero shows 5.0 Google reputation above fold but review count 46 appears later in Visit and in JSON-LD.
- The original desktop implementation used a sticky explanatory column beside an interactive dish spotlight; the visual stage itself was not sticky.
- Proof uses one owned silent restaurant reel plus photos; the audio testimonial reel/mute control remains in the unused legacy `Reels.tsx`.
- Visit uses an emotional Model Colony heading instead of the exact phrase “Visit Neyam in Model Colony.”
- Hours/location are centralized as data but a small number of presentational strings remain hard-coded in hero/header metadata.
- Legacy `Story.tsx`, `Kaapi.tsx`, `CommunityTable.tsx`, `Reels.tsx`, and `Posts.tsx` remain on disk but are not imported or rendered.

These were accepted non-blocking Iteration 1 variances; final review scored 9.6/10 with no critical issue. Golden Morning supersedes that visual direction without rewriting the preserved checklist history.

## Handoff to Phase 02

- [x] Application runs locally.
- [x] All owned files saved and obsolete imports removed.
- [x] Phase 02 verifier receives final localhost URL and changed-file list.
