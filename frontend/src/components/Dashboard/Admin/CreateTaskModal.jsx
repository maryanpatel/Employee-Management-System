import { useState } from "react";
import api from "../../../api/axiosInstance";
// import { useAuth } from "../../context/AuthContext";
import {
  X,
  ClipboardList,
  User,
  Calendar,
  Flag,
  Send,
} from "lucide-react";

export default function CreateTaskModal({ onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    employee: "",
    priority: "medium",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    setLoading(true);
    try {
      await api.post("/tasks/create", {
        title: formData.title,
        description: formData.description,
        employeeId: formData.employee,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });

      if (onTaskCreated) {
        onTaskCreated();
      }
      onClose();
    } catch (err) {
      const data = err.response?.data;
      console.log("task create error ", data);
      setErrorMessage(data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      {/* Blur Background */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      {/* Modal */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/60 animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
              <ClipboardList
                size={23}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create New Task
              </h2>

              <p className="text-sm text-slate-500">
                Assign a task to an employee
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 sm:p-8 space-y-5">
            {errorMessage && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <ClipboardList size={16} />
                Task Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <ClipboardList size={16} />
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task..."
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none resize-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Employee + Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Employee */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <User size={16} />
                  Assign Employee
                </label>

                <input
                  type="text"
                  name="employee"
                  onChange={handleChange}
                  placeholder="Employee id"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Flag size={16} />
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={16} />
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-100 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm shadow-sm active:scale-95 transition disabled:cursor-not-allowed"
            >
              <Send size={17} />
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}