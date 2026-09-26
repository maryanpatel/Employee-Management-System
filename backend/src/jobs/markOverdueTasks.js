const { schedule } = require("node-cron");
const taskModel = require("../model/task-modal");

async function markOverdueTasks() {
  try {
    const now = new Date();
    const result = await taskModel.updateMany(
      {
        dueDate: { $lt: now },
        status: { $nin: ["completed", "failed"] },
      },
      { status: "failed" }
    );
    console.log(`[Overdue Job] Ran at ${now.toISOString()}: Marked ${result.modifiedCount} task(s) as failed`);
  } catch (err) {
    console.error("[Overdue Job] Failed to update overdue tasks:", err.message);
  }
}

function startOverdueTaskJob() {
  console.log("[Overdue Job] Job initialized.");

  // Run immediately on server start
  markOverdueTasks();

  // Schedule to run every day at midnight (00:00)
  schedule("0 0 * * *", markOverdueTasks);
}

module.exports = startOverdueTaskJob;