const { formatPrice, date } = require("../../lib/utils");
const User = require("../model/User");

module.exports = {
  async registerForm(req, res) {
    return res.render("user/register");
  },

  async post(req, res) {
    
    return res.send({ Ok: "OK" });
  },
};
