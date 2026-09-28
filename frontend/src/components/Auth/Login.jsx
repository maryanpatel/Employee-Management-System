
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
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
    setPassword(value);
    }

    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear top error list if user edits input
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setFieldErrors({});

    setLoading(true);
    try {
      const res = await api.post("/account/login", {
        email: email,
        password: password,
      });
      login(res.data.user, res.data.token);
      // redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (err) {
      const data = err.response?.data;
      console.log("Login error response:", data);

      if (data?.errors && Array.isArray(data.errors)) {
        const fieldMap = {};
        data.errors.forEach((item) => {
          const field = item.path || item.param;
          if (field && !fieldMap[field]) {
            fieldMap[field] = item.msg || item.message;
          }
        });

        // setErrors(extractedMsgs);
        setFieldErrors(fieldMap);
      } else if (data?.message) {
        // Single message (e.g. invalid credentials, rate limit)
        setErrors([data.message]);
        setFieldErrors({});
      } else {
        setErrors(["Something went wrong. Please try again."]);
        setFieldErrors({});
      }
    } finally {
      setLoading(false);
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
            {/* Error Message Box */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl p-4 flex gap-3 items-start animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{errors[0]}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative group">
                <Mail
                  size={19}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.email
                    ? "text-red-400 group-focus-within:text-red-500"
                    : "text-slate-400 group-focus-within:text-blue-600"
                    }`}
                />

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className={`
                    w-full
                    bg-slate-50
                    border
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-4
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    ${fieldErrors.email
                      ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }
                  `}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <span>•</span> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
              </div>

              <div className="relative group">
                <Lock
                  size={19}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.password
                    ? "text-red-400 group-focus-within:text-red-500"
                    : "text-slate-400 group-focus-within:text-blue-600"
                    }`}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`
                    w-full
                    bg-slate-50
                    border
                    rounded-xl
                    py-3.5
                    pl-12
                    pr-12
                    text-slate-900
                    placeholder-slate-400
                    outline-none
                    transition-all
                    ${fieldErrors.password
                      ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }
                  `}
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
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <span>•</span> {fieldErrors.password}
                </p>
              )}
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

