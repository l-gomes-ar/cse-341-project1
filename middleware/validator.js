const { body, validationResult } = require("express-validator");

const createContactRules = () => {
  return [
    body("firstName").trim().notEmpty().withMessage("firstname should not be empty!"),
    body("lastName").trim().notEmpty().withMessage("lastName should not be empty!"),
    body("email").trim().notEmpty().isEmail().withMessage("Please provide a valid email!"),
    body("favoriteColor").trim().notEmpty().withMessage("favoriteColor should not be empty!"),
    body("birthday")
      .trim()
      .notEmpty()
      .isDate({ format: "dd/mm/yyyy" })
      .withMessage("Please provide a valid date!")
  ];
};

const checkCreateRules = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorsJSON = [];
  errors.array().map((err) => errorsJSON.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: errorsJSON
  });
};

module.exports = {
  createContactRules,
  checkCreateRules
};
