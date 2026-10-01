import { useState } from "react";
import api from "../../api/axiosInstance";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteEmployeeModal({
  employee,
  onClose,
  onEmployeeDeleted,
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!employee) return null;

  const empName = employee.name || employee.user?.fullname || "this employee";
  const empId = employee.employeeId || "";
  const empDbId = employee.raw?._id || employee._id || employee.id;

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await api.delete(`/employee/${empDbId}`);
      if (onEmployeeDeleted) {
        onEmployeeDeleted();
      }
      onClose();
    } catch (err) {
      console.error("Employee delete error:", err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete employee";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-white/60
          p-6
          sm:p-8
          animate-in
          fade-in
          zoom-in
          duration-200
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-xl
            text-slate-400
            hover:text-slate-700
            hover:bg-slate-100
            transition
            cursor-pointer
          "
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-bold text-slate-900">
          Delete Employee?
        </h3>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Are you sure you want to permanently remove{" "}
          <span className="font-semibold text-slate-900">{empName}</span>
          {empId && (
            <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 ml-1">
              {empId}
            </span>
          )}
          ?
        </p>

        <div className="p-3.5 mt-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
          <strong>Notice:</strong> All tasks assigned to this employee will also be permanently deleted.
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {errorMessage}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              px-4
              py-2.5
              rounded-xl
              bg-white
              border
              border-slate-200
              text-slate-600
              font-semibold
              text-sm
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
              flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-red-600
              hover:bg-red-700
              disabled:bg-red-400
              text-white
              font-semibold
              text-sm
              shadow-sm
              active:scale-95
              transition
              cursor-pointer
              disabled:cursor-not-allowed
            "
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Delete Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
