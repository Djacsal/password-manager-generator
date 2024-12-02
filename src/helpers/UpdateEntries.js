import { GetConnection } from "./GetConnection";
import { EncryptPassword } from "./EncryptPassword";

export async function UpdateEntries(id, name, login, password, url) {
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
