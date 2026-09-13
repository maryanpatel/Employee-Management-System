import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function TaskCard({ task }) {

  const statusStyles = {
    new: {
      card: "border-blue-100 bg-blue-50/50",
      badge: "bg-blue-100 text-blue-700",
      label: "New",
    },

    accepted: {
      card: "border-amber-100 bg-amber-50/50",
      badge: "bg-amber-100 text-amber-700",
      label: "Accepted",
    },

    completed: {
      card: "border-emerald-100 bg-emerald-50/50",
      badge: "bg-emerald-100 text-emerald-700",
      label: "Completed",
    },

    failed: {
      card: "border-red-100 bg-red-50/50",
      badge: "bg-red-100 text-red-700",
      label: "Failed",
    },
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  const style = statusStyles[task.status];

  return (
    <article
      className={`
        ${style.card}
        border
        rounded-2xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg
      `}
    >

      {/* Top */}
      <div className="flex items-center justify-between gap-3">

        <span
          className={`
            px-2.5
            py-1
            rounded-lg
            text-xs
            font-semibold
            ${priorityStyles[task.priority]}
          `}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={14} />
          {task.date}
        </div>

      </div>

      {/* Content */}
      <div className="mt-4">

        <div className="flex items-center justify-between gap-3">

          <h3 className="text-lg font-bold text-slate-900">
            {task.title}
          </h3>

          <span
            className={`
              hidden sm:block
              text-xs
              font-medium
              px-2.5
              py-1
              rounded-full
              ${style.badge}
            `}
          >
            {style.label}
          </span>

        </div>

        <p className="text-sm text-slate-600 leading-6 mt-2">
          {task.description}
        </p>

      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between">

        <span
          className={`
            sm:hidden
            text-xs
            font-medium
            px-2.5
            py-1
            rounded-full
            ${style.badge}
          `}
        >
          {style.label}
        </span>

        <button
          className="
            ml-auto
            flex
            items-center
            gap-1.5
            text-sm
            font-semibold
            text-blue-600
            hover:text-blue-700
            transition
            group
          "
        >
          View task

          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

      </div>

    </article>
  );
}