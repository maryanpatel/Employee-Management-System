const { body, validationResult } = require("express-validator")


async function validateAdmin(req, res, next){
    const errors = validationResult(req)

    if( !errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const registerAdminValidationRules = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
    body("phonenumber")
  .matches(/^[6-9]\d{9}$/)
  .withMessage("Phone number must be a valid 10-digit Indian number"),
  validateAdmin
]

module.exports = { registerAdminValidationRules }