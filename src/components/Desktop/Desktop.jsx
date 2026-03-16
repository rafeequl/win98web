import React, { useState, useRef } from "react";
import { DESKTOP_ICONS } from "../../config/apps";
import WinIcon from "../Common/WinIcon";

export function DesktopIcon({ icon, selected, onSelect, onDoubleClick }) {
  const lastClick = useRef(0);

  const handleClick = e => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClick.current < 400) {
      onDoubleClick();
      onSelect(null); // Deselect after opening
    } else {
      onSelect(icon.id);
    }
    lastClick.current = now;
  };

  return (
    <div
      onClick={handleClick}
      className={`desktop-icon ${selected ? "selected" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 72,
        padding: 4,
        cursor: "default",
        border: `1px solid ${selected ? "rgba(255,255,255,0.6)" : "transparent"}`,
        background: selected ? "rgba(0,0,128,0.35)" : "transparent",
        zIndex: selected ? 10 : 1,
      }}
    >
      <div style={{ width: 34, height: 34, display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 3 }}>
        <WinIcon icon={icon.icon} size={32} />
      </div>
      <span style={{
        fontFamily: "var(--w98-font)",
        fontSize: 11,
        color: "#fff",
        textAlign: "center",
        textShadow: "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000",
        padding: "1px 2px",
        maxWidth: 70,
        wordBreak: "break-word",
        lineHeight: 1.3,
        background: selected ? "var(--w98-blue)" : "transparent",
      }}>
        {icon.label}
      </span>
    </div>
  );
}

export default function Desktop({ onIconDoubleClick, wallpaper }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleDesktopClick = () => {
    setSelectedId(null);
  };

  const desktopStyle = {
    flex: 1,
    position: "relative",
    background: "var(--w98-bg)",
    backgroundImage: wallpaper ? `url(/wallpapers/${wallpaper})` : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)",
    backgroundSize: wallpaper ? "cover" : "auto",
    backgroundPosition: wallpaper ? "center" : "0 0",
    backgroundRepeat: wallpaper ? "no-repeat" : "repeat",
    overflow: "hidden",
  };

  return (
    <div
      onClick={handleDesktopClick}
      style={desktopStyle}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: 6,
          padding: 12,
          height: "100%"
        }}
      >
        {DESKTOP_ICONS.map(icon => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            selected={selectedId === icon.id}
            onSelect={setSelectedId}
            onDoubleClick={() => onIconDoubleClick(icon)}
          />
        ))}
      </div>
    </div>
  );
}
