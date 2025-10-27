const mysql = require("mysql2/promise");

// mysql connection setup
const dbconfig = {
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
  port: 3306,
  connectionLimit: 10,
};
// create the connection pool
const pool = mysql.createPool(dbconfig);

// 쿼리처리함수.
function queryExecute(sql, params) {
  let connection;
  return new Promise(async (resolve, reject) => {
    try {
      let conn = await pool.getConnection();
      connection = conn;
      const [rows, fields] = await connection.query(sql, params);
      resolve(rows);
    } catch (err) {
      reject(err);
    } finally {
      if (connection) connection.release(); // release to pool
    }
  });
}

module.exports = { queryExecute };
