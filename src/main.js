import { app, BrowserWindow, ipcMain, safeStorage, shell } from "electron";
//import { AuthenticateUser } from "./helpers/AuthenticateUser";
//import { AddEntries } from "./helpers/AddEntries";
//import { AddUser } from "./helpers/AddUser";
//import { FindByName } from "./helpers/FindByName";
//import { GetUserData } from "./helpers/GetUserData";
//import { UpdateEntries } from "./helpers/UpdateEntries";
//import { CheckIfEmailExists } from "./helpers/CheckIfEmailExists";
//import { GetEntries } from "./helpers/GetEntries";
//import { UpdateUser } from "./helpers/UpdateUser";

const path = require("path");
let userId = 0;
const mysql = require("mysql");
const CONFIG = require("./helpers/Config");

function openInBrowser(url) {
  shell.openExternal(url);
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

const EncryptPassword = (password) => {
  if (safeStorage.isEncryptionAvailable()) {
    return safeStorage.encryptString(password);
  } else {
    console.error("Шифрование недоступно");
    return null;
  }
};

const DecryptPassword = (password) => {
  const dePassword = safeStorage.decryptString(password);
  return dePassword;
};

function GetConnection() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(CONFIG);
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}

function QueryDatabase(connection, query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function UpdateUser(login, email, password) {
  try {
    const connection = await GetConnection();
    const encryptedPassword = EncryptPassword(password);
    const updateQuery = `
        UPDATE users
        SET login =?, email =?, password =?
        WHERE id =?;
      `;
    const result = await connection.query(updateQuery, [
      login,
      email,
      encryptedPassword,
      userId,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Не удалось обновить пользователя");
    }
    connection.end();
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    throw error;
  }
}

async function CheckIfEmailExists(email) {
  const connection = await GetConnection();
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM users WHERE email =?";
    connection.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results[0].count > 1) {
          resolve({
            error: true,
            message: "Адрес электронной почты уже занят",
          });
        } else {
          resolve({ error: false, message: null });
        }
      }
    });
  });
}

async function AddEntries(name, login, password, url) {
  try {
    const connection = await GetConnection();
    const encryptedPassword = EncryptPassword(password);
    const insertQuery = `
        INSERT INTO entries (name, login, password, url, user_id)
        VALUES (?,?,?,?,?)
      `;
    const result = await QueryDatabase(connection, insertQuery, [
      name,
      login,
      encryptedPassword,
      url,
      userId,
    ]);
    if (result.insertId > 0) {
      console.log("Данные успешно добавлены");
      return true;
    } else {
      console.error("Ошибка при добавлении данных");
      return false;
    }
  } catch (error) {
    console.error("Ошибка при попытке добавить данные:", error);
    throw error;
  }
}

async function FindByName(name) {
  try {
    const connection = await GetConnection();
    const getEntriesByPartialNameAndUserIdQuery =
      "SELECT * FROM entries WHERE name LIKE? AND user_id =?";
    const result = await QueryDatabase(
      connection,
      getEntriesByPartialNameAndUserIdQuery,
      [`%${name}%`, userId]
    );
    if (!result || result.length === 0) {
      return [];
    } else {
      const processedResults = result.map((entry) => ({
        ...entry,
        password: DecryptPassword(entry.password),
      }));
      return processedResults;
    }
  } catch (error) {
    console.error(
      `Ошибка при поиске записей по имени и пользователю с ID ${userId}:`,
      error.message
    );
    return [];
  }
}

async function AddUser(login, email, password) {
  try {
    const connection = await GetConnection();
    const encryptedPassword = EncryptPassword(password);
    const query = `
        INSERT INTO users (login, email, password)
        VALUES (?,?,?)
      `;
    const result = await connection.query(query, [
      login,
      email,
      encryptedPassword,
    ]);
    connection.end();
  } catch (error) {
    console.error("Не удалось добавить пользователя:", error);
  }
}

async function AuthenticateUser(email, password) {
  try {
    const connection = await GetConnection();
    const getEmailQuery = "SELECT email FROM users WHERE email =?";
    const emailResult = await QueryDatabase(connection, getEmailQuery, [email]);
    if (!emailResult || emailResult.length === 0) {
      throw new Error("Пользователь не найден");
    }
    const userEmail = emailResult[0].email;
    const getPasswordQuery = "SELECT password FROM users WHERE email =?";
    const passwordResult = await QueryDatabase(connection, getPasswordQuery, [
      userEmail,
    ]);
    if (!passwordResult || passwordResult.length === 0) {
      throw new Error("Пароль не найден");
    }
    const storedEncryptedPassword = passwordResult[0].password;
    const storedDecryptedPassword = DecryptPassword(storedEncryptedPassword);
    if (storedDecryptedPassword === password) {
      console.log("Авторизация прошла успешно");
      const getUserIdQuery = "SELECT id FROM users WHERE email =?";
      userId = await QueryDatabase(connection, getUserIdQuery, [userEmail]);
      if (!userId || userId.length === 0) {
        throw new Error("Не удалось получить ID пользователя");
      }
      console.log(userId[0].id);
      return userId;
    } else {
      throw new Error("Неверный пароль");
    }
  } catch (error) {
    throw error;
  }
}

async function UpdateEntries(id, name, login, password, url) {
  try {
    const connection = await GetConnection();
    const encryptedPassword = EncryptPassword(password);
    const updateQuery = `
        UPDATE entries
        SET name =?, login =?, password =?, url =?
        WHERE id =?;
      `;
    const result = await connection.query(updateQuery, [
      name,
      login,
      encryptedPassword,
      url,
      id,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Не удалось обновить данные");
    }
    connection.end();
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    throw error;
  }
}

async function GetEntries() {
  try {
    const connection = await GetConnection();
    const getSpecificFieldsQuery =
      "SELECT id, name, login, password, url FROM entries WHERE user_id =?";
    const specificFieldsResult = await QueryDatabase(
      connection,
      getSpecificFieldsQuery,
      [userId]
    );
    if (!specificFieldsResult || specificFieldsResult.length === 0) {
      console.log("Записи для данного пользователя не найдены.");
      return [];
    } else {
      const decryptedResults = specificFieldsResult.map((entry) => ({
        ...entry,
        password: DecryptPassword(entry.password),
      }));

      console.log(decryptedResults);
      return decryptedResults;
    }
  } catch (error) {
    console.error("Ошибка при получении записей:", error.message);
    return [];
  }
}

async function GetUserData() {
  try {
    const connection = await GetConnection();
    console.log(userId[0].id);
    const getSpecificFieldsQuery =
      "SELECT login, email, password FROM users WHERE id =?";
    const specificFieldsResult = await QueryDatabase(
      connection,
      getSpecificFieldsQuery,
      [userId[0].id]
    );
    if (specificFieldsResult.length === 0) {
      console.log("Данные пользователя не найдены.");
      return [];
    } else {
      const decryptedResults = specificFieldsResult.map((entry) => ({
        ...entry,
        password: DecryptPassword(entry.password),
      }));
      return decryptedResults;
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error.message);
    return [];
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 710,
    height: 450,
    resizable: false,
    fullscreenable: false,
    icon: path.join(__dirname, "logo.png"),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("Менеджер и генератор паролей");
  mainWindow.webContents.openDevTools(); //Консоль
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("authenticate-user", async (event, email, password) => {
    const authenticate = AuthenticateUser(email, password);
    return authenticate;
  });
  ipcMain.handle("add-user", async (event, login, email, password) => {
    const addUsers = AddUser(login, email, password);
    return addUsers;
  });
  ipcMain.handle("check-email", async (event, email) => {
    const checkEmail = CheckIfEmailExists(email);
    return checkEmail;
  });
  ipcMain.handle("add-entries", async (event, name, login, password, url) => {
    const addEntry = AddEntries(name, login, password, url);
    return addEntry;
  });
  ipcMain.handle("get-entries", async (event) => {
    const addEntry = GetEntries();
    return addEntry;
  });
  ipcMain.handle("find-entries", async (event, name) => {
    const findEntries = FindByName(name);
    return findEntries;
  });
  ipcMain.handle(
    "update-entries",
    async (event, id, name, login, password, url) => {
      const checkUser = UpdateEntries(id, name, login, password, url);
      return checkUser;
    }
  );
  ipcMain.handle("get-user-data", async (event) => {
    const userData = GetUserData();
    return userData;
  });
  ipcMain.handle("update-user", async (event, login, email, password) => {
    const updateUserData = UpdateUser(login, email, password);
    return updateUserData;
  });
  ipcMain.handle("open-in-browser", async (event, url) => {
    const open = openInBrowser(url);
    return open;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
