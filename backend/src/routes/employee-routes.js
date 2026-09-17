const express = require("express")

const router = express.Router()
const { createEmployee, getAllEmployees } = require("../controllers/employee-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")

router.post("/create", authenticate, authorization("admin"), createEmployee)
router.get("/all", authenticate, authorization("admin"), getAllEmployees)

module.exports = router