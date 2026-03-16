# 📟 Win98 Web: The Retro Desktop Experience

Welcome to **Win98 Web**, it's a time machine to the 90s.

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
git clone git@github.com:rafeequl/win98web.git

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


---

## 📜 License

MIT


