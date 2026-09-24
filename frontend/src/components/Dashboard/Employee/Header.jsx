import { useState } from "react";
import {
  User,
  LogOut,
  ChevronDown,
  Settings,
  UserCircle,
} from "lucide-react";

export default function EmployeeHeader({ user, onLogout }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Left - Greeting */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <User
                size={22}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Hello,
              </p>

              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {user.name}
              </h1>
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Profile */}
            <div className="relative">

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="
                  flex items-center gap-2
                  p-1.5
                  rounded-xl
                  hover:bg-slate-100
                  transition
                "
              >

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle
                    size={25}
                    className="text-blue-600"
                  />
                </div>

                <ChevronDown
                  size={16}
                  className={`
                    hidden sm:block text-slate-400
                    transition-transform
                    ${showProfile ? "rotate-180" : ""}
                  `}
                />

              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="
                  absolute
                  right-0
                  top-14
                  w-60
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  shadow-xl
                  shadow-slate-200/60
                  p-2
                ">

                  <div className="px-3 py-3 border-b border-slate-100">

                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {user.email}
                    </p>

                  </div>

                  <button
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      mt-1
                      text-sm
                      text-slate-600
                      hover:bg-slate-50
                      rounded-xl
                      transition
                    "
                  >
                    <UserCircle size={18} />
                    My Profile
                  </button>

                  <button
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      text-sm
                      text-slate-600
                      hover:bg-slate-50
                      rounded-xl
                      transition
                    "
                  >
                    <Settings size={18} />
                    Settings
                  </button>

                </div>
              )}

            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="
                flex
                items-center
                gap-2
                bg-red-50
                hover:bg-red-100
                text-red-600
                border
                border-red-100
                px-3
                sm:px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                transition-all
                active:scale-95
              "
            >
              <LogOut size={17} />

              <span className="hidden sm:block">
                Logout
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}