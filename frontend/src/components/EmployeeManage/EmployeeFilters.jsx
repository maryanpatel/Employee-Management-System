import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function EmployeeFilters({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">

      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal
          size={18}
          className="text-indigo-600"
        />

        <h2 className="font-semibold text-slate-900">
          Filter Employees
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search employees..."
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
          "
        >
          <option value="all">
            All Departments
          </option>

          <option value="Development">
            Development
          </option>

          <option value="Design">
            Design
          </option>

          <option value="Testing">
            Testing
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="HR">
            HR
          </option>
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
          "
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

      </div>
    </div>
  );
}