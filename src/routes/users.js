const express = require("express");
const routes = express.Router();

const SessionController = require("../app/controller/SessionController");
const UserController = require("../app/controller/UserController");

const UserValidator = require("../app/validators/user");
const SessionValidator = require("../app/validators/session");
const { isLoggedRedirectUsers, onlyUsers } = require("../app/middlewares/session");

//LOGIN
//LOGIN/LOGOUT
routes.get("/login", isLoggedRedirectUsers, SessionController.loginForm);
routes.post("/login", SessionValidator.login, SessionController.login);
routes.post("/logout", SessionController.logout);

// //RESET PASSWORD / FORGOT
// routes.get("/forgot-pasword", SessionController.fortgotForm);
// routes.get("/pasword-reset", SessionController.resetForm);
// routes.post("/forgot-pasword", SessionController.fortgot);
// routes.post("/pasword-reset", SessionController.reset);

// //USER REGISTER USER cCONTROLLWE
routes.get("/register", UserController.registerForm);
routes.post("/register", onlyUsers, UserValidator.post, UserController.post);

routes.get("/", onlyUsers, UserValidator.show, UserController.show);
routes.put("/", UserValidator.update, UserController.update);
// routes.delete("/register", UserController.delete);

module.exports = routes;
