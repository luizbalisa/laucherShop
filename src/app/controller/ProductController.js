const { formatPrice, date } = require("../../lib/utils");
const Category = require("../model/Category");
const File = require("../model/File");
const Products = require("../model/Products");

module.exports = {
  async show(req, res) {
    let results = await Products.find(req.params.id);
    const product = results.rows[0];

    if (!product) return res.send("is not product");

    const { day, month, hour, minutes } = date(product.updated_at);
    console.log(hour);

    product.published = {
      day: `${day}/${month}`,
      hour: `${hour}h${minutes}`,
    };

    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await Products.files(product.id);
    let files = results.rows;

    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        "",
      )}`,
    }));

    return res.render("products/show", { product, files });
  },

  async create(req, res) {
    // pegar as categorias:
    let results = await Category.all();
    const categories = await results.rows; // pesquisa pelo id criado

    return res.render("products/create.njk", { categories });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);
    // salva item na db

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Informe os acampo aqui");
      }
    }

    //vefirica se aimage existe
    if (req.files.length == 0) {
      return res.send("Please, send at least one image");
    }

    req.body.user_id = req.session.userId
    //pega os cado do lado do cliente e joga no bando de dados
    let results = await Products.create(req.body);
    const productID = results.rows[0].id; // pesquisa pelo id criado

    const filesPromise = req.files.map((file) =>
      File.create({
        ...file,
        product_id: productID,
      }),
    );

    await Promise.all(filesPromise);

    return res.redirect(`products/${productID}`);
  },

  async put(req, res) {
    const keys = Object.keys(req.body);
    // salva item na db

    for (const key in keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send("Informe os acampo aqui");
      }
    }
    if (req.files.length != 0) {
      const newFilesPromise = req.files.map((file) =>
        File.create({ ...file, product_id: req.body.id }),
      );

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(","); // rray [1,2, 3...]
      const lastIndex = removedFiles.length - 1; // pega a ultima posicao do array
      removedFiles.splice(lastIndex, 1); // remove a ultima posicao do array

      const removedFilesPromise = removedFiles.map((id) => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    req.body.price = req.body.price.replace(/\D/g, "");

    if (req.body.old_price != req.body.price) {
      const oldProduct = await Products.find(req.body.id);
      req.body.old_price = oldProduct.rows[0].price;
    }

    await Products.update(req.body);

    return res.redirect(`/products/${req.body.id}`);
  },

  async edit(req, res) {
    let results = await Products.find(req.params.id); // pesquisa o id do item que vai ser editado
    const product = results.rows[0]; // pega o itemm que foi pesquisado

    if (!product) res.send(`Produto não existe`);

    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await Category.all(); // pega todas as categorias que esta no bando de dados
    const categories = results.rows; // amarneza as categorias

    results = await Products.files(product.id);
    let files = results.rows;

    files = files.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        "",
      )}`,
    }));

    return res.render("products/edit.njk", { product, categories, files });
  },

  async delete(req, res) {
    const { id } = req.body;
    await Products.delete(id);
    return res.redirect("products/create.njk");
  },
};
