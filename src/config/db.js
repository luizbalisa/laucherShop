const { Pool, Client } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shopp",
  password: "luiz",
  port: 5432,
});
