const express = require("express");
const router = express.Router();
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidations");
const userContoller = require("../controllers/usersControllers");
const { register, login } = require("../controllers/usersControllers");

router.post("/register", registerValidations, userContoller.register);
router.post("/login", loginValidations, userContoller.login);

module.exports = router;
