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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
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