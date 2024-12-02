import { GetConnection } from "./GetConnection";
import { QueryDatabase } from "./QueryDatabase";
import { DecryptPassword } from "./DecryptPassword";

let userId = 0;

export async function FindByName(name) {
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
