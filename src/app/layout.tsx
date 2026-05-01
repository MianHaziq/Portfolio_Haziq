import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Sora, Manrope } from "next/font/google";
import "./globals.css";

// Editorial luxury serif — hero display text
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Modern geometric sans — section headings
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Humanist sans — body, UI, labels
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Chen — Software Engineer",
  description:
    "Alex Chen is a software engineer specializing in Next.js, React, NestJS, and FastAPI — building fast, elegant, production-ready applications.",
  keywords: [
    "Alex Chen",
    "Software Engineer",
    "Next.js",
    "React",
    "NestJS",
    "FastAPI",
    "PostgreSQL",
    "Full Stack Developer",
  ],
  authors: [{ name: "Alex Chen" }],
  openGraph: {
    title: "Alex Chen — Software Engineer",
    description:
      "Building elegant, high-performance applications from frontend to backend.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Software Engineer",
    description: "Building elegant, high-performance applications.",
    creator: "@alexchen",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sora.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
