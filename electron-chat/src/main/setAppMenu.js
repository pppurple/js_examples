import { app, Menu } from "electron";
import createWindow from "./createWindow";

function setAppMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        { label: "New Window", accelerator: "CmdOrCtrl+N", click: createWindow },
        { type: "separator" },
        { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
        },
        {
          label: "Toggle DevTools",
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: (item, focusedWindow) => focusedWindow && focusedWindow.toggleDevTools()
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });

    template.push({
      role: "window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" }
      ]
    });
  }

  const appMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(appMenu);
}

export default setAppMenu;