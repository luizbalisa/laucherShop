const express = require("express");
const routes = express.Router();
const ProductController = require("../app/controller/ProductController");
const HomeController = require("../app/controller/HomeController");

const products = require("./products");
const users = require("./users");

//HOME
routes.get("/", HomeController.index);

routes.use("/products", products);
routes.use("/users", users);

//alis/ atalhos
routes.get("/ads/create", ProductController.create);
routes.get("/accounts", (req, res) => {
  res.render("user/register.njk");
});

module.exports = routes;
