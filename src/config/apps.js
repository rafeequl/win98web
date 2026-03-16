import MyComputerWindow from "../components/Apps/MyComputer/MyComputer";
import MyDocumentsWindow from "../components/Apps/MyDocuments/MyDocuments";
import NotepadWindow from "../components/Apps/Notepad/Notepad";
import IconPicker from "../components/Apps/IconPicker/IconPicker";
import DisplayProperties from "../components/Apps/DisplayProperties/DisplayProperties";
import Minesweeper from "../components/Apps/Minesweeper/Minesweeper";
import Paint from "../components/Apps/Paint/Paint";
import InternetExplorer from "../components/Apps/InternetExplorer/InternetExplorer";

export const DESKTOP_ICONS = [
  {
    id: "internet-explorer",
    label: "Internet Explorer",
    icon: "apps/32/internet-web-browser.png",
    defaultSize: { width: 700, height: 500 },
    component: InternetExplorer
  },
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
    id: "paint",
    label: "Paint",
    icon: "apps/32/kolourpaint.png",
    defaultSize: { width: 640, height: 480 },
    component: Paint
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

export const START_MENU_ITEMS = [
  { id: "internet-explorer", label: "Internet Explorer", icon: "apps/16/web-browser.png" },
  { label: "Outlook Express", icon: "apps/16/internet-mail.png" },
  {
    label: "Programs",
    icon: "categories/16/applications-all.png",
    items: [
      {
        label: "Accessories",
        icon: "categories/16/applications-accessories.png",
        items: [
          { id: "paint", label: "Paint", icon: "apps/16/kolourpaint.png" },
          { id: "notepad", label: "Notepad", icon: "apps/16/accessories-text-editor.png" },
        ]
      },
      {
        label: "Games",
        icon: "categories/16/applications-games.png",
        items: [
          { id: "minesweeper", label: "Minesweeper", icon: "apps/16/mines.png" },
        ]
      }
    ]
  },
  { id: "my-documents", label: "My Documents", icon: "places/16/folder-documents.png" },
  { label: "Settings", icon: "categories/16/applications-system.png" },
  { label: "Find", icon: "actions/16/find.png" },
  { label: "Help", icon: "apps/16/help.png" },
  { label: "Run...", icon: "actions/16/system-run.png" },
];
