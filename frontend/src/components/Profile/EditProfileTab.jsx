import { User, Phone, Mail, Check, RefreshCw } from "lucide-react";

export default function EditProfileTab({
  profile,
  initials,
  editForm,
  onFormChange,
  onSave,
  onCancel,
  saving,
  onOpenPhotoModal,
}) {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs max-w-3xl mx-auto animate-in fade-in duration-300">
      <div className="pb-6 border-b border-slate-100 mb-8">
        <h2 className="text-xl font-bold text-slate-900">Edit Personal Information</h2>
        <p className="text-sm text-slate-500 mt-1">
          Keep your profile details up to date across the platform.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        {/* Profile Pic Quick Row */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200 shrink-0">
              {profile?.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-indigo-600 bg-indigo-50">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Profile Picture</p>
              <p className="text-xs text-slate-500">Upload a custom photo or choose a curated avatar</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenPhotoModal}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            Change Photo
          </button>
        </div>

        {/* Full Name */}
        <FormField label="Full Name">
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={editForm.fullname}
              onChange={(e) => onFormChange({ ...editForm, fullname: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
          </div>
        </FormField>

        {/* Phone Number */}
        <FormField label="Phone Number">
          <div className="relative">
            <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              value={editForm.phonenumber}
              onChange={(e) => onFormChange({ ...editForm, phonenumber: e.target.value })}
              placeholder="e.g. 9876543210"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
          </div>
        </FormField>

        {/* Email (read-only) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Email Address
            </label>
            <span className="text-[11px] text-slate-400 font-medium">Managed credential</span>
          </div>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              disabled
              value={profile?.email || ""}
              className="w-full pl-10 pr-4 py-3 bg-slate-100/70 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            To change your registered corporate email, please contact IT administration.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-200 transition cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Check size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
