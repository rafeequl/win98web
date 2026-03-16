import React, { useState } from "react";
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
      <Desktop onIconDoubleClick={openWindow} />

      {/* Window Manager Layer */}
      {windows.filter(w => !w.minimized).map(w => {
        const activeWindows = windows.filter(win => !win.minimized);
        const isActive = activeWindows.length > 0 && activeWindows.every(win => win.zIndex <= w.zIndex);
        
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
