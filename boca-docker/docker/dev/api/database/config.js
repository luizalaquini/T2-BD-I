const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "boca-postgres",
  database: "boca-db",
  password: "superpass",
  port: 8080,
});


  module.exports = pool;
