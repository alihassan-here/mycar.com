const express = require("express");
const router = express.Router();
const carValidation = require("../validations/carValidations");
const Authorization = require("../services/Authorization");
const carController = require("../controllers/carController");

router.post(
  "/create-car",
  [Authorization.authorized, carValidation],
  carController.create
);
router.get("/cars/:page", Authorization.authorized, carController.getAll);
router.get("/fetch-car/:id", Authorization.authorized, carController.fetchCar);

router.put(
  "/update-car",
  [Authorization.authorized, carValidation],
  carController.updateCar
);

router.delete(
  "/delete-car/:id",
  Authorization.authorized,
  carController.deleteCar
);

module.exports = router;
