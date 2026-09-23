
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email: formData.email, password: formData.password })
      login(res.data.user, res.data.token)
      // redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }

  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="absolute top-1/3 right-10 w-24 h-24 bg-purple-100/60 rounded-full blur-2xl" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/60 p-7 sm:p-9">

          {/* Logo */}
          {/* <div className="flex justify-center mb-7">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <ShieldCheck
                  size={24}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  WorkSphere
                </h1>

                <p className="text-xs text-slate-500">
                  Employee Management
                </p>
              </div>

            </div>
          </div> */}

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="text-slate-500 mt-2 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>

                {/* <a
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a> */}

              </div>

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
                  placeholder="Enter your password"
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
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                    transition
                  "
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>



            {/* Login Button */}
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
                mt-4
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

                  Signing in...
                </>
              ) : (
                <>
                  Sign In

                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>

          </form>

          {/* Signup */}
          <div className="mt-7 pt-6 border-t border-slate-100">

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}

              <a
                href="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Create an account
              </a>
            </p>

          </div>

        </div>

        {/* Bottom Security Text */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
          <ShieldCheck size={14} />
          Secure & encrypted login
        </div>

      </div>
    </div>
  );
}

