import StatCard from "./StatCard";

export default function TaskStats({
  tasks,
  activeFilter,
  setActiveFilter,
}) {
  const stats = {
    new: tasks.filter(
      (task) => task.status === "new"
    ).length,

    completed: tasks.filter(
      (task) => task.status === "completed"
    ).length,

    accepted: tasks.filter(
      (task) => task.status === "accepted"
    ).length,

    failed: tasks.filter(
      (task) => task.status === "failed"
    ).length,
  };

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