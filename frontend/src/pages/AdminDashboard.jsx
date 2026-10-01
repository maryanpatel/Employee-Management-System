import { useState, useEffect, useMemo } from "react";
import CreateTaskModal from "../components/Dashboard/Admin/CreateTaskModal";
import AdminHeader from "../components/Dashboard/Admin/AdminHeader";
import AdminStats from "../components/Dashboard/Admin/AdminStats";
import QuickActions from "../components/Dashboard/Admin/QuickActions";
import RecentTasks from "../components/Dashboard/Admin/RecentTasks";
import EmployeePerformance from "../components/Dashboard/Admin/EmployeePerformance";
import AddEmployeeModal from "../components/Dashboard/Admin/AddEmployeeModal";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [allemployees, setAllemployees] = useState([]);
  const [totaltasks, setTotaltasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchAllEmployee = async () => {
    try {
      const res = await api.get("/employee/all");
      setAllemployees(res.data?.employees || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.response?.data?.message || "Failed to load employees");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTotaltasks(res.data?.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError("");
      await Promise.all([fetchAllEmployee(), fetchAllTasks()]);
      setLoading(false);
    };
    loadDashboardData();
  }, []);

  const status = useMemo(() => {
    return totaltasks.reduce(
      (acc, task) => {
        if (task.status === "failed") acc.failed++;
        else if (task.status === "new") acc.new++;
        else if (task.status === "in-progress") acc.inProgress++;
        else if (task.status === "completed") acc.completed++;
        return acc;
      },
      { failed: 0, new: 0, inProgress: 0, completed: 0 }
    );
  }, [totaltasks]);

  const stats = {
    employees: allemployees.length,
    tasks: totaltasks.length,
    newTasks: status.new,
    pending: status.inProgress,
    completed: status.completed,
    failed: status.failed,
  };

  const recentTasks = useMemo(() => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const filtered = totaltasks.filter((task) => {
      if (!task.createdAt) return true;
      return new Date(task.createdAt) >= fiveDaysAgo;
    });
    return filtered.length > 0 ? filtered : totaltasks;
  }, [totaltasks]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 text-slate-800 antialiased">
      {/* Header */}
      <AdminHeader admin={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Banner */}
        <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
          {/* Gradient accent strip */}
          <div className="h-18 sm:h-22 w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-white blur-2xl" />
              <div className="absolute -bottom-4 right-10 w-56 h-56 rounded-full bg-white blur-3xl" />
            </div>
          </div>

          {/* Identity row — avatar half-overlaps the strip */}
          <div className="px-6 sm:px-10 pb-6 pt-2 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10">
              <div className="w-25 h-25 rounded-2xl p-1 bg-white shadow-xl ring-4 ring-white overflow-hidden shrink-0">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.fullname}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl">
                    {(user?.fullname || "A").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {user?.fullname || "Admin"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-0.5">
                  {user?.email || ""}
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
            <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
            <p className="text-sm text-slate-400 font-medium mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <AdminStats stats={stats} />

            {/* Quick Actions */}
            <QuickActions
              onCreateTask={() => setShowCreateTask(true)}
              onAddEmployee={() => setShowAddEmployee(true)}
              totaltasks={totaltasks}
              allemployees={ allemployees }
            />

            {/* Recent Tasks */}
            <RecentTasks tasks={recentTasks} />

            {/* Employee Performance */}
            <EmployeePerformance employees={allemployees} tasks={totaltasks} />
          </>
        )}
      </main>

      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onTaskCreated={fetchAllTasks}
        />
      )}

      {showAddEmployee && (
        <AddEmployeeModal
          onClose={() => setShowAddEmployee(false)}
          onEmployeeAdded={fetchAllEmployee}
        />
      )}
    </div>
  );
}