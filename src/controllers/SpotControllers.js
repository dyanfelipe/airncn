const User = require("../models/Spot");
const Spot = require("../models/Spot");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;
    const spots = await Spot.find({ techs: tech });
    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { userid } = req.headers;

    const user = await User.find({ _id: userid });
    if (!user) {
      return res.status(400).json({ msg: "User not fauld" });
    }
    const spot = await Spot.create({
      user: userid,
      thumbnail: filename,
      company,
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });
    return res.json(spot);
  }
};
