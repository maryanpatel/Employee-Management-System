import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onViewTask }) {
  const navigate = useNavigate();

  const handleView = () => {
    if (onViewTask) {
      onViewTask(task);
    } else {
      navigate(`/employee/tasks/${task._id || task.id}`, { state: { task } });
    }
  };

  const statusStyles = {
    new: {
      badge: "bg-blue-100 text-blue-700",
      label: "New",
    },

    "in-progress": {
      badge: "bg-amber-100 text-amber-700",
      label: "In Progress",
    },

    completed: {
      badge: "bg-emerald-100 text-emerald-700",
      label: "Completed",
    },

    failed: {
      badge: "bg-red-100 text-red-700",
      label: "Failed",
    },
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  const style = statusStyles[task.status] || statusStyles.new;

  const normalizedPriority = task.priority
    ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()
    : "Medium";
  const priorityClass = priorityStyles[normalizedPriority] || priorityStyles.Medium;

  const displayDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : task.date || "No date";

  return (
    <article
      className={`
        bg-gray-100
        border
        rounded-2xl
        border-gray-100
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
            ${priorityClass}
          `}
        >
          {normalizedPriority}
        </span>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={14} />
          {displayDate}
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

        {/* <p className="text-sm text-slate-600 leading-6 mt-2">
          {task.description}
        </p> */}

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
          type="button"
          onClick={handleView}
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
            cursor-pointer
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