const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const model = require("../models/messageModel");
const validator = require("./validators/messageValidator");

module.exports = {
  new(req, res) {
    res.status(200).render("messages/new", { title: "Create New Message" });
  },
  create: [
    validator,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) res.status(400).json(errors.array());

      const message = req.body;
      message.user_id = req.user.id;
      model.insert(message);
      res.status(200).redirect("/");
    },
  ],
  async index(req, res) {
    const messages = await model.findAll();
    res.render("home", { title: "Home Page", user: req.user, messages });
  },
  async delete(req, res) {
    await model.delete(req.body.message_id);
    res.redirect("/");
  },
};
