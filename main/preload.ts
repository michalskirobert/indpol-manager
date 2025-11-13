import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onToast: (
    callback: (payload: {
      type: "success" | "error" | "info";
      message: string;
    }) => void,
  ) => {
    ipcRenderer.on("toast", (_event, payload) => callback(payload));
  },
  removeToastListener: (callback: (...args: any[]) => void) => {
    ipcRenderer.removeListener("toast", callback);
  },
});
