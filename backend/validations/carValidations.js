const { body } = require("express-validator");

module.exports = [
  body("category")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("category is required"),
  body("make").not().isEmpty().trim().escape().withMessage("make is required"),
  body("model")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("model is required"),
  body("year").not().isEmpty().trim().escape().withMessage("year is required"),
  body("mileage")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("mileage is required"),
  body("price")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("price is required"),
  body("image")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("image is required"),
  body("registerationNo")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("registrationNo is required"),
];
