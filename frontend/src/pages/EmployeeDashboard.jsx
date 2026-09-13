import { useState } from "react";

import EmployeeHeader from "../components/Dashboard/Employee/Header";
import TaskStats from "../components/Dashboard/Employee/TaskStats";
import TaskList from "../components/Dashboard/Employee/TaskList";

export default function EmployeeDashboard() {

  const [activeFilter, setActiveFilter] =
    useState("all");

  // Replace this data with your API data
  const user = {
    name: "Sarthak",
    email: "sarthak@company.com",
  };

  const tasks = [
    {
      id: 1,
      title: "Ek aur task",
      description:
        "Task jaisa kabhi nahi dekha hoga waisa",
      priority: "High",
      date: "20 Feb 2024",
      status: "new",
    },

    {
      id: 2,
      title: "Example task",
      description:
        "Example Aisa kabhi nahi dekha hoga jaisa",
      priority: "High",
      date: "20 Feb 2024",
      status: "completed",
    },

    {
      id: 3,
      title: "Website testing",
      description:
        "Test the employee management website and report issues.",
      priority: "Medium",
      date: "18 Feb 2024",
      status: "accepted",
    },

    {
      id: 4,
      title: "Fix login page",
      description:
        "Review the login page and fix the reported UI problems.",
      priority: "High",
      date: "15 Feb 2024",
      status: "failed",
    },

    {
      id: 5,
      title: "Create dashboard",
      description:
        "Build the employee dashboard according to the provided design.",
      priority: "Medium",
      date: "12 Feb 2024",
      status: "new",
    },

    {
      id: 6,
      title: "Update profile",
      description:
        "Update employee profile information and verify all details.",
      priority: "Low",
      date: "10 Feb 2024",
      status: "completed",
    },
  ];

  const handleLogout = () => {
    console.log("Logout");

    // Example:
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <EmployeeHeader
        user={user}
        onLogout={handleLogout}
      />

      {/* Main */}
      <main className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-8
      ">

        {/* Welcome */}
        <div className="mb-7">


          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Welcome back, {user.name} 
          </h2>

          <p className="text-slate-500 mt-2">
            Here's an overview of your tasks.
          </p>

        </div>

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
        />

      </main>

    </div>
  );
}