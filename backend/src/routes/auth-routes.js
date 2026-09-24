const express = require("express")
const router = express.Router()
const { registerUser, userLogin, userLogout, getCurrentuser, changePassword } = require("../controllers/auth-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")
const { loginLimiter } = require("../middleware/rateLimiter");



 router.post("/signup", validationRules.registerAdminValidationRules, authenticate, authorization("admin"), registerUser)
 router.post("/login", loginLimiter, validationRules.loginAdminValidationRules, userLogin)
 router.post("/logout", userLogout)
 router.get("/me" , authenticate, getCurrentuser)
 router.put("/change-password",  validationRules.passwordValidationRules, authenticate, changePassword)

module.exports = router