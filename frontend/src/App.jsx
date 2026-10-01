import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateEmployee from "./components/Dashboard/Admin/AddEmployeeModal";
import EmployeeList from "./pages/EmployeeList";
import ProfilePage from "./pages/ProfilePage";
import AdminTasks from "./pages/AdminTasks";
import ViewTask from "./pages/ViewTask";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

// Redirect root ("/") based on whether user is logged in
const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate
      to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
      replace
    />
  );
};

// Redirect already-logged-in users away from /login
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
        replace
      />
    );
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EmployeeList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees/create"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateEmployee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminTasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/tasks/:id"
        element={
          <ProtectedRoute allowedRoles={["employee", "admin"]}>
            <ViewTask />
          </ProtectedRoute>
        }
      />

      {/* Unified Profile Route for both Admin and Employee */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["employee", "admin"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/profile" element={<Navigate to="/profile" replace />} />
      <Route path="/employee/profile" element={<Navigate to="/profile" replace />} />

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;