const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../utils/routesUtil");
const { handleLogin } = require("../controllers/auth");
const router = express.Router();

router.post(
  "/",
  body("username")
    .trim()
    .isString()
    .withMessage("username should be a string")
    .notEmpty()
    .withMessage("Username feild mising"),
  body("password")
    .trim()
    .isString()
    .withMessage("Password should be a string")
    .notEmpty()
    .withMessage("Password feild mising"),
  validate,
  handleLogin
);

module.exports = router;
