import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// ✅ Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import StudentDashboard from "../pages/StudentDashboard";
import CounselorDashboard from "../pages/CounselorDashboard";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import Resources from "../pages/Resources";
import Analytics from "../pages/Analytics";

// ✅ Protected Route
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { role, loading } = useAuth();

  // 🌀 Loading screen during authentication
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#3A7BD5",
          background: "#0b0e17",
        }}
      >
        🔐 Loading MindMate...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 🏠 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 💬 Chat Page (Protected) */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* 📊 Auto-Role Dashboard Redirect */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {role === "admin" ? (
                  <AdminDashboard />
                ) : role === "counselor" ? (
                  <CounselorDashboard />
                ) : (
                  <StudentDashboard />
                )}
              </ProtectedRoute>
            }
          />

          {/* 🩺 Counselor Dashboard (Direct Access) */}
          <Route
            path="/counselor-dashboard"
            element={
              <ProtectedRoute role="counselor">
                <CounselorDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🧠 Admin Dashboard (Direct Access) */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 📚 Resources (Protected) */}
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />

          {/* 📈 Analytics (Protected) */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* 🚧 404 - Not Found */}
          <Route
            path="*"
            element={
              <div
                style={{
                  padding: "4rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "#A0AEC0",
                }}
              >
                🚫 404 — Page Not Found
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
