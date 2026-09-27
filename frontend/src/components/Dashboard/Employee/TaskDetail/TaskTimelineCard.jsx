import { Calendar } from "lucide-react";
import { formatDate, getDueTimeStatus } from "./taskDetailUtils";

export default function TaskTimelineCard({ dueDate, createdAt, updatedAt }) {
  const dueInfo = getDueTimeStatus(dueDate);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
        <Calendar size={16} className="text-emerald-600" />
        Timeline & Deadlines
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs font-medium text-slate-400">Due Date</div>
            <div className="font-bold text-slate-800 mt-0.5">
              {formatDate(dueDate)}
            </div>
          </div>
          {dueInfo && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${dueInfo.color}`}
            >
              {dueInfo.label}
            </span>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="text-xs font-medium text-slate-400">Created Date</div>
          <div className="font-semibold text-slate-700 mt-0.5 text-xs">
            {formatDate(createdAt)}
          </div>
        </div>

        {updatedAt && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-400">
              Last Updated
            </div>
            <div className="font-semibold text-slate-700 mt-0.5 text-xs">
              {formatDate(updatedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
