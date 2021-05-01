const express = require("express");
const routes = express.Router();

const SessionController = require("../app/controller/sessionController");
const UserController = require("../app/controller/ProductController");

//LOGIN 
//LOGIN/LOGOUT
// routes.get('/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('/logout', SessionController.loginForm)

// //RESET PASSWORD / FORGOT
// routes.get("/forgot-pasword", SessionController.fortgotForm);
// routes.get("/pasword-reset", SessionController.resetForm);
// routes.post("/forgot-pasword", SessionController.fortgot);
// routes.post("/pasword-reset", SessionController.reset);

// //USER REGISTER USERCONTROLLWE
routes.get("/register", UserController.registerForm);
// routes.post("/register", UserController.post);

// routes.get("/register", UserController.show);
// routes.put("/register", UserController.updade);
// routes.delete("/register", UserController.delete);


module.exports = routes;