function onlyUsers(req, res, next) {
  console.log(req.session.userId)
  if (!req.session.userId) {
    return res.redirect("/users/login");
  }

  next();
}

function isLoggedRedirectUsers(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/users/");
  }

  next();
}

module.exports = {
  onlyUsers,
  isLoggedRedirectUsers,
};
