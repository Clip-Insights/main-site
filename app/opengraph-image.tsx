import { ImageResponse } from "next/og";
export const alt = "Clip Insights — watch with curiosity, leave with clarity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f5f1", color: "#26283b", padding: "64px 72px", width: "100%", height: "100%", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}><div style={{ display: "flex", background: "#4255ff", color: "white", padding: "8px 14px", borderRadius: 10 }}>ci</div><span>clipinsights.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.1, letterSpacing: -4 }}><span>Watch with curiosity.</span><span style={{ color: "#4255ff" }}>Leave with clarity.</span></div><div style={{ display: "flex", fontSize: 25, justifyContent: "space-between", color: "#4b4d63" }}><span>YouTube notes · Screenshots · AI insights · PDFs</span><span>clipinsights.org</span></div></div>, size);
}
