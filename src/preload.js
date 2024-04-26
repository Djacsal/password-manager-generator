// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveToStorage: (site, login, password) =>
    ipcRenderer.invoke("save-to-storage", site, login, password),
  readEncryptedPasswords: () => ipcRenderer.invoke("read-to-storage"),
  decryptedPassword: (password) =>
    ipcRenderer.invoke("decrypt-password", password),
});
