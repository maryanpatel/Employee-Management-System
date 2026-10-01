import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  BadgeCheck,
  Send,
  Pencil,
  CheckCircle2,
} from "lucide-react";

export default function EditEmployeeModal({
  employee,
  onClose,
  onEmployeeUpdated,
}) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    department: "Development",
    designation: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.name || employee.user?.fullname || "",
        email: employee.email || employee.user?.email || "",
        phonenumber: employee.phone || employee.user?.phonenumber || "",
        department: employee.department || "Development",
        designation: employee.designation || "",
        status: employee.status || "active",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const empDbId = employee.raw?._id || employee._id || employee.id;
      await api.put(`/employee/update/${empDbId}`, {
        fullname: formData.fullname,
        email: formData.email,
        phonenumber: formData.phonenumber,
        department: formData.department,
        designation: formData.designation,
        status: formData.status,
      });

      if (onEmployeeUpdated) {
        onEmployeeUpdated();
      }
      onClose();
    } catch (err) {
      console.error("Employee update error:", err);
      const data = err.response?.data;
      const msg =
        data?.message ||
        data?.errors?.map((e) => e.msg).join(", ") ||
        err.message ||
        "Failed to update employee";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!employee) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      {/* Modal Box */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          border
          border-white/60
          animate-in
          fade-in
          zoom-in
          duration-200
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Pencil size={21} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Employee
                </h2>
                
              </div>
    
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
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
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mx-6 sm:mx-8 mt-5 p-3.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
              {errorMessage}
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <User size={16} className="text-slate-400" />
                Employee Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-sm"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Mail size={16} className="text-slate-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="employee@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Phone size={16} className="text-slate-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-sm"
                />
              </div>
            </div>

            {/* Department & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Briefcase size={16} className="text-slate-400" />
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-700 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-sm"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <BadgeCheck size={16} className="text-slate-400" />
                  Designation / Role
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Dev"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition text-sm"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                Account Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition
                    ${
                      formData.status === "active"
                        ? "bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.status === "active"
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-400"
                    }`}
                  >
                    {formData.status === "active" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Active</p>
                    <p className="text-xs text-slate-500">Allowed to log in & receive tasks</p>
                  </div>
                </label>

                <label
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition
                    ${
                      formData.status === "inactive"
                        ? "bg-slate-100 border-slate-300 ring-2 ring-slate-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.status === "inactive"
                        ? "border-slate-600 bg-slate-600"
                        : "border-slate-400"
                    }`}
                  >
                    {formData.status === "inactive" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Inactive</p>
                    <p className="text-xs text-slate-500">Temporarily disabled account</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-100 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5
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
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-indigo-400
                text-white
                font-semibold
                text-sm
                shadow-sm
                active:scale-95
                transition
                disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              <Send size={16} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
