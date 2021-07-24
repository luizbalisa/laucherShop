const db = require("../../config/db");

const fs = require("fs");

const Product = require("../models/Product");

const Base = require("./Base");
Base.init({ table: "users" });
module.exports = {
  ...Base,
};
