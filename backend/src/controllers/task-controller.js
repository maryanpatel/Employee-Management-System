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
async function getTaskById(req, res) {
  const task = req.task;
  console.log(task)
  if (req.user.role === "employee") {
    const employee = await employeeModel.findOne({ user: req.user.id });
    console.log(employee)
    if (!employee || task.assignedTo._id.toString() !== employee._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
  }

  return res.status(200).json({ task });
}
async function updateTask(req, res) {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (priority !== undefined) updates.priority = priority;
    if (dueDate !== undefined) updates.dueDate = dueDate;

    if (assignedTo !== undefined) {
      const employee = await employeeModel.findById(assignedTo);
      if (!employee) {
        return res.status(404).json({ message: "Assigned employee not found" });
      }
      updates.assignedTo = assignedTo;
    }

    const updatedTask = await taskModel.findByIdAndUpdate(req.task._id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task", error: error.message });
  }
}
async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const allowedStatuses = ["new", "in-progress", "completed", "failed"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const employee = await employeeModel.findOne({ user: req.user.id });
    if (!employee || req.task.assignedTo._id.toString() !== employee._id.toString()) {
      return res.status(403).json({ message: "You can only update your own tasks" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      req.task._id,
      { status },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Task status updated", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update status", error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    await taskModel.findByIdAndDelete(req.task._id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
}
module.exports = { createTask, getAllTasks, getMyTasks, getTaskById, updateTask, updateTaskStatus, deleteTask };
