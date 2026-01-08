import type { NextConfig } from "next";

// Enable static export so the site can be hosted on GitHub Pages or any static host.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Optional basePath/assetPrefix for GitHub Pages (set NEXT_PUBLIC_BASE_PATH="/repo-navn").
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
