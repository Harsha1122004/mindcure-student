import { useEffect, useState } from "react";
import api from "../services/api";
import MetricCard from "../components/dashboard/MetricCard";
import { AlertTriangle, Brain, Activity } from "lucide-react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [ackId, setAckId] = useState(null);

  // 🔁 Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [alertsRes, statsRes] = await Promise.all([
        api.get("/api/alerts"),
        api.get("/api/stats/overview"),
      ]);

      setAlerts(alertsRes.data.alerts || []);
      setStats(statsRes.data || {});
    } catch (e) {
      console.error("Dashboard load failed:", e);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Acknowledge alert
  const acknowledge = async (id) => {
    try {
      setAckId(id);
      await api.post("/api/alerts/acknowledge", { alertId: id });
      await loadDashboardData();
    } catch (e) {
      console.error("Acknowledge failed:", e);
    } finally {
      setAckId(null);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Counselor Dashboard</h1>
      <p className="dashboard-subtitle">
        Monitor emotional trends, active sessions, and crisis alerts in real
        time.
      </p>

      {/* 📈 Metrics Section */}
      <div className="metrics-grid">
        <MetricCard
          icon={<Brain size={30} />}
          label="Total Sessions"
          value={stats.total_sessions ?? 0}
        />
        <MetricCard
          icon={<AlertTriangle size={30} />}
          label="Total Alerts"
          value={stats.total_alerts ?? 0}
        />
        <MetricCard
          icon={<Activity size={30} />}
          label="Unacknowledged Alerts"
          value={stats.unacknowledged_alerts ?? 0}
        />
      </div>

      {/* 🚨 Crisis Alerts Section */}
      <div className="alerts-section">
        <h2>⚠️ Crisis Alerts</h2>
        {alerts.length === 0 && (
          <p className="no-alerts">🎉 No alerts at the moment</p>
        )}

        {alerts.map((a) => (
          <div
            key={a._id}
            className={`alert-card ${
              a.acknowledged ? "acknowledged" : "pending"
            }`}
          >
            <p>
              <strong>Session:</strong> {a.session_id}
            </p>
            <p>
              <strong>Severity:</strong> {a.severity}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {a.created_at ? new Date(a.created_at).toLocaleString() : "—"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {a.acknowledged ? "✅ Acknowledged" : "❗ Pending"}
            </p>

            {!a.acknowledged && (
              <button
                onClick={() => acknowledge(a._id)}
                disabled={ackId === a._id}
                className="acknowledge-btn"
              >
                {ackId === a._id ? "Acknowledging…" : "Mark as Acknowledged"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
