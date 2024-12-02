import { GetConnection } from "./GetConnection";
import { QueryDatabase } from "./QueryDatabase";
import { EncryptPassword } from "./EncryptPassword";

let userId = 0;

export async function AddEntries(name, login, password, url) {
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
