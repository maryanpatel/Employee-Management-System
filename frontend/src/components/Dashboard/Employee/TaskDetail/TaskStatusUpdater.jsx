import { Sparkles, PlayCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function TaskStatusUpdater({
  status,
  onUpdateStatus,
  updating,
}) {
  const isInProgress = status === "in-progress";
  const isCompleted = status === "completed";
  const isNew = status === "new";

  // Accept button is ONLY enabled when task is new
  const canAccept = isNew && !updating;

  // Complete button is ONLY enabled when task is in-progress
  const canComplete = isInProgress && !updating;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Update Task Status
          </h3>
        </div>

        {updating && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
            Updating...
          </div>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
        {/* 1. Accept Task Button -> sets status to in-progress */}
        <button
          type="button"
          disabled={!canAccept}
          onClick={() => onUpdateStatus("in-progress")}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl font-semibold text-sm transition-all shadow-sm ${
            isInProgress
              ? "bg-amber-500/10 text-amber-700 border border-amber-300 cursor-default"
              : isCompleted || status === "failed"
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
          }`}
        >
          {isInProgress ? "Task In Progress" : "Accept Task"}
        </button>

        {/* 2. Complete Task Button (Enabled ONLY after Accept) */}
        <button
          type="button"
          disabled={!canComplete}
          onClick={() => onUpdateStatus("completed")}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl font-semibold text-sm transition-all shadow-sm ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-700 border border-emerald-300 cursor-default"
              : canComplete
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
        >
          
          {isCompleted
            ? "Task Completed"
            : "Mark as Completed"
            }
        </button>
      </div>
    </div>
  );
}
