import { useState, useEffect } from "react";
import EmployeeHeader from "../components/Dashboard/Employee/Header";
import TaskStats from "../components/Dashboard/Employee/TaskStats";
import TaskList from "../components/Dashboard/Employee/TaskList";
import TaskDetailView from "../components/Dashboard/Employee/TaskDetailView";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <EmployeeHeader
        user={user || {}}
        onLogout={handleLogout}
      />

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTask ? (
          /* View Task Detail View */
          <TaskDetailView
            task={selectedTask}
            onBack={() => setSelectedTask(null)}
            onTaskUpdated={handleTaskUpdated}
          />
        ) : (
          <>
            {/* Welcome */}
            <div className="mb-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Welcome back, {user?.fullname || user?.name || "Employee"}
              </h2>
              <p className="text-slate-500 mt-2">
                Here's an overview of your tasks.
              </p>
            </div>

            {/* Loading / Error / Data */}
            {loading ? (
              <div className="py-16 text-center text-slate-500 font-medium">
                Loading your tasks...
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6">
                {error}
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
