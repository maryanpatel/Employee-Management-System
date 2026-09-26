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
      bg: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-700",
    },

    completed: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
    },

    accepted: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-700",
    },

    failed: {
      bg: "bg-red-50",
      border: "border-red-100",
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
        ${style.bg}
        border
        ${style.border}
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

        {/* <div
          className={`
            w-10
            h-10
            rounded-xl
            ${style.icon}
            flex
            items-center
            justify-center
            shadow-sm
          `}
        >
          <Icon
            size={21}
            className="text-white"
          />
        </div> */}

      </div>

      <p className="text-xs text-slate-500 mt-3">
        View {title.toLowerCase()} tasks
      </p>

    </button>
  );
}