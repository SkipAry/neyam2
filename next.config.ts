import type { NextConfig } from "next";

/**
 * Static export — `npm run build` emits a plain `out/` folder.
 * No server needed, so it can be hosted anywhere (Appwrite Sites, Netlify, S3).
 *
 * NOTE for deployment: if you host on Appwrite Sites, set the output
 * directory to `./out` (their Next.js preset wrongly defaults to `./.next`),
 * and after every Git push check the Deployments tab — a new build sits at
 * "Ready" and must be **Activated** to actually go live.
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
