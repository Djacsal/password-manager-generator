const mysql = require("mysql");
const CONFIG = require("./Config");

export function GetConnection() {
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

export default GetConnection;
