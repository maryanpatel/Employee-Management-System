import { MoreHorizontal } from "lucide-react";

export default function EmployeePerformance({ employees = [], tasks = [] }) {
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
    const completed = empTasks.filter((t) => t.status === "completed").length;
    const pending = empTasks.filter(
      (t) => t.status === "in-progress" || t.status === "new"
    ).length;
    const failed = empTasks.filter((t) => t.status === "failed").length;

    const rate =
      assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

    return { id: empId, name, email, initial: name.charAt(0).toUpperCase() || "E", assigned, completed, pending, failed, rate };
  });

  return (
    <section className="mt-8 mb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employee Performance</h2>
        </div>

      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          <div className="col-span-4">Employee</div>
          <div className="col-span-2">Assigned</div>
          <div className="col-span-2">Completed</div>
          <div className="col-span-2">Pending</div>
          <div className="col-span-2">Failed</div>
        </div>

        {/* Rows */}
        {employeeList.length > 0 ? (
          employeeList.map((employee) => (
            <div
              key={employee.id}
              className="px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-12 items-center gap-4">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                    {employee.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{employee.name}</p>
                    <p className="text-xs text-slate-400">{employee.email}</p>
                  </div>
                </div>

                <div className="col-span-2 text-sm text-slate-600 font-medium">{employee.assigned}</div>

                <div className="col-span-2">
                  <span className="text-sm font-semibold text-emerald-600">{employee.completed}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-sm font-semibold text-amber-600">{employee.pending}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-sm font-semibold text-red-500">{employee.failed}</span>
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                    {employee.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{employee.name}</p>
                    <p className="text-xs text-slate-400 truncate">{employee.email}</p>
                  </div>
                  <MoreHorizontal size={18} className="text-slate-300 shrink-0" />
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[
                    { label: "Assigned", value: employee.assigned, color: "text-slate-700" },
                    { label: "Done", value: employee.completed, color: "text-emerald-600" },
                    { label: "Pending", value: employee.pending, color: "text-amber-600" },
                    { label: "Failed", value: employee.failed, color: "text-red-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className={`font-bold mt-0.5 ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">No employees found</div>
        )}
      </div>
    </section>
  );
}