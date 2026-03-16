import React, { useState } from "react";
import WinIcon from "../../Common/WinIcon";

const DOCUMENTS = [
  { id: "resume", icon: "mimes/32/application-msword.png", label: "Resume.doc", type: "Microsoft Word Document", size: "24 KB" },
  { id: "budget", icon: "mimes/32/application-vnd.oasis.opendocument.spreadsheet.png", label: "Budget_98.xls", type: "Microsoft Excel Spreadsheet", size: "42 KB" },
  { id: "todo", icon: "mimes/32/application-x-generic.png", label: "TODO.txt", type: "Text Document", size: "1 KB" },
  { id: "photos", icon: "places/32/folder.png", label: "My Pictures", type: "File Folder", size: "—" },
];

function ExplorerItem({ item, viewMode, selected, onSelect }) {
  const style = viewMode === "icons"
    ? {
      display: "flex", flexDirection: "column", alignItems: "center", width: 76, padding: 4, cursor: "default",
      border: "1px solid transparent", fontSize: 10, textAlign: "center", gap: 3,
      background: selected ? "var(--w98-blue)" : "transparent",
      color: selected ? "#fff" : "inherit",
      outline: selected ? "1px dotted #fff" : "none"
    }
    : {
      display: "flex", alignItems: "center", gap: 6, padding: "2px 4px", cursor: "default",
      background: selected ? "var(--w98-blue)" : "transparent",
      color: selected ? "#fff" : "inherit"
    };

  return (
    <div style={style} onClick={onSelect}>
      <WinIcon icon={item.icon} size={viewMode === "icons" ? 32 : 16} />
      <span style={{ fontSize: viewMode === "icons" ? 10 : 11 }}>{item.label}</span>
    </div>
  );
}

export default function MyDocumentsWindow() {
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("icons");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)" }}>
      {/* Toolbar */}
      <div className="panel" style={{ display: "flex", alignItems: "center", padding: "2px 4px", gap: 2, borderBottom: "1px solid var(--w98-dgray)", flexShrink: 0 }}>
        {["⬅ Back", "➡ Forward", "⬆ Up"].map(l => (
          <button key={l} className="btn98" disabled style={{ minWidth: "auto", height: 22, padding: "1px 6px", fontSize: 10, opacity: 0.5 }}>{l}</button>
        ))}
        <div style={{ width: 2, height: 18, margin: "0 3px", boxShadow: "inset -1px 0 0 #fff, inset 1px 0 0 var(--w98-dgray)" }} />
        {[["🔲", "icons"], ["☰", "list"]].map(([lbl, v]) => (
          <button key={v} className={`btn98${viewMode === v ? " pressed" : ""}`}
            onClick={() => setViewMode(v)} title={v} style={{ minWidth: "auto", height: 22, padding: "1px 6px" }}>{lbl}</button>
        ))}
      </div>

      {/* Address bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 4px", borderBottom: "1px solid var(--w98-dgray)", flexShrink: 0 }}>
        <span style={{ fontSize: 11 }}>Address</span>
        <div className="inset" style={{ flex: 1, height: 20, padding: "2px 6px", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
          <WinIcon icon="places/32/folder.png" size={16} />
          My Documents
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div className="inset" style={{ width: 130, flexShrink: 0, padding: 6, fontSize: 10, display: "flex", flexDirection: "column", gap: 6, borderRight: "2px solid var(--w98-dgray)", overflowY: "auto" }}>
          <div style={{ fontWeight: "bold", fontSize: 11, borderBottom: "1px solid var(--w98-dgray)", paddingBottom: 3 }}>My Documents</div>
          <p style={{ color: "var(--w98-ddgray)", fontSize: 10, lineHeight: 1.4 }}>Select an item to view its description.</p>
          {selected && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: 4, textAlign: "center" }}>
              <WinIcon icon={selected.icon} size={32} />
              <span style={{ fontWeight: "bold", fontSize: 10 }}>{selected.label}</span>
              <span style={{ fontSize: 9, color: "var(--w98-ddgray)" }}>{selected.type}</span>
              {selected.size !== "—" && <span style={{ fontSize: 9, color: "var(--w98-ddgray)" }}>Size: {selected.size}</span>}
            </div>
          )}
        </div>

        {/* Files */}
        <div className="inset" style={{ flex: 1, overflowY: "auto", padding: 6 }}>
          <div style={{ display: "flex", flexWrap: viewMode === "icons" ? "wrap" : "nowrap", flexDirection: viewMode === "list" ? "column" : "row", gap: viewMode === "icons" ? 8 : 1 }}>
            {DOCUMENTS.map(doc => (
              <ExplorerItem
                key={doc.id}
                item={doc}
                viewMode={viewMode}
                selected={selected?.id === doc.id}
                onSelect={() => setSelected(doc)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="panel" style={{ height: 20, padding: "2px 8px", fontSize: 11, display: "flex", alignItems: "center", borderTop: "2px solid var(--w98-dgray)", flexShrink: 0 }}>
        {selected ? selected.label : `${DOCUMENTS.length} object(s)`}
      </div>
    </div>
  );
}
