const express = require("express");
const routes = express.Router();
const multer = require("./app/middlewares/multer");
const ProductController = require("./app/controller/ProductController");
const HomeController = require("./app/controller/HomeController");

routes.get("/", HomeController.index);
routes.get("/products/create", ProductController.create);
routes.get("/products/edit/:id", ProductController.edit);
routes.get("/products/:id", ProductController.show);

routes.post("/products", multer.array("photos", 6), ProductController.post);
routes.put("/products", multer.array("photos", 6), ProductController.put);
routes.delete("/products", ProductController.delete);

//alis/ atalhos
routes.get("/ads/create", ProductController.create);

module.exports = routes;
