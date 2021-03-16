const { Pool, Client } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shoop",
  password: "docker",
  port: 5432,
});
