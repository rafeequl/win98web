import React, { useState, useRef, useEffect } from "react";
import WinIcon from "../../Common/WinIcon";

const COLORS = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#808040", "#004040", "#0080ff", "#004080", "#4000ff", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff0080", "#ff8040"
];

const TOOLS = [
  { id: "select-free", icon: "actions/16/edit-select.png", fallback: "✂️", label: "Free-Form Select" },
  { id: "select", icon: "actions/16/edit-select.png", fallback: "⬜", label: "Select" },
  { id: "eraser", icon: "actions/16/edit-clear.png", fallback: "🧼", label: "Eraser" },
  { id: "fill", icon: "actions/16/format-justify-fill.png", fallback: "🪣", label: "Fill With Color" },
  { id: "picker", icon: "actions/16/color-picker.png", fallback: "🧪", label: "Pick Color" },
  { id: "zoom", icon: "actions/16/gtk-zoom-in.png", fallback: "🔍", label: "Magnifier" },
  { id: "pencil", icon: "actions/16/document-edit.png", fallback: "✏️", label: "Pencil" },
  { id: "brush", icon: "categories/16/applications-painting.png", fallback: "🖌️", label: "Brush" },
  { id: "airbrush", icon: "actions/16/actions-painting.png", fallback: "💨", label: "Airbrush" },
  { id: "text", icon: "actions/16/insert-text.png", fallback: "𝐀", label: "Text" },
  { id: "line", icon: "actions/16/segment-line.png", fallback: "╱", label: "Line" },
  { id: "curve", icon: "actions/16/curve.png", fallback: "〰️", label: "Curve" },
  { id: "rect", icon: "apps/16/drawing.png", fallback: "▭", label: "Rectangle" },
  { id: "poly", icon: "apps/16/drawing.png", fallback: "⬠", label: "Polygon" },
  { id: "ellipse", icon: "apps/16/drawing.png", fallback: "◌", label: "Ellipse" },
  { id: "roundrect", icon: "apps/16/drawing.png", fallback: "▢", label: "Rounded Rectangle" },
];

export default function Paint() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [tool, setTool] = useState("pencil");
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(2);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Ensure transparent background is white by default
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const pos = getMousePos(e);
    lastPos.current = pos;
    setIsDrawing(true);

    if (tool === "picker") {
      const ctx = canvasRef.current.getContext("2d");
      const pixel = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      const hex = "#" + ("000000" + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16)).slice(-6);
      setColor(hex);
      setTool("pencil");
      setIsDrawing(false);
    }
  };

  const draw = (e) => {
    if (!isDrawing || tool === "picker") return;
    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? secondaryColor : color;

    let currentWidth = brushSize;
    if (tool === "brush") currentWidth = brushSize * 4;
    if (tool === "eraser") currentWidth = brushSize * 8;

    ctx.lineWidth = currentWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", userSelect: "none" }}>
      {/* Menu bar */}
      <div style={{ display: "flex", gap: 10, padding: "2px 8px", fontSize: 11, borderBottom: "1px solid #fff", borderTop: "1px solid #fff", marginBottom: 2 }}>
        {["File", "Edit", "View", "Image", "Colors", "Help"].map(m => (
          <span key={m} style={{ cursor: "default" }}>{m}</span>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", padding: "2px 4px", gap: 4, overflow: "hidden" }}>
        {/* Toolbox */}
        <div style={{ width: 56, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#dfdfdf",
            border: "1px solid",
            borderColor: "#808080 #fff #fff #808080",
            padding: 1
          }}>
            {TOOLS.map(t => (
              <div
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`btn98 ${tool === t.id ? 'pressed' : ''}`}
                style={{
                  width: 25,
                  height: 25,
                  minWidth: 25,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: tool === t.id ? "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAD0lEQVQImWNgYGBoYGAEAAMBAGAAtW60AAAAAElFTkSuQmCC)" : "var(--w98-gray)",
                  boxShadow: tool === t.id ? "inset 1px 1px 0 #000, 1px 1px 0 #fff" : undefined
                }}
                title={t.label}
              >
                <WinIcon icon={t.icon} size={16} fallback={t.fallback} />
              </div>
            ))}
          </div>

          {/* Tool Options Area */}
          <div className="inset" style={{
            width: 52,
            height: 64,
            background: "var(--w98-gray)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px inset #fff"
          }}>
            {(tool === "brush" || tool === "eraser" || tool === "pencil") && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[1, 3, 5].map(s => (
                  <div
                    key={s}
                    onClick={() => setBrushSize(s)}
                    style={{
                      width: s + 4,
                      height: s + 4,
                      background: "#000",
                      borderRadius: tool === "brush" ? "50%" : "0",
                      opacity: brushSize === s ? 1 : 0.4,
                      cursor: "pointer",
                      border: brushSize === s ? "1px solid #fff" : "1px solid transparent"
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area Container */}
        <div className="inset" style={{
          flex: 1,
          background: "var(--w98-dgray)",
          overflow: "auto",
          display: "flex",
          padding: 4,
          border: "2px solid",
          borderColor: "#808080 #fff #fff #808080"
        }}>
          {/* The white drawing surface */}
          <div style={{ background: "#fff", padding: 0, boxShadow: "1px 1px 0 #fff", margin: "auto" }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{
                background: "#fff",
                cursor: "crosshair", // Universal Paint cursor
                display: "block"
              }}
            />
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div style={{
        height: 48,
        background: "var(--w98-gray)",
        padding: "4px 8px",
        display: "flex",
        gap: 12,
        borderTop: "2px solid #fff",
        alignItems: "center"
      }}>
        {/* Selected Colors Preview */}
        <div style={{
          width: 32,
          height: 32,
          background: "var(--w98-gray)",
          position: "relative",
          boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #fff"
        }}>
          {/* Background color (secondary) */}
          <div style={{
            position: "absolute",
            bottom: 3,
            right: 3,
            width: 16,
            height: 16,
            background: secondaryColor,
            border: "1px solid #808080",
            boxShadow: "inset 1px 1px 0 #fff",
            zIndex: 1
          }} />
          {/* Foreground color (primary) */}
          <div style={{
            position: "absolute",
            top: 3,
            left: 3,
            width: 16,
            height: 16,
            background: color,
            border: "1px solid #808080",
            boxShadow: "inset 1px 1px 0 #fff",
            zIndex: 2
          }} />
        </div>

        {/* Colors Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 16px)", gridTemplateRows: "repeat(2, 16px)", gap: 1 }}>
          {COLORS.map(c => (
            <div
              key={c}
              onClick={() => setColor(c)}
              onContextMenu={(e) => { e.preventDefault(); setSecondaryColor(c); }}
              style={{
                background: c,
                width: 16,
                height: 16,
                border: "1px solid",
                borderColor: "#808080 #fff #fff #808080",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2)"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
