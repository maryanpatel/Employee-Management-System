const express = require("express")
const router = express.Router()
const { registerUser, userLogin } = require("../controllers/auth-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")



 router.post("/signup", validationRules.registerAdminValidationRules, authenticate, authorization("admin"), registerUser)
 router.post("/login", userLogin)


module.exports = router