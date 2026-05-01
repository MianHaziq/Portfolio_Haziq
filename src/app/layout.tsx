import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className="antialiased overflow-x-hidden"
        style={{
          background: "#0a0a0f",
          color: "#f8fafc",
          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
