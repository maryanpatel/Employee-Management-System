import { Plus, UserPlus, Users, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions({ onCreateTask, onAddEmployee, totaltasks, allemployees }) {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Task",
      icon: Plus,
      color: "text-indigo-600 bg-indigo-50",
      onClick: onCreateTask,
    },
    {
      title: "Add Employee",
      icon: UserPlus,
      color: "text-blue-600 bg-blue-50",
      onClick: onAddEmployee,
    },
    {
      title: "Manage Employees",
      icon: Users,
      color: "text-emerald-600 bg-emerald-50",
      onClick: () => navigate("/admin/employees", { state: { allemployees, totaltasks } }),
    },
    {
      title: "View All Tasks",
      icon: ClipboardList,
      color: "text-amber-600 bg-amber-50",
      onClick: () => navigate("/admin/tasks", { state: { totaltasks, allemployees } }),
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
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${action.color} group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{action.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}