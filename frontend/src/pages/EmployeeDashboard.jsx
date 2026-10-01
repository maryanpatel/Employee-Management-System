import { useState, useEffect } from "react";
import EmployeeHeader from "../components/Dashboard/Employee/Header";
import TaskStats from "../components/Dashboard/Employee/TaskStats";
import TaskList from "../components/Dashboard/Employee/TaskList";
import TaskDetailView from "../components/Dashboard/Employee/TaskDetailView";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Briefcase } from "lucide-react";

export default function EmployeeDashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/tasks/my");
        setTasks(res.data?.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchMyTasks();
  }, []);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t._id === updatedTask._id ? { ...t, ...updatedTask } : t
      )
    );
    setSelectedTask(updatedTask);
  };

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 text-slate-800 antialiased">
      {/* Header */}
      <EmployeeHeader user={user || {}} onLogout={handleLogout} />

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTask ? (
          /* Task Detail View */
          <TaskDetailView
            task={selectedTask}
            onBack={() => setSelectedTask(null)}
            onTaskUpdated={handleTaskUpdated}
          />
        ) : (
          <>
            {/* Welcome Banner */}
            <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
              {/* Gradient accent strip */}
              <div className="h-18 sm:h-22 w-full bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-white blur-2xl" />
                  <div className="absolute -bottom-4 right-10 w-56 h-56 rounded-full bg-white blur-3xl" />
                </div>
        
              </div>

              {/* Identity row — avatar half-overlaps the strip */}
              <div className="px-6 sm:px-10 pb-6 pt-2 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10">
                  <div className="relative w-25 h-25 rounded-2xl p-1 bg-white shadow-xl ring-4 ring-white overflow-hidden shrink-0">
                    {user?.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullname}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-extrabold text-[30px]">
                        {(user?.fullname || user?.name || "E").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {user?.fullname || user?.name || "Employee"}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Hello,Here's an overview of your tasks today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl mb-6 text-sm">
                {error}
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto" />
                <p className="text-sm text-slate-400 font-medium mt-4">Loading your tasks...</p>
              </div>
            ) : (
              <>
                {/* Statistics */}
                <TaskStats
                  tasks={tasks}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />

                {/* Tasks */}
                <TaskList
                  tasks={tasks}
                  activeFilter={activeFilter}
                  onViewTask={(task) => setSelectedTask(task)}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
