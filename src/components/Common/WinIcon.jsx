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
    // Standardize path: remove double slashes and ensure it starts with /base/icons/
    const cleanIcon = icon.startsWith('/') ? icon.slice(1) : icon;
    const path = cleanIcon.startsWith('icons/') ? cleanIcon : `icons/${cleanIcon}`;
    src = (base + path).replace(/\/+/g, '/');
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
