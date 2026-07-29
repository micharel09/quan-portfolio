import { ImageResponse } from "next/og";

export const alt = "Tran Minh Quan — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#101211", color: "#f3efe6", display: "flex", height: "100%", width: "100%", padding: "70px", position: "relative" }}>
      <div style={{ border: "2px solid #d5ed19", color: "#d5ed19", display: "flex", fontFamily: "monospace", fontSize: 22, height: 74, alignItems: "center", justifyContent: "center", width: 74 }}>TMQ</div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 46 }}>
        <div style={{ color: "#d5ed19", fontFamily: "monospace", fontSize: 20, letterSpacing: 2 }}>FULL-STACK DEVELOPER / HO CHI MINH CITY</div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif", fontSize: 94, fontWeight: 800, letterSpacing: -5, lineHeight: .9, marginTop: 32 }}>TRAN MINH<br />QUAN</div>
        <div style={{ color: "#c8c5bd", fontFamily: "monospace", fontSize: 24, marginTop: 34 }}>ASP.NET CORE · REACT · REAL-TIME SYSTEMS</div>
      </div>
      <div style={{ background: "#d5ed19", bottom: 70, height: 14, position: "absolute", right: 70, width: 250 }} />
    </div>,
    size,
  );
}
