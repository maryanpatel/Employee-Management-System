import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function RecentTasks({ tasks = [] }) {

  const statusStyles = {
    new: "bg-blue-100 text-blue-700",
    "in-progress": "bg-amber-100 text-amber-700",
    completed: "bg-emerald-100 text-emerald-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <section className="mt-8">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Tasks
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest task activity
          </p>
        </div>

        <button className="
          text-sm
          font-semibold
          text-blue-600
          hover:text-blue-700
        ">
          View all
        </button>

      </div>

      <div className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        overflow-hidden
        shadow-sm
      ">

        {/* Desktop Header */}
        <div className="
          hidden
          md:grid
          grid-cols-12
          gap-4
          px-5
          py-4
          bg-slate-50
          border-b
          border-slate-200
          text-xs
          font-semibold
          text-slate-500
        ">
          <div className="col-span-4">
            Task
          </div>

          <div className="col-span-2">
            Employee
          </div>

          <div className="col-span-2">
            Priority
          </div>

          <div className="col-span-2">
            Date
          </div>

          <div className="col-span-2">
            Status
          </div>
        </div>

        {/* Scrollable Rows: Displays 4 tasks, scroll down to see more */}
        <div className="max-h-[308px] overflow-y-auto divide-y divide-slate-100 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const employeeName =
                task.employee ||
                task.assignedTo?.fullname ||
                task.assignedTo?.department ||
                task.assignedTo?.employeeId ||
                "Unassigned";

              const displayDate =
                task.date ||
                (task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "No date");

              return (
                <div
                  key={task._id || task.id}
                  className="
                    px-5
                    py-4
                    hover:bg-slate-50
                    transition
                  "
                >

                  {/* Desktop */}
                  <div className="
                    hidden
                    md:grid
                    grid-cols-12
                    gap-4
                    items-center
                  ">

                    <div className="col-span-4">
                      <p className="font-semibold text-slate-800">
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 text-sm text-slate-600">
                      {employeeName}
                    </div>

                    <div className="col-span-2">
                      <span className="text-xs font-semibold text-slate-600 capitalize">
                        {task.priority || "Medium"}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarDays size={14} />
                        {displayDate}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span
                        className={`
                          inline-flex
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${statusStyles[task.status] || "bg-slate-100 text-slate-700"}
                        `}
                      >
                        {task.status}
                      </span>
                    </div>

                  </div>

                  {/* Mobile */}
                  <div className="md:hidden">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {task.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          {employeeName}
                        </p>
                      </div>

                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${statusStyles[task.status] || "bg-slate-100 text-slate-700"}
                        `}
                      >
                        {task.status}
                      </span>

                    </div>

                    {task.description && (
                      <p className="text-sm text-slate-500 mt-3">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">

                      <span className="capitalize">
                        {task.priority || "Medium"} Priority
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={13} />
                        {displayDate}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              No recent tasks found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}