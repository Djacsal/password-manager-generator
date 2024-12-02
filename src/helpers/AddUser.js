import { GetConnection } from "./GetConnection";
import { EncryptPassword } from "./EncryptPassword";

export async function AddUser(login, email, password) {
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
