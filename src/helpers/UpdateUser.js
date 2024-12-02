import { GetConnection } from "./GetConnection";
import { EncryptPassword } from "./EncryptPassword";

let userId = 0;

export async function UpdateUser(login, email, password) {
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
