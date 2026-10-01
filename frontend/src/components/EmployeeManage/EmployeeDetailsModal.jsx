import {
  X,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  BadgeCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pencil,
  BarChart3,
} from "lucide-react";
import EmployeeStatusBadge from "./EmployeeStatusBadge";

export default function EmployeeDetailsModal({
  employee,
  onClose,
  onEdit,
}) {
  if (!employee) return null;

  const empName = employee.name || employee.user?.fullname || "Employee";
  const empEmail = employee.email || employee.user?.email || "No email";
  const empPhone = employee.phone || employee.user?.phonenumber || "Not provided";
  const empId = employee.employeeId || "N/A";
  const empDept = employee.department || "General";
  const empDesignation = employee.designation || "Team Member";
  const empInitial = empName.charAt(0).toUpperCase() || "E";
  const status = employee.status || "active";

  const assigned = employee.assigned ?? 0;
  const completed = employee.completed ?? 0;
  const pending = employee.pending ?? 0;
  const failed = employee.failed ?? 0;
  const rate = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

  const joiningDate = employee.joiningDate
    ? new Date(employee.joiningDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not available";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      {/* Modal Card */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-white/60
          animate-in
          fade-in
          zoom-in
          duration-200
        "
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 sm:p-8 text-white rounded-t-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white blur-2xl" />
            <div className="absolute -bottom-8 right-0 w-48 h-48 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-extrabold shadow-inner shrink-0">
                {empInitial}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {empName}
                  </h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/20 text-white font-medium">
                    {empId}
                  </span>
                </div>
                <p className="text-indigo-100 text-sm mt-0.5">
                  {empDesignation} • {empDept}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-xl
                bg-white/10
                hover:bg-white/20
                text-white
                transition
                cursor-pointer
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Status & Quick Info */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Account Status:
              </span>
              <EmployeeStatusBadge status={status} />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar size={14} className="text-slate-400" />
              <span>Joined: {joiningDate}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide text-xs text-slate-400">
              Contact & Department Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-medium">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                    {empEmail}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                  <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                    {empPhone}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Briefcase size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-medium">Department</p>
                  <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                    {empDept}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BadgeCheck size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-medium">Employee Id</p>
                  <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                    {empId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Task Metrics */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-xs text-slate-400">
                Task Performance
              </h3>
              <span className="text-xs font-bold text-indigo-600">
                {rate}% Completion Rate
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${rate}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center">
                <p className="text-xs text-slate-400 font-medium">Assigned</p>
                <p className="text-xl font-bold text-slate-800 mt-1">{assigned}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400">
                  <p className="text-xs font-semibold">Completed</p>
                </div>
                <p className="text-xl font-bold text-emerald-700 mt-1">{completed}</p>
              </div>

              <div className="bg-slate-50 borde border-slate-200/80 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400">
              
                  <p className="text-xs font-semibold">Pending</p>
                </div>
                <p className="text-xl font-bold text-amber-700 mt-1">{pending}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400">
                  
                  <p className="text-xs font-semibold">Failed</p>
                </div>
                <p className="text-xl font-bold text-red-600 mt-1">{failed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-100 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-white
              border
              border-slate-200
              text-slate-600
              font-semibold
              text-sm
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            Close
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
                text-sm
                shadow-sm
                active:scale-95
                transition
                cursor-pointer
              "
            >
              <Pencil size={15} />
              Edit Employee
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
