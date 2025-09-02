const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const model = require("../models/userModel");
const validator = require("./validators/userValidator");

module.exports = {
  new(req, res) {
    res.status(200).render("user/sign-up", { title: 'Sign Up'});
  },
  create: [
    validator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json(errors.array());

      const user = req.body;
      user.password = await bcrypt.hash(user.password, 10);
      const result = await model.insert(user);
      res.status(200).json(result);
    },
  ],
};
