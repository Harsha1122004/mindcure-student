import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/api/stats/overview");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0e17",
        color: "#fff",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        📊 Admin Dashboard
      </h1>

      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <Card title="Total Sessions" value={stats?.total_sessions} />
          <Card title="Total Crisis Alerts" value={stats?.total_alerts} />
          <Card
            title="Unacknowledged Alerts"
            value={stats?.unacknowledged_alerts}
          />
        </div>
      )}

      <div style={{ marginTop: "3rem" }}>
        <h2>📉 Sentiment Trends (Coming Soon)</h2>
        <p>
          We will display real-time sentiment analysis graphs and session
          insights here.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#1a1d29",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#3A7BD5" }}>
        {value}
      </p>
    </div>
  );
}
