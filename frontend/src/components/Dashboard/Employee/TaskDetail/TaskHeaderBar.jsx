import { useState } from "react";
import { ArrowLeft, Copy, Check, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TaskHeaderBar({
  taskId,
  onBack,
  statusMessage,
  onDismissMessage,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (!taskId) return;
    navigator.clipboard.writeText(taskId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Navigation & Copy Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl px-6 py-4 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition">
            <ArrowLeft size={16} />
          </div>
          <span>Back to All Tasks</span>
        </button>

        <button
          type="button"
          onClick={handleCopyId}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          title="Copy Task ID"
        >
          {copied ? (
            <Check size={14} className="text-emerald-600" />
          ) : (
            <Copy size={14} />
          )}
          <span>{copied ? "Copied ID" : "Copy Task ID"}</span>
        </button>
      </div>

      {/* Dynamic Status / Alert Banner */}
      {statusMessage?.text && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={18} className="text-rose-600 shrink-0" />
            )}
            <p className="text-sm font-medium">{statusMessage.text}</p>
          </div>
          {onDismissMessage && (
            <button
              type="button"
              onClick={onDismissMessage}
              className="text-xs font-semibold underline ml-4 hover:opacity-80 cursor-pointer"
            >
              Dismiss
            </button>
          )}
        </div>
      )}
    </div>
  );
}
