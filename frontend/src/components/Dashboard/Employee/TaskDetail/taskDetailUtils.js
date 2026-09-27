import { Clock, PlayCircle, CheckCircle2, AlertTriangle, Calendar, BadgeAlert } from "lucide-react";

export const statusConfig = {
  new: {
    label: "New",
    bg: "bg-blue-100 text-blue-800 border-blue-200",
    step: 1,
    icon: Clock,
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-amber-100 text-amber-800 border-amber-200",
    step: 2,
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    step: 3,
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    bg: "bg-rose-100 text-rose-800 border-rose-200",
    step: 0,
    icon: AlertTriangle,
  },
};

export const priorityColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function formatDate(dateString) {
  if (!dateString) return "Not specified";
  const d = new Date(dateString);
  return isNaN(d.getTime())
    ? dateString
    : d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

export function getDueTimeStatus(dueDate) {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"}`,
      color: "text-red-700 bg-red-50 border-red-200",
      icon: BadgeAlert,
    };
  } else if (diffDays === 0) {
    return {
      label: "Due Today",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      icon: Clock,
    };
  } else if (diffDays === 1) {
    return {
      label: "Due Tomorrow",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      icon: Clock,
    };
  } else {
    return {
      label: `${diffDays} days remaining`,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      icon: Calendar,
    };
  }
}
