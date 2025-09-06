const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const model = require("../models/userModel");
const validator = require("./validators/userValidator");

module.exports = {
  new(req, res) {
    if (req.user) return res.redirect("/");
    return res.status(200).render("users/new", { title: "Sign Up" });
  },
  create: [
    validator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors.array());

      const user = req.body;
      user.password = await bcrypt.hash(user.password, 10);
      if (!user.is_admin) {
        user.is_admin = !user.is_admin && false;
        user.member = false;
        const userId = await model.insert(user);
        return res
          .status(200)
          .render("users/join", { title: "Join The Club", userId });
      } else {
        user.member = true;
        await model.insert(user);
        return res.redirect("/");
      }
    },
  ],
  async join(req, res) {
    const { user_id, passcode } = req.body;
    if (passcode !== "secret") return res.status(400).send("Wrong passcode!");

    await model.join(user_id);
    return res.redirect("/");
  },
};
