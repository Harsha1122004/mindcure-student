import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading, role: userRole } = useAuth();
  const location = useLocation();

  // 🌀 Show loader while checking authentication
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#3A7BD5",
          background: "#0b0e17",
        }}
      >
        🔐 Verifying access…
      </div>
    );
  }

  // ❌ If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 If a specific role is required but user doesn't match
  if (role && userRole !== role) {
    // Admin trying to access counselor page or vice versa
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Access granted
  return children;
}
