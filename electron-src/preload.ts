/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, IpcRenderer } from "electron";
import { contextBridge } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
    }
  }
}

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer;
});

