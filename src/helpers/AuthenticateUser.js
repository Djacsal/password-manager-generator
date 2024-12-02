import { GetConnection } from "./GetConnection";
import { QueryDatabase } from "./QueryDatabase";
import { DecryptPassword } from "./DecryptPassword";

export async function AuthenticateUser(email, password) {
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
      const getUserIdQuery = "SELECT id FROM users WHERE email =?";
      const userIdResult = await QueryDatabase(connection, getUserIdQuery, [
        userEmail,
      ]);
      if (!userIdResult || userIdResult.length === 0) {
        throw new Error("Не удалось получить ID пользователя");
      }
      return userIdResult[0].id;
    } else {
      throw new Error("Неверный пароль");
    }
  } catch (error) {
    throw error;
  }
}
