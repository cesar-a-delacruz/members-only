const model = require("../models/userModel");

module.exports = {
  new(req, res) {
    res.status(200).render("user/sign-up");
  },
  async create(req, res) {
    const user = req.body;
    const result = await model.insert(user);
    if (result) res.status(200).json(result);
    else res.status(400).json(result);
  },
};
