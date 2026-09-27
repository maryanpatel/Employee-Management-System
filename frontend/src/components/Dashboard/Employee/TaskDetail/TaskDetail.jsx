import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import api from "../../../../api/axiosInstance";

// Sub-components
import TaskHeaderBar from "./TaskHeaderBar";
import TaskOverview from "./TaskOverview";
import TaskStatusUpdater from "./TaskStatusUpdater";
import TaskAssignerCard from "./TaskAssignerCard";
import TaskTimelineCard from "./TaskTimelineCard";
import TaskWorkNotes from "./TaskWorkNotes";

export default function TaskDetail({
  task: initialTask,
  taskId,
  onBack,
  onTaskUpdated,
}) {
  const [task, setTask] = useState(initialTask || null);
  const [loading, setLoading] = useState(!initialTask && !!taskId);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Fetch task if only taskId was provided or to refresh
  useEffect(() => {
    if (!initialTask && taskId) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/tasks/${taskId}`);
          setTask(res.data?.task || null);
        } catch (err) {
          console.error("Failed to fetch task:", err);
          setStatusMessage({
            type: "error",
            text: err.response?.data?.message || "Failed to load task details",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    } else if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask, taskId]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
        <p className="text-slate-600 font-medium">Loading task details...</p>
      </div>
    );
  }

  // Not found fallback
  if (!task) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-800">Task Not Found</h3>
        <p className="text-slate-500 mt-2 mb-6">
          The requested task could not be located.
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        )}
      </div>
    );
  }

  // Handle status update
  const handleUpdateStatus = async (newStatus) => {
    if (task.status === newStatus || updatingStatus) return;

    try {
      setUpdatingStatus(true);
      setStatusMessage({ type: "", text: "" });

      const res = await api.patch(`/tasks/${task._id}/status`, {
        status: newStatus,
      });

      const updatedTask = res.data?.task || { ...task, status: newStatus };
      setTask(updatedTask);

      if (onTaskUpdated) {
        onTaskUpdated(updatedTask);
      }

      setStatusMessage({
        type: "success",
        text: `Task marked as ${newStatus.replace("-", " ")} successfully!`,
      });

      setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
    } catch (err) {
      console.error("Failed to update status:", err);
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update task status",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Navigation & Actions Bar */}
      <TaskHeaderBar
        taskId={task._id}
        onBack={onBack}
        statusMessage={statusMessage}
        onDismissMessage={() => setStatusMessage({ type: "", text: "" })}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Overview, Status Updater, and Work Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Task Info, Badges, Stepper, and Description */}
          <TaskOverview task={task} />

          {/* Action Center: Status Update (Accept, Complete, etc.) */}
          <TaskStatusUpdater
            status={task.status}
            onUpdateStatus={handleUpdateStatus}
            updating={updatingStatus}
          />

          {/* Personal Employee Work Notes */}
          <TaskWorkNotes
            taskId={task._id}
            onSaveNotification={(msg) =>
              setStatusMessage({ type: "success", text: msg })
            }
          />
        </div>

        {/* Right Column (1 Col): Assigner & Timeline Details */}
        <div className="space-y-6">
          {/* Who Assigned The Task (Manager/Admin) */}
          <TaskAssignerCard assignedBy={task.assignedBy} />

          {/* Deadlines & Timeline */}
          <TaskTimelineCard
            dueDate={task.dueDate}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
          />
        </div>
      </div>
    </div>
  );
}
