import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const icons = {
  new: ClipboardList,
  "in-progress": Clock3,
  completed: CheckCircle2,
  failed: XCircle,
};

const styles = {
  new: {
    icon: "bg-blue-100 text-blue-600",
    count: "text-blue-700",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  "in-progress": {
    icon: "bg-amber-100 text-amber-600",
    count: "text-amber-700",
    badge: "bg-amber-50 text-amber-600 border-amber-100",
  },
  completed: {
    icon: "bg-emerald-100 text-emerald-600",
    count: "text-emerald-700",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  failed: {
    icon: "bg-red-100 text-red-600",
    count: "text-red-700",
    badge: "bg-red-50 text-red-600 border-red-100",
  },
};

export default function StatCard({ title, count, type, active, onClick }) {
  const Icon = icons[type] || icons.new;
  const style = styles[type] || styles.new;

  return (
    <button
      onClick={onClick}
      className={`
        text-left w-full bg-white border border-slate-200/90 rounded-3xl p-5
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer
        ${active ? "ring-2 ring-indigo-400 ring-offset-2 shadow-md" : ""}
      `}
    >
      <div className="mt-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className={`text-3xl font-extrabold mt-3 tracking-tight ${style.count}`}>
          {count}
        </p>
      </div>
    </button>
  );
}