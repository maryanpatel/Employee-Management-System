const { body, validationResult } = require("express-validator");

// Common password validation
const passwordValidation =  (fieldName = "password") =>
  body(fieldName)
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number")
  .matches(/[@$!%*?&]/)
  .withMessage("Password must contain at least one special character");

// Email validation
const emailValidation = body("email")
  .isEmail()
  .withMessage("Invalid email");

// Phone validation
const phoneValidation = body("phonenumber")
  .matches(/^[6-9]\d{9}$/)
  .withMessage("Phone number must be a valid 10-digit Indian number");

// Error handler
const validateAdmin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

// Register
const registerAdminValidationRules = [
  emailValidation,
  passwordValidation("password"),
  phoneValidation,
  validateAdmin,
];

// Login
const loginAdminValidationRules = [
  emailValidation,
  passwordValidation("password"),
  validateAdmin,
];

// Password only
const passwordValidationRules = [
  passwordValidation("newPassword"),
  validateAdmin,
];

module.exports = {
  validateAdmin,
  emailValidation,
  passwordValidation,
  phoneValidation,
  registerAdminValidationRules,
  loginAdminValidationRules,
  passwordValidationRules,
};