---
title: "Neyam Premium Landing Page Redesign"
description: "Rebuild Neyam as a premium, local-intent restaurant landing page that converts visitors into directions, menu views, and walk-ins."
status: completed
priority: P1
effort: 13h
branch: main
tags: [feature, frontend, seo, accessibility, conversion]
created: 2026-08-01
---

# Neyam Premium Landing Page Redesign

## Outcome

Deliver “Golden Morning”: a bold, light, conversion-led Next.js landing page grounded in Neyam’s real Model Colony identity. Primary conversion = Directions. Keep static export, verified facts, and the Neyam brand system.

## Verified facts to preserve

- Neyam, Pride Portal, Gokhale Road, Model Colony, Shivajinagar, Pune 411016
- Open daily, 8:00 AM–10:00 PM
- Google rating: **5.0 from 46 reviews**
- Google price band: ₹200–400 per person
- Vegetarian, Bangalore/Karnataka-style South Indian breakfast
- Instagram: `https://www.instagram.com/neyamofficial`
- Google listing: `https://share.google/JiP7hxIOy696TR17s`

## Direction

- Light, logo-first hero with oversized NEYAM typography and generous negative space.
- Brass ghee sun behind a filter-kaapi cutout derived from Neyam's real photograph; restrained pointer-responsive CSS 3D.
- One dominant hero conversion CTA: Directions. Google rating remains proof, not a competing action.
- One signature-food theatre with three accessible dish selectors.
- Unboxed menu rows with real dish cutouts; no invented item prices.
- Brass Philosophy section with monumental brand statements and owned imagery.
- Monumental 5.0/46 Google proof with restaurant film, photography, and Instagram.
- Finish with Visit and repeated Directions CTA.
- Preserve parchment `#F5EDDC`, maroon `#71301F`, terracotta `#9A3714`, brass `#DEB13A`, ink `#2B1710`; Cormorant Garamond + Google Sans; stamp, Chittara, kolam, printed-menu motifs.

## Redesign iteration

### Iteration 1 — The Ghee House

Completed the original dark, split-cinematic conversion funnel and established centralized facts, static-export SEO, responsive behavior, accessibility, and pre-domain safeguards.

### Iteration 2 — Golden Morning (current)

- [x] Replace the dark split hero with a light, logo-first composition.
- [x] Replace the hero dose with a brass filter-kaapi cutout based on Neyam's real photograph; add orbit copy and motion-disciplined CSS 3D.
- [x] Keep the full NEYAM wordmark unobstructed and give the kaapi, conversion copy, and CTA collision-free responsive lanes.
- [x] Add explicit short-height compositions for 320×568, 390×667, and 768×700.
- [x] Reduce the hero to one dominant Directions CTA.
- [x] Replace the prior signature layout with one responsive signature theatre.
- [x] Restyle the menu as unboxed editorial rows.
- [x] Restyle Philosophy on a full brass field with monumental typography.
- [x] Elevate Google proof to a monumental 5.0/46 treatment.
- [x] Record the Golden Morning decisions and 21st references in `.21st/design.json`.

## Phases

| # | Phase | Status | Effort | Deliverable |
|---|---|---:|---:|---|
| 1 | [Build](./phase-01-build.md) | Completed | 10h | Responsive premium page, SEO/data corrections |
| 2 | [Verify](./phase-02-verify.md) | Completed | 3h | Build, accessibility, responsive, SEO, conversion QA |

Progress: **Completed.** Implementation and QA passed. Launch-only content/config remains below.

## Guardrails

- YAGNI: one page, no CMS, booking system, cart, analytics vendor, or new API.
- KISS: keep content in `src/data/site.ts`; reuse current assets and primitives.
- DRY: one source for address, hours, rating, links, menu, metadata, and schema.
- No claim, price, phone, review quote, or service without a verified source.
- All motion decorative; full experience remains readable with reduced motion.
- No dependency addition unless an existing primitive cannot meet an acceptance criterion.

## Global acceptance criteria

- [x] Directions is the dominant CTA above fold and in Visit; Menu is secondary.
- [x] 5.0/46, hours, Model Colony, and ₹200–400 agree everywhere, including JSON-LD.
- [x] Supplied Google link is used consistently; schema image uses a valid absolute URL after a confirmed production domain is configured and is safely omitted before then.
- [x] 320, 390, 768, 1024, and 1440 px layouts have no overflow or hidden content.
- [x] Keyboard, focus, reduced motion, video controls, headings, and targets meet WCAG 2.2 AA intent.
- [x] Static production build succeeds; localhost page loads without runtime errors.

## Prior QA history — Iteration 1

- Tester: **8 passed / 0 failed**, repeated twice; final domain-ownership retest **10 passed / 0 failed**.
- Build: Next.js compile, TypeScript validation, and **6/6** static routes passed.
- Browser: responsive checks passed at 320, 375, 768, 1024, and 1440 px; prior 390 px contrast check remains clean.
- Accessibility: focus trap/Escape/return, 44 px targets, semantics, alt text, two-color focus, and reduced-motion behavior passed.
- SEO/assets: structured data parses; Google link and 5.0/46 facts confirmed; all 20 rendered root-relative asset references resolve. Pre-domain export contains no `neyam.in`, canonical, absolute social/schema URL, phone, or `tel:` link and is safely noindex/disallow.
- Review: 21st audit reported 0 errors and 0 warnings; final code review scored **9.6/10** with no critical issue.
- Handoff: `http://localhost:3000` returned HTTP 200.

## Current QA evidence — Golden Morning

- Production build passed.
- 21st review: **0 errors, 0 warnings, 22 informational suggestions**.
- Six responsive viewport/height combinations passed with no horizontal overflow or hero collisions.
- Mobile drawer correctly focused its first link and closed with Escape.
- Rendered output contains no telephone link and no `neyam.in`.
- `npm audit` reported 0 vulnerabilities.
- Hero geometry passed at 320×568, 390×667, 390×844, 768×700, 1024×768, and 1440×900; NEYAM remains fully legible and the animated kaapi clears both copy and CTA.

## Launch content/config

- **Phone — unresolved, intentionally omitted, non-blocking:** no verified number has been supplied. Keep phone/call UI and telephone schema absent.
- **Item-level menu prices — unresolved, non-blocking:** add only from a current official menu. Continue showing Google's verified ₹200–400 band.
- **Production domain — unresolved, deployment blocker only:** `neyam.in` does not belong to the cafe. Keep the centralized base URL empty, noindex, and without canonical/sitemap/schema image URLs until an owned domain is confirmed.

The page is complete for local review. Domain confirmation blocks public indexing/deployment metadata, not local build or QA.
