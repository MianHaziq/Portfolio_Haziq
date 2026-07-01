import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { IntroProvider } from "@/contexts/IntroContext";
import SmoothScroll from "@/components/SmoothScroll";
import {
  siteConfig,
  SITE_URL,
  expertise,
  SEO_KEYWORDS,
  services,
} from "@/lib/data";
import "./globals.css";

// Fonts are self-hosted (woff2 in ./fonts) rather than fetched from Google at
// build time. This removes the build/dev-time network dependency on
// fonts.gstatic.com (which caused the "Module not found" font errors),
// eliminates a third-party runtime request, and avoids layout shift. All three
// are variable fonts, so one file per family covers the whole weight range.
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-italic-latin.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  weight: "300 800",
  variable: "--font-heading",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "300 800",
  variable: "--font-body",
  display: "swap",
});

const TITLE_DEFAULT =
  "Haziq Nazeer — Software Engineer & Freelance Backend / AI Developer";
const DESCRIPTION =
  "Haziq Nazeer is a software engineer and freelance backend & AI developer in Lahore, Pakistan — building secure, real-time, production-grade systems with NestJS, FastAPI, Next.js, PostgreSQL and AWS. Available for freelance projects and full-time roles.";

export const metadata: Metadata = {
  // Base URL for resolving all relative metadata URLs (OG images, canonicals).
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    // Child routes set just their page name; this frames it consistently.
    template: "%s · Haziq Nazeer",
  },
  description: DESCRIPTION,
  applicationName: "Haziq Nazeer — Portfolio",
  keywords: SEO_KEYWORDS,
  authors: [{ name: siteConfig.fullName, url: SITE_URL }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Haziq Nazeer",
    type: "website",
    locale: "en_US",
    // og image is supplied automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description:
      "Freelance backend & AI developer — secure, real-time, production-grade systems in NestJS, FastAPI, Next.js and AWS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Site ownership verification. Paste the token from Google Search Console /
  // Bing Webmaster into .env.local (NEXT_PUBLIC_GOOGLE_VERIFICATION etc.) and it
  // renders automatically — no code change needed. Empty values are omitted.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  },
};

export const viewport: Viewport = {
  // Light is the primary theme, so it's listed first.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "light dark",
};

// Structured data describing Haziq as a Person (wrapped in a ProfilePage, the
// type Google recommends for a person's profile) + the site as a WebSite.
// Helps search engines and AI resolve "Haziq Nazeer" as a knowledge entity with
// a rich, machine-readable skill/occupation/offer graph.
const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: siteConfig.fullName,
  alternateName: [siteConfig.name, siteConfig.githubHandle],
  url: SITE_URL,
  image: `${SITE_URL}/muhammad_haziq_nazeer.jpeg`,
  jobTitle: [
    "Software Engineer",
    "Full Stack Developer",
    "Freelance Backend & AI Developer",
  ],
  description: siteConfig.bio,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  knowsLanguage: ["English", "Urdu"],
  worksFor: { "@type": "Organization", name: "Tecaudex" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.education.institution,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  // Full real skill set — the entity graph that lets the profile surface for
  // technology and role queries.
  knowsAbout: expertise,
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    // O*NET-SOC code for Software Developers.
    occupationalCategory: "15-1252.00",
    skills: expertise.join(", "),
  },
  // Freelance offerings — signals hiring intent to search & AI assistants.
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.description,
    },
  })),
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

const profilePageLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${siteConfig.fullName} — Software Engineer & Freelance Backend / AI Developer`,
  mainEntity: personLd,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Haziq Nazeer",
  description:
    "Portfolio of Haziq Nazeer — software engineer and freelance backend & AI developer.",
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sora.variable} ${manrope.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme — runs before React hydrates. Light is
            the primary default; only a previously saved choice overrides it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ph-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* JSON-LD structured data (escaped to avoid XSS via "<"). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([profilePageLd, websiteLd]).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
        <SmoothScroll />
        <ThemeProvider>
          <IntroProvider>{children}</IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
