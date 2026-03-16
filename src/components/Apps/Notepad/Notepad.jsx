import React, { useState } from "react";

export default function NotepadWindow() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState(null);

  const menuItems = ["File", "Edit", "Search", "Help"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)" }}>
      {/* Menu Bar */}
      <div style={{ display: "flex", gap: 8, padding: "2px 6px", borderBottom: "1px solid var(--w98-dgray)" }}>
        {menuItems.map(item => (
          <div 
            key={item} 
            className="menu-item"
            style={{ 
              fontSize: 11, 
              padding: "2px 4px", 
              cursor: "default" 
            }}
          >
            <span style={{ textDecoration: "underline" }}>{item[0]}</span>{item.slice(1)}
          </div>
        ))}
      </div>

      {/* Editor Area */}
      <div 
        className="inset" 
        style={{ 
          flex: 1, 
          margin: 1,
          display: "flex", 
          flexDirection: "column",
          background: "#fff",
          position: "relative"
        }}
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            resize: "none",
            padding: "2px",
            fontFamily: "Fixedsys, 'Courier New', monospace",
            fontSize: "14px",
            lineHeight: "1.2",
            whiteSpace: "pre",
            overflow: "scroll",
          }}
        />
      </div>

      {/* Status Bar */}
      <div 
        style={{ 
          height: 20, 
          padding: "2px 4px", 
          display: "flex", 
          alignItems: "center", 
          gap: 10,
          borderTop: "1px solid var(--w98-dgray)",
          fontSize: 11
        }}
      >
        <div className="inset" style={{ flex: 1, height: 18, padding: "0 4px", display: "flex", alignItems: "center" }}>
          For Help, press F1
        </div>
        <div className="inset" style={{ width: 100, height: 18, padding: "0 4px", display: "flex", alignItems: "center" }}>
          Ln 1, Col {content.length + 1}
        </div>
      </div>

      <style>{`
        .menu-item:hover {
          background: var(--w98-blue);
          color: #fff;
        }
        textarea::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        textarea::-webkit-scrollbar-track {
          background: #dfdfdf;
          box-shadow: inset 1px 1px 0 #808080, inset -1px -1px 0 #fff;
        }
        textarea::-webkit-scrollbar-thumb {
          background: var(--w98-gray);
          box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, inset 2px 2px 0 #e0e0e0, inset -2px -2px 0 #404040;
        }
        textarea::-webkit-scrollbar-button {
          background: var(--w98-gray);
          width: 16px;
          height: 16px;
          box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;
        }
      `}</style>
    </div>
  );
}
