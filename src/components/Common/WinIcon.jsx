import React from "react";

export default function WinIcon({ icon, size = 32, style = {} }) {
  if (!icon) return null;

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
