import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function RecentTasks({ tasks }) {

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

        {/* Rows */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="
              px-5
              py-4
              border-b
              border-slate-100
              last:border-0
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

                <p className="text-xs text-slate-500 mt-1">
                  {task.description}
                </p>
              </div>

              <div className="col-span-2 text-sm text-slate-600">
                {task.employee}
              </div>

              <div className="col-span-2">
                <span className="text-xs font-semibold text-slate-600">
                  {task.priority}
                </span>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays size={14} />
                  {task.date}
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
                    ${statusStyles[task.status]}
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
                    {task.employee}
                  </p>
                </div>

                <span
                  className={`
                    px-2.5
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${statusStyles[task.status]}
                  `}
                >
                  {task.status}
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-3">
                {task.description}
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">

                <span>
                  {task.priority} Priority
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={13} />
                  {task.date}
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}