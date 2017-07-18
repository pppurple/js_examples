import { app, shell } from "electron";
import createFileManager from "./createFileManager";
import trimDesktop from "./trimDesktop";
import createCaptureWindow from "./createCaptureWindow";
import createPreviewWindow from "./createPreviewWindow";

let captureWindow;

function captureAndPost() {
  const fileManager = createFileManager();
  return trimDesktop()
    .then(captureWindow.capture.bind(captureWindow))
    .then(image => {
      const createdFilename = fileManager.writeImage(app.getPath("temp"), image);
      return createdFilename;
    })
    .then(filename => {
      const win = createPreviewWindow({ filename });
      win.once("DONE_TWEET", ({ url }) => {
        shell.openExternal(url);
        win.close();
        if (process.platform !== "darwin") {
          app.quit();
        }
      });
    })
}

app.on("ready", () => {
  // trimDesktop().then(({sourceDisplay, trimmedBounds}) => {
    // console.log(sourceDisplay, trimmedBounds);
  // });
  captureWindow = createCaptureWindow();
  captureAndPost();
});