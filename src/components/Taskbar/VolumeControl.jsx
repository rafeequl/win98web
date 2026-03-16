import React, { useState } from "react";

export default function VolumeControl({ onClose }) {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  return (
    <div 
      className="panel" 
      onClick={e => e.stopPropagation()}
      style={{
        position: "absolute",
        bottom: "calc(var(--w98-taskbar-h) + 2px)",
        right: 48,
        width: 80,
        height: 140,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 4px",
        gap: 8
      }}
    >
      <div style={{ fontSize: 11, textAlign: "center" }}>Volume</div>
      
      {/* Slider Container */}
      <div className="inset" style={{ 
        flex: 1, 
        width: 30, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "flex-end",
        padding: "4px 0",
        background: "var(--w98-gray)",
        position: "relative"
      }}>
        {/* The Track */}
        <div style={{
            position: "absolute",
            width: 2,
            height: "80%",
            background: "#000",
            boxShadow: "1px 1px 0 #fff"
        }} />
        
        {/* The Knob (Thumb) */}
        <input 
            type="range" 
            min="0" 
            max="100" 
            vertical=""
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
                writingMode: "bt-lr", /* IE */
                WebkitAppearance: "slider-vertical", /* WebKit */
                width: 20,
                height: "90%",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                zIndex: 2,
                opacity: 0.8
            }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <label style={{ fontSize: 10, display: "flex", alignItems: "center", gap: 2 }}>
            <input type="checkbox" checked={muted} onChange={() => setMuted(!muted)} />
            Mute
        </label>
      </div>
    </div>
  );
}
