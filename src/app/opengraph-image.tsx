import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rintaro Yoshida | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.2em",
            color: "#a3a3a3",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#171717",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Rintaro
          <br />
          Yoshida
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#737373",
            marginBottom: 48,
          }}
        >
          Fukui University — Web / Mobile Developer
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#a3a3a3",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          github.com/yr04491
        </div>
        {/* アクセントライン */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            height: "100%",
            background: "#171717",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
