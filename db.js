const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_DATA || "nodeDB"
});

conn.connect((err) => {
  if (err) console.log(err);
  if (!err) {
    console.log("connected to databases ");
  }
});

module.exports = { conn };
