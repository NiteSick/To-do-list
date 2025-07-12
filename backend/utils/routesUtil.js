const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  console.log("req body ", req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a clear error response
    return res.status(422).json({
      errorCode: "HD-0422",
      message: "Unexpected input value",
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validate,
};
