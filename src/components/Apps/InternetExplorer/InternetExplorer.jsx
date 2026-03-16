import React, { useState, useRef, useEffect, useCallback } from "react";
import WinIcon from "../../Common/WinIcon";

const WELCOME_PAGE = `
  <html>
    <head>
      <style>
        body { font-family: 'Times New Roman', serif; background: #fff; margin: 0; padding: 20px; color: #000; font-size: 14px; line-height: 1.4; }
        .header { background: linear-gradient(to right, #000080, #1084d0); color: #fff; padding: 12px; font-weight: bold; font-size: 24px; display: flex; align-items: center; gap: 15px; border-bottom: 2px solid #000; }
        .content { border: 2px inset #fff; background: #dfdfdf; padding: 20px; margin-top: 15px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); }
        h2 { color: #000080; margin-top: 0; }
        .btn-link { display: block; background: #c0c0c0; border: 2px solid; border-color: #fff #808080 #808080 #fff; padding: 8px 12px; margin: 10px 0; text-decoration: none; color: #000; font-weight: bold; text-align: center; }
        .btn-link:active { border-color: #808080 #fff #fff #808080; background: #d0d0d0; }
        .footer { margin-top: 30px; font-size: 11px; color: #555; border-top: 1px solid #808080; padding-top: 10px; }
      </style>
      <script>
        function nav(url) {
          window.parent.postMessage({ type: 'IE_NAVIGATE', url: url }, '*');
          return false;
        }
      </script>
    </head>
    <body>
      <div class="header">
        <img src="icons/apps/32/web-browser.png" width="32" />
        Internet Explorer 4.0
      </div>
      <div class="content">
        <h2>Welcome to the Internet</h2>
        <p>You are now connected to the World Wide Web using <b>IE 4.0 Vintage Proxy</b>. This allows browsing modern sites by bypassing security blocks.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <h3>Classic Web</h3>
            <p>Browse the real 1998 web archives.</p>
            <a href="#" onclick="return nav('https://theoldnet.com/get?url=google.com&year=1998')" class="btn-link">Google (1998)</a>
            <a href="#" onclick="return nav('https://theoldnet.com/get?url=apple.com&year=1998')" class="btn-link">Apple.com (1998)</a>
          </div>
          <div>
            <h3>Modern Web (Proxy)</h3>
            <p>Search & read modern sites.</p>
            <a href="#" onclick="return nav('http://frogfind.com')" class="btn-link">FrogFind Search</a>
            <a href="#" onclick="return nav('https://www.google.com/search?igu=1')" class="btn-link">Google Frame-Safe</a>
          </div>
        </div>

        <div class="footer">
          Compatibility: If a page appears blank, the site has "no-frame" locks. Use the Search or historic proxies above to view content.
        </div>
      </div>
    </body>
  </html>
`;

export default function InternetExplorer() {
  const [url, setUrl] = useState("about:blank");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState(["about:blank"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef(null);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 120);
  };

  const navigate = useCallback((target) => {
    if (!target) return;
    let finalUrl = target;

    if (target === "about:blank") {
      finalUrl = "about:blank";
    } else if (!target.startsWith("http") && !target.includes(".") && target !== "about:blank") {
      finalUrl = `http://frogfind.com/?q=${encodeURIComponent(target)}`;
    } else if (!target.startsWith("http") && target !== "about:blank") {
      finalUrl = "http://" + target;
    }

    setUrl(finalUrl);
    setInputValue(finalUrl === "about:blank" ? "" : finalUrl);

    // Simple history tracking
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(finalUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    startLoading();
  }, [history, historyIndex]);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'IE_NAVIGATE') navigate(e.data.url);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setUrl(prev);
      setInputValue(prev === "about:blank" ? "" : prev);
      startLoading();
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setUrl(next);
      setInputValue(next === "about:blank" ? "" : next);
      startLoading();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", userSelect: "none" }}>
      {/* Menu Bar */}
      <div style={{ display: "flex", gap: 8, padding: "2px 6px", fontSize: 11, borderBottom: "1px solid #fff", borderTop: "1px solid #fff" }}>
        {["File", "Edit", "View", "Go", "Favorites", "Help"].map(m => (
          <span key={m} style={{ padding: "1px 4px" }}>{m}</span>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 1, padding: "2px", borderBottom: "1px solid #808080" }}>
        <div style={{ display: "flex", flex: 1 }}>
          {[
            { label: "Back", icon: "actions/24/back.png", fallback: "⬅️", onClick: goBack, disabled: historyIndex === 0 },
            { label: "Forward", icon: "actions/24/forward.png", fallback: "➡️", onClick: goForward, disabled: historyIndex === history.length - 1 },
            { label: "Stop", icon: "actions/24/stop.png", fallback: "🛑", onClick: () => setIsLoading(false) },
            { label: "Refresh", icon: "actions/24/reload.png", fallback: "🔄", onClick: startLoading },
            { label: "Home", icon: "actions/24/go-home.png", fallback: "🏠", onClick: () => navigate("about:blank") },
            { separator: true },
            { label: "Search", icon: "actions/24/find.png", fallback: "🔍", onClick: () => navigate("http://frogfind.com") },
            { label: "Favorites", icon: "places/24/folder-favorites.png", fallback: "⭐" },
            { label: "History", icon: "actions/24/history.png", fallback: "📜" },
          ].map((btn, i) => (
            btn.separator ? <div key={i} style={{ width: 1, height: 38, background: "#808080", margin: "0 4px", borderRight: "1px solid #fff" }} /> : (
              <div
                key={i}
                onClick={btn.disabled ? null : btn.onClick}
                className="ie-toolbar-btn"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 8px", cursor: btn.disabled ? "default" : "pointer",
                  minWidth: 54, height: 44, opacity: btn.disabled ? 0.5 : 1
                }}
              >
                <WinIcon icon={btn.icon} size={24} fallback={btn.fallback} />
                <span style={{ fontSize: 10 }}>{btn.label}</span>
              </div>
            )
          ))}
        </div>

        {/* Animated Globe */}
        <div style={{ padding: 4, border: "2px inset #fff", background: "#fff", marginRight: 6 }}>
          <div style={{ animation: isLoading ? "ie-spin 1.5s linear infinite" : "none" }}>
            <WinIcon icon="apps/32/web-browser.png" size={32} />
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 6px", borderBottom: "1px solid #808080", boxShadow: "inset 0 1px 0 #fff" }}>
        <span style={{ fontSize: 11 }}>Address</span>
        <div className="inset" style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", padding: "1px 6px", height: 22 }}>
          <input
            type="text"
            value={inputValue}
            placeholder="Search or enter web address"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && navigate(inputValue)}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "var(--w98-font)", background: "transparent" }}
          />
        </div>
        <button className="btn98" style={{ minWidth: 40, height: 22 }} onClick={() => navigate(inputValue)}>Go</button>
      </div>

      {/* Main Viewport */}
      <div className="inset" style={{ flex: 1, background: "#fff", position: "relative", border: "2px inset #fff", margin: "2px" }}>
        <iframe
          ref={iframeRef}
          src={url !== "about:blank" ? url : undefined}
          srcDoc={url === "about:blank" ? WELCOME_PAGE : undefined}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
        {isLoading && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#d0d0d0" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "var(--w98-blue)", transition: "width 0.2s" }} />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div style={{ height: 22, background: "var(--w98-gray)", display: "flex", alignItems: "center", padding: "0 6px", borderTop: "1px solid #808080", fontSize: 11 }}>
        <div style={{ flex: 1 }}>{isLoading ? "Contacting proxy..." : "Done"}</div>
        <div style={{ width: 1, height: 16, background: "#808080", margin: "0 6px", borderRight: "1px solid #fff" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <WinIcon icon="status/16/online.png" size={14} />
          <span>Internet Zone</span>
        </div>
      </div>

      <style>{`
        .ie-toolbar-btn:hover { background: #dfdfdf; box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080; }
        .ie-toolbar-btn:active { transform: translate(1px, 1px); }
        @keyframes ie-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
