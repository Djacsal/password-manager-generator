import { app, BrowserWindow, ipcMain } from "electron";
import { safeStorage } from "electron";

const fs = require("fs");
const path = require("path");

const encryptPassword = (password) => {
  if (safeStorage.isEncryptionAvailable()) {
    return safeStorage.encryptString(password);
  } else {
    console.error("Шифрование недоступно");
    return null;
  }
};

const saveToStorage = (site, login, password) => {
  const encryptedPassword = encryptPassword(password); // Предполагается, что encryptPassword - это ваша функция для шифрования пароля
  if (encryptedPassword) {
    // Получение пути к директории userData
    const userDataPath = app.getPath("userData");
    // Создание пути к файлу в директории userData
    const filePath = path.join(userDataPath, "encryptedData.json");

    let data;
    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(fileData);
    } catch (err) {
      data = [];
    }

    // Создание объекта с информацией о сайте, логине и зашифрованном пароле
    const newEntry = {
      site: site,
      login: login,
      encryptedPassword: encryptedPassword,
    };

    data.push(newEntry);

    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
  }
};

// Функция для чтения зашифрованных паролей из файла в директории userData
const readEncryptedPasswords = () => {
  // Получение пути к директории userData
  const userDataPath = app.getPath("userData");
  // Создание пути к файлу в директории userData
  const filePath = path.join(userDataPath, "encryptedData.json");
  let data;
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileData);
  } catch (err) {
    console.error("Ошибка при чтении файла:", err);
    data = [];
  }
  return data;
};

const decryptPassword = (password) => {
  return safeStorage.decryptString(password);
};

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
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // Установка более строгой политики безопасности контента
      sandbox: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("Менеджер и генератор паролей");
  mainWindow.webContents.openDevTools(); //Консоль

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("save-to-storage", async (event, site, login, password) => {
    const encryptedPassword = saveToStorage(site, login, password);
    return encryptedPassword;
  });

  ipcMain.handle("read-to-storage", async (event) => {
    const read = readEncryptedPasswords();
    return read;
  });

  ipcMain.handle("decrypt-password", async (event, password) => {
    const decrypt = decryptPassword(password);
    return decrypt;
  });

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
