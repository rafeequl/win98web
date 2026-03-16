import React, { useState, useEffect, useCallback, useRef } from "react";
import WinIcon from "../../Common/WinIcon";

const GRID_SIZE = 9;
const MINE_COUNT = 10;

export default function Minesweeper() {
  const [grid, setGrid] = useState([]);
  const [status, setStatus] = useState("playing"); // playing, won, lost
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const initGrid = useCallback((firstClickIdx = null) => {
    let newGrid = Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, i) => ({
      id: i,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }));

    // Place mines, avoiding the first click and its neighbors if possible
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const idx = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[idx].isMine && idx !== firstClickIdx) {
        newGrid[idx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    newGrid.forEach((cell, i) => {
      if (cell.isMine) return;
      const r = Math.floor(i / GRID_SIZE);
      const c = i % GRID_SIZE;
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
            if (newGrid[nr * GRID_SIZE + nc].isMine) neighbors++;
          }
        }
      }
      cell.neighborMines = neighbors;
    });

    return newGrid;
  }, []);

  const startNewGame = useCallback(() => {
    setGrid(initGrid());
    setStatus("playing");
    setMinesLeft(MINE_COUNT);
    setTimer(0);
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, [initGrid]);

  useEffect(() => {
    startNewGame();
    return () => clearInterval(timerRef.current);
  }, [startNewGame]);

  const reveal = (idx) => {
    if (status !== "playing" || grid[idx].isRevealed || grid[idx].isFlagged) return;

    let newGrid = [...grid];

    // Start timer on first move
    if (!timerRef.current) {
      timerRef.current = setInterval(() => setTimer(t => Math.min(t + 1, 999)), 1000);
    }

    if (newGrid[idx].isMine) {
      // Game Over
      newGrid.forEach(cell => { if (cell.isMine) cell.isRevealed = true; });
      setGrid(newGrid);
      setStatus("lost");
      clearInterval(timerRef.current);
      return;
    }

    const revealRecursive = (i) => {
      if (newGrid[i].isRevealed || newGrid[i].isFlagged) return;
      newGrid[i].isRevealed = true;
      if (newGrid[i].neighborMines === 0 && !newGrid[i].isMine) {
        const r = Math.floor(i / GRID_SIZE);
        const c = i % GRID_SIZE;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              revealRecursive(nr * GRID_SIZE + nc);
            }
          }
        }
      }
    };

    revealRecursive(idx);

    // Check Win
    const remaining = newGrid.filter(c => !c.isRevealed && !c.isMine).length;
    if (remaining === 0) {
      setStatus("won");
      clearInterval(timerRef.current);
    }

    setGrid(newGrid);
  };

  const toggleFlag = (e, idx) => {
    e.preventDefault();
    if (status !== "playing" || grid[idx].isRevealed) return;
    const newGrid = [...grid];
    newGrid[idx].isFlagged = !newGrid[idx].isFlagged;
    setMinesLeft(prev => newGrid[idx].isFlagged ? prev - 1 : prev + 1);
    setGrid(newGrid);
  };

  const SevenSeg = ({ val }) => (
    <div style={{
      background: "#000",
      color: "#f00",
      fontFamily: "VT323, monospace",
      fontSize: 24,
      padding: "0 4px",
      width: 45,
      textAlign: "right",
      border: "1px inset #fff",
      lineHeight: 1
    }}>
      {val.toString().padStart(3, "0")}
    </div>
  );

  return (
    <div style={{ padding: 10, background: "var(--w98-gray)", userSelect: "none" }}>
      <div className="panel" style={{ padding: 6, display: "flex", flexDirection: "column", gap: 6, width: "fit-content", margin: "0 auto", border: "3px solid", borderColor: "#fff #808080 #808080 #fff" }}>

        {/* Header (Score/Timer) */}
        <div className="inset" style={{ padding: 4, display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--w98-gray)" }}>
          <SevenSeg val={minesLeft} />
          <button
            onClick={startNewGame}
            className="btn98"
            style={{ minWidth: 26, height: 26, padding: 0, fontSize: 16 }}
          >
            {status === "lost" ? "😵" : status === "won" ? "🕶️" : "🙂"}
          </button>
          <SevenSeg val={timer} />
        </div>

        {/* Board */}
        <div className="inset" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 16px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 16px)`,
          border: "3px solid",
          borderColor: "#808080 #fff #fff #808080",
          background: "#bdbdbd"
        }}>
          {grid.map((cell, i) => (
            <div
              key={i}
              onMouseDown={(e) => e.button === 0 ? reveal(i) : toggleFlag(e, i)}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                width: 16,
                height: 16,
                fontSize: 10,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
                ...(cell.isRevealed
                  ? { border: "1px solid #7b7b7b", background: "#bdbdbd" }
                  : { border: "2px solid", borderColor: "#fff #7b7b7b #7b7b7b #fff" }
                ),
                color: [null, "blue", "green", "red", "darkblue", "darkred", "teal", "black", "gray"][cell.neighborMines]
              }}
            >
              {cell.isRevealed ? (
                cell.isMine ? <WinIcon icon="status/16/dialog-warning.png" size={12} /> : (cell.neighborMines || "")
              ) : (
                cell.isFlagged ? "🚩" : ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
