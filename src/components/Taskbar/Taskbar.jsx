import React from "react";
import Clock from "./Clock";
import StartMenu from "./StartMenu";
import WinIcon from "../Common/WinIcon";

export default function Taskbar({
  windows,
  startOpen,
  setStartOpen,
  onTaskbarClick,
  onOpenWindow,
  onShutdown
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
        <WinIcon icon="places/16/start-here.png" size={16} />
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
              <WinIcon icon={w.icon} size={16} style={{ flexShrink: 0 }} />
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
        <WinIcon icon="status/16/stock_volume.png" size={16} title="Volume" />
        <Clock />
      </div>

      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onOpenWindow={onOpenWindow}
          onShutdown={onShutdown}
        />
      )}
    </div>
  );
}
