import MyComputerWindow from "../components/Apps/MyComputer/MyComputer";
import MyDocumentsWindow from "../components/Apps/MyDocuments/MyDocuments";
import NotepadWindow from "../components/Apps/Notepad/Notepad";
import IconPicker from "../components/Apps/IconPicker/IconPicker";
import DisplayProperties from "../components/Apps/DisplayProperties/DisplayProperties";
import Minesweeper from "../components/Apps/Minesweeper/Minesweeper";

export const DESKTOP_ICONS = [
  {
    id: "my-documents",
    label: "My Documents",
    icon: "places/32/folder.png",
    defaultSize: { width: 500, height: 350 },
    component: MyDocumentsWindow,
  },
  {
    id: "my-computer",
    label: "My Computer",
    icon: "devices/32/computer.png",
    defaultSize: { width: 480, height: 320 },
    component: MyComputerWindow,
  },
  {
    id: "notepad",
    label: "Notepad",
    icon: "apps/32/accessories-text-editor.png",
    defaultSize: { width: 500, height: 400 },
    component: NotepadWindow
  },
  {
    id: "minesweeper",
    label: "Minesweeper",
    icon: "apps/32/mines.png",
    defaultSize: { width: 200, height: 260 },
    component: Minesweeper
  },
  {
    id: "display-props",
    label: "Display Properties",
    icon: "apps/32/kcontrol.png",
    defaultSize: { width: 400, height: 300 },
    component: DisplayProperties,
  },
  {
    id: "icon-picker",
    label: "Icon Finder",
    icon: "apps/32/imageviewer.png",
    defaultSize: { width: 600, height: 450 },
    component: IconPicker,
  }
];

export const SYSTEM_ITEMS = [
  { label: "Help", icon: "apps/16/help.png" },
  { label: "Run...", icon: "actions/16/system-run.png" },
  { label: "Shut Down...", icon: "actions/16/system-shutdown.png" },
];
