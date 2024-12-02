import { GetConnection } from "./GetConnection";
import { QueryDatabase } from "./QueryDatabase";
import { DecryptPassword } from "./DecryptPassword";

export async function GetEntries() {
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
