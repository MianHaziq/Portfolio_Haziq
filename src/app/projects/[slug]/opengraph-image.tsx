import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/lib/data";

// Per-project 1200×630 social card, generated at build time for each slug.
export const alt = "Project case study by Haziq Nazeer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerender one OG image per project instead of rendering on demand.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const subtitle = project?.subtitle ?? "Case study";
  const tags = project?.tags.slice(0, 5) ?? [];
  const kind = project?.kind ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 55%, #1a1030 100%)",
          color: "#f8fafc",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8b5cf6",
              fontWeight: 600,
            }}
          >
            {kind ? `${kind} · Case Study` : "Case Study"}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.02,
              marginTop: 24,
              backgroundImage:
                "linear-gradient(90deg, #f8fafc 0%, #c4b5fd 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 40, color: "#94a3b8", marginTop: 20 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", maxWidth: 820 }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 22,
                  color: "#e2e8f0",
                  border: "1px solid rgba(139,92,246,0.5)",
                  borderRadius: 999,
                  padding: "6px 18px",
                  background: "rgba(139,92,246,0.10)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#c4b5fd", fontWeight: 700 }}>
            Haziq Nazeer
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
