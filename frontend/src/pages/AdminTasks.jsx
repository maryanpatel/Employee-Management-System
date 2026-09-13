import { useMemo, useState } from "react";
import { ClipboardList, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

import TaskFilters from "../components/Tasklist/TaskFilters";
import AdminTaskTable from "../components/Tasklist/AdminTaskTable";

export default function AdminTasks() {
  // const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [employee, setEmployee] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Website Testing",
      description: "Test the complete website and report bugs.",
      employee: "Sarthak",
      priority: "High",
      date: "20 Feb 2024",
      status: "completed",
    },
    {
      id: 2,
      title: "Login Page Fix",
      description: "Fix authentication and login validation issues.",
      employee: "Rahul",
      priority: "Medium",
      date: "19 Feb 2024",
      status: "accepted",
    },
    {
      id: 3,
      title: "Database Update",
      description: "Update employee database records.",
      employee: "Priya",
      priority: "High",
      date: "18 Feb 2024",
      status: "new",
    },
    {
      id: 4,
      title: "UI Design",
      description: "Create a modern dashboard interface.",
      employee: "Aman",
      priority: "Low",
      date: "17 Feb 2024",
      status: "failed",
    },
    {
      id: 5,
      title: "API Integration",
      description: "Integrate employee task management APIs.",
      employee: "Sarthak",
      priority: "High",
      date: "21 Feb 2024",
      status: "pending",
    },
    {
      id: 6,
      title: "Mobile Responsive Design",
      description: "Make the dashboard responsive for mobile devices.",
      employee: "Priya",
      priority: "Medium",
      date: "22 Feb 2024",
      status: "pending",
    },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.employee
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || task.status === status;

      const matchesPriority =
        priority === "all" ||
        task.priority === priority;

      const matchesEmployee =
        employee === "all" ||
        task.employee === employee;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesEmployee
      );
    });
  }, [search, status, priority, employee]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <button
            // onClick={() => navigate("/admin/dashboard")}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              hover:text-indigo-600
              transition
              mb-4
            "
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <ClipboardList
                size={25}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                All Tasks
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                View, search and manage all employee tasks
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <TaskFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          employee={employee}
          setEmployee={setEmployee}
        />

        <div className="mt-6">
          <AdminTaskTable tasks={filteredTasks} />
        </div>

      </main>

    </div>
  );
}