import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { IntroProvider } from "@/contexts/IntroContext";
import SmoothScroll from "@/components/SmoothScroll";
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

export const metadata: Metadata = {
  title: "Haziq Nazeer — Software Engineer",
  description:
    "Haziq Nazeer is a software engineer specializing in Next.js, React, NestJS, and FastAPI — building fast, elegant, production-ready applications.",
  keywords: [
    "Haziq Nazeer",
    "Software Engineer",
    "Next.js",
    "React",
    "NestJS",
    "FastAPI",
    "PostgreSQL",
    "Full Stack Developer",
  ],
  authors: [{ name: "Haziq Nazeer" }],
  openGraph: {
    title: "Haziq Nazeer — Software Engineer",
    description:
      "Building elegant, high-performance applications from frontend to backend.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haziq Nazeer — Software Engineer",
    description: "Building elegant, high-performance applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6ff" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sora.variable} ${manrope.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme — runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ph-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <SmoothScroll />
        <ThemeProvider>
          <IntroProvider>{children}</IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
