const { Pool, Client } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shopp",
  password: "docker",
  port: 5432,
});
