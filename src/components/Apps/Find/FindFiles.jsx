import React, { useState } from "react";
import WinIcon from "../../Common/WinIcon";
import { DESKTOP_ICONS } from "../../../config/apps";

export default function FindFiles() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) {
        setResults([]);
        return;
    }
    const filtered = DESKTOP_ICONS.filter(app => 
        app.label.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)" }}>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <WinIcon icon="actions/32/find.png" size={32} />
            <div style={{ fontSize: 12 }}>Find all files and folders named:</div>
        </div>
        
        <div style={{ display: "flex", gap: 8 }}>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="inset"
                style={{ flex: 1, height: 22, padding: "0 4px", fontSize: 12, outline: "none" }}
            />
            <button className="btn98" onClick={handleSearch} style={{ minWidth: 80 }}>Find Now</button>
        </div>
      </div>

      <div style={{ flex: 1, margin: "0 12px 12px", background: "#fff" }} className="inset">
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", background: "#eee", fontSize: 11 }}>
            <div style={{ flex: 2, padding: "2px 4px", borderRight: "1px solid #ccc" }}>Name</div>
            <div style={{ flex: 1, padding: "2px 4px", borderRight: "1px solid #ccc" }}>In Folder</div>
            <div style={{ flex: 1, padding: "2px 4px" }}>Size</div>
        </div>
        <div style={{ overflowY: "auto", height: "calc(100% - 20px)" }}>
            {results.length > 0 ? (
                results.map(app => (
                    <div key={app.id} style={{ display: "flex", fontSize: 11, cursor: "default", padding: "2px 0" }}>
                        <div style={{ flex: 2, padding: "0 4px", display: "flex", alignItems: "center", gap: 4 }}>
                            <WinIcon icon={app.icon} size={16} />
                            {app.label}
                        </div>
                        <div style={{ flex: 1, padding: "0 4px" }}>C:\Desktop</div>
                        <div style={{ flex: 1, padding: "0 4px" }}>2 KB</div>
                    </div>
                ))
            ) : query && (
                <div style={{ padding: 20, textAlign: "center", color: "gray", fontSize: 12 }}>
                    No results found.
                </div>
            )}
        </div>
      </div>
      
      <div style={{ height: 20, padding: "2px 4px", fontSize: 11 }}>
        {results.length} file(s) found
      </div>
    </div>
  );
}
