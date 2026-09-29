import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";

import ProfileNavbar from "../components/Profile/ProfileNavbar";
import ProfileBanner from "../components/Profile/ProfileBanner";
import ProfileAlert from "../components/Profile/ProfileAlert";
import ProfileOverviewTab from "../components/Profile/ProfileOverviewTab";
import EditProfileTab from "../components/Profile/EditProfileTab";
import SecurityTab from "../components/Profile/SecurityTab";
import PhotoStudioModal from "../components/Profile/PhotoStudioModal";

export default function ProfilePage() {
  const { user: authUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // ─── State ──────────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, pending: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [editForm, setEditForm] = useState({ fullname: "", phonenumber: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // ─── Derived values ──────────────────────────────────────────────────────────
  const isAdmin = (profile?.role || authUser?.role) === "admin";
  const initials = (profile?.fullname || authUser?.fullname || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // ─── Data fetching ───────────────────────────────────────────────────────────
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/account/me");
      const fetchedUser = res.data?.user || authUser;
      const fetchedEmp = res.data?.employee || null;

      setProfile(fetchedUser);
      setEmployeeData(fetchedEmp);
      setEditForm({
        fullname: fetchedUser.fullname || "",
        phonenumber: fetchedUser.phonenumber || "",
      });

      if (fetchedUser.role === "employee") {
        try {
          const taskRes = await api.get("/tasks/my");
          const tasks = taskRes.data?.tasks || [];
          setTaskStats({
            total: tasks.length,
            completed: tasks.filter((t) => t.status === "completed").length,
            pending: tasks.filter((t) => t.status === "in-progress" || t.status === "new").length,
            failed: tasks.filter((t) => t.status === "failed").length,
          });
        } catch (e) {
          console.warn("Could not fetch employee tasks:", e.message);
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfileMsg({ type: "error", text: "Failed to load latest profile information." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // ─── Navigation handlers ─────────────────────────────────────────────────────
  const handleBackToDashboard = () => {
    const role = profile?.role || authUser?.role;
    navigate(role === "admin" ? "/admin/dashboard" : "/employee/dashboard");
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  // ─── Copy User ID ────────────────────────────────────────────────────────────
  const handleCopyId = () => {
    const id = profile?._id || profile?.id || "";
    if (id) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // ─── Profile Photo ───────────────────────────────────────────────────────────
  const handleApplyPhoto = async (photoUrl) => {
    try {
      setSavingProfile(true);
      const res = await api.put("/account/profile", { profilePic: photoUrl });
      const updated = res.data?.user;
      if (updated) {
        setProfile(updated);
        updateUser(updated);
      }
      setShowPhotoModal(false);
      setProfileMsg({ type: "success", text: "Profile picture updated successfully!" });
      setTimeout(() => setProfileMsg({ type: "", text: "" }), 4000);
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile picture",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleRemovePhoto = () => handleApplyPhoto("");

  // ─── Edit profile ────────────────────────────────────────────────────────────
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });

    if (!editForm.fullname.trim()) {
      setProfileMsg({ type: "error", text: "Full name cannot be empty." });
      return;
    }

    try {
      setSavingProfile(true);
      const res = await api.put("/account/profile", {
        fullname: editForm.fullname.trim(),
        phonenumber: editForm.phonenumber ? Number(editForm.phonenumber) : undefined,
      });
      const updated = res.data?.user;
      if (updated) {
        setProfile(updated);
        updateUser(updated);
      }
      setProfileMsg({ type: "success", text: "Personal information saved successfully!" });
      setTimeout(() => setProfileMsg({ type: "", text: "" }), 4000);
      setActiveTab("overview");
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // ─── Change password ─────────────────────────────────────────────────────────
  const handleChangePassword = async (form, onSuccess) => {
    setPwdMsg({ type: "", text: "" });

    if (!form.oldPassword) {
      setPwdMsg({ type: "error", text: "Please enter your current password." });
      return;
    }
    if (!form.newPassword) {
      setPwdMsg({ type: "error", text: "Please enter your new password." });
      return;
    }
    if (form.newPassword.length < 6) {
      setPwdMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setPwdMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    try {
      setSavingPwd(true);
      const res = await api.put("/account/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setPwdMsg({ type: "success", text: res.data?.message || "Password updated successfully!" });
      onSuccess?.();
      setTimeout(() => setPwdMsg({ type: "", text: "" }), 5000);
    } catch (err) {
      setPwdMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to update password.",
      });
    } finally {
      setSavingPwd(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 text-slate-800 antialiased">
      {/* Navbar */}
      <ProfileNavbar onBack={handleBackToDashboard} onLogout={handleLogout} />

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global alert */}
        <ProfileAlert message={profileMsg} />

        {/* Hero banner + tabs */}
        <ProfileBanner
          profile={profile}
          authUser={authUser}
          initials={initials}
          isAdmin={isAdmin}
          activeTab={activeTab}
          onSetActiveTab={setActiveTab}
          onOpenPhotoModal={() => setShowPhotoModal(true)}
        />

        {/* Tab panels */}
        {activeTab === "overview" && (
          <ProfileOverviewTab
            profile={profile}
            authUser={authUser}
            employeeData={employeeData}
            taskStats={taskStats}
            isAdmin={isAdmin}
            copiedId={copiedId}
            onCopyId={handleCopyId}
            onEditTab={() => setActiveTab("edit")}
          />
        )}

        {activeTab === "edit" && (
          <EditProfileTab
            profile={profile}
            initials={initials}
            editForm={editForm}
            onFormChange={setEditForm}
            onSave={handleSaveProfile}
            onCancel={() => setActiveTab("overview")}
            saving={savingProfile}
            onOpenPhotoModal={() => setShowPhotoModal(true)}
          />
        )}

        {activeTab === "security" && (
          <SecurityTab
            onChangePassword={handleChangePassword}
            saving={savingPwd}
            message={pwdMsg}
          />
        )}
      </main>

      {/* Photo Studio Modal */}
      {showPhotoModal && (
        <PhotoStudioModal
          currentPic={profile?.profilePic || ""}
          saving={savingProfile}
          onApply={handleApplyPhoto}
          onRemove={handleRemovePhoto}
          onClose={() => setShowPhotoModal(false)}
        />
      )}
    </div>
  );
}
