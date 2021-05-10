const { formatPrice, date } = require("../../lib/utils");
const User = require("../model/User");

module.exports = {
  async registerForm(req, res) {
    return res.render("user/register");
  },

  async show(req, res) {
    return res.send("ok cadastrado :)");
  },

  async post(req, res) {
    const userId = await User.create(req.body);
    console.log((req.session.userId = userId));
    req.session.userId = userId;
    return res.redirect("/users");
  },
};
