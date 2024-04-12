const { app, BrowserWindow } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 700, //700
    height: 450, //450
    resizable: false,
    fullscreenable: false,
    icon: path.join(__dirname, "logo.png"),
    webPreferences: {
      preload: MAIN_WINDOW_WEBPACK_ENTRY,
      // Установка более строгой политики безопасности контента
      sandbox: true,
      nodeIntegration: true,
      contextIsolation: true,
      // Другие настройки безопасности...
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("Менеджер и генератор паролей");
  //mainWindow.webContents.openDevTools(); //Консоль

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
