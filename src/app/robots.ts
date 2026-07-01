import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

// Generated at /robots.txt. Allow all crawlers everywhere and point them at the
// sitemap. Next.js internals under /_next are excluded to keep crawl budget on
// real content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
