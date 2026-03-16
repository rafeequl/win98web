# 📟 Win98 Web: The Retro Desktop Experience

Welcome to **Win98 Web**, where we've painstakingly recreated the aesthetic and soulful "clunkiness" of a 1998 computing masterpiece, but powered by the lightning-fast modern web stack.

> "It's not a bug, it's a nostalgic feature." — *Every dev ever.*

---

## ✨ Features

- **📂 Multi-Window Management**: Open, drag, resize, and close apps just like it's 1998.
- **💾 Memory Persistance**: Our windows actually remember how big they were when you minimize them (we fixed that one bug Bill missed).
- **🕹️ Authentic Taskbar**: A functional taskbar with a Start Menu, system clock, and active window management.
- **🖼️ Pixel-Perfect UI**: CSS-driven 3D borders and linear gradients that scream "State of the Art" (circa 20th century).
- **🚀 Built with Vite**: Starts faster than a real Win98 machine can even find its floppy drive.

---

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Styling**: Vanilla CSS (The way the ancients intended)
- **Hooks**: Custom `useWindows` state manager
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## ⚡ Quick Start

Get up and running before your dial-up connection drops:

```bash
# Clone this artifact from the past
git clone [your-repo-url]

# Install dependencies (no CD-ROM required)
npm install

# Boost into the OS
npm run dev
```

---

## 🖥️ Project Structure

- `src/hooks/useWindows.js`: The "Kernel" — manages window lifecycles and state.
- `src/components/Window/WindowShell.jsx`: The "Shell" — handles the dragging, resizing, and maximizing logic.
- `src/styles/win98.css`: The "Gutter" — where all the beautiful gray-scale gradients live.
- `src/config/apps.js`: The "Registry" — where you define your shortcut icons and default window sizes.

---

## 🤝 Contributing

Found a security hole? It's probably just a legacy feature. Want to add a new app? Drop it into `src/components/Apps/` and register it in `src/config/apps.js`. 

*Note: Please ensure all code is written while listening to Vaporwave.*

---

## 📜 License

MIT (Mostly Incredible Technology).

---

<p align="center">
  <b>Safe to Turn Off Your Computer?</b><br>
  No, keep coding.
</p>
