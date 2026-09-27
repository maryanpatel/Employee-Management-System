import {
  Users,
  ClipboardList,
  PlusCircle,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const icons = {
  employees: Users,
  tasks: ClipboardList,
  new: PlusCircle,
  pending: Clock3,
  completed: CheckCircle2,
  failed: XCircle,
};

const styles = {
  employees: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },

  tasks: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    text: "text-indigo-700",
  },

  new: {
    bg: "bg-sky-50",
    border: "border-sky-100",
    text: "text-sky-700",
  },

  accepted: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-700",
  },

  pending: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-700",
  },

  "in-progress": {
    bg: "bg-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
  },

  completed: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-700",
  },

  failed: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-700",
  },
};

export default function AdminStatCard({
  title,
  count,
  description,
  type,
}) {
  const Icon = icons[type] || icons.new;
  const style = styles[type] || styles.new || {
    bg: "bg-slate-50",
    border: "border-slate-100",
    text: "text-slate-700",
  };

  return (
    <div
      className={`
        bg-gray-100
        border
        border-gray-100
        rounded-2xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        cursor-pointer
      `}
    >

      <div className="flex items-start justify-between">

        <div>
          <p className={`text-sm font-medium ${style.text}`}>
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {count}
          </p>
        </div>

      </div>

    </div>
  );
}