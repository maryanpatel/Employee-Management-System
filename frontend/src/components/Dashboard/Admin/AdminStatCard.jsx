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
    icon: "bg-blue-100 text-blue-600",
    count: "text-blue-700",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  tasks: {
    icon: "bg-indigo-100 text-indigo-600",
    count: "text-indigo-700",
    badge: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  new: {
    icon: "bg-sky-100 text-sky-600",
    count: "text-sky-700",
    badge: "bg-sky-50 text-sky-600 border-sky-100",
  },
  pending: {
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

export default function AdminStatCard({ title, count, description, type }) {
  const Icon = icons[type] || icons.new;
  const style = styles[type] || styles.new;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
     

      <div className="mt-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className={`text-2xl font-extrabold mt-3 tracking-tight ${style.count}`}>
          {count}
        </p>
      </div>
    </div>
  );
}