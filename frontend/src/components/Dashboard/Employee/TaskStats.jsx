import { useMemo } from "react";
import StatCard from "./StatCard";

export default function TaskStats({ tasks = [], activeFilter, setActiveFilter }) {
  const stats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.status === "failed") acc.failed++;
        else if (task.status === "new") acc.new++;
        else if (task.status === "in-progress") acc.inProgress++;
        else if (task.status === "completed") acc.completed++;
        return acc;
      },
      { failed: 0, new: 0, inProgress: 0, completed: 0 }
    );
  }, [tasks]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="New Task"
        count={stats.new}
        type="new"
        active={activeFilter === "new"}
        onClick={() => setActiveFilter(activeFilter === "new" ? "all" : "new")}
      />
      <StatCard
        title="In Progress"
        count={stats.inProgress}
        type="in-progress"
        active={activeFilter === "in-progress"}
        onClick={() => setActiveFilter(activeFilter === "in-progress" ? "all" : "in-progress")}
      />
      <StatCard
        title="Completed"
        count={stats.completed}
        type="completed"
        active={activeFilter === "completed"}
        onClick={() => setActiveFilter(activeFilter === "completed" ? "all" : "completed")}
      />
      <StatCard
        title="Failed"
        count={stats.failed}
        type="failed"
        active={activeFilter === "failed"}
        onClick={() => setActiveFilter(activeFilter === "failed" ? "all" : "failed")}
      />
    </section>
  );
}
