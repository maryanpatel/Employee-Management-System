import {
  Shield,
  Building,
  Sparkles,
  User,
  Briefcase,
  Calendar,
  ShieldCheck,
  Check,
  Copy,
  CheckCheck,
} from "lucide-react";
import StatCard from "../Dashboard/Employee/StatCard";
// ─── Admin stat cards ───────────────────────────────────────────────────────
// function AdminStats() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//       {/*  */}
//       <AdminStatCard
//         icon={<Building size={24} />}
//         iconBg="bg-emerald-100 text-emerald-600"
//         label="Management"
//         value="Organization"
    
//       />
//       <AdminStatCard
//         icon={<Sparkles size={24} />}
//         iconBg="bg-purple-100 text-purple-600"
//         label="Status"
//         value="Verified & Active"
//         valueColor="text-emerald-600"
        
//       />
//     </div>
//   );
// }

// function AdminStatCard({ icon, iconBg, label, value, valueColor = "text-slate-900", sub }) {
//   return (
//     <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex items-center gap-4">
//       <div className={`w-12 h-12 rounded-3xl flex items-center justify-center ${iconBg}`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
//         <p className={`text-xl font-bold mt-0.5 ${valueColor}`}>{value}</p>
//       </div>
//     </div>
//   );
// }

// ─── Employee task stats ─────────────────────────────────────────────────────
function EmployeeTaskStats({ taskStats }) {
  const total = taskStats?.total || 0;
  const completed = taskStats?.completed || 0;
  const pending = taskStats?.pending || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard
        title="Total Task"
        count={total}
        type="new"
      />
      <StatCard
        title="Completed"
        count={completed}
        type="completed"
      />
      <StatCard
        title="In Progress"
        count={pending}
        type="in-progress"
      />
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completion</p>
        <p className="text-2xl font-bold text-indigo-600 mt-1">{completionRate}%</p>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Personal Info card ──────────────────────────────────────────────────────
function PersonalInfoCard({ profile, authUser, copiedId,  onEditTab }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
          </div>
        </div>
        <button
          onClick={onEditTab}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          Edit
        </button>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        <InfoRow label="Full Legal Name" value={profile?.fullname || authUser?.fullname || "—"} />
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Email Address</span>
          <span className="font-semibold text-slate-900 flex items-center gap-2">
            {profile?.email || authUser?.email || "—"}
          </span>
        </div>
        <InfoRow label="Phone Number" value={profile?.phonenumber || "Not provided"} />
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">About</span>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
            <span className="truncate max-w-[140px]">{profile?.status || profile?.id || "—"}</span>
            <button
              className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition cursor-pointer"
              title="Copy ID"
            >
              
            </button>
          </div>
        </div>
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Account Type</span>
          <span className="capitalize font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md text-xs">
            {profile?.role || authUser?.role}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Employment/Admin scope card ─────────────────────────────────────────────
function EmploymentCard({ isAdmin, employeeData }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isAdmin ? "Administrative Scope" : "Employment Details"}
            </h2>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Active Status
        </span>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        {isAdmin ? (
          <>
            <InfoRow label="Authorization Level" value="Root Administrator" />
            <InfoRow label="Management Scope" value="All Employees & Tasks" />
            <InfoRow label="Department" value="Executive & Operations" />
            <InfoRow label="Privileges" value="Create, Read, Update, Delete" />
            <div className="py-4 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Security Policy</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck size={16} /> Enforced 2FA &amp; JWT
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="py-4 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Employee ID</span>
              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md text-xs">
                {employeeData?.employeeId || "EMP-N/A"}
              </span>
            </div>
            <InfoRow label="Department" value={employeeData?.department || "General"} />
            <InfoRow label="Designation" value={employeeData?.designation || "Staff Member"} />
            <div className="py-4 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Joining Date</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Calendar size={15} className="text-slate-400" />
                {employeeData?.joiningDate
                  ? new Date(employeeData.joiningDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Recent"}
              </span>
            </div>
            <div className="py-4 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Employment Status</span>
              <span className="capitalize font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                {employeeData?.status || "Active"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="py-4 flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ProfileOverviewTab({
  profile,
  authUser,
  employeeData,
  taskStats,
  isAdmin,
  copiedId,
  onCopyId,
  onEditTab,
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {isAdmin ? "" : <EmployeeTaskStats taskStats={taskStats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PersonalInfoCard
          profile={profile}
          authUser={authUser}
          copiedId={copiedId}
          onCopyId={onCopyId}
          onEditTab={onEditTab}
        />
        <EmploymentCard isAdmin={isAdmin} employeeData={employeeData} />
      </div>
    </div>
  );
}
