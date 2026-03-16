import React, { useState, useEffect } from "react";

const WALLPAPERS = [
  "Space_wallpaper.jpg",
  "Windows_95_wallpaper.jpg",
  "Baseball_wallpaper.jpg",
  "Travel_wallpaper.jpg",
  "Underwater_wallpaper.jpg",
  "Dangerous_Creatures_wallpaper.jpg",
  "Leonardo_da_Vinci_wallpaper.jpg",
  "More_Windows_wallpaper_(Windows_98).jpg",
  "More_Windows_wallpaper_(Microsoft_Plus!_95).jpg",
];

export default function DisplayProperties() {
  const [current, setCurrent] = useState(localStorage.getItem("desktop-wallpaper") || "");
  const [preview, setPreview] = useState(current);

  const handleApply = () => {
    localStorage.setItem("desktop-wallpaper", preview);
    window.dispatchEvent(new CustomEvent("wallpaper-change", { detail: preview }));
    setCurrent(preview);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", padding: "10px" }}>
      <div className="panel" style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <div style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          flexWrap: "wrap",
          width: "100%"
        }}>
          {/* Monitor Preview */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: 168,
              height: 128,
              background: "#d0d0d0",
              border: "2px solid #fff",
              boxShadow: "inset -1px -1px 0 #000, inset 1px 1px 0 #fff, 1px 1px 0 #000",
              padding: 4,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                width: 154,
                height: 114,
                background: "#000",
                border: "2px inset #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: "#008080",
                  backgroundImage: preview ? `url(/wallpapers/${preview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }} />
              </div>
            </div>
            {/* Monitor Stand */}
            <div style={{ width: 40, height: 8, background: "#c0c0c0", borderLeft: "2px solid #fff", borderRight: "2px solid #808080" }} />
            <div style={{ width: 60, height: 6, background: "#c0c0c0", border: "1px solid #000", borderBottom: "none", borderRadius: "4px 4px 0 0", boxShadow: "inset 1px 1px 0 #fff" }} />
          </div>

          {/* List */}
          <div style={{ flex: "1 1 120px", minWidth: 120 }}>
            <div style={{ fontSize: 11, marginBottom: 4 }}>Wallpaper:</div>
            <div className="inset" style={{ height: 120, overflowY: "auto", padding: "2px" }}>
              <div
                onClick={() => setPreview("")}
                style={{ padding: "2px 4px", background: preview === "" ? "var(--w98-blue)" : "transparent", color: preview === "" ? "#fff" : "inherit", cursor: "default" }}
              >
                (None)
              </div>
              {WALLPAPERS.map(wp => (
                <div
                  key={wp}
                  onClick={() => setPreview(wp)}
                  style={{
                    padding: "2px 4px",
                    background: preview === wp ? "var(--w98-blue)" : "transparent",
                    color: preview === wp ? "#fff" : "inherit",
                    cursor: "default",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {wp.replace(".jpg", "").replace(/_/g, " ")}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: "auto" }}>
          <button className="btn98" onClick={handleApply}>Apply</button>
          <button className="btn98" onClick={handleApply}>OK</button>
        </div>
      </div>
    </div>
  );
}
