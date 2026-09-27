import {
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

export default function EmployeePerformance({
  employees = [],
  tasks = [],
}) {
  const employeeList = (employees || []).map((employee, index) => {
    const name =
      employee.user?.fullname ||
      employee.fullname ||
      employee.name ||
      "Unknown Employee";
    const email = employee.user?.email || employee.email || "";
    const empId = employee._id || employee.id || `emp-${index}`;

    const empTasks = (tasks || []).filter(
      (t) =>
        t.assignedTo?._id === empId ||
        t.assignedTo === empId ||
        (employee.employeeId && t.assignedTo?.employeeId === employee.employeeId)
    );

    const assigned = employee.assigned ?? empTasks.length;
    const completed =
      empTasks.filter((t) => t.status === "completed").length;
    const pending =
      empTasks.filter((t) => t.status === "in-progress" || t.status === "new")
        .length;
    const failed =
      empTasks.filter((t) => t.status === "failed").length;

    return {
      id: empId,
      name,
      email,
      initial: name.charAt(0).toUpperCase() || "E",
      assigned,
      completed,
      pending,
      failed,
    };
  });

  return (
    <section className="mt-8">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Employee Performance
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of employee task performance
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

        {/* Header */}
        <div className="
          hidden
          md:grid
          grid-cols-12
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
            Employee
          </div>

          <div className="col-span-2">
            Assigned
          </div>

          <div className="col-span-2">
            Completed
          </div>

          <div className="col-span-2">
            Pending
          </div>

          <div className="col-span-2">
            Failed
          </div>

        </div>

        {/* Employees */}
        {employeeList.length > 0 ? (
          employeeList.map((employee) => (
            <div
              key={employee.id}
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
                items-center
              ">

                <div className="col-span-4 flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    font-bold
                  ">
                    {employee.initial}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.email}
                    </p>
                  </div>

                </div>

                <div className="col-span-2 text-sm text-slate-600">
                  {employee.assigned}
                </div>

                <div className="col-span-2 text-sm font-semibold text-emerald-600">
                  {employee.completed}
                </div>

                <div className="col-span-2 text-sm font-semibold text-amber-600">
                  {employee.pending}
                </div>

                <div className="col-span-2 text-sm font-semibold text-red-600">
                  {employee.failed}
                </div>

              </div>

              {/* Mobile */}
              <div className="md:hidden">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    flex
                    items-center
                    justify-center
                    font-bold
                  ">
                    {employee.initial}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.email}
                    </p>
                  </div>

                  <MoreHorizontal
                    size={19}
                    className="text-slate-400"
                  />

                </div>

                <div className="
                  grid
                  grid-cols-4
                  gap-2
                  mt-4
                ">

                  <div>
                    <p className="text-xs text-slate-400">
                      Assigned
                    </p>

                    <p className="font-semibold text-slate-700">
                      {employee.assigned}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Completed
                    </p>

                    <p className="font-semibold text-emerald-600">
                      {employee.completed}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Pending
                    </p>

                    <p className="font-semibold text-amber-600">
                      {employee.pending}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Failed
                    </p>

                    <p className="font-semibold text-red-600">
                      {employee.failed}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400 text-sm">
            No employees found
          </div>
        )}

      </div>

    </section>
  );
}