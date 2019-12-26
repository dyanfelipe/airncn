// metados usados padão da comunidade e MVC
// index = listagem de sesoes.
// show = lista apenas uma sessão.
// store =  criar uma sessão.
// update = alterar uma sessão
// destroy = remover ou deletar um sessão.
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    return res.json(user);
  }
};
