import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function CounselorDashboard() {
  const { role } = useAuth(); // ✅ Get user role
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ackId, setAckId] = useState(null);
  const [error, setError] = useState(null);

  // 📩 Load all alerts securely
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const r = await api.get("/api/alerts", {
        headers: { "X-User-Role": role }, // ✅ secure header
      });
      setAlerts(r.data.alerts || []);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setError("🚫 Access denied or failed to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Acknowledge alert securely
  const ack = async (id) => {
    try {
      setAckId(id);
      await api.post(
        "/api/alerts/acknowledge",
        { alertId: id },
        { headers: { "X-User-Role": role } }
      );
      await load();
    } catch (err) {
      console.error("Failed to acknowledge alert:", err);
      setError("❌ Could not acknowledge alert.");
    } finally {
      setAckId(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
        color: "#111",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "2.5rem 3.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* 🩺 Header */}
        <header>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              marginBottom: ".5rem",
              color: "#000",
            }}
          >
            🩺 Crisis Alert Center
          </h1>
          <p style={{ color: "#555", fontSize: "1rem", maxWidth: "600px" }}>
            Review and manage student crisis alerts detected by the AI system.
            Only visible to counselors and administrators.
          </p>
        </header>

        {/* ⚠️ Error State */}
        {error && (
          <div
            style={{
              padding: "1rem",
              background: "#ffefef",
              border: "1px solid #ff4d4d",
              borderRadius: "8px",
              color: "#b30000",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {/* ⏳ Loading State */}
        {loading ? (
          <p style={{ fontSize: "1.2rem", color: "#777" }}>
            ⏳ Loading alerts...
          </p>
        ) : alerts.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#777" }}>
            ✅ No crisis alerts currently. Students are safe and doing well.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.8rem",
            }}
          >
            {alerts.map((a) => (
              <div
                key={a._id}
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  padding: "1.8rem",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ marginBottom: "0.6rem", fontWeight: "600" }}>
                  📁 Session ID:{" "}
                  <span style={{ fontWeight: "400", color: "#444" }}>
                    {a.session_id}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "#666",
                    marginBottom: "1.2rem",
                  }}
                >
                  🕐 Created:{" "}
                  {a.created_at ? new Date(a.created_at).toLocaleString() : "—"}
                </div>

                <div style={{ marginBottom: "1.2rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: a.severity === "high" ? "#d32f2f" : "#fbc02d",
                      color: "#fff",
                      padding: "0.5rem 0.9rem",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      marginRight: "0.6rem",
                    }}
                  >
                    🔥 Severity: {a.severity}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      background: a.acknowledged ? "#2e7d32" : "#555",
                      color: "#fff",
                      padding: "0.5rem 0.9rem",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {a.acknowledged ? "✅ Acknowledged" : "❗ Pending"}
                  </span>
                </div>

                {!a.acknowledged && (
                  <button
                    onClick={() => ack(a._id)}
                    disabled={ackId === a._id}
                    style={{
                      padding: "0.9rem 1.2rem",
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: ackId === a._id ? "not-allowed" : "pointer",
                      width: "100%",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {ackId === a._id
                      ? "Acknowledging..."
                      : "✅ Mark as Acknowledged"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
