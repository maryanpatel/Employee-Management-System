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

    useEffect(() => {
        const fetchAllEmployee = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await api.get("/employee/all");
                setAllemployees(res.data?.employees || []);
                console.log(res.data?.employees || [])
            } catch (err) {
                console.error("Error fetching allemployees:", err);
                setError(err.response?.data?.message || "Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchAllEmployee();
    }, []);
    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await api.get("/tasks/");
                setTotaltasks(res.data?.tasks || []);
                console.log(res.data?.tasks || [])
            } catch (err) {
                console.error("Error fetching allemployees:", err);
                setError(err.response?.data?.message || "Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchAllTasks();
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
    const employees = [
        {
            id: 1,
            name: "Sarthak",
            email: "sarthak@company.com",
            assigned: 12,
            completed: 9,
            pending: 2,
            failed: 1,
        },

        {
            id: 2,
            name: "Rahul",
            email: "rahul@company.com",
            assigned: 18,
            completed: 15,
            pending: 3,
            failed: 0,
        },

        {
            id: 3,
            name: "Priya",
            email: "priya@company.com",
            assigned: 10,
            completed: 7,
            pending: 2,
            failed: 1,
        },

        {
            id: 4,
            name: "Aman",
            email: "aman@company.com",
            assigned: 8,
            completed: 8,
            pending: 0,
            failed: 0,
        },
    ];

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
                />
            )}

            {showAddEmployee && (
                <AddEmployeeModal
                    onClose={() => setShowAddEmployee(false)}
                />
            )}

        </div>
    );
}