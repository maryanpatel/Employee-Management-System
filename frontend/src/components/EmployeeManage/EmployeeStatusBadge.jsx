export default function EmployeeStatusBadge({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    inactive: "bg-slate-100 text-slate-500 border-slate-200",
  };

  const labels = {
    active: "Active",
    inactive: "Inactive",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${
        styles[status] ||
        "bg-slate-50 text-slate-600 border-slate-100"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "active"
            ? "bg-emerald-500"
            : "bg-slate-400"
        }`}
      />

      {labels[status] || status}
    </span>
  );
}