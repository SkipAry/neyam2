/**
 * NEYAM wordmark — hand-traced vector replica of the brand's custom lettering.
 *
 * The logotype is not a licensed typeface; it's bespoke lettering measured off
 * the brand artwork (likefont.jpeg) and rebuilt as monoline geometry, so it
 * stays crisp at any size instead of degrading like a scaled-up JPEG.
 *
 * Coordinates are the source artwork's own pixel grid (cap height 42→132,
 * stroke 10px) so any future re-measure maps 1:1 onto these numbers.
 *
 * Letterform notes — the three custom moves that no stock font reproduces:
 *   N  the diagonal is a swept arc, tangent to the right stem at the baseline
 *   Y  arms leave the cap line horizontally, then curve into a single stem
 *   M  mirrored arches converge on a centre stem (same motif as the Y)
 */
export function NeyamWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="140 41 491 93"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={10}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      role="img"
      aria-label="Neyam"
    >
      {/* N — stems plus the swept arc that replaces the diagonal */}
      <path d="M146.5 42V132" />
      <path d="M219.5 42V132" />
      <path d="M146.5 47C162.6 47 219.5 81 219.5 132" />

      {/* E — stem with top and bottom arms, plus a slightly short middle arm */}
      <path d="M305 47H256.5V127H306" />
      <path d="M256.5 82H303" />

      {/* Y — funnel: both arms curve from the cap line into one stem */}
      <path d="M334 47A49 34.7 0 0 1 383 81.7V132" />
      <path d="M432 47A49 34.7 0 0 0 383 81.7" />

      {/* A — splayed legs, blunt apex at the cap line, low crossbar.
          The legs stop at y=45 rather than meeting in a point: a mitred apex
          would spike far above the cap line, and the source lettering is
          visibly blunt-topped here. */}
      <path d="M428 132L459.6 45" />
      <path d="M495 132L462.4 45" />
      <path d="M438.9 102H483.8" />

      {/* M — outer stems, mirrored arches, centre stem to the baseline */}
      <path d="M521.5 42V132" />
      <path d="M624 42V132" />
      <path d="M572.5 77.5V132" />
      <path d="M521.5 47A51 30.5 0 0 1 572.5 77.5" />
      <path d="M624 47A51.5 30.5 0 0 0 572.5 77.5" />
    </svg>
  );
}
