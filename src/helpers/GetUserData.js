import { GetConnection } from "./GetConnection";
import { QueryDatabase } from "./QueryDatabase";
import { DecryptPassword } from "./DecryptPassword";

let userId = 0;

export async function GetUserData() {
  try {
    const connection = await GetConnection();
    const getSpecificFieldsQuery =
      "SELECT login, email, password FROM users WHERE id =?";
    const specificFieldsResult = await QueryDatabase(
      connection,
      getSpecificFieldsQuery,
      [userId]
    );
    if (!specificFieldsResult || specificFieldsResult.length === 0) {
      console.log("Данные пользователя не найдены.");
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
    console.error("Ошибка при получении данных:", error.message);
    return [];
  }
}
