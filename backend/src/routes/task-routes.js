const express = require("express")

const router = express.Router()

const { createTask, getAllTasks, getMyTasks, getTaskById, updateTask, updateTaskStatus, deleteTask } = require("../controllers/task-controller")
const validationRules = require("../middleware/validation-middleware")
const authorization = require("../middleware/authorize")
const authenticate = require("../middleware/authenticate")
const findEmployee = require("../middleware/findEmployee")
const findTask  = require("../middleware/findTask")

router.post("/create", authenticate, authorization("admin"), createTask)
router.get("/", authenticate, authorization("admin"), getAllTasks)
router.get("/my", authenticate, authorization("employee"), getMyTasks)
router.get("/:id", authenticate, authorization("admin", "employee"), findTask, getTaskById)
router.put("/update/:id", authenticate, authorization("admin"), findTask, updateTask)
router.patch("/:id/status", authenticate, authorization("employee"), findTask, updateTaskStatus)
router.delete("/:id", authenticate, authorization("admin"), findTask, deleteTask)

module.exports = router