import { Camera, Edit3, Mail, Phone, ShieldCheck, Briefcase } from "lucide-react";

export default function ProfileBanner({
  profile,
  authUser,
  initials,
  isAdmin,
  activeTab,
  onOpenPhotoModal,
  onSetActiveTab,
}) {
  const TAB_CLASS = (tab) =>
    `py-3.5 px-4 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
      activeTab === tab
        ? "border-indigo-600 text-indigo-600"
        : "border-transparent text-slate-500 hover:text-slate-800"
    }`;

  return (
    <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Gradient Banner */}
      <div
        className={`h-20 sm:h-24 w-full relative overflow-hidden ${
          isAdmin
            ? "bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700"
            : "bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600"
        }`}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white blur-2xl" />
          <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        
      </div>

      {/* Avatar + Identity Row */}
      <div className="px-6 sm:px-10 pb-8 pt-2 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-29 h-29 sm:w-32 sm:h-32 rounded-3xl p-1 bg-white shadow-xl ring-4 ring-white overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
              {profile?.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt={profile?.fullname || "User avatar"}
                  className="w-full h-full object-cover rounded-[1.4rem]"
                />
              ) : (
                <div
                  className={`w-full h-full rounded-[1.4rem] flex items-center justify-center font-bold text-3xl sm:text-4xl text-white ${
                    isAdmin
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600"
                      : "bg-gradient-to-br from-blue-600 to-sky-500"
                  }`}
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile?.fullname || authUser?.fullname || "User"}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Account
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="flex items-center gap-1.5">
                <Mail size={15} className="text-slate-400" />
                {profile?.email || authUser?.email || "No email"}
              </span>
              {profile?.phonenumber && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <Phone size={15} className="text-slate-400" />
                    {profile.phonenumber}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onSetActiveTab(activeTab === "edit" ? "overview" : "edit")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer ${
                activeTab === "edit"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
              }`}
            >
              <Edit3 size={16} />
              <span>{activeTab === "edit" ? "View Overview" : "Edit Profile"}</span>
            </button>
            <button
              type="button"
              onClick={onOpenPhotoModal}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition cursor-pointer"
            >
              <Camera size={16} />
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 sm:px-10 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button onClick={() => onSetActiveTab("overview")} className={TAB_CLASS("overview")}>
          Overview &amp; Details
        </button>
        <button onClick={() => onSetActiveTab("edit")} className={TAB_CLASS("edit")}>
          Edit Information
        </button>
        <button onClick={() => onSetActiveTab("security")} className={TAB_CLASS("security")}>
          Security &amp; Credentials
        </button>
      </div>
    </div>
  );
}
