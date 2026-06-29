import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Sora, Manrope } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { IntroProvider } from "@/contexts/IntroContext";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
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
