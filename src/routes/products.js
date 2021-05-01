const express = require("express");
const routes = express.Router();

const multer = require("../app/middlewares/multer");
const ProductController = require("../app/controller/ProductController");
const SearchController = require("../app/controller/SearchController");

//Products
//Search
routes.get("/search", SearchController.index);
//CREATE
routes.get("/create", ProductController.create);
//EDIT
routes.get("/edit/:id", ProductController.edit);
//SHOW
routes.get("/:id", ProductController.show);
//SALVE CREATED
routes.post("/", multer.array("photos", 6), ProductController.post);
//SALVE EDIT
routes.put("/", multer.array("photos", 6), ProductController.put);
//DELETE
routes.delete("/", ProductController.delete);

module.exports = routes;
