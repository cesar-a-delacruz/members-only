const model = require("../models/userModel");
const { validationResult } = require("express-validator");
const validator = require("./validators/userValidator");

module.exports = {
  new(req, res) {
    res.status(200).render("user/sign-up");
  },
  create: [
    validator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json(errors.array());

      const user = req.body;
      const result = await model.insert(user);
      res.status(200).json(result);
    },
  ],
};
