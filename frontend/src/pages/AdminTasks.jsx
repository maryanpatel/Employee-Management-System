import { useMemo, useState, useEffect} from "react";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation  } from "react-router-dom";

import TaskFilters from "../components/Tasklist/TaskFilters";
import AdminTaskTable from "../components/Tasklist/AdminTaskTable";

export default function AdminTasks() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [employee, setEmployee] = useState("all");
  const [totaltasks, setTotaltasks] = useState([])
  const [allemployees, setAllemployees] = useState([])

 useEffect(() => {
    const tasks = location.state?.totaltasks || [];
    const employees = location.state?.allemployees || [];
    setTotaltasks(tasks);
    setAllemployees(employees)
    console.log("in useeffect")
  }, [location.state]);

  const filteredTasks = useMemo(() => {
    return totaltasks.filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.assignedTo.user.fullname
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || task.status === status;

      const matchesPriority =
        priority === "all" ||
        task.priority === priority;

      const matchesEmployee =
        employee === "all" ||
        task.assignedTo.user.fullname === employee;

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
            onClick={() => navigate("/admin/dashboard")}
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
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                All Tasks
              </h1>
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
          allemployees = {allemployees}
        />

        <div className="mt-6">
          <AdminTaskTable tasks={filteredTasks?.length > 0 ? filteredTasks : totaltasks} />
        </div>

      </main>

    </div>
  );
}