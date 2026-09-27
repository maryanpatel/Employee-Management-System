import { ShieldCheck, Mail } from "lucide-react";

export default function TaskAssignerCard({ assignedBy }) {
  const name = assignedBy?.fullname || assignedBy?.name || "Administrator";
  const email = assignedBy?.email || "No email available";
  const initial = (name[0] || "A").toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
        Assigned By
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 shrink-0">
          {initial}
        </div>

        <div className="min-w-0">
          <h4 className="font-bold text-slate-900 text-base truncate">
            {name}
          </h4>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
            <Mail size={12} className="text-slate-400 shrink-0" />
            <span className="truncate">{email}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Role</span>
        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
          Manager / Admin
        </span>
      </div>
    </div>
  );
}
