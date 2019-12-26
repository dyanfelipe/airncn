const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { userid } = req.headers;
    const { id } = req.params;
    const { data } = req.body;

    const booking = await Booking.create({
      user: userid,
      spot: id,
      data
    });
    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();
    return res.json(booking);
  }
};
