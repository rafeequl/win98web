import React, { useState, useEffect } from "react";
import "./styles/win98.css";
import { useWindows } from "./hooks/useWindows";
import Desktop from "./components/Desktop/Desktop";
import Taskbar from "./components/Taskbar/Taskbar";
import WindowShell from "./components/Window/WindowShell";

export default function Windows98() {
  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    updateWindow
  } = useWindows();

  const [startOpen, setStartOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(localStorage.getItem("desktop-wallpaper") || "");
  const [systemStatus, setSystemStatus] = useState("active"); // active, shutdown, shutting-down, off

  useEffect(() => {
    const handleWpChange = (e) => setWallpaper(e.detail);
    window.addEventListener("wallpaper-change", handleWpChange);
    return () => window.removeEventListener("wallpaper-change", handleWpChange);
  }, []);

  const triggerShutdown = () => setSystemStatus("shutdown");

  const performShutdown = () => {
    setSystemStatus("shutting-down");
    setTimeout(() => {
      setSystemStatus("off");
    }, 3000);
  };

  const handleTaskbarClick = id => {
    const w = windows.find(x => x.id === id);
    if (!w) return;

    if (w.minimized) {
      restoreWindow(id);
    } else {
      // Check if it's the currently focused (top-most) window
      const activeWindows = windows.filter(win => !win.minimized);
      const isTop = activeWindows.length === 0 || activeWindows.every(win => win.zIndex <= w.zIndex);

      if (isTop) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    }
  };

  if (systemStatus === "shutting-down") {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--w98-font)" }}>
        <img src="/win98/favicon-32x32.png" style={{ width: 64, height: 64, marginBottom: 20, imageRendering: "pixelated" }} />
        <div style={{ fontSize: 18, fontWeight: "bold" }}>Windows is shutting down...</div>
      </div>
    );
  }

  if (systemStatus === "off") {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
        <div style={{ color: "#df711b", fontFamily: "var(--w98-font)", fontSize: 24, fontWeight: "bold", textTransform: "uppercase", lineHeight: 1.5 }}>
          It's now safe to turn off<br />your computer.
        </div>
      </div>
    );
  }

  return (
    <div className="win98-os" onClick={() => setStartOpen(false)}>
      {systemStatus === "shutdown" && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 1000000, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.1)", backdropFilter: "grayscale(100%)",
        }}>
          <div className="panel" style={{ width: 320, padding: 2, border: "2px solid #fff", borderRightColor: "#000", borderBottomColor: "#000" }}>
            <div style={{ height: 18, background: "var(--w98-blue)", color: "#fff", fontWeight: "bold", padding: "0 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Shut Down Windows</span>
              <button className="btn98" onClick={() => setSystemStatus("active")} style={{ minWidth: 16, height: 14, fontSize: 9, padding: 0 }}>x</button>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", gap: 16 }}>
              <img src="/icons/actions/32/system-shutdown.png" style={{ width: 32, height: 32 }} />
              <div style={{ fontSize: 11 }}>
                <p style={{ fontWeight: "bold", marginBottom: 12 }}>Are you sure you want to:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="radio" defaultChecked /> <span>Shut down the computer?</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.5 }}>
                    <input type="radio" disabled /> <span>Restart the computer?</span>
                  </label>
                </div>
              </div>
            </div>
            <div style={{ padding: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="btn98" onClick={performShutdown}>Yes</button>
              <button className="btn98" onClick={() => setSystemStatus("active")}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layer */}
      <Desktop onIconDoubleClick={openWindow} wallpaper={wallpaper} />

      {/* Window Manager Layer */}
      {windows.map(w => {
        const activeWindows = windows.filter(win => !win.minimized);
        const isActive = !w.minimized && activeWindows.length > 0 && activeWindows.every(win => win.zIndex <= w.zIndex);

        return (
          <WindowShell
            key={w.id}
            win={w}
            isActive={isActive}
            onClose={() => closeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onUpdate={updates => updateWindow(w.id, updates)}
          />
        );
      })}

      {/* Taskbar Layer */}
      <Taskbar
        windows={windows}
        startOpen={startOpen}
        setStartOpen={setStartOpen}
        onTaskbarClick={handleTaskbarClick}
        onOpenWindow={openWindow}
        onShutdown={triggerShutdown}
      />
    </div>
  );
}
