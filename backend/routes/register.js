const express = require("express");
const { createNewUser } = require("../controllers/register");
const { body } = require("express-validator");
const { validate } = require("../utils/routesUtil");

const router = express.Router();

router.route("/").post(
  body("username")
    .trim()
    .isString()
    .withMessage("Username should be a string")
    .notEmpty()
    .withMessage("Username cannot be empty string")
    .isLength({ max: 20, min: 8 })
    .withMessage("username should be between 8 to 20 character"),
  body("email")
    .trim()
    .isString()
    .withMessage("Email should be a string")
    .notEmpty()
    .withMessage("Email cannot be empty string")
    .isEmail()
    .withMessage("String should be a valid email"),
  body("password")
    .trim()
    .isString()
    .withMessage("Password should be a string")
    .notEmpty()
    .withMessage("Password cannot be empty string")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password should be min 8 character with 1 lowercase, 1 uppercase , 1 number and 1 symbol in it"
    ),
  validate,
  createNewUser
);
module.exports = router;
