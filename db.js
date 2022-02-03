const mysql = require("mysql");
const { resourceLimits } = require("worker_threads");
const dotenv = require("dotenv");
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});

conn.connect((err) => {
  if (err) console.log(err);
  console.log("connected to databases ");
});

module.exports = { conn };
