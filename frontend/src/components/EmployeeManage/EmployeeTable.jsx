import {
  Eye,
  Mail,
  ClipboardList,
} from "lucide-react";

import EmployeeStatusBadge from "./EmployeeStatusBadge";

export default function EmployeeTable({ employees }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Employees
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage and monitor all employees
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {employees.length} employees
          </span>

        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Employee
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Department
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Assigned
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Completed
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Pending
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Failed
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Status
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Action
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {employees.map((employee) => (

              <tr
                key={employee.id}
                className="hover:bg-slate-50 transition"
              >

                {/* Employee */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {employee.name.charAt(0)}
                    </div>

                    <div>

                      <p className="font-semibold text-slate-900">
                        {employee.name}
                      </p>

                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <Mail size={12} />
                        {employee.email}
                      </div>

                    </div>

                  </div>

                </td>

                {/* Department */}
                <td className="px-6 py-4">

                  <span className="text-sm text-slate-600">
                    {employee.department}
                  </span>

                </td>

                {/* Assigned */}
                <td className="px-6 py-4 text-center">

                  <span className="text-sm font-semibold text-slate-700">
                    {employee.assigned}
                  </span>

                </td>

                {/* Completed */}
                <td className="px-6 py-4 text-center">

                  <span className="text-sm font-semibold text-emerald-600">
                    {employee.completed}
                  </span>

                </td>

                {/* Pending */}
                <td className="px-6 py-4 text-center">

                  <span className="text-sm font-semibold text-amber-600">
                    {employee.pending}
                  </span>

                </td>

                {/* Failed */}
                <td className="px-6 py-4 text-center">

                  <span className="text-sm font-semibold text-red-600">
                    {employee.failed}
                  </span>

                </td>

                {/* Status */}
                <td className="px-6 py-4">

                  <EmployeeStatusBadge
                    status={employee.status}
                  />

                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">

                  <button
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-lg
                      bg-slate-50
                      border
                      border-slate-200
                      text-slate-600
                      text-xs
                      font-semibold
                      hover:bg-indigo-50
                      hover:text-indigo-600
                      hover:border-indigo-100
                      transition
                    "
                  >
                    <Eye size={15} />
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-100">

        {employees.map((employee) => (

          <div
            key={employee.id}
            className="p-5 hover:bg-slate-50 transition"
          >

            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {employee.name.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {employee.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {employee.email}
                  </p>

                </div>

              </div>

              <EmployeeStatusBadge
                status={employee.status}
              />

            </div>

            <div className="mt-4">

              <p className="text-sm text-slate-600">
                {employee.department}
              </p>

            </div>

            {/* Task Stats */}
            <div className="grid grid-cols-4 gap-2 mt-4">

              <div className="bg-slate-50 rounded-xl p-2 text-center">
                <p className="text-xs text-slate-400">
                  Assigned
                </p>

                <p className="font-bold text-slate-700 mt-1">
                  {employee.assigned}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-2 text-center">
                <p className="text-xs text-emerald-500">
                  Done
                </p>

                <p className="font-bold text-emerald-600 mt-1">
                  {employee.completed}
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-2 text-center">
                <p className="text-xs text-amber-500">
                  Pending
                </p>

                <p className="font-bold text-amber-600 mt-1">
                  {employee.pending}
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-2 text-center">
                <p className="text-xs text-red-500">
                  Failed
                </p>

                <p className="font-bold text-red-600 mt-1">
                  {employee.failed}
                </p>
              </div>

            </div>

            <button
              className="
                mt-4
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-3
                py-2.5
                rounded-xl
                bg-slate-50
                border
                border-slate-200
                text-slate-600
                text-sm
                font-semibold
                hover:bg-indigo-50
                hover:text-indigo-600
                transition
              "
            >
              <Eye size={16} />
              View Employee
            </button>

          </div>

        ))}

      </div>

      {/* Empty State */}
      {employees.length === 0 && (
        <div className="py-16 text-center">

          <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center">
            <ClipboardList
              size={22}
              className="text-slate-400"
            />
          </div>

          <p className="font-semibold text-slate-700 mt-4">
            No employees found
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Try changing your search or filters.
          </p>

        </div>
      )}

    </div>
  );
}