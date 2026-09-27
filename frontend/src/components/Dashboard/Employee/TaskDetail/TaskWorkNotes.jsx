import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

export default function TaskWorkNotes({ taskId, onSaveNotification }) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!taskId) return;
    const stored = localStorage.getItem(`task_notes_${taskId}`) || "";
    setNotes(stored);
  }, [taskId]);

  const handleSave = () => {
    if (!taskId) return;
    localStorage.setItem(`task_notes_${taskId}`, notes);
    if (onSaveNotification) {
      onSaveNotification("Your personal work notes have been saved.");
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          My Work Notes
        </h3>
        <span className="text-xs text-slate-400">Saved on your device</span>
      </div>

      <textarea
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Jot down notes, blockers, or reference links for this task..."
        className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
        >
          Save Notes
        </button>
      </div>
    </div>
  );
}
