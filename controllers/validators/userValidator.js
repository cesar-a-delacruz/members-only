const { body } = require("express-validator");

const errors = {
  alpha: "must contain letters only",
  email: "must be a valid email",
  fieldMatch: "must match",
};

module.exports = [
  body("full_name")
    .trim()
    .isAlpha()
    .withMessage("Full Name " + errors.alpha),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email " + errors.email),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords " + errors.fieldMatch),
];
