const express = require("express")
const router = express.Router()
const { registerAdmin } = require("../controllers/auth-controller")
const validationRules = require("../middleware/validation-middleware")

 router.post("/signup", validationRules.registerAdminValidationRules, registerAdmin)


module.exports = router