module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  },

  login(req, res) {
    console.log('aq',req.user);
    req.session.userId = req.user.id;
    return res.redirect("/users");
  },
};
