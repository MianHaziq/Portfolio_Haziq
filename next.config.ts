import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the on-screen Next.js dev indicator (the floating "N" badge).
  devIndicators: false,

  images: {
    // Serve modern formats — AVIF first (best compression), WebP fallback.
    // The project screenshots are ~2.5MB of JPEG; next/image transcodes and
    // resizes them per request, typically cutting transferred bytes by 60-80%.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
