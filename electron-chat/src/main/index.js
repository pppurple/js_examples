import { app } from "electron";
import createWindow from "./createWindow";
import setAppMenu from "./setAppMenu";

app.on("ready", () => {
  setAppMenu();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});