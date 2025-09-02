const { body } = require("express-validator");

const errors = {
  alpha: "must contain letters only",
  email: "must be a valid email",
};

module.exports = [
  body("full_name")
    .trim()
    .isAlpha()
    .withMessage("Full Name " + errors.alpha),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email " + errors.email)
];
