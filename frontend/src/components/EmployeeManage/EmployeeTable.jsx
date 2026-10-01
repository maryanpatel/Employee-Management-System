import {
  Eye,
  Mail,
  ClipboardList,
  Pencil,
  Trash2,
  Briefcase,
  IdCard,
} from "lucide-react";

import EmployeeStatusBadge from "./EmployeeStatusBadge";

export default function EmployeeTable({
  employees = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Team Members
            </h2>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            {employees.length} {employees.length === 1 ? "Employee" : "Employees"}
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Department & Role
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Assigned
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Completed
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Failed
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {employees.map((employee) => {
              const empName = employee.name || employee.user?.fullname || "Unknown Employee";
              const empEmail = employee.email || employee.user?.email || "";
              const empId = employee.employeeId || employee.id || "EMP";
              const empInitial = empName.charAt(0).toUpperCase() || "E";
              const empDept = employee.department || "General";
              const empDesignation = employee.designation || "";
              const assigned = employee.assigned ?? 0;
              const completed = employee.completed ?? 0;
              const pending = employee.pending ?? 0;
              const failed = employee.failed ?? 0;
              const status = employee.status || "active";

              return (
                <tr
                  key={employee.id || employee._id || empId}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* Employee */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200/60 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                        {empInitial}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-sm truncate">
                            {empName}
                          </p>
                          {employee.employeeId && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {employee.employeeId}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                          <Mail size={12} className="shrink-0 text-slate-400" />
                          <span className="truncate">{empEmail}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800">
                        {empDept}
                      </span>
                      {empDesignation && (
                        <span className="text-xs text-slate-400 mt-0.5">
                          {empDesignation}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Assigned */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-slate-700">
                      {assigned}
                    </span>
                  </td>

                  {/* Completed */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-emerald-600">
                      {completed}
                    </span>
                  </td>

                  {/* Pending */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-amber-600">
                      {pending}
                    </span>
                  </td>

                  {/* Failed */}
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-red-600">
                      {failed}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <EmployeeStatusBadge status={status} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(employee)}
                          title="View Employee Details"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1.5
                            rounded-lg
                            bg-slate-50
                            border
                            border-slate-200
                            text-slate-600
                            text-xs
                            font-medium
                            hover:bg-indigo-50
                            hover:text-indigo-600
                            hover:border-indigo-200
                            transition
                            cursor-pointer
                          "
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </button>
                      )}

                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(employee)}
                          title="Edit Employee"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1.5
                            rounded-lg
                            bg-slate-50
                            border
                            border-slate-200
                            text-slate-600
                            text-xs
                            font-medium
                            hover:bg-blue-50
                            hover:text-blue-600
                            hover:border-blue-200
                            transition
                            cursor-pointer
                          "
                        >
                          <Pencil size={14} />
                          <span>Edit</span>
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(employee)}
                          title="Delete Employee"
                          className="
                            inline-flex
                            items-center
                            p-1.5
                            rounded-lg
                            bg-slate-50
                            border
                            border-slate-200
                            text-slate-500
                            hover:bg-red-50
                            hover:text-red-600
                            hover:border-red-200
                            transition
                            cursor-pointer
                          "
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-100">
        {employees.map((employee) => {
          const empName = employee.name || employee.user?.fullname || "Unknown Employee";
          const empEmail = employee.email || employee.user?.email || "";
          const empId = employee.employeeId || employee.id || "EMP";
          const empInitial = empName.charAt(0).toUpperCase() || "E";
          const empDept = employee.department || "General";
          const empDesignation = employee.designation || "";
          const assigned = employee.assigned ?? 0;
          const completed = employee.completed ?? 0;
          const pending = employee.pending ?? 0;
          const failed = employee.failed ?? 0;
          const status = employee.status || "active";

          return (
            <div
              key={employee.id || employee._id || empId}
              className="p-5 hover:bg-slate-50/60 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-200/60 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                    {empInitial}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {empName}
                      </h3>
                      {employee.employeeId && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {employee.employeeId}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {empEmail}
                    </p>
                  </div>
                </div>

                <EmployeeStatusBadge status={status} />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <Briefcase size={14} className="text-slate-400" />
                <span className="font-medium">{empDept}</span>
                {empDesignation && <span>• {empDesignation}</span>}
              </div>

              {/* Task Stats */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                  <p className="text-[11px] text-slate-400">Assigned</p>
                  <p className="font-bold text-slate-700 mt-0.5">{assigned}</p>
                </div>

                <div className="bg-emerald-50/70 rounded-xl p-2 text-center border border-emerald-100">
                  <p className="text-[11px] text-emerald-600">Done</p>
                  <p className="font-bold text-emerald-700 mt-0.5">{completed}</p>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-2 text-center border border-amber-100">
                  <p className="text-[11px] text-amber-600">Pending</p>
                  <p className="font-bold text-amber-700 mt-0.5">{pending}</p>
                </div>

                <div className="bg-red-50/70 rounded-xl p-2 text-center border border-red-100">
                  <p className="text-[11px] text-red-500">Failed</p>
                  <p className="font-bold text-red-600 mt-0.5">{failed}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                {onView && (
                  <button
                    type="button"
                    onClick={() => onView(employee)}
                    className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      py-2
                      rounded-xl
                      bg-slate-50
                      border
                      border-slate-200
                      text-slate-700
                      text-xs
                      font-semibold
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      transition
                      cursor-pointer
                    "
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                )}

                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      py-2
                      rounded-xl
                      bg-slate-50
                      border
                      border-slate-200
                      text-slate-700
                      text-xs
                      font-semibold
                      hover:bg-blue-50
                      hover:text-blue-600
                      transition
                      cursor-pointer
                    "
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(employee)}
                    className="
                      p-2
                      rounded-xl
                      bg-slate-50
                      border
                      border-slate-200
                      text-slate-500
                      hover:bg-red-50
                      hover:text-red-600
                      transition
                      cursor-pointer
                    "
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {employees.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <ClipboardList size={22} />
          </div>

          <p className="font-semibold text-slate-800 mt-4">
            No employees found
          </p>

          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or filter options to find team members.
          </p>
        </div>
      )}
    </div>
  );
}