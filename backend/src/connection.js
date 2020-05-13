import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "db4free.net",
  port: "3306",
  user: "fokinell",
  password: "ea6b4bb4",
  database: "asai_db",
});

export default pool;
