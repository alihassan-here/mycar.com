const { body } = require("express-validator");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("category name is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("category description is required"),
];
