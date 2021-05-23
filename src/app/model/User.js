const db = require("../../config/db");
const database = require("../../config/db");
const { hash } = require("bcryptjs");
const Products = require("../model/Products");
const fs = require("fs");
module.exports = {
  all() {
    // pegas toda as categoria do db
    return database.query(`SELECT * FROM products ORDER BY updated_at DESC`);
  },

  async create(data) {
    // query inser para bago de dado
    const query = `INSERT INTO users (
      name,
      email,
      password,
      cpf_cnpj,
      cep, 
      address
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`;

    const passwordHash = await hash(data.password, 8);
    const values = [
      data.name,
      data.email,
      passwordHash,
      data.cpf_cnpj.replace(/\D/g, ""),
      data.cep.replace(/\D/g, ""),
      data.address,
    ]; //

    const results = await database.query(query, values);
    return results.rows[0].id;
  },

  async update(id, fields) {
    try {
      let query = `UPDATE users SET`;

      Object.keys(fields).map((key, index, array) => {
        if (index + 1 < array.length) {
          query = ` ${query} 
          ${key} = '${fields[key]}', `;
        } else {
          query = ` ${query} ${key} = '${fields[key]}' WHERE id = ${id} `;
        }
      });
      await database.query(query);
      return;
    } catch (error) {
      console.log(error);
    }
  },

  async findOne(filters) {
    let query = `SELECT * FROM users `;

    Object.keys(filters).map((key) => {
      query = `${query} 
      ${key} 
      `;
      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field} = '${filters[key][field]}'`;
      });
    });

    const results = await db.query(query);

    return results.rows[0];
  },

  async delete(id) {
    let results = await database.query(
      "SELECT * FROM products WHERE user_id = $1",
      [id],
    );
    const products = results.rows;

    const allFilesPromise = products.map((product) =>
      Products.files(product.id),
    );

    let promiseResults = await Promise.all(allFilesPromise);

    await database.query("DELETE FROM users WHERE id = $1", [id]);

    promiseResults.map((results) =>
      results.rows.map((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          console.log(error);
        }
      }),
    );
  },
};
