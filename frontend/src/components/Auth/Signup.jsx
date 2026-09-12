
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserRound,
  UserCog,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "employee",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Terms validation
    if (!formData.terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    setLoading(true);

    // Demo signup request
    setTimeout(() => {
      console.log("Signup Data:", formData);

      setLoading(false);

      // Connect your backend API here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="absolute top-1/3 right-10 w-24 h-24 bg-purple-100/60 rounded-full blur-2xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-2xl">

        <div className="bg-white border-2 border-blue-100 rounded-3xl shadow-xl shadow-slate-200/60 p-6 sm:p-10">



          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="text-slate-500 mt-2 text-sm">
              Join WorkSphere and manage your workforce smarter
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative group">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="
                    w-full
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-4
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative group">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="
                    w-full
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-4
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
                <span className="text-slate-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>

              <div className="relative group">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="
                    w-full
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-4
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Employee */}
                <label
                  className={`
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition-all
                    ${
                      formData.role === "employee"
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="employee"
                    checked={formData.role === "employee"}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <UserRound
                    size={22}
                    className={
                      formData.role === "employee"
                        ? "text-blue-600"
                        : "text-slate-400"
                    }
                  />

                  <p className="text-slate-900 font-semibold mt-2">
                    Employee
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Employee access
                  </p>
                </label>

                {/* Admin */}
                <label
                  className={`
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition-all
                    ${
                      formData.role === "admin"
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <UserCog
                    size={22}
                    className={
                      formData.role === "admin"
                        ? "text-indigo-600"
                        : "text-slate-400"
                    }
                  />

                  <p className="text-slate-900 font-semibold mt-2">
                    Admin
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Management access
                  </p>
                </label>

              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative group">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="
                    w-full
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-12
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative group">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="
                    w-full
                    bg-slate-50
                    border border-slate-200
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-12
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer select-none pt-1">

              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="sr-only peer"
              />

              <div
                className="
                  mt-0.5
                  w-5
                  h-5
                  shrink-0
                  rounded-md
                  border
                  border-slate-300
                  bg-white
                  flex
                  items-center
                  justify-center
                  peer-checked:bg-blue-600
                  peer-checked:border-blue-600
                  transition-all
                "
              >
                {formData.terms && (
                  <CheckCircle2
                    size={15}
                    className="text-white"
                  />
                )}
              </div>

              <p className="text-xs leading-5 text-slate-500">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Privacy Policy
                </a>
              </p>

            </label>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                group
                w-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                disabled:opacity-70
                disabled:cursor-not-allowed
                text-white
                font-semibold
                py-3.5
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
                shadow-blue-200
                hover:shadow-blue-300
                transition-all
                duration-200
                active:scale-[0.98]
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                <>
                  Create Account

                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>

          </form>

          {/* Login Bar */}
          <div className="mt-7 pt-6 border-t border-slate-100">

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}

              <a
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Sign In
              </a>
            </p>

          </div>

        </div>

        {/* Security Text */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
          <ShieldCheck size={14} />
          Your information is secure & encrypted
        </div>

      </div>
    </div>
  );
}

