const express = require("express")

const router = express.Router()

const { createTask, getAllTasks, getMyTasks } = require("../controllers/task-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")
const findEmployee = require("../middleware/findEmployee")

router.post("/create", authenticate, authorization("admin"), createTask)
router.get("/", authenticate, authorization("admin"), getAllTasks)
router.get("/my", authenticate, authorization("employee"), getMyTasks);

module.exports = router