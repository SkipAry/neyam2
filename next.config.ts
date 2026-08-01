import type { NextConfig } from "next";

/**
 * Static export — `npm run build` emits a plain `out/` folder.
 *
 * Deployed to Netlify; build settings live in `netlify.toml`. Nothing here is
 * host-specific, so the export stays portable.
 *
 * One caveat if this ever moves to a host that serves from a subpath rather
 * than the domain root: `basePath` and `assetPrefix` must be set, because the
 * favicon links in `app/layout.tsx` and the brand marks in the header and
 * footer are plain `/…` references that Next does not rewrite.
 */
const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  images: {
    // next/image optimisation needs a server; static export requires this off.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
