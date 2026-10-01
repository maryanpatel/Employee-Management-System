import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  ChevronDown,
  Settings,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export default function AdminHeader({ admin, onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 overflow-hidden shrink-0">
              {admin?.profilePic ? (
                <img
                  src={admin.profilePic}
                  alt={admin.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LayoutDashboard size={18} className="text-white" />
              )}
            </div>
            <div className="hidden sm:block h-5 w-px bg-slate-200" />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-600 hidden sm:inline">
              Admin Dashboard
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100/80 transition-all active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200 shrink-0">
                  {admin?.profilePic ? (
                    <img
                      src={admin.profilePic}
                      alt={admin.fullname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle size={22} className="text-indigo-600" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-slate-400 leading-none">Welcome back,</p>
                  <p className="text-sm font-semibold text-slate-800 leading-tight mt-0.5">
                    {admin?.fullname || "Admin"}
                  </p>
                </div>
                <ChevronDown
                  size={15}
                  className={`hidden sm:block text-slate-400 transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-12 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 p-2 z-50">
                  <div className="px-3 py-3 border-b border-slate-100">
                    <p className="font-semibold text-slate-900">
                      {admin?.fullname || "Admin"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {admin?.email || ""}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl font-medium transition cursor-pointer"
                  >
                    <User size={16} />
                    My Profile
                  </button>

                  
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-100 transition cursor-pointer active:scale-95"
            >
              <LogOut size={16} />
              <span className="hidden sm:block">Logout</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}