import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function EmployeeFilters({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  departments = ["Development", "Design", "Testing", "Marketing", "HR"],
}) {
  const isFiltered = search !== "" || department !== "all" || status !== "all";

  const handleReset = () => {
    setSearch("");
    setDepartment("all");
    setStatus("all");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-indigo-600" />
          <h2 className="font-semibold text-slate-900 text-sm sm:text-base">
            Filter Employees
          </h2>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-10
              pr-4
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              text-sm
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:bg-white
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100
              transition
            "
          />
        </div>

        {/* Department */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="
            px-4
            py-2.5
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            text-slate-700
            outline-none
            focus:bg-white
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
            transition
            cursor-pointer
          "
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            px-4
            py-2.5
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            text-slate-700
            outline-none
            focus:bg-white
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
            transition
            cursor-pointer
          "
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}