import React, { useState } from "react";
import { DESKTOP_ICONS, SYSTEM_ITEMS } from "../../config/apps";

function StartItem({ icon, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)} 
      onClick={onClick}
      style={{
        display: "flex", 
        alignItems: "center", 
        gap: 8, 
        padding: "5px 10px 5px 8px",
        fontFamily: "var(--w98-font)", 
        fontSize: 12, 
        cursor: "default",
        background: hover ? "var(--w98-blue)" : "transparent",
        color: hover ? "#fff" : "inherit",
      }}
    >
      <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>{icon.icon}</span>
      <span>{icon.label}</span>
    </div>
  );
}

export default function StartMenu({ onClose, onOpenWindow }) {
  const handleItem = (e, icon) => {
    e.stopPropagation();
    onOpenWindow(icon);
    onClose();
  };

  return (
    <div 
      className="panel" 
      onClick={e => e.stopPropagation()} 
      style={{
        position: "absolute", 
        bottom: "calc(var(--w98-taskbar-h) + 2px)", 
        left: 2,
        width: 210, 
        display: "flex", 
        flexDirection: "row", 
        zIndex: 99999,
        border: "2px solid", 
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "2px 2px 0 #000",
        animation: "slideUp .08s ease-out",
      }}
    >
      {/* Banner */}
      <div style={{
        width: 26, 
        background: "linear-gradient(to top, #000080, #1084d0)",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "flex-end", 
        paddingBottom: 6,
        writingMode: "vertical-rl", 
        transform: "rotate(180deg)",
      }}>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: "bold", letterSpacing: 1 }}>Windows</span>
        <span style={{ color: "#c0c0c0", fontSize: 14 }}>98</span>
      </div>

      {/* Items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "3px 0" }}>
        {DESKTOP_ICONS.map(icon => (
          <StartItem key={icon.id} icon={icon} onClick={e => handleItem(e, icon)} />
        ))}
        <div style={{ margin: "4px 6px", height: 2, background: "var(--w98-dgray)", boxShadow: "0 1px 0 #fff" }} />
        {SYSTEM_ITEMS.map(item => (
          <StartItem key={item.label} icon={item} onClick={onClose} />
        ))}
      </div>
    </div>
  );
}
