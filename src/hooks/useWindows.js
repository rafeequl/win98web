import { useState, useCallback } from "react";

let _zIdx = 100;
let _winCtr = 0;

export function useWindows() {
  const [windows, setWindows] = useState([]);

  const openWindow = useCallback((iconDef) => {
    setWindows(prev => {
      // Check if window is already open
      const existing = prev.find(w => w.iconId === iconDef.id && !w.minimized);
      if (existing) {
        return prev.map(w => w.id === existing.id ? { ...w, zIndex: ++_zIdx } : w);
      }

      // Check if window is minimized
      const minimized = prev.find(w => w.iconId === iconDef.id && w.minimized);
      if (minimized) {
        return prev.map(w => w.id === minimized.id ? { ...w, minimized: false, zIndex: ++_zIdx } : w);
      }

      // Open new window
      const id = `win-${++_winCtr}`;
      const off = (_winCtr % 8) * 22;
      return [...prev, {
        id,
        iconId: iconDef.id,
        title: iconDef.label,
        icon: iconDef.icon,
        component: iconDef.component,
        minimized: false,
        zIndex: ++_zIdx,
        position: { x: 80 + off, y: 60 + off },
        size: iconDef.defaultSize || { width: 480, height: 320 },
        maximized: false,
      }];
    });
  }, []);

  const closeWindow = useCallback(id => {
    setWindows(p => p.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback(id => {
    setWindows(p => p.map(w => w.id === id ? { ...w, zIndex: ++_zIdx } : w));
  }, []);

  const minimizeWindow = useCallback(id => {
    setWindows(p => p.map(w => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const restoreWindow = useCallback(id => {
    setWindows(p => p.map(w => w.id === id ? { ...w, minimized: false, zIndex: ++_zIdx } : w));
  }, []);

  const updateWindow = useCallback((id, updates) => {
    setWindows(p => p.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  return { windows, openWindow, closeWindow, focusWindow, minimizeWindow, restoreWindow, updateWindow };
}
