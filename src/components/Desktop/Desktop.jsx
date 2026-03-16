import React, { useState, useRef } from "react";
import { DESKTOP_ICONS } from "../../config/apps";

export function DesktopIcon({ icon, onDoubleClick }) {
  const [selected, setSelected] = useState(false);
  const lastClick = useRef(0);

  const handleClick = e => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClick.current < 400) { 
      onDoubleClick(); 
      setSelected(false); 
    } else {
      setSelected(true);
    }
    lastClick.current = now;
  };

  return (
    <div 
      onClick={handleClick} 
      style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        width: 72, 
        padding: 4, 
        cursor: "default",
        border: `1px solid ${selected ? "rgba(255,255,255,0.6)" : "transparent"}`,
        background: selected ? "rgba(0,0,128,0.35)" : "transparent",
      }}
    >
      <span style={{ fontSize: 34, filter: "drop-shadow(1px 1px 0 rgba(0,0,0,.5))", marginBottom: 3 }}>
        {icon.icon}
      </span>
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

export default function Desktop({ onIconDoubleClick }) {
  return (
    <div 
      style={{
        flex: 1, 
        position: "relative",
        background: "var(--w98-bg)",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)",
        overflow: "hidden",
      }}
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
            onDoubleClick={() => onIconDoubleClick(icon)} 
          />
        ))}
      </div>
    </div>
  );
}
