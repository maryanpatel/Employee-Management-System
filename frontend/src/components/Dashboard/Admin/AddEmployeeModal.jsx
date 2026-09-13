import { useState } from "react";
import {
  X,
  UserPlus,
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Send,
} from "lucide-react";

export default function AddEmployeeModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Employee Created:", formData);

    alert("Employee added successfully!");

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      {/* Blurred Dashboard */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      {/* Modal */}
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

            <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
              <UserPlus
                size={23}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Add Employee
              </h2>

              <p className="text-sm text-slate-500 mt-0.5">
                Create a new employee account
              </p>
            </div>

          </div>

          {/* Close */}
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
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="p-6 sm:p-8 space-y-5">

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <User size={16} />
                Employee Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:bg-white
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Mail size={16} />
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="employee@worksphere.com"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:bg-white
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition
                "
              />
            </div>

            {/* Phone + Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Phone size={16} />
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    outline-none
                    text-slate-900
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition
                  "
                />
              </div>

              {/* Department */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Briefcase size={16} />
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    outline-none
                    text-slate-700
                    focus:bg-white
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition
                  "
                >
                  <option value="">Select department</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </select>
              </div>

            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Lock size={16} />
                Temporary Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create temporary password"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  outline-none
                  text-slate-900
                  placeholder:text-slate-400
                  focus:bg-white
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition
                "
              />
            </div>

          </div>

          {/* Footer */}
          <div className="
            flex
            justify-end
            gap-3
            px-6
            sm:px-8
            py-5
            bg-slate-50
            border-t
            border-slate-100
            rounded-b-3xl
          ">

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
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
                text-sm
                shadow-sm
                active:scale-95
                transition
              "
            >
              <Send size={17} />
              Add Employee
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}