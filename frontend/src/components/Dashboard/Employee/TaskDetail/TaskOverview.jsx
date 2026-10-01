import { FileText, Check, CheckCircle2 } from "lucide-react";
import { statusConfig, priorityColors, getDueTimeStatus } from "./taskDetailUtils";

export default function TaskOverview({ task }) {
  if (!task) return null;

  const currentStatus = statusConfig[task.status] || statusConfig.new;
  const StatusIcon = currentStatus.icon;

  const normalizedPriority = (task.priority || "medium").toLowerCase();
  const priorityBadgeStyle =
    priorityColors[normalizedPriority] || priorityColors.medium;

  const dueInfo = getDueTimeStatus(task.dueDate);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Badges Bar */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentStatus.bg}`}
        >
          <StatusIcon size={14} />
          {currentStatus.label}
        </span>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider ${priorityBadgeStyle}`}
        >
          {task.priority || "Medium"} Priority
        </span>

      </div>

      {/* Task Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
        {task.title}
      </h1>


      {/* Description Section */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-3">
          <h3>Task Description</h3>
        </div>

        {task.description ? (
          <div className="text-slate-700 text-base leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-200/60 whitespace-pre-wrap">
            {task.description}
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400 italic text-sm">
            No detailed description provided by the assigner.
          </div>
        )}
      </div>
    </div>
  );
}
