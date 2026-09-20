const { param } = require("express-validator");
const employeeModel = require("../model/Employee-modal");
const userModel = require("../model/User-modal");
const taskModel = require("../model/task-modal");

async function createTask(req, res) {
  try {
    const { title, description, employeeId, priority, dueDate } = req.body;

    if (!title || !employeeId) {
      return res
        .status(400)
        .json({ message: "Title and assignedTo are required" });
    }

    const employee = await employeeModel.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Assigned employee not found" });
    }

    const task = await taskModel.create({
      title,
      description,
      assignedTo: employee._id,
      assignedBy: req.user.id,
      priority,
      dueDate,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create task", error: error.message });
  }
}
async function getAllTasks(req, res) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.employeeId) {
      const employee = await employeeModel.findOne({
        employeeId: req.query.employeeId,
      });
      if (employee) filter.assignedTo = employee._id;
    }
    console.log(filter)
    const tasks = await taskModel
      .find(filter)
      .populate("assignedTo", "employeeId department")
      .populate("assignedBy", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
}
async function getMyTasks(req, res) {
  try {
    const employee = await employeeModel.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee profile not found" });
    }

    const tasks = await taskModel
      .find({ assignedTo: employee._id })
      .populate("assignedBy", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
}

module.exports = { createTask, getAllTasks, getMyTasks };
