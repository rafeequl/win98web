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

  // If it's a path
  const src = icon.startsWith('/') ? icon : `/icons/${icon}`;

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
