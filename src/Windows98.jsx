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

  useEffect(() => {
    const handleWpChange = (e) => setWallpaper(e.detail);
    window.addEventListener("wallpaper-change", handleWpChange);
    return () => window.removeEventListener("wallpaper-change", handleWpChange);
  }, []);

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

  return (
    <div className="win98-os" onClick={() => setStartOpen(false)}>
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
      />
    </div>
  );
}
