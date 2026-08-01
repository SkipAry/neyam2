# Phase 02 — Verify

## Overview

- Priority: P1
- Status: Completed
- Effort: 3h
- Depends on: Phase 01 complete
- Goal: prove build quality, factual consistency, accessibility, and conversion behavior

## Ownership

Verification owner must not edit Phase 01 UI until recording the failure. Fixes return to the owning row in Phase 01, then the failed check is rerun.

| Owner | Scope | Evidence |
|---|---|---|
| Build verifier | type/build/static export | command output |
| UX verifier | responsive, interaction, conversion flow | viewport notes/screenshots |
| Accessibility verifier | keyboard, semantics, contrast, motion | audit notes |
| SEO verifier | metadata, JSON-LD, links, facts | rendered-source checklist |

The checklist through the first acceptance criteria is preserved from Iteration 1. Golden Morning's current evidence is recorded separately below; historical boxes were not reinterpreted as new test results.

## Preflight

- [x] Start from `site/`.
- [ ] Confirm no unintended files are staged or modified.
- [x] Record Node/npm versions: Node v24.11.1; npm 11.11.1.
- [x] Run `npm run build`.
- [x] Run `npx tsc --noEmit` if build output does not already expose type errors; build performed TypeScript validation.
- [x] Serve the production export or run `npm run dev`; `http://localhost:3000` returned HTTP 200 during QA.
- [x] Confirm console has no uncaught app errors or hydration warnings. Prior warning was browser-extension injection, not application source.

## Testing matrix — Iteration 1 history

Preserved from the completed pre-Golden-Morning verification cycle.

| Area | 320 | 390 | 768 | 1024 | 1440 | Reduced motion | Keyboard |
|---|---:|---:|---:|---:|---:|---:|---:|
| Header/drawer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hero/facts/CTAs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Signature spotlight/rail | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Menu explorer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Philosophy | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Proof/media controls | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Visit/quick actions | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FAQ/footer | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Functional and conversion checks

- [x] Every Directions CTA resolves to the intended Model Colony destination.
- [x] Menu CTA lands on the menu; anchored headings clear the fixed header.
- [x] Header drawer traps/returns focus, closes with Escape, and does not scroll the page behind it.
- [x] Mobile quick actions appear only when useful and retire before overlapping Visit/footer.
- [x] Snap rails work by swipe, trackpad, and keyboard without trapping page scroll.
- [x] Videos load posters, expose play/pause, never autoplay audio, and report button state.
- [x] With JavaScript disabled, core copy, menu, address, and links remain available.
- [x] Missing phone and menu prices produce no blank control, dangling separator, or broken schema.

## Accessibility checks

- [x] One H1; headings descend logically.
- [x] Landmarks and nav labels are unique and meaningful.
- [x] Skip link reaches useful content.
- [x] All interactive controls reachable in visual order with a visible focus indicator.
- [x] Touch targets are at least 44×44 CSS px.
- [x] Text and control contrast meet WCAG 2.2 AA; decorative brass is not relied on for small text.
- [ ] At 200% zoom and 320 px width, no two-dimensional scrolling or clipped content.
- [x] Reduced motion pauses hero media and removes drift/reveal/sticky-motion dependence; nothing remains hidden.
- [x] Images have contextual alt text; decorative ornament SVGs are hidden from assistive tech.

## SEO and fact audit

- [x] Rendered title, description, H1, and visible copy clearly state cuisine + Model Colony/Pune.
- [x] Canonical, sitemap, robots, Open Graph, and JSON-LD derive conditionally from the same centralized production URL.
- [x] Without an owned domain, canonical/absolute social/schema URLs are omitted, robots is noindex/disallow, and sitemap has no locations; once configured, schema image uses an absolute `/hero-poster.jpg` URL.
- [x] Restaurant schema: address, hours, vegetarian cuisine, ₹200–400, 5.0, and 46 reviews.
- [x] FAQ schema matches visible answers exactly.
- [x] No unsupported rating, review quote, price, phone, booking, delivery, or award claim.
- [x] `rg -n "43|5AH03bUCtvvkpNiZC" site/src` returns no stale business data.
- [x] `rg -n "JiP7hxIOy696TR17s" site/src` confirms the supplied Google link source.

## Performance and resilience

- [x] Hero poster renders before video; page is readable if video fails.
- [x] Below-fold images/video do not block initial render.
- [x] No layout shift from media missing dimensions/aspect ratio.
- [x] No broken assets in the network panel; no superseded `.jpg` or truncated reel referenced.
- [x] Static `out/` contains the page, empty pre-domain sitemap, restrictive robots, media, and no source-only files.
- [ ] Test one slow-network load and one refresh on an anchored URL.

## Acceptance criteria

- [x] Production build exits successfully.
- [x] All matrix cells pass or have a documented equivalent/rerun result.
- [x] No critical/high accessibility, factual, console, or broken-link issue remains.
- [x] Mobile and desktop both make Directions the clearest action.
- [x] Visual result is recognizably Neyam, not a generic restaurant template.
- [x] Localhost remains running for user review at handoff: `http://localhost:3000`.

## Prior verification record — Iteration 1

- Baseline and rerun: **8 passed / 0 failed** twice.
- Final domain-ownership retest: **10 passed / 0 failed**.
- Build: compile, TypeScript validation, and **6/6** static export routes passed.
- Dependency audit: 0 vulnerabilities.
- Assets: 20 unique rendered root-relative references; all exist.
- Structured data: Restaurant/FAQ parse; 7 menu sections, Pune address, and 5.0/46 retained.
- Pre-domain SEO safety: 0 `neyam.in` references in export; no canonical, `og:url`, absolute Open Graph image, Restaurant `url`/`image`/`@id`, phone, or `tel:` link; `noindex,nofollow,noarchive`; `robots.txt` disallows `/`; sitemap has 0 locations.
- Browser interaction: mobile drawer focus/Escape/return and signature pressed/title/image state passed.
- Accessibility/design: reduced motion, targets, semantics, focus, contrast, and 21st audit passed with 0 errors and 0 warnings.
- Final code review: 9.6/10; no critical issue.

Unchecked preflight/performance items are evidence gaps, not defects: this workspace is not an independently scoped Git repository, 200% zoom was not separately recorded, and slow-network plus anchored-refresh runs were not recorded.

## Prior verification record — initial Golden Morning

- [x] Production build passed.
- [x] 21st review completed with **0 errors, 0 warnings, and 22 informational suggestions**.
- [x] 320×568, 390×667, 390×844, 768×700, 1024×768, and 1440×900 passed with no horizontal overflow.
- [x] NEYAM remained fully unobstructed by the kaapi at all six viewports, including the decorative float range.
- [x] Kaapi, conversion copy, and Directions CTA have collision-free responsive lanes; short-height CSS compacts the decorative stage without hiding content.
- [x] Mobile drawer focused its first link after opening.
- [x] Mobile drawer closed with Escape.
- [x] Rendered output contains no phone link or `tel:` destination.
- [x] Source/export contains no `neyam.in`.
- [x] `npm audit` completed with 0 vulnerabilities.

The 22 21st findings are informational suggestions, not errors or warnings. No current evidence was supplied for a new 200% zoom run, slow-network run, or anchored-refresh run, so those historical checkboxes remain open.

## Final test matrix — Golden Morning Editorial

| Viewport | Hero hierarchy | Page overflow | Accessibility/interactions | Result |
|---|---|---|---|---|
| 320×568 | Wordmark, kaapi, copy, CTA clear | None | Touch targets/reduced motion pass | Pass |
| 390×667 | Wordmark, kaapi, copy, CTA clear | None | Touch targets/reduced motion pass | Pass |
| 390×844 | Wordmark, kaapi, copy, CTA clear | None | Touch targets/reduced motion pass | Pass |
| 768×700 | Short-height composition clear | None | Drawer/focus pass | Pass |
| 768×1024 | Tablet composition clear | None | Drawer/focus pass | Pass |
| 1024×700 | Dedicated short-laptop composition; wordmark/kaapi and copy/CTA clear | None | Keyboard/focus pass | Pass |
| 1024×768 | Laptop composition clear | None | Keyboard/focus pass | Pass |
| 1280×800 | Desktop composition clear | None | Keyboard/focus pass | Pass |
| 1440×900 | Full desktop composition clear | None | Keyboard/focus pass | Pass |

## Final verification record — Golden Morning Editorial

- [x] Next.js 15.5.22 production build passed and exported **6/6 pages**.
- [x] Standalone `npx tsc --noEmit` passed.
- [x] 21st review inspected 26 files with **0 errors, 0 warnings, and 24 informational hardcoded-color suggestions**; no blocker.
- [x] Final code review scored **9.7/10** with 0 critical findings.
- [x] All nine viewport/height combinations passed with no horizontal overflow.
- [x] The 1024×700 breakpoint kept wordmark/kaapi and copy/CTA collision-free with zero overflow.
- [x] Drawer modal/focus/inert behavior and Escape handling passed.
- [x] Touch targets and two-color focus visibility passed.
- [x] Signature selector live announcements and pressed state passed.
- [x] Native FAQ keyboard behavior passed.
- [x] Reduced motion left content visible and disabled decorative depth, reveals, orbit, ticker, and transitions.
- [x] Rendered output contains no phone/`tel:` link and no `neyam.in`.

The historical 200% zoom, slow-network, and anchored-refresh boxes remain open because this final evidence did not include new runs for them.

## Launch content/config

- **Phone — unresolved, intentionally omitted, non-blocking:** no verified number has been supplied; no call UI or telephone schema is rendered.
- **Item prices — unresolved, non-blocking:** add only from a current official menu.
- **Production domain — unresolved, deployment blocker only:** `neyam.in` is not owned by the cafe. Keep URL empty and pre-domain SEO safeguards active until an owned domain is approved.

None blocks local build or QA. The domain blocks public deployment/indexing metadata only.
