import MyComputerWindow from "../components/Apps/MyComputer/MyComputer";
import MyDocumentsWindow from "../components/Apps/MyDocuments/MyDocuments";
import NotepadWindow from "../components/Apps/Notepad/Notepad";

export const DESKTOP_ICONS = [
  {
    id: "my-documents",
    label: "My Documents",
    icon: "📁",
    defaultSize: { width: 500, height: 350 },
    component: MyDocumentsWindow,
  },
  {
    id: "my-computer",
    label: "My Computer",
    icon: "💻",
    defaultSize: { width: 480, height: 320 },
    component: MyComputerWindow,
  },
  { 
    id: "notepad", 
    label: "Notepad", 
    icon: "📝", 
    defaultSize: { width: 500, height: 400 }, 
    component: NotepadWindow 
  },
];

export const SYSTEM_ITEMS = [
  { label: "Help", icon: "❓" },
  { label: "Run...", icon: "🏃" },
  { label: "Shut Down...", icon: "⏻" },
];
