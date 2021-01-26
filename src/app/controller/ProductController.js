const Category = require("../model/Category");
const Products = require("../model/Products");

module.exports = {
  create(req, res) {
    // pegar as categorias:
    Category.all()
      .then((results) => {
        const categories = results.rows;
        return res.render("products/create.njk", { categories });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);
    // salva intem na db

    for (const key in keys) {
      if (req.body[key] == "") {
        return res.send("Informe os acampo aqui");
      }
    }

    let results = await Products.create(req.body); //pega os cado do lado do cliente e joga no bando de dados
    const productID = results.rows[0].id; // pesquisa pelo id criado

    console.log(productID);

    return res.redirect(`products/${productID}`);
  },

  async edit(req, res) {
    let results = await Products.find(req.params.id); // pesquisa o id do item que vai ser editado
    const product = results.rows[0]; // pega o itemm que foi pesquisado

    if (!product) res.send(`Produto não existe`);

    results = await Category.all(); // pega todas as categorias que esta no bando de dados

    const categories = results.rows; // amarneza as categorias

    return res.render("products/edit.njk", { product, categories });
  },
};
