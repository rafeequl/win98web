import React, { useState, useEffect } from "react";
import WinIcon from "../../Common/WinIcon";

export default function RecycleBin() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("recycle-bin");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("recycle-bin");
      setItems(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("recycle-bin-change", handleStorageChange);
    return () => window.removeEventListener("recycle-bin-change", handleStorageChange);
  }, []);

  const emptyTrash = () => {
    localStorage.setItem("recycle-bin", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent("recycle-bin-change"));
    setItems([]);
  };

  const restoreItem = (id) => {
      const newItems = items.filter(item => item.id !== id);
      const itemToRestore = items.find(item => item.id === id);
      
      localStorage.setItem("recycle-bin", JSON.stringify(newItems));
      
      // We should probably have a central file system for this to work properly
      // but for now let's just emit an event
      window.dispatchEvent(new CustomEvent("recycle-bin-change"));
      window.dispatchEvent(new CustomEvent("file-restored", { detail: itemToRestore }));
      setItems(newItems);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
      {/* Menu Bar */}
      <div style={{ display: "flex", gap: 8, padding: "2px 6px", background: "var(--w98-gray)", borderBottom: "1px solid var(--w98-dgray)" }}>
        {["File", "Edit", "View", "Go", "Favorites", "Help"].map(item => (
          <div key={item} style={{ fontSize: 11, padding: "2px 4px", cursor: "default" }}>
            <span style={{ textDecoration: "underline" }}>{item[0]}</span>{item.slice(1)}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 4, padding: "4px", background: "var(--w98-gray)", borderBottom: "1px solid var(--w98-dgray)" }}>
        <button className="btn98" onClick={emptyTrash} style={{ minWidth: 100, fontSize: 11 }}>Empty Recycle Bin</button>
      </div>

      {/* File List */}
      <div style={{ flex: 1, padding: 10, display: "flex", flexWrap: "wrap", gap: 20, alignContent: "flex-start", overflowY: "auto" }}>
        {items.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center", color: "gray", marginTop: 40, fontSize: 12 }}>
            The Recycle Bin is empty.
          </div>
        ) : (
          items.map(item => (
            <div 
              key={item.id} 
              onDoubleClick={() => restoreItem(item.id)}
              style={{ 
                width: 70, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: 4,
                cursor: "default" 
              }}
            >
              <WinIcon icon={item.icon || "mimes/32/text-x-generic.png"} size={32} />
              <span style={{ 
                fontSize: 11, 
                textAlign: "center", 
                wordBreak: "break-all",
                padding: "1px 2px",
                background: "transparent"
              }}>
                {item.name}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Status Bar */}
      <div style={{ 
        height: 20, 
        padding: "2px 4px", 
        display: "flex", 
        background: "var(--w98-gray)", 
        borderTop: "1px solid var(--w98-dgray)",
        fontSize: 11 
      }}>
        <div className="inset" style={{ flex: 1, height: 18, padding: "0 4px", display: "flex", alignItems: "center" }}>
          {items.length} object(s)
        </div>
      </div>
    </div>
  );
}
