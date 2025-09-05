const { validationResult } = require("express-validator");
const model = require("../models/messageModel");
const validator = require("./validators/messageValidator");

module.exports = {
  new(req, res) {
    if (!req.user) return res.redirect("/");
    return res
      .status(200)
      .render("messages/new", { title: "Create New Message" });
  },
  async index(req, res) {
    const messages = await model.findAll();
    return res.render("messages/index", {
      title: "Messages",
      user: req.user,
      messages,
    });
  },
  create: [
    validator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json(errors.array());

      const message = req.body;
      message.user_id = req.user.id;
      model.insert(message);
      return res.redirect("/");
    },
  ],
  async delete(req, res) {
    if (!req.user) return res.redirect("/");
    await model.delete(req.body.message_id);
    return res.redirect("/");
  },
};
