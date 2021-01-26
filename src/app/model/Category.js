const database = require("../../config/db");

module.exports = {
  all() {
    return database.query(`SELECT * FROM categories`);
  },
};
