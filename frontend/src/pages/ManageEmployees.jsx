import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";

import EmployeeFilters from "../components/EmployeeManage/EmployeeFilters";
import EmployeeTable from "../components/EmployeeManage/EmployeeTable";
import AddEmployeeModal from "../components/Dashboard/Admin/AddEmployeeModal";

export default function ManageEmployees() {
//   const navigate = useNavigate();

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  const employees = [
    {
      id: 1,
      name: "Sarthak",
      email: "sarthak@worksphere.com",
      department: "Development",
      assigned: 28,
      completed: 22,
      pending: 5,
      failed: 1,
      status: "active",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@worksphere.com",
      department: "Testing",
      assigned: 25,
      completed: 18,
      pending: 6,
      failed: 1,
      status: "active",
    },
    {
      id: 3,
      name: "Priya",
      email: "priya@worksphere.com",
      department: "Design",
      assigned: 31,
      completed: 24,
      pending: 5,
      failed: 2,
      status: "active",
    },
    {
      id: 4,
      name: "Aman",
      email: "aman@worksphere.com",
      department: "Development",
      assigned: 20,
      completed: 14,
      pending: 4,
      failed: 2,
      status: "inactive",
    },
    {
      id: 5,
      name: "Neha",
      email: "neha@worksphere.com",
      department: "Marketing",
      assigned: 18,
      completed: 15,
      pending: 3,
      failed: 0,
      status: "active",
    },
    {
      id: 6,
      name: "Arjun",
      email: "arjun@worksphere.com",
      department: "HR",
      assigned: 16,
      completed: 12,
      pending: 3,
      failed: 1,
      status: "active",
    },
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {

      const searchValue = search.toLowerCase();

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(searchValue) ||
        employee.email
          .toLowerCase()
          .includes(searchValue) ||
        employee.department
          .toLowerCase()
          .includes(searchValue);

      const matchesDepartment =
        department === "all" ||
        employee.department === department;

      const matchesStatus =
        status === "all" ||
        employee.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [search, department, status]);

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

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Users
                  size={25}
                  className="text-indigo-600"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Manage Employees
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage employees and monitor their performance
                </p>
              </div>

            </div>

            {/* Add Employee */}
            <button
              onClick={() => setShowAddEmployee(true)}
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                text-sm
                font-semibold
                shadow-sm
                active:scale-95
                transition
              "
            >
              <UserPlus size={17} />
              Add Employee
            </button>

          </div>

        </div>

      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <EmployeeFilters
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          status={status}
          setStatus={setStatus}
        />

        <div className="mt-6">

          <EmployeeTable
            employees={filteredEmployees}
          />

        </div>

      </main>
    {showAddEmployee && (
                    <AddEmployeeModal
                        onClose={() => setShowAddEmployee(false)}
                    />
                )}
    </div>
     
  );
}