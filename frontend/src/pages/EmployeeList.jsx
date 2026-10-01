import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users,
  ArrowLeft,
  UserPlus,
  UserCheck,
  UserX,
  Briefcase,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "../api/axiosInstance";
import EmployeeFilters from "../components/EmployeeManage/EmployeeFilters";
import EmployeeTable from "../components/EmployeeManage/EmployeeTable";
import AddEmployeeModal from "../components/Dashboard/Admin/AddEmployeeModal";
import EditEmployeeModal from "../components/EmployeeManage/EditEmployeeModal";
import EmployeeDetailsModal from "../components/EmployeeManage/EmployeeDetailsModal";
import DeleteEmployeeModal from "../components/EmployeeManage/DeleteEmployeeModal";

export default function EmployeeList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rawEmployees, setRawEmployees] = useState(
    location.state?.allemployees || []
  );
  const [tasks, setTasks] = useState(location.state?.totaltasks || []);
  const [loading, setLoading] = useState(
    !(location.state?.allemployees && location.state.allemployees.length > 0)
  );
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Filters state
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const fetchEmployeesAndTasks = useCallback(async () => {
    try {
      const [empRes, taskRes] = await Promise.all([
        api.get("/employee/all"),
        api.get("/tasks/").catch(() => ({ data: { tasks: [] } })),
      ]);

      setRawEmployees(empRes.data?.employees || []);
      setTasks(taskRes.data?.tasks || []);
      setError("");
    } catch (err) {
      console.error("Failed to load employees:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load employees. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployeesAndTasks();
  }, [fetchEmployeesAndTasks]);

  // Normalize employees with computed task statistics
  const normalizedEmployees = useMemo(() => {
    return (rawEmployees || []).map((emp, index) => {
      const empDbId = emp._id || emp.id || `emp-${index}`;
      const empCode = emp.employeeId || "";
      const name =
        emp.user?.fullname || emp.fullname || emp.name || "Unknown Employee";
      const email = emp.user?.email || emp.email || "";
      const phone =
        emp.user?.phonenumber || emp.phonenumber || emp.phone || "";
      const dept = emp.department || "General";
      const designation = emp.designation || "";
      const empStatus = emp.status || "active";
      const joiningDate = emp.joiningDate;

      // Filter tasks for this employee
      const empTasks = (tasks || []).filter(
        (t) =>
          t.assignedTo?._id === empDbId ||
          t.assignedTo === empDbId ||
          (empCode && t.assignedTo?.employeeId === empCode)
      );

      const assigned = empTasks.length;
      const completed = empTasks.filter((t) => t.status === "completed").length;
      const pending = empTasks.filter(
        (t) => t.status === "in-progress" || t.status === "new"
      ).length;
      const failed = empTasks.filter((t) => t.status === "failed").length;

      return {
        id: empDbId,
        _id: empDbId,
        raw: emp,
        employeeId: empCode,
        name,
        email,
        phone,
        department: dept,
        designation,
        status: empStatus,
        joiningDate,
        assigned,
        completed,
        pending,
        failed,
      };
    });
  }, [rawEmployees, tasks]);

  // Dynamic departments list
  const availableDepartments = useMemo(() => {
    const defaultDepts = ["Development", "Design", "Testing", "Marketing", "HR"];
    const fromData = normalizedEmployees
      .map((e) => e.department)
      .filter(Boolean);
    return Array.from(new Set([...defaultDepts, ...fromData]));
  }, [normalizedEmployees]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return normalizedEmployees.filter((emp) => {
      const matchesSearch =
        search.trim() === "" ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase()) ||
        emp.designation.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        department === "all" || emp.department === department;

      const matchesStatus =
        status === "all" || emp.status === status;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [normalizedEmployees, search, department, status]);

  // Aggregate metrics
  const metrics = useMemo(() => {
    const total = normalizedEmployees.length;
    const active = normalizedEmployees.filter((e) => e.status === "active").length;
    const inactive = normalizedEmployees.filter((e) => e.status === "inactive").length;
    const uniqueDepts = new Set(
      normalizedEmployees.map((e) => e.department).filter(Boolean)
    ).size;

    return { total, active, inactive, departments: uniqueDepts };
  }, [normalizedEmployees]);

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[110] flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/20 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="bg-white border-b border-slate-200">
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
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Users size={25} className="text-indigo-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Manage Employees
                </h1>
               
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={fetchEmployeesAndTasks}
                title="Refresh list"
                className="
                  p-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  hover:bg-slate-50
                  hover:text-slate-900
                  transition
                  cursor-pointer
                "
              >
                <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="
                  flex
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
                  cursor-pointer
                "
              >
                <UserPlus size={17} />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchEmployeesAndTasks}
              className="font-semibold underline hover:text-red-900 text-xs ml-4"
            >
              Retry
            </button>
          </div>
        )}


        {/* Filters */}
        <EmployeeFilters
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          status={status}
          setStatus={setStatus}
          departments={availableDepartments}
        />

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
            <p className="text-sm text-slate-500 font-medium mt-4">
              Loading employee records...
            </p>
          </div>
        ) : (
          /* Employee Table */
          <EmployeeTable
            employees={filteredEmployees}
            onView={(emp) => setSelectedEmployee(emp)}
            onEdit={(emp) => setEditingEmployee(emp)}
            onDelete={(emp) => setDeletingEmployee(emp)}
          />
        )}
      </main>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onEmployeeAdded={() => {
            fetchEmployeesAndTasks();
            showToast("New employee added successfully!");
          }}
        />
      )}

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={(emp) => {
            setSelectedEmployee(null);
            setEditingEmployee(emp);
          }}
        />
      )}

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onEmployeeUpdated={() => {
            fetchEmployeesAndTasks();
            showToast("Employee details updated successfully!");
          }}
        />
      )}

      {/* Delete Employee Confirmation Modal */}
      {deletingEmployee && (
        <DeleteEmployeeModal
          employee={deletingEmployee}
          onClose={() => setDeletingEmployee(null)}
          onEmployeeDeleted={() => {
            fetchEmployeesAndTasks();
            showToast("Employee deleted successfully!");
          }}
        />
      )}
    </div>
  );
}
