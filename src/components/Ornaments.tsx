/**
 * ORNAMENTS — original decorative SVG for Neyam.
 *
 * All motifs here are drawn from scratch as generic geometry. They are
 * *inspired by* traditional forms — Chittara line work from the Malnad
 * region of Karnataka, kolam dot-and-loop grids, and temple gopuram
 * silhouettes — but no existing artwork has been traced or copied.
 *
 * Everything is currentColor so a parent can recolour it, and every
 * decorative node is aria-hidden: none of this is content.
 */

/* ── Kolam border strip ──────────────────────────────────────
   A repeating dot-and-loop run, the way a kolam is set out around
   a threshold. Tiles horizontally forever via SVG <pattern>. */
export function KolamBorder({
  className = "",
  height = 22,
  /** Must be unique per usage — SVG ids are global to the document. */
  uid = "a",
}: {
  className?: string;
  height?: number;
  uid?: string;
}) {
  /**
   * No viewBox and no preserveAspectRatio on purpose. The pattern is in
   * userSpaceOnUse units, so it tiles across the element's real pixel
   * width and the loops keep their shape at any screen size. A viewBox
   * would scale (and distort) them instead of repeating.
   */
  return (
    <svg
      className={className}
      height={height}
      width="100%"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`kolam-${uid}`} width="30" height="22" patternUnits="userSpaceOnUse">
          {/* interlocking loops */}
          <path
            d="M0 11 C 0 3, 7.5 3, 7.5 11 S 15 19, 15 11 S 22.5 3, 22.5 11 S 30 19, 30 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* the dots the loops are drawn around */}
          <circle cx="7.5" cy="11" r="1.5" fill="currentColor" />
          <circle cx="22.5" cy="11" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#kolam-${uid})`} />
    </svg>
  );
}

/* ── Chittara band ───────────────────────────────────────────
   Chittara is built almost entirely from straight lines, nested
   triangles and dot rows. This is a horizontal band of that
   vocabulary, used as a section divider. */
export function ChittaraBand({ className = "" }: { className?: string }) {
  const teeth = Array.from({ length: 16 }, (_, i) => i * 25);

  return (
    <svg
      className={className}
      width="100%"
      height="40"
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* twin rails */}
      <line x1="0" y1="4" x2="400" y2="4" stroke="currentColor" strokeWidth="1.2" />
      <line x1="0" y1="36" x2="400" y2="36" stroke="currentColor" strokeWidth="1.2" />

      {teeth.map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          {/* nested chevrons — the core Chittara move */}
          <path d="M0 32 L12.5 10 L25 32" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 32 L12.5 19 L20 32" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="12.5" cy="32" r="1.1" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

/* ── Chittara corner lattice ─────────────────────────────────
   A diamond lattice for filling large empty corners very faintly. */
export function ChittaraLattice({
  className = "",
  /** Must be unique per usage — SVG ids are global to the document. */
  uid = "a",
}: {
  className?: string;
  uid?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`lattice-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 2 L38 20 L20 38 L2 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M20 11 L29 20 L20 29 L11 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle cx="20" cy="20" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#lattice-${uid})`} />
    </svg>
  );
}

/* ── Gopuram line art ────────────────────────────────────────
   A generic South Indian temple tower silhouette in outline, for use
   as a very low-opacity watermark. Tiered, narrowing, with a kalasha
   finial — the shared grammar of the form, not any specific temple. */
export function Gopuram({ className = "" }: { className?: string }) {
  const tiers = [0, 1, 2, 3, 4];

  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      focusable="false"
    >
      {/* plinth */}
      <rect x="26" y="232" width="148" height="20" />
      <line x1="26" y1="242" x2="174" y2="242" />

      {tiers.map((t) => {
        const inset = 34 + t * 14;
        const y = 200 - t * 40;
        const w = 200 - inset * 2;
        return (
          <g key={t}>
            <rect x={inset} y={y} width={w} height="32" />
            {/* niche openings along each tier */}
            {Array.from({ length: 5 - t }, (_, i) => {
              const step = w / (5 - t);
              const nx = inset + step * i + step / 2;
              return (
                <path
                  key={i}
                  d={`M${nx - 4} ${y + 26} L${nx - 4} ${y + 13} Q${nx} ${y + 6} ${nx + 4} ${y + 13} L${nx + 4} ${y + 26} Z`}
                  strokeWidth="0.9"
                />
              );
            })}
          </g>
        );
      })}

      {/* barrel-vaulted crown and kalasha */}
      <path d="M84 40 Q100 18 116 40 Z" />
      <line x1="100" y1="18" x2="100" y2="6" />
      <circle cx="100" cy="4" r="3.4" />
    </svg>
  );
}

/* ── Banana leaf ─────────────────────────────────────────────
   The plate everything is served on. Midrib plus ribs. */
export function BananaLeaf({ className = "" }: { className?: string }) {
  const ribs = Array.from({ length: 11 }, (_, i) => i);

  return (
    <svg
      className={className}
      viewBox="0 0 120 300"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M60 4 C 104 60, 112 180, 60 296 C 8 180, 16 60, 60 4 Z"
        strokeWidth="1.6"
      />
      <line x1="60" y1="10" x2="60" y2="290" strokeWidth="1.2" />
      {ribs.map((i) => {
        const y = 34 + i * 22;
        const spread = 30 * Math.sin((Math.PI * (y - 4)) / 292);
        return (
          <g key={i} strokeWidth="0.7">
            <line x1="60" y1={y} x2={60 - spread} y2={y + 16} />
            <line x1="60" y1={y} x2={60 + spread} y2={y + 16} />
          </g>
        );
      })}
    </svg>
  );
}

/* ── Steam ───────────────────────────────────────────────────
   Three drifting wisps for the filter kaapi. Purely CSS-animated so it
   costs nothing, and it stops dead under prefers-reduced-motion. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex gap-3 ${className}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="steam-wisp block h-10 w-[3px] rounded-full bg-current"
          style={{ animationDelay: `${i * 1.3}s` }}
        />
      ))}
    </div>
  );
}

/* ── Small divider glyph ─────────────────────────────────────
   Echoes the little floral separator used on the printed menu card. */
export function Separator({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="14"
      viewBox="0 0 72 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="7" x2="24" y2="7" />
      <line x1="48" y1="7" x2="72" y2="7" />
      <path d="M30 7 Q36 0 42 7 Q36 14 30 7 Z" />
      <circle cx="36" cy="7" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
