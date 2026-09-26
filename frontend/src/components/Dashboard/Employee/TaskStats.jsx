import { useMemo } from "react";
import StatCard from "./StatCard";
import api from "../../../api/axiosInstance"
export default function TaskStats({
  tasks,
  activeFilter,
  setActiveFilter,
}) {

  const stats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.status == "failed") {
          acc.failed++;
        } else if (task.status === "new") {
          acc.new++;
        } else if (task.status === "in-progress") {
          acc.accepted++;
        } else if (task.status === "completed") {
          acc.completed++;
        }
        return acc;
      },
      { failed: 0, new: 0, accepted: 0, completed: 0 }
    );
  }, [tasks]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <StatCard
        title="New Task"
        count={stats.new}
        type="new"
        active={activeFilter === "new"}
        onClick={() =>
          setActiveFilter(
            activeFilter === "new" ? "all" : "new"
          )
        }
      />

      <StatCard
        title="Completed"
        count={stats.completed}
        type="completed"
        active={activeFilter === "completed"}
        onClick={() =>
          setActiveFilter(
            activeFilter === "completed"
              ? "all"
              : "completed"
          )
        }
      />

      <StatCard
        title="Accepted"
        count={stats.accepted}
        type="accepted"
        active={activeFilter === "accepted"}
        onClick={() =>
          setActiveFilter(
            activeFilter === "accepted"
              ? "all"
              : "accepted"
          )
        }
      />

      <StatCard
        title="Failed"
        count={stats.failed}
        type="failed"
        active={activeFilter === "failed"}
        onClick={() =>
          setActiveFilter(
            activeFilter === "failed"
              ? "all"
              : "failed"
          )
        }
      />

    </section>
  );
}
