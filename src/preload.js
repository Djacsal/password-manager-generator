// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  AuthenticateUser: (email, password) =>
    ipcRenderer.invoke("authenticate-user", email, password),

  AddUser: (login, email, password) =>
    ipcRenderer.invoke("add-user", login, email, password),

  CheckIfEmailExists: (email) => ipcRenderer.invoke("check-email", email),

  AddEntries: (name, login, password, url) =>
    ipcRenderer.invoke("add-entries", name, login, password, url),

  GetEntries: () => ipcRenderer.invoke("get-entries"),

  FindByName: (name) => ipcRenderer.invoke("find-entries", name),

  ShowRecordContent: () => ipcRenderer.invoke("show-record-content"),

  UpdateEntries: (id, name, login, password, url) =>
    ipcRenderer.invoke("update-entries", id, name, login, password, url),

  GetUserData: () => ipcRenderer.invoke("get-user-data"),

  UpdateUser: (login, email, password) =>
    ipcRenderer.invoke("update-user", login, email, password),

  openInBrowser: (url) => ipcRenderer.invoke("open-in-browser", url),
});
