const express = require("express")

const router = express.Router()
const { createEmployee, getAllEmployees,  getEmployeeById, updateEmployee, deleteEmployee, getMyProfile } = require("../controllers/employee-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")
const findEmployee = require("../middleware/findEmployee")

router.post("/create", validationRules.createEmployeeValidationRules, authenticate, authorization("admin"), createEmployee)
router.get("/all", authenticate, authorization("admin"), getAllEmployees)
router.get("/profile/me" , authenticate, authorization("employee"), getMyProfile )
router.get("/:id", authenticate, authorization("admin", "employee"), findEmployee, getEmployeeById )
router.put("/update/:id", authenticate, authorization("admin"), findEmployee, updateEmployee )
router.delete("/:id", authenticate, authorization("admin"), findEmployee, deleteEmployee);
module.exports = router