import React from "react";
import Clock from "./Clock";
import StartMenu from "./StartMenu";

export default function Taskbar({ 
  windows, 
  startOpen, 
  setStartOpen, 
  onTaskbarClick, 
  onOpenWindow 
}) {
  return (
    <div 
      className="panel" 
      style={{ 
        height: "var(--w98-taskbar-h)", 
        display: "flex", 
        alignItems: "center", 
        padding: "2px 4px", 
        gap: 4, 
        flexShrink: 0, 
        borderTop: "2px solid #fff", 
        position: "relative" 
      }}
    >
      {/* Start */}
      <button 
        className={`btn98${startOpen ? " pressed" : ""}`}
        onClick={e => { e.stopPropagation(); setStartOpen(o => !o); }}
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 4, 
          fontWeight: "bold", 
          fontSize: 12, 
          minWidth: 60, 
          height: 26, 
          padding: "2px 6px" 
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ imageRendering: "pixelated", flexShrink: 0 }}>
          <rect x="0" y="0" width="7" height="7" fill="#FF0000"/>
          <rect x="9" y="0" width="7" height="7" fill="#00FF00"/>
          <rect x="0" y="9" width="7" height="7" fill="#0000FF"/>
          <rect x="9" y="9" width="7" height="7" fill="#FFFF00"/>
        </svg>
        Start
      </button>

      {/* Sep */}
      <div style={{ width: 2, height: 26, boxShadow: "inset -1px 0 0 #fff, inset 1px 0 0 var(--w98-dgray)" }} />

      {/* Window buttons */}
      <div style={{ flex: 1, display: "flex", gap: 3, overflow: "hidden" }}>
        {windows.map(w => {
          const activeWindows = windows.filter(win => !win.minimized);
          const isActive = !w.minimized && activeWindows.every(win => win.zIndex <= w.zIndex);
          
          return (
            <button 
              key={w.id} 
              className={`btn98${isActive ? " pressed" : ""}`}
              onClick={() => onTaskbarClick(w.id)} 
              title={w.title}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 4, 
                minWidth: 80, 
                maxWidth: 160, 
                height: 26, 
                padding: "2px 6px", 
                overflow: "hidden" 
              }}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>{w.icon}</span>
              <span style={{ 
                overflow: "hidden", 
                whiteSpace: "nowrap", 
                textOverflow: "ellipsis", 
                fontSize: 11,
                fontWeight: isActive ? "bold" : "normal"
              }}>
                {w.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tray */}
      <div className="inset" style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 8px", height: 26, fontSize: 11 }}>
        <span title="Volume">🔊</span>
        <Clock />
      </div>

      {startOpen && (
        <StartMenu 
          onClose={() => setStartOpen(false)} 
          onOpenWindow={onOpenWindow} 
        />
      )}
    </div>
  );
}
