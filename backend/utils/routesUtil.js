const { validationResult } = require("express-validator");

const formatValidateError = (res, errors) => {
  const error = new Error("Unexpected input value");
  error.errorCode = "HD-0422";
  error.status = 422;
  error.meta = { errors: errors.mapped() };
  error.name = "ValidationError";
  return res.json({ error });
};

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (errors.isEmpty()) {
    next();
  } else {
    throw formatValidateError(res, errors);
  }
};

module.exports = {
  validate,
};
