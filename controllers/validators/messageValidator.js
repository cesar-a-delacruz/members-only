const { body } = require("express-validator");

const errors = {
  limitTitle: "can't be longer than 50 characters",
  limitContent: "can't be longer than 200 characters",
};

module.exports = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title " + errors.limitTitle),
  body("content")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Content " + errors.limitContent),
];
