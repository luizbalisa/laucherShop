const { formatPrice, date } = require("../../lib/utils");
const File = require("../model/File");
const Product = require("../model/Products");

module.exports = {
  async registerForm(req, res) {
    return res.render("user/register.njk");
  },
};
