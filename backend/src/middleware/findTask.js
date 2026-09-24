const taskModel = require("../model/task-modal");

async function findTask(req, res, next) {
  try {
    const { id: taskId } = req.params;
    const task = await taskModel
      .findById(taskId)
      .populate("assignedTo", "employeeId department")
      .populate("assignedBy", "fullname email");

    if (!task) {
      return res.status(500).json({
        message: "Task is not found ",
      });
    }

    req.task = task;
    next();
  } catch (err) {
    if (err.name == "CastError") {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }
    return res.status(500).json({
      message: " something went wrong",
      error: err.message,
    });
  }
}

module.exports = findTask
