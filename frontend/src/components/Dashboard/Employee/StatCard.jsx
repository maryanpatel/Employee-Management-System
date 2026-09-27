import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

// const icons = {
//   new: ClipboardList,
//   completed: CheckCircle2,
//   accepted: Clock3,
//   failed: XCircle,
// };

export default function StatCard({
  title,
  count,
  type,
  active,
  onClick,
}) {
  // const Icon = icons[type];

  const styles = {
    new: {

      text: "text-blue-700",
    },

    completed: {
      text: "text-emerald-700",
    },

    "in-progress": {
      text: "text-amber-600",
    },

    failed: {
      text: "text-red-700",
    },
  };

  const style = styles[type];

  return (
    <button
      onClick={onClick}
      className={`
        text-left
        w-full
        bg-gray-100
        border
        border-gray-100
        rounded-2xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
        ${
          active
            ? "ring-2 ring-blue-500 ring-offset-2"
            : ""
        }
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


    </button>
  );
}