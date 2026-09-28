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
                if (task.status === "failed") {
                    acc.failed++;
                } else if (task.status === "new") {
                    acc.new++;
                } else if (task.status === "in-progress") {
                    acc.inProgress++;
                } else if (task.status === "completed") {
                    acc.completed++;
                }
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

        const filtered = totaltasks.filter(task => {
            if (!task.createdAt) return true;
            const createdDate = new Date(task.createdAt);
            return createdDate >= fiveDaysAgo;
        });

        return filtered.length > 0 ? filtered : totaltasks;
    }, [totaltasks]);
    const handleLogout = () => {
        console.log("Admin logout");

        
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <AdminHeader
                admin={user}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-8
      ">



                {/* Statistics */}
                <AdminStats
                    stats={stats}
                />

                {/* Quick Actions */}
                <QuickActions
                    onCreateTask={() => setShowCreateTask(true)}
                    onAddEmployee={() => setShowAddEmployee(true)}
                />

                {/* Recent Tasks */}
                <RecentTasks
                    tasks={recentTasks}
                />

                {/* Employee Performance */}
                <EmployeePerformance
                    employees={allemployees}
                    tasks={totaltasks}
                />

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