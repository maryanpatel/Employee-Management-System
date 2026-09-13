export default function TaskStatusBadge({ status }) {
  const styles = {
    new: "bg-blue-50 text-blue-600 border-blue-100",
    accepted: "bg-indigo-50 text-indigo-600 border-indigo-100",
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    failed: "bg-red-50 text-red-600 border-red-100",
  };

  const labels = {
    new: "New",
    accepted: "Accepted",
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-100"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}