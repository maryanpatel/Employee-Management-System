import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], activeFilter = "all", onViewTask }) {
  const filteredTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((task) => {
          if (activeFilter === "new") return task.status === "new";
          if (activeFilter === "in-progress") return task.status === "in-progress";
          return task.status === activeFilter;
        });

  return (
    <section className="mt-8">
      {/* Heading */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">My Tasks</h2>
          <p className="text-sm text-slate-500 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Tasks */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={task}
              onViewTask={onViewTask}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-3xl py-16 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
            <ClipboardList size={24} className="text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-800 mt-4">No tasks found</h3>
          <p className="text-sm text-slate-400 mt-1">There are no tasks in this category.</p>
        </div>
      )}
    </section>
  );
}