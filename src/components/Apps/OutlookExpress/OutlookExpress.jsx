import React, { useState, useEffect } from "react";
import WinIcon from "../../Common/WinIcon";

export default function OutlookExpress() {
  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState("Inbox");

  const RSS_URL = "https://www.aljazeera.com/xml/rss/all.xml";
  const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`;

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      // Added cache buster to bypass cached proxy results
      const cacheBuster = Date.now();
      const targetUrl = `https://www.aljazeera.com/xml/rss/all.xml?t=${cacheBuster}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (!data || !data.contents) throw new Error("Empty response from proxy");

      let xmlContent = data.contents;

      // Handle Base64 encoded data from proxy
      if (xmlContent.startsWith("data:application/rss+xml;base64,") || xmlContent.includes(";base64,")) {
        const base64Part = xmlContent.split(",")[1];
        xmlContent = atob(base64Part);
      }

      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlContent, "text/xml");

      // Look for items in both standard and namespaced formats
      const items = Array.from(xml.getElementsByTagName("item")).map((item, idx) => {
        const title = item.getElementsByTagName("title")[0]?.textContent || "No Subject";
        // Extract description, handling CDATA
        let description = item.getElementsByTagName("description")[0]?.textContent || "No content available.";
        const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;
        const link = item.getElementsByTagName("link")[0]?.textContent;

        return {
          id: idx + 1,
          from: "Al Jazeera World News",
          subject: title,
          date: pubDate ? new Date(pubDate).toLocaleDateString() : new Date().toLocaleDateString(),
          time: pubDate ? new Date(pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
          content: description,
          link: link,
          unread: true
        };
      });

      const welcomeEmail = {
        id: 0,
        from: "Microsoft Outlook Express Team",
        subject: "Welcome to Outlook Express 4.0",
        date: "06/25/1998",
        time: "10:00 AM",
        content: "Welcome to Outlook Express! Your gateway to information. We successfully connected to Al Jazeera. Your headlines are listed below.",
        unread: false
      };

      if (items.length === 0) {
        setEmails([welcomeEmail, {
          id: 999,
          from: "Outlook News Client",
          subject: "Information: RSS Parsing Issue",
          date: new Date().toLocaleDateString(),
          time: "Now",
          content: "We received data from Al Jazeera, but couldn't find any news items. The feed format might have changed.",
          unread: true
        }]);
      } else {
        setEmails([welcomeEmail, ...items]);
      }
      setSelectedId(0);
    } catch (error) {
      console.error("Outlook Express Error:", error);
      setEmails([{
        id: -1,
        from: "Outlook Express Monitor",
        subject: "ALERT: Communication Error with News Server",
        date: new Date().toLocaleDateString(),
        time: "System",
        content: `Outlook Express was unable to connect to the news server. \r\n\r\nTechnical details: ${error.message}.`,
        unread: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedEmail = emails.find(e => e.id === selectedId);

  const folders = [
    { name: "Inbox", icon: "places/16/folder.png", count: emails.length },
    { name: "Outbox", icon: "places/16/folder.png", count: 0 },
    { name: "Sent Items", icon: "places/16/folder.png", count: 0 },
    { name: "Deleted Items", icon: "places/16/folder.png", count: 0 },
    { name: "Drafts", icon: "places/16/folder.png", count: 0 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", userSelect: "none" }}>
      {/* Menu Bar */}
      <div style={{ display: "flex", gap: 10, padding: "2px 8px", fontSize: 11, borderBottom: "1px solid #fff" }}>
        {["File", "Edit", "View", "Tools", "Message", "Help"].map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 4, padding: "4px", borderBottom: "1px solid #808080", background: "var(--w98-gray)" }}>
        {[
          { label: "New Mail", icon: "actions/24/mail-message-new.png" },
          { label: "Reply", icon: "actions/24/mail-reply-sender.png" },
          { label: "Reply All", icon: "actions/24/mail-reply-all.png" },
          { label: "Forward", icon: "actions/24/mail-forward.png" },
          { separator: true },
          { label: "Print", icon: "actions/24/document-print.png" },
          { label: "Delete", icon: "actions/24/edit-delete.png" },
          { separator: true },
          { label: "Send/Recv", icon: "actions/24/mail-send-receive.png", onClick: fetchEmails },
          { label: "Address Book", icon: "apps/24/office-address-book.png" },
        ].map((btn, i) => btn.separator ? (
          <div key={i} style={{ width: 1, height: 36, background: "#808080", margin: "0 4px", borderRight: "1px solid #fff" }} />
        ) : (
          <div key={i} onClick={btn.onClick} className="oe-tool-btn" style={{
            display: "flex", flexDirection: "column", alignItems: "center", minWidth: 50, padding: "4px 2px", cursor: "default"
          }}>
            <WinIcon icon={btn.icon} size={24} />
            <span style={{ fontSize: 10, marginTop: 2 }}>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: "2px" }}>
        {/* Folders Sidebar */}
        <div className="inset" style={{ width: 150, background: "#fff", display: "flex", flexDirection: "column", marginRight: 2 }}>
          <div style={{ background: "#000080", color: "#fff", padding: "2px 6px", fontSize: 11, fontWeight: "bold" }}>Folders</div>
          <div style={{ padding: "4px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 6px", fontSize: 11, fontWeight: "bold" }}>
              <WinIcon icon="apps/16/internet-mail.png" size={16} /> Outlook Express
            </div>
            <div style={{ paddingLeft: 16 }}>
              {folders.map(f => (
                <div key={f.name} onClick={() => setCurrentFolder(f.name)} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "2px 6px", fontSize: 11,
                  background: currentFolder === f.name ? "#000080" : "transparent",
                  color: currentFolder === f.name ? "#fff" : "#000"
                }}>
                  <WinIcon icon={f.icon} size={16} /> {f.name} {f.count > 0 && `(${f.count})`}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Split View (Message List + Content) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Message List */}
          <div className="inset" style={{ flex: 1, background: "#fff", overflowY: "auto", position: "relative" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead style={{ position: "sticky", top: 0, background: "var(--w98-gray)", zIndex: 10 }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "2px 4px", border: "1px solid #808080", background: "var(--w98-gray)", boxShadow: "inset 1px 1px 0 #fff" }}>!</th>
                  <th style={{ textAlign: "left", padding: "2px 4px", border: "1px solid #808080", background: "var(--w98-gray)", boxShadow: "inset 1px 1px 0 #fff" }}>From</th>
                  <th style={{ textAlign: "left", padding: "2px 4px", border: "1px solid #808080", background: "var(--w98-gray)", boxShadow: "inset 1px 1px 0 #fff" }}>Subject</th>
                  <th style={{ textAlign: "left", padding: "2px 4px", border: "1px solid #808080", background: "var(--w98-gray)", boxShadow: "inset 1px 1px 0 #fff" }}>Received</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>Checking for new messages...</td></tr>
                ) : emails.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No messages in folder.</td></tr>
                ) : emails.map(e => (
                  <tr key={e.id} onClick={() => { setSelectedId(e.id); e.unread = false; }} style={{
                    background: selectedId === e.id ? "#000080" : "transparent",
                    color: selectedId === e.id ? "#fff" : "#000",
                    fontWeight: e.unread ? "bold" : "normal"
                  }}>
                    <td style={{ padding: "2px 4px" }}>
                      <WinIcon icon={e.unread ? "status/16/mail-unread.png" : "status/16/stock_mail-open.png"} size={14} />
                    </td>
                    <td style={{ padding: "2px 4px", whiteSpace: "nowrap" }}>{e.from}</td>
                    <td style={{ padding: "2px 4px", width: "100%" }}>{e.subject}</td>
                    <td style={{ padding: "2px 4px", whiteSpace: "nowrap" }}>{e.date} {e.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message Preview */}
          <div className="inset" style={{ height: 200, background: "#fff", marginTop: 2, display: "flex", flexDirection: "column" }}>
            {selectedEmail ? (
              <>
                <div style={{ background: "var(--w98-gray)", padding: "4px 8px", borderBottom: "1px solid #808080", fontSize: 11 }}>
                  <div><b>From:</b> {selectedEmail.from}</div>
                  <div><b>Sent:</b> {selectedEmail.date} {selectedEmail.time}</div>
                  <div><b>To:</b> win98user@localhost</div>
                  <div><b>Subject:</b> {selectedEmail.subject}</div>
                </div>
                <div style={{ flex: 1, padding: "10px", overflowY: "auto", fontSize: 12, lineHeight: "1.4", fontFamily: "Arial, sans-serif" }}>
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
                  {selectedEmail.link && (
                    <div style={{ marginTop: 15 }}>
                      <a href={selectedEmail.link} target="_blank" rel="noreferrer" style={{ color: "blue", textDecoration: "underline" }}>Read full article on Al Jazeera</a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#808080", fontSize: 11 }}>
                No message selected.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: 22, background: "var(--w98-gray)", borderTop: "1px solid #808080", display: "flex", alignItems: "center", padding: "0 6px", fontSize: 11 }}>
        <div style={{ flex: 1 }}>{isLoading ? "Working Online..." : `${emails.length} message(s)`}</div>
        <div style={{ width: 1, height: 16, background: "#808080", margin: "0 6px", borderRight: "1px solid #fff" }} />
        <div style={{ width: 120, display: "flex", alignItems: "center", gap: 4 }}>
          <WinIcon icon="status/16/online.png" size={14} />
          <span>Working Online</span>
        </div>
      </div>

      <style>{`
        .oe-tool-btn:hover { background: #dfdfdf; box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080; }
        .oe-tool-btn:active { transform: translate(1px, 1px); box-shadow: inset 1px 1px 0 #808080; }
      `}</style>
    </div>
  );
}
