import { GetConnection } from "./GetConnection";

export async function CheckIfEmailExists(email) {
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
