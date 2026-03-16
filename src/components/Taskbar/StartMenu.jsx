import React, { useState, useRef, useEffect } from "react";
import { DESKTOP_ICONS, START_MENU_ITEMS, SYSTEM_ITEMS } from "../../config/apps";
import WinIcon from "../Common/WinIcon";

function SubMenu({ items, onOpenWindow, onClose, position }) {
  return (
    <div
      className="panel"
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: 180,
        zIndex: 100000,
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "2px 2px 0 #000",
        padding: "2px 0",
      }}
    >
      {items.map((item, idx) => (
        <StartItem
          key={item.id || item.label || idx}
          item={item}
          onOpenWindow={onOpenWindow}
          onClose={onClose}
          isSubmenu
        />
      ))}
    </div>
  );
}

function StartItem({ item, onOpenWindow, onClose, isSubmenu = false }) {
  const [hover, setHover] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const timeoutRef = useRef(null);
  const itemRef = useRef(null);

  const hasSubmenu = !!item.items;

  const handleMouseEnter = () => {
    setHover(true);
    if (hasSubmenu) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowSub(true);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (hasSubmenu) {
      timeoutRef.current = setTimeout(() => {
        setShowSub(false);
      }, 100);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (hasSubmenu) {
      setShowSub(!showSub);
      return;
    }

    if (item.id) {
      const fullApp = DESKTOP_ICONS.find(a => a.id === item.id);
      if (fullApp) {
        onOpenWindow(fullApp);
      }
    } else if (item.onClick) {
      item.onClick();
    }
    onClose();
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        cursor: "default",
        background: hover ? "var(--w98-blue)" : "transparent",
        color: hover ? "#fff" : "inherit",
        position: "relative",
        fontSize: 11,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <WinIcon icon={item.icon} size={22} style={{ width: 22, flexShrink: 0 }} />
        <span>{item.label}</span>
      </div>
      {hasSubmenu && (
        <span style={{ fontSize: 10, marginLeft: 8 }}>▶</span>
      )}

      {showSub && hasSubmenu && (
        <SubMenu
          items={item.items}
          onOpenWindow={onOpenWindow}
          onClose={onClose}
          position={{ left: "100%", top: -2 }}
        />
      )}
    </div>
  );
}

export default function StartMenu({ onClose, onOpenWindow, onShutdown }) {
  return (
    <div
      className="panel"
      onClick={e => e.stopPropagation()}
      style={{
        position: "absolute",
        bottom: "calc(var(--w98-taskbar-h) + 2px)",
        left: 2,
        width: 170, // Slightly narrower for classic look
        display: "flex",
        flexDirection: "row",
        zIndex: 99999,
        border: "2px solid",
        borderColor: "#fff #404040 #404040 #fff",
        boxShadow: "2px 2px 0 #000",
        animation: "slideUp .08s ease-out",
      }}
    >
      {/* Banner */}
      <div style={{
        width: 24,
        background: "linear-gradient(to top, #000080 0%, #4682b4 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 8,
        flexShrink: 0,
        borderRight: "1px solid #808080",
        boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000"
      }}>
        <div style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontFamily: "'MS Sans Serif', Arial, sans-serif",
          fontSize: 14,
          fontWeight: "bold",
          letterSpacing: "0.5px"
        }}>
          <span>Windows</span>
          <span style={{ color: "#c0c0c0", fontSize: 16, marginLeft: "-2px" }}>98</span>
        </div>
      </div>

      {/* Main Items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "2px 0" }}>
        {START_MENU_ITEMS.map((item, idx) => (
          <React.Fragment key={item.id || item.label || idx}>
            <StartItem
              item={item}
              onOpenWindow={onOpenWindow}
              onClose={onClose}
            />
            {/* Add separator after Programs, Documents, Settings, Find */}
            {["Programs", "Find"].includes(item.label) && (
              <div style={{ margin: "3px 4px", height: 1, background: "var(--w98-dgray)", borderBottom: "1px solid #fff" }} />
            )}
          </React.Fragment>
        ))}

        <div style={{ margin: "auto 4px 3px", height: 1, background: "var(--w98-dgray)", borderBottom: "1px solid #fff" }} />

        <StartItem
          item={{ label: "Log Off...", icon: "actions/16/system-log-out.png" }}
          onOpenWindow={onOpenWindow}
          onClose={onClose}
        />
        <StartItem
          item={{ label: "Shut Down...", icon: "actions/16/system-shutdown.png", onClick: onShutdown }}
          onOpenWindow={onOpenWindow}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
