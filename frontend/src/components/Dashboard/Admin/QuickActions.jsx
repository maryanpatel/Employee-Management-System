import {
  Plus,
  UserPlus,
  Users,
  ClipboardList,
} from "lucide-react";

export default function QuickActions({
  onCreateTask,
  onAddEmployee,
}) {
  const actions = [
    {
      title: "Create Task",
      icon: Plus,
      color: "blue",
      onClick: onCreateTask,
    },
    {
      title: "Add Employee",
      icon: UserPlus,
      color: "indigo",
      onClick: onAddEmployee,
    },
    {
      title: "Manage Employees",
      icon: Users,
      color: "emerald",
    },
    {
      title: "View All Tasks",
      icon: ClipboardList,
      color: "amber",
    },
  ];

  return (
    <section className="mt-8">

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Frequently used admin actions
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-5
                flex
                items-center
                gap-4
                text-left
                hover:border-blue-300
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-200
                group
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  group-hover:bg-blue-600
                  transition
                "
              >
                <Icon
                  size={21}
                  className="
                    text-blue-600
                    group-hover:text-white
                    transition
                  "
                />
              </div>

              <span className="text-sm font-semibold text-slate-700">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}