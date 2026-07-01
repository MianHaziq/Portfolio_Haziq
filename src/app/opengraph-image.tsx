import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/data";

// Branded 1200×630 social card generated at build time. Shown when the site is
// shared on LinkedIn, X, WhatsApp, Slack, etc. next/og ships a default font, so
// no custom font loading is required here.
export const alt =
  "Haziq Nazeer — Software Engineer & Freelance Backend / AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(
    join(process.cwd(), "public", "haziq-portrait.jpg"),
    "base64"
  );
  const portraitSrc = `data:image/jpeg;base64,${portrait}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 55%, #1a1030 100%)",
          color: "#f8fafc",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingRight: "48px",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8b5cf6",
              fontWeight: 600,
            }}
          >
            {siteConfig.freelanceTagline}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 20,
              backgroundImage:
                "linear-gradient(90deg, #f8fafc 0%, #c4b5fd 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Muhammad Haziq Nazeer
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#94a3b8",
              marginTop: 24,
              lineHeight: 1.3,
            }}
          >
            Secure, real-time, AI-powered systems
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {["NestJS", "FastAPI", "Next.js", "PostgreSQL", "AWS"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  color: "#e2e8f0",
                  border: "1px solid rgba(139,92,246,0.5)",
                  borderRadius: 999,
                  padding: "8px 22px",
                  background: "rgba(139,92,246,0.10)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={portraitSrc}
            width={360}
            height={450}
            style={{
              width: 360,
              height: 450,
              objectFit: "cover",
              borderRadius: 28,
              border: "2px solid rgba(139,92,246,0.6)",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
