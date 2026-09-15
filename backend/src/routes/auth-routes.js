const express = require("express")
const router = express.Router()
const { registerUser, userLogin } = require("../controllers/auth-controller")
const validationRules = require("../middleware/validation-middleware")

 router.post("/signup", validationRules.registerAdminValidationRules, registerUser)
 router.post("/login", userLogin)


module.exports = router