const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "employee", required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, 
    status: {
      type: String,
      enum: ["new", "in-progress", "completed", "failed"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);