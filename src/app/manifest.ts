import type { MetadataRoute } from "next";

// Web app manifest served at /manifest.webmanifest. Gives the site a proper name,
// theme colours and installable-icon metadata for browsers and Lighthouse.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haziq Nazeer — Software Engineer & Freelance Backend / AI Developer",
    short_name: "Haziq Nazeer",
    description:
      "Portfolio of Haziq Nazeer — freelance backend & AI developer building secure, real-time, production-grade systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [
      {
        src: "/icon-256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
