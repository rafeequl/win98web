import React from "react";

export default function WinIcon({ icon, size = 32, style = {}, fallback = null }) {
  const [error, setError] = React.useState(false);

  if (!icon || error) {
    if (fallback) {
      return (
        <span style={{
          fontSize: size * 0.8,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          ...style
        }}>
          {fallback}
        </span>
      );
    }
    if (!icon) return null;
  }

  // If it's a small emoji/character
  if (icon.length < 5) {
    return (
      <span style={{
        fontSize: size,
        filter: "drop-shadow(1px 1px 0 rgba(0,0,0,.5))",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        ...style
      }}>
        {icon}
      </span>
    );
  }

  // Build the source path using Vite's base URL environment variable
  const base = import.meta.env.BASE_URL || "/";
  let src = icon;

  if (icon.startsWith('http')) {
    src = icon;
  } else {
    // If icon is "apps/32/foo.png" -> "/base/icons/apps/32/foo.png"
    // If icon is "/icons/apps/32/foo.png" -> "/base/icons/apps/32/foo.png"
    const pathOnly = icon.startsWith('/icons/') ? icon.substring(7) : (icon.startsWith('icons/') ? icon.substring(6) : icon);
    src = `${base}icons/${pathOnly}`.replace(/\/+/g, '/');
  }

  return (
    <img
      src={src}
      alt="icon"
      onError={() => setError(true)}
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        objectFit: "contain",
        ...style
      }}
    />
  );
}
