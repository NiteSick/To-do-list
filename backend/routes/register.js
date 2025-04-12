const express = require("express");
const { createNewUser } = require("../controllers/register");
const { body } = require("express-validator");
const { validate } = require("../utils/routesUtil");

const router = express.Router();

router
  .route("/")
  .post(
    body("username")
      .trim()
      .isString()
      .withMessage("Username is required")
      .notEmpty()
      .withMessage("Username cannot be empty string"),
    body("password")
      .trim()
      .isString()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password cannot be empty string"),
    validate,
    createNewUser
  );
module.exports = router;
