import React, { useState } from "react";
import WinIcon from "../Common/WinIcon";

export function WinCtrlBtn({ lbl, title, action, danger }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={action}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 16,
        height: 14,
        fontSize: 9,
        fontFamily: "var(--w98-font)",
        background: danger && hover ? "#ff4444" : "var(--w98-gray)",
        color: danger && hover ? "#fff" : "inherit",
        border: "none",
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #fff, inset -2px -2px 0 #808080, inset 2px 2px 0 #fff",
        padding: 0,
        lineHeight: 1,
      }}
    >
      {lbl}
    </button>
  );
}

export default function WindowShell({ win, isActive, onClose, onFocus, onMinimize, onUpdate }) {
  const [pos, setPos] = useState(win.position);
  const [size, setSize] = useState(win.size);
  const [maximized, setMaximized] = useState(win.maximized || false);
  const WindowContent = win.component;

  const handleDragStart = e => {
    if (maximized) return;
    e.preventDefault();
    onFocus();
    const sx = e.clientX - pos.x, sy = e.clientY - pos.y;
    const onMove = me => setPos({ x: Math.max(0, me.clientX - sx), y: Math.max(0, me.clientY - sy) });
    const onUp = (me) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      onUpdate({ position: { x: Math.max(0, me.clientX - sx), y: Math.max(0, me.clientY - sy) } });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleResizeStart = (e, dir) => {
    if (maximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    const startX = e.clientX, startY = e.clientY;
    const startW = size.width, startH = size.height;
    const startPX = pos.x, startPY = pos.y;

    const onMove = me => {
      let newW = startW, newH = startH, newX = startPX, newY = startPY;
      const dx = me.clientX - startX, dy = me.clientY - startY;

      if (dir.includes("e")) newW = Math.max(200, startW + dx);
      if (dir.includes("s")) newH = Math.max(100, startH + dy);
      if (dir.includes("w")) { const delta = Math.min(dx, startW - 200); newX = startPX + delta; newW = startW - delta; }
      if (dir.includes("n")) { const delta = Math.min(dy, startH - 100); newY = startPY + delta; newH = startH - delta; }

      setPos({ x: newX, y: newY });
      setSize({ width: newW, height: newH });
    };

    const onUp = (me) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      let finalW = startW, finalH = startH, finalX = startPX, finalY = startPY;
      const dx = me.clientX - startX, dy = me.clientY - startY;

      if (dir.includes("e")) finalW = Math.max(200, startW + dx);
      if (dir.includes("s")) finalH = Math.max(100, startH + dy);
      if (dir.includes("w")) { const delta = Math.min(dx, startW - 200); finalX = startPX + delta; finalW = startW - delta; }
      if (dir.includes("n")) { const delta = Math.min(dy, startH - 100); finalY = startPY + delta; finalH = startH - delta; }

      onUpdate({
        position: { x: finalX, y: finalY },
        size: { width: finalW, height: finalH }
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const containerStyle = maximized
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - var(--w98-taskbar-h))", zIndex: win.zIndex }
    : { left: pos.x, top: pos.y, width: size.width, height: size.height, zIndex: win.zIndex };

  return (
    <div
      className="panel"
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        display: win.minimized ? "none" : "flex",
        flexDirection: "column",
        minWidth: 200,
        minHeight: 100,
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "2px 2px 0 #000",
        ...containerStyle,
      }}
    >
      {/* Resize handles */}
      {!maximized && (
        <>
          <div onMouseDown={e => handleResizeStart(e, "n")} style={{ position: "absolute", top: -4, left: 4, right: 4, height: 8, cursor: "ns-resize", zIndex: 1 }} />
          <div onMouseDown={e => handleResizeStart(e, "s")} style={{ position: "absolute", bottom: -4, left: 4, right: 4, height: 8, cursor: "ns-resize", zIndex: 1 }} />
          <div onMouseDown={e => handleResizeStart(e, "e")} style={{ position: "absolute", top: 4, bottom: 4, right: -4, width: 8, cursor: "ew-resize", zIndex: 1 }} />
          <div onMouseDown={e => handleResizeStart(e, "w")} style={{ position: "absolute", top: 4, bottom: 4, left: -4, width: 8, cursor: "ew-resize", zIndex: 1 }} />
          <div onMouseDown={e => handleResizeStart(e, "nw")} style={{ position: "absolute", top: -4, left: -4, width: 10, height: 10, cursor: "nwse-resize", zIndex: 2 }} />
          <div onMouseDown={e => handleResizeStart(e, "ne")} style={{ position: "absolute", top: -4, right: -4, width: 10, height: 10, cursor: "nesw-resize", zIndex: 2 }} />
          <div onMouseDown={e => handleResizeStart(e, "sw")} style={{ position: "absolute", bottom: -4, left: -4, width: 10, height: 10, cursor: "nesw-resize", zIndex: 2 }} />
          <div onMouseDown={e => handleResizeStart(e, "se")} style={{ position: "absolute", bottom: -4, right: -4, width: 10, height: 10, cursor: "nwse-resize", zIndex: 2 }} />
        </>
      )}

      {/* Title bar */}
      <div
        onMouseDown={handleDragStart}
        onDoubleClick={() => { setMaximized(m => !m); onUpdate({ maximized: !maximized }); }}
        style={{
          height: 20,
          background: isActive
            ? "linear-gradient(to right, var(--w98-blue), #1084d0)"
            : "linear-gradient(to right, var(--w98-dgray), #c0c0c0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2px 2px 2px 4px",
          cursor: "default",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, overflow: "hidden" }}>
          <WinIcon icon={win.icon} size={16} />
          <span style={{ color: "#fff", fontSize: 11, fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {win.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[
            { lbl: "_", title: "Minimize", action: e => { e.stopPropagation(); onMinimize(); } },
            {
              lbl: maximized ? "❐" : "□",
              title: maximized ? "Restore" : "Maximize",
              action: e => { e.stopPropagation(); setMaximized(m => !m); onUpdate({ maximized: !maximized }); }
            },
            { lbl: "✕", title: "Close", action: e => { e.stopPropagation(); onClose(); }, danger: true },
          ].map(btn => (
            <WinCtrlBtn key={btn.title} {...btn} />
          ))}
        </div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <WindowContent />
      </div>
    </div>
  );
}
