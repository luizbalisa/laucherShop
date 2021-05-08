const User = require("../model/User");

async function post(req, res, next) {
  const keys = Object.keys(req.body);
  console.log(keys);

  for (const key of keys) {
    console.log(req.body[key]);
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  let { email, cpf_cnpj, password, passwordRepeat } = req.body;

  cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj },
  });

  if (user) return res.send("Users exists");

  if (password !== passwordRepeat) return res.send("not password invalid");

  next();
}

module.exports = {
  post,
};
