import AdminHeader from "../components/Dashboard/Admin/AdminHeader";
import AdminStats from "../components/Dashboard/Admin/AdminStats";
import QuickActions from "../components/Dashboard/Admin/QuickActions";
import RecentTasks from "../components/Dashboard/Admin/RecentTasks";
import EmployeePerformance from "../components/Dashboard/Admin/EmployeePerformance";

export default function AdminDashboard() {

  const admin = {
    name: "Admin",
    email: "admin@worksphere.com",
  };

  const stats = {
    employees: 42,
    tasks: 128,
    newTasks: 12,
    pending: 23,
    completed: 86,
    failed: 7,
  };

  const recentTasks = [
    {
      id: 1,
      title: "Website Testing",
      description:
        "Test employee management website",
      employee: "Sarthak",
      priority: "High",
      date: "20 Feb 2024",
      status: "completed",
    },

    {
      id: 2,
      title: "Login Page Fix",
      description:
        "Fix reported login page issues",
      employee: "Rahul",
      priority: "Medium",
      date: "19 Feb 2024",
      status: "accepted",
    },

    {
      id: 3,
      title: "Database Update",
      description:
        "Update employee database records",
      employee: "Priya",
      priority: "High",
      date: "18 Feb 2024",
      status: "new",
    },

    {
      id: 4,
      title: "UI Design",
      description:
        "Create dashboard UI components",
      employee: "Aman",
      priority: "Low",
      date: "17 Feb 2024",
      status: "failed",
    },
  ];

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

  const attentionItems = [
    {
      type: "overdue",
      title: "Overdue Tasks",
      description: "Tasks have passed their deadline",
      count: 5,
    },

    {
      type: "failed",
      title: "Failed Tasks",
      description: "Tasks require review",
      count: 3,
    },

    {
      type: "pending",
      title: "Pending Tasks",
      description: "Employees still have pending work",
      count: 23,
    },

    {
      type: "unaccepted",
      title: "New Tasks",
      description: "Tasks waiting to be accepted",
      count: 4,
    },
  ];

  const handleLogout = () => {
    console.log("Admin logout");

    // Example:
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <AdminHeader
        admin={admin}
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
        <QuickActions />

        {/* Recent Tasks */}
        <RecentTasks
          tasks={recentTasks}
        />

        {/* Employee Performance */}
        <EmployeePerformance
          employees={employees}
        />


      </main>

    </div>
  );
}