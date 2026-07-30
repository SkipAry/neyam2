"use client";

import { useId } from "react";

/**
 * STAMP — the signature device of the whole site.
 *
 * Neyam's own Instagram artwork frames every photograph in a scalloped
 * postage-stamp border. This recreates that in SVG rather than CSS masks,
 * for two reasons:
 *   1. the scallops stay perfectly circular at any aspect ratio, where a
 *      stretched CSS mask would smear them;
 *   2. multi-edge CSS masking needs `mask-composite: intersect`, which is
 *      still uneven across browsers.
 *
 * Structure, outermost in:  scalloped maroon body → parchment gap → photo.
 */

/**
 * Builds a closed path for a rectangle whose every edge is a run of
 * outward semicircular bumps.
 *
 * The scallop radius is *adjusted per edge* so a whole number of bumps
 * fits exactly — otherwise the last bump on each side gets clipped and
 * the corners drift out of alignment.
 */
function scallopPath(w: number, h: number, target: number): string {
  const countX = Math.max(2, Math.round(w / (target * 2)));
  const countY = Math.max(2, Math.round(h / (target * 2)));
  const rx = w / (countX * 2);
  const ry = h / (countY * 2);

  const seg: string[] = [`M ${rx} ${ry}`];

  // Traversal is clockwise throughout, and sweep-flag 1 on every arc,
  // which makes each bump face away from the centre.
  for (let i = 0; i < countX; i++) seg.push(`a ${rx} ${rx} 0 0 1 ${rx * 2} 0`);
  for (let i = 0; i < countY; i++) seg.push(`a ${ry} ${ry} 0 0 1 0 ${ry * 2}`);
  for (let i = 0; i < countX; i++) seg.push(`a ${rx} ${rx} 0 0 1 ${-rx * 2} 0`);
  for (let i = 0; i < countY; i++) seg.push(`a ${ry} ${ry} 0 0 1 0 ${-ry * 2}`);

  seg.push("Z");
  return seg.join(" ");
}

type Props = {
  src: string;
  alt: string;
  /** Intrinsic aspect of the photo. Default 3:4, matching the brand's posts. */
  ratio?: number;
  /** Scallop size in viewBox units. Larger = chunkier perforations. */
  scallop?: number;
  /** Cream gap between the scalloped body and the photo. */
  gap?: number;
  className?: string;
  /** Skew the stamp a little, the way one sits in an album. */
  tilt?: number;
  priority?: boolean;
};

export default function Stamp({
  src,
  alt,
  ratio = 3 / 4,
  scallop = 9,
  gap = 13,
  className = "",
  tilt = 0,
  priority = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const W = 300;
  const H = Math.round(W / ratio);

  const body = scallopPath(W, H, scallop);

  // The photo window sits inside the scallop troughs, plus the cream gap.
  const inset = scallop + gap;
  const imgW = W - inset * 2;
  const imgH = H - inset * 2;

  return (
    <div
      className={`stamp-wrap ${className}`}
      style={tilt ? { rotate: `${tilt}deg` } : undefined}
    >
      <svg
        viewBox={`${-scallop} ${-scallop} ${W + scallop * 2} ${H + scallop * 2}`}
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label={alt}
      >
        <defs>
          <clipPath id={`win-${uid}`}>
            <rect x={inset} y={inset} width={imgW} height={imgH} rx="2" />
          </clipPath>
        </defs>

        {/* scalloped body — the maroon stamp itself */}
        <path d={body} className="fill-maroon" />

        {/* cream mount, so the photo reads as pasted onto the stamp */}
        <rect
          x={inset - 4}
          y={inset - 4}
          width={imgW + 8}
          height={imgH + 8}
          rx="2"
          className="fill-parchment-light"
        />

        {/* the photograph */}
        <image
          href={src}
          x={inset}
          y={inset}
          width={imgW}
          height={imgH}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#win-${uid})`}
        />

        {/* hairline keyline, as on the printed menu card */}
        <rect
          x={inset}
          y={inset}
          width={imgW}
          height={imgH}
          rx="2"
          fill="none"
          className="stroke-maroon/35"
          strokeWidth="1"
        />
      </svg>

      {/* Loading hint for the browser without duplicating the visual. */}
      {priority ? <link rel="preload" as="image" href={src} /> : null}
    </div>
  );
}
