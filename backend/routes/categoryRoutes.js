const express = require("express");
const categoryValidations = require("../validations/categoryValidations");
const categoryController = require("../controllers/categoryControllers");
const Authorization = require("../services/Authorization");

const router = express.Router();

router.post(
  "/create-category",
  [Authorization.authorized, categoryValidations],
  categoryController.create
);

router.get(
  "/categories/:page",
  Authorization.authorized,
  categoryController.getAllCategories
);

router.get(
  "/fetch-category/:id",
  Authorization.authorized,
  categoryController.fetchCategory
);

router.put(
  "/update-category/:id",
  [Authorization.authorized, categoryValidations],
  categoryController.updateCategory
);

router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  categoryController.deleteCategory
);

router.get(
  "/allcategories",
  Authorization.authorized,
  categoryController.allCategories
);
module.exports = router;
