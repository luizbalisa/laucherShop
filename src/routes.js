const express = require("express");
const ProductController = require("./app/controller/ProductController");
const routes = express.Router();

routes.get("/", (req, res) => res.render("layout.njk"));
routes.get("/products/create", ProductController.create);
routes.get("/products/edit/:id", ProductController.edit);
routes.post("/products", ProductController.post);

//alis/ atalhos
routes.get("/ads/create", (req, res) => res.render("/products/create.njk"));

module.exports = routes;
