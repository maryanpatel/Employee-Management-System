import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onViewTask }) {
  const navigate = useNavigate();

  const handleView = () => {
    if (onViewTask) {
      onViewTask(task);
    } else {
      navigate(`/employee/tasks/${task._id || task.id}`, { state: { task } });
    }
  };

  const statusStyles = {
    new: { badge: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
    "in-progress": { badge: "bg-amber-100 text-amber-700 border-amber-200", label: "In Progress" },
    completed: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Completed" },
    failed: { badge: "bg-red-100 text-red-700 border-red-200", label: "Failed" },
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const style = statusStyles[task.status] || statusStyles.new;
  const normalizedPriority = task.priority
    ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()
    : "Medium";
  const priorityClass = priorityStyles[normalizedPriority] || priorityStyles.Medium;

  const displayDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : task.date || "No date";

  return (
    <article className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${priorityClass}`}>
          {normalizedPriority}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays size={13} />
          {displayDate}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-slate-900 leading-snug">{task.title}</h3>
        <span className={`shrink-0 hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
          {style.label}
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-5 flex items-center justify-between">
        <span className={`sm:hidden text-xs font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
          {style.label}
        </span>
        <button
          type="button"
          onClick={handleView}
          className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition group cursor-pointer"
        >
          View task
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}