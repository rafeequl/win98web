import React, { useState } from "react";
import WinIcon from "../../Common/WinIcon";

const PLAYLIST = [
  { id: "miZHa7ZC6Z0", title: "Windows 95/98 Sound Check", artist: "Microsoft / Brian Eno", duration: "0:06" },
  { id: "gJLIiF15wjQ", title: "Wannabe", artist: "Spice Girls", duration: "2:52" },
  { id: "ZyhrYis509A", title: "Barbie Girl", artist: "Aqua", duration: "3:16" },
  { id: "C-u5WLJ9Yk4", title: "...Baby One More Time", artist: "Britney Spears", duration: "3:56" },
  { id: "hTWKbfoikeg", title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "4:38" },
  { id: "6M6samPmcX8", title: "Everybody (Backstreet's Back)", artist: "Backstreet Boys", duration: "4:00" },
  { id: "TR3Vdo5etCQ", title: "Don't Speak", artist: "No Doubt", duration: "4:23" },
  { id: "y6120QOlsfU", title: "Sandstorm", artist: "Darude", duration: "3:43" },
];

export default function WindowsMediaPlayer() {
  const [currentTrack, setCurrentTrack] = useState(PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(80);

  const togglePlay = () => {
    if (!hasStarted) setHasStarted(true);
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (track) => {
    setCurrentTrack(track);
    setHasStarted(true);
    setIsPlaying(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", userSelect: "none", overflow: "hidden" }}>
      {/* Menu Bar */}
      <div style={{ display: "flex", gap: 8, padding: "2px 6px", fontSize: 11, borderBottom: "1px solid #fff", borderTop: "1px solid #fff", marginBottom: 1 }}>
        {["File", "View", "Play", "Favorites", "Go", "Help"].map(m => (
          <span key={m} style={{ padding: "1px 4px", cursor: "default" }}>{m}</span>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: 4, gap: 4 }}>
        {/* Main Player Area */}
        <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Video / Visualizer Area */}
          <div className="inset" style={{ flex: 1, background: "#000", position: "relative", overflow: "hidden", border: "2px inset" }}>
            {!hasStarted ? (
              <div style={{
                width: "100%", height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg, #000, #000033)"
              }}>
                <WinIcon icon="apps/32/mplayer.png" size={64} style={{ marginBottom: 15, opacity: 0.8 }} />
                <div style={{ color: "var(--w98-blue)", fontSize: 18, fontWeight: "bold", fontFamily: "serif", fontStyle: "italic" }}>
                  Windows Media Player
                </div>
                <div style={{ color: "#808080", fontSize: 11, marginTop: 10 }}>Ready to play. Selection required.</div>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}&controls=1`}
                title="WMP Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ display: "block" }}
              />
            )}
          </div>

          {/* Now Playing Bar */}
          <div className="inset" style={{ height: 42, background: "#000", color: "#00ff00", padding: "4px 8px", fontSize: 11, fontFamily: "monospace", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {!hasStarted ? "Windows Media Player" : `${isPlaying ? "▶" : "‖"} ${currentTrack.artist} - ${currentTrack.title}`}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>{hasStarted ? `00:00 / ${currentTrack.duration}` : "00:00 / 00:00"}</span>
              <span style={{ fontSize: 9 }}>STEREO / 44.1kHz</span>
            </div>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className="inset" style={{ flex: 1, width: 220, background: "#fff", display: "flex", flexDirection: "column", border: "2px inset" }}>
          <div style={{ padding: "4px 6px", background: "var(--w98-blue)", color: "#fff", fontWeight: "bold", fontSize: 11, display: "flex", justifyContent: "space-between" }}>
            <span>Playlist</span>
            <span>Tracks: {PLAYLIST.length}</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", background: "#f0f0f0" }}>
            {PLAYLIST.map(track => (
              <div
                key={track.id}
                onClick={() => selectTrack(track)}
                style={{
                  padding: "6px 8px",
                  fontSize: 10,
                  cursor: "default",
                  background: currentTrack.id === track.id ? "#000080" : "transparent",
                  color: currentTrack.id === track.id ? "#fff" : "#000",
                  borderBottom: "1px solid #dfdfdf",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {track.title}
                </div>
                <div style={{ marginLeft: 8, opacity: 0.7 }}>{track.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div style={{ height: 68, background: "var(--w98-gray)", padding: "4px 10px", display: "flex", alignItems: "center", borderTop: "2px solid #fff" }}>
        {/* Playback Controls */}
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <div className="btn98" onClick={togglePlay} style={{ minWidth: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <WinIcon icon={isPlaying ? "actions/24/media-playback-pause.png" : "actions/24/media-playback-start.png"} size={22} fallback={isPlaying ? "⏸️" : "▶️"} />
          </div>
          <div className="btn98" onClick={() => { setIsPlaying(false); setHasStarted(false); }} style={{ minWidth: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <WinIcon icon="actions/24/media-playback-stop.png" size={22} fallback="⏹️" />
          </div>
          <div style={{ width: 1, height: 32, background: "#808080", margin: "0 6px", borderRight: "1px solid #fff" }} />
          <div className="btn98" style={{ minWidth: 30, height: 30, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <WinIcon icon="actions/24/media-skip-backward.png" size={18} fallback="⏮️" />
          </div>
          <div className="btn98" style={{ minWidth: 30, height: 30, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <WinIcon icon="actions/24/media-skip-forward.png" size={18} fallback="⏭️" />
          </div>
        </div>

        {/* Seek Bar */}
        <div style={{ flex: 1, margin: "0 16px", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ height: 12, background: "#fff", border: "1px solid #808080", position: "relative", boxShadow: "inset 1px 1px 0 #000" }}>
            <div style={{ position: "absolute", left: isPlaying ? "45%" : "0%", top: -3, width: 10, height: 16, background: "var(--w98-gray)", border: "1px solid #000", boxShadow: "1px 1px 0 #fff" }} />
          </div>
        </div>

        {/* Volume & Viz icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <WinIcon icon="status/16/audio-volume-high.png" size={16} fallback="🔊" />
          <div style={{ width: 80, height: 8, background: "#fff", border: "1px solid #808080", position: "relative" }}>
            <div style={{ position: "absolute", left: `${volume}%`, top: -5, width: 8, height: 16, background: "var(--w98-gray)", border: "1px solid #000" }} />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: 22, background: "var(--w98-gray)", borderTop: "1px solid #808080", padding: "0 8px", display: "flex", alignItems: "center", fontSize: 11 }}>
        <div style={{ flex: 1 }}>{currentTrack.title} - Windows Media Player</div>
        <div style={{ width: 1, height: 16, background: "#808080", margin: "0 6px", borderRight: "1px solid #fff" }} />
        <div style={{ width: 100 }}>{hasStarted && isPlaying ? "Playing..." : "Stopped"}</div>
      </div>

      <style>{`
        .btn98:hover { background: #dfdfdf !important; }
        .btn98:active { box-shadow: inset 2px 2px 0 #808080, inset -1px -1px 0 #fff !important; padding: 1px 0 0 1px !important; }
      `}</style>
    </div>
  );
}
