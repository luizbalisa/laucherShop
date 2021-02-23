const database = require("../../config/db");

module.exports = {
  all() {
    // pegas toda as categoria do db
    return database.query(`SELECT * FROM categories`);
  },

  create(data) {
    // query inser para bago de dado
    const query = `INSERT INTO products (
      category_id,
      user_id,
      name,
      description,
      old_price,
      price,
      quantity, 
      status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id`;

    data.price = data.price.replace(/\D/g, ""); // formata valor para int

    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1,
    ]; //

    return database.query(query, values);
  },

  update(data) {
    const query = `UPDATE products SET
      category_id=($1),
      user_id=($2),
      name=($3),
      description=($4),
      old_price=($5),
      price=($6),
      quantity=($7),
      status=($8)
    WHERE id = $9 `;

    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1,
      data.id,
    ]; //

    return database.query(query, values);
  },

  find(id) {
    // query insert para baco de dado
    const query = `SELECT * FROM products WHERE id = $1`;

    const values = [id]; //

    return database.query(query, values);
  },

  delete(id) {
    return database.query("DELETE FROM products WHERE id = $1", [id]);
  },

  files(id) {
    return database.query("SELECT * FROM files WHERE product_id = $1", [id]);
  },
};
