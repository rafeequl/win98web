import React, { useState, useMemo } from "react";
import icons from "../../../config/icons.json";

export default function IconPicker() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);
  const [copied, setCopied] = useState(null);

  const filteredIcons = useMemo(() => {
    if (!search) return icons.slice(0, limit);
    const searchLower = search.toLowerCase();
    return icons.filter(icon => icon.toLowerCase().includes(searchLower)).slice(0, limit);
  }, [search, limit]);

  const handleCopy = (path) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff", color: "#000" }}>
      <div style={{ padding: "8px", borderBottom: "1px solid #808080", background: "var(--w98-bg-gray)", display: "flex", gap: "8px", alignItems: "center" }}>
        <span>Search:</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "2px 4px", border: "2px inset #fff", outline: "none" }}
          placeholder="e.g. apps/32, folder, computer..."
        />
        <span style={{ fontSize: "11px" }}>Showing {filteredIcons.length} of {icons.length}</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px", alignContent: "start" }}>
        {filteredIcons.map((iconPath) => (
          <div
            key={iconPath}
            onClick={() => handleCopy(iconPath)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4px",
              border: "1px solid transparent",
              cursor: "pointer",
              textAlign: "center"
            }}
            onMouseEnter={(e) => e.currentTarget.style.border = "1px dotted #808080"}
            onMouseLeave={(e) => e.currentTarget.style.border = "1px solid transparent"}
            title={iconPath}
          >
            <div style={{ width: "32px", height: "32px", marginBottom: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={`/icons/${iconPath}`}
                alt="icon"
                style={{ maxWidth: "32px", maxHeight: "32px", imageRendering: "pixelated" }}
              />
            </div>
            <span style={{ fontSize: "10px", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {iconPath.split('/').pop()}
            </span>
          </div>
        ))}
        {filteredIcons.length >= limit && (
          <button
            onClick={() => setLimit(l => l + 200)}
            style={{ gridColumn: "1 / -1", padding: "8px", marginTop: "10px", cursor: "pointer" }}
          >
            Load More...
          </button>
        )}
      </div>

      {copied && (
        <div style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "4px",
          fontSize: "12px",
          pointerEvents: "none"
        }}>
          Copied: {copied}
        </div>
      )}

      <div style={{ padding: "4px 8px", background: "var(--w98-bg-gray)", borderTop: "1px solid #808080", fontSize: "11px" }}>
        Click an icon to copy its path. Use this path in src/config/apps.js
      </div>
    </div>
  );
}
