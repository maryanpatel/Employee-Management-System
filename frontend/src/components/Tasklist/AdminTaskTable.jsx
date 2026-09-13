import {
  Eye,
  CalendarDays,
  User,
} from "lucide-react";

import TaskStatusBadge from "./TaskStatusBadge";

export default function AdminTaskTable({ tasks }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              All Tasks
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage and monitor all employee tasks
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {tasks.length} tasks
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Task
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Employee
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Priority
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Due Date
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
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">
                    {task.title}
                  </p>

                  <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">
                    {task.description}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <User
                        size={15}
                        className="text-indigo-600"
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {task.employee}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-semibold ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays size={15} />
                    {task.date}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <TaskStatusBadge status={task.status} />
                </td>

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

        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-5 hover:bg-slate-50 transition"
          >
            <div className="flex items-start justify-between gap-3">

              <div>
                <h3 className="font-semibold text-slate-900">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {task.description}
                </p>
              </div>

              <TaskStatusBadge status={task.status} />

            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">

              <span className="flex items-center gap-1.5">
                <User size={14} />
                {task.employee}
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} />
                {task.date}
              </span>

              <span
                className={`font-semibold ${
                  task.priority === "High"
                    ? "text-red-600"
                    : task.priority === "Medium"
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {task.priority}
              </span>

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
              View Task
            </button>
          </div>
        ))}

      </div>

      {/* Empty */}
      {tasks.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-semibold text-slate-700">
            No tasks found
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Try changing your search or filters.
          </p>
        </div>
      )}

    </div>
  );
}