const crypto = require("crypto");
const User = require("../model/User");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },

  logout(req, res) {
    req.session.destroy();
    return res.redirect("/");
  },

  login(req, res) {
    console.log("aq", req.user);
    req.session.userId = req.user.id;
    return res.redirect("/users");
  },
  fortgotForm(req, res) {
    return res.render("session/forgot-password");
  },

  async forgot(req, res) {
    const user = req.user;

    try {
      const token = crypto.randomBytes(20).toString("hex");

      let now = new Date();

      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: "not-replay@launchstore.com.br",
        subject: "Recuperação de senha",
        html: `<h2>Perdeu a chave?</h2>
      <p>Não se preocupe, clique no link para recupera sua chave</p>
      <p>
      <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank"> Recupera senha</a>
      </p>
      
      `,
      });
      return res.render("session/forgot-password", {
        success: "Verifique seu email para reseta sua senha",
      });
    } catch (err) {
      return res.render("session/forgot-password", {
        error: "Algo de errado não é certo",
      });
    }
  },

  resetForm(req, res) {
    return res.render("session/password-reset", { token: req.query.token });
  },

  async reset(req, res) {
    const { user } = req;
    const { password, token } = req.body;

    try {
      const newPassword = await hash(password, 8);

      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: "",
      });

      return res.render("session/login", {
        user: req.body,
        success: "Senha Atualizada! Faça o seu login",
      });
    } catch (err) {
      return res.render("session/forgot-password", {
        user: req.body,
        token,
        error: "Algo de errado não é certo",
      });
    }
  },
};
