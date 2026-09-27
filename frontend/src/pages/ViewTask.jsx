import { useParams, useNavigate, useLocation } from "react-router-dom";
import TaskDetailView from "../components/Dashboard/Employee/TaskDetailView";
import EmployeeHeader from "../components/Dashboard/Employee/Header";
import { useAuth } from "../context/AuthContext";

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const passedTask = location.state?.task;

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <EmployeeHeader user={user || {}} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskDetailView
          taskId={id}
          task={passedTask}
          onBack={() => navigate(-1)}
          onTaskUpdated={(updatedTask) => {
            console.log("Task updated:", updatedTask);
          }}
        />
      </main>
    </div>
  );
}
