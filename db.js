const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5342,
  database: "graphql",
});

module.exports = pool;
