import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "오스 (押忍) — 주짓수 매칭 플랫폼";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00533E",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 160,
            height: 160,
            borderRadius: 32,
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ fontSize: 96, lineHeight: 1 }}>🥋</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              fontStyle: "italic",
              color: "#FFFFFF",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Oss
          </span>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.55)", letterSpacing: "8px" }}>
            押忍
          </span>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.45)", marginTop: 8 }}>
            주짓수 매칭 플랫폼
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
