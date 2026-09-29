import { useState } from "react";
import { Lock, Eye, EyeOff, Check, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function SecurityTab({ onChangePassword, saving, message }) {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(form, () => setForm({ oldPassword: "", newPassword: "", confirmPassword: "" }));
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs max-w-3xl mx-auto animate-in fade-in duration-300">
      <div className="pb-6 border-b border-slate-100 mb-8">
        <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
        <p className="text-sm text-slate-500 mt-1">
          Protect your account with a secure password containing letters, numbers, and symbols.
        </p>
      </div>

      {/* Feedback message */}
      {message?.text && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordField
          label="Current Password"
          value={form.oldPassword}
          show={show.old}
          onToggle={() => setShow((p) => ({ ...p, old: !p.old }))}
          onChange={(v) => setForm((p) => ({ ...p, oldPassword: v }))}
          placeholder="••••••••"
        />

        <PasswordField
          label="New Password"
          value={form.newPassword}
          show={show.new}
          onToggle={() => setShow((p) => ({ ...p, new: !p.new }))}
          onChange={(v) => setForm((p) => ({ ...p, newPassword: v }))}
          placeholder="At least 6 characters"
        />

        <PasswordField
          label="Confirm New Password"
          value={form.confirmPassword}
          show={show.confirm}
          onToggle={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
          onChange={(v) => setForm((p) => ({ ...p, confirmPassword: v }))}
          placeholder="Repeat new password"
        />

        {/* Hints */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">Security Best Practices:</p>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            <li>Use at least 6 characters (longer is stronger).</li>
            <li>Include numbers or special symbols for heightened security.</li>
            <li>Never reuse passwords across different company portals.</li>
          </ul>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Check size={16} />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function PasswordField({ label, value, show, onToggle, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
