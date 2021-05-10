const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const database = require("./db");

module.exports = session({
  store: new pgSession({
    pool: database,
  }),
  secret: "olamundoestouaqui",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
});
