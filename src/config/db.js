const { Pool, Client } = require("pg");

module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shoppbase",
  password: "12345",
  port: 5432,
});
