import { Plus, UserPlus, Users, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions({ onCreateTask, onAddEmployee }) {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Task",
      description: "Assign a new task",
      icon: Plus,
      text: "indigo-500",
      shadow: "shadow-indigo-200",
      onClick: onCreateTask,
    },
    {
      title: "Add Employee",
      description: "Onboard someone new",
      icon: UserPlus,
      text: "blue-500",
      onClick: onAddEmployee,
    },
    {
      title: "Manage Employees",
      description: "View & edit employees",
      icon: Users,
      text: "emerald-500 ",
      onClick: () => navigate("/admin/employees"),
    },
    {
      title: "View All Tasks",
      description: "Browse task board",
      icon: ClipboardList,
      text: "amber-500",
      onClick: () => navigate("/admin/tasks"),
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="bg-white border border-slate-200/90 rounded-3xl p-5 flex flex-col items-start gap-3 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm  group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={20} className={`text-${action.text}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{action.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}