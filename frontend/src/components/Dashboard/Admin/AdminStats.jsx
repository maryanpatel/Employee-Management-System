import AdminStatCard from "./AdminStatCard";

export default function AdminStats({ stats }) {
  return (
    <section className="
      grid
      grid-cols-2
      lg:grid-cols-3
      gap-4
    ">

      <AdminStatCard
        title="Total Employees"
        count={stats.employees}
        description="+5 this month"
        type="employees"
      />

      <AdminStatCard
        title="Total Tasks"
        count={stats.tasks}
        description="+18 this week"
        type="tasks"
      />

      <AdminStatCard
        title="New Tasks"
        count={stats.newTasks}
        description="Waiting for action"
        type="new"
      />

      <AdminStatCard
        title="Pending Tasks"
        count={stats.pending}
        description="Currently in progress"
        type="pending"
      />

      <AdminStatCard
        title="Completed"
        count={stats.completed}
        description="Successfully completed"
        type="completed"
      />

      <AdminStatCard
        title="Failed"
        count={stats.failed}
        description="Needs attention"
        type="failed"
      />

    </section>
  );
}
