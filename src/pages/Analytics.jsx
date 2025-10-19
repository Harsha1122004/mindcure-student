import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Analytics() {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📊 Fetch total stats
  const loadStats = async () => {
    try {
      const r = await api.get("/api/stats/overview");
      setOverview(r.data);
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  };

  // 📈 Fetch sentiment trend (7-day or per session)
  const loadTrend = async () => {
    try {
      const res = await api.get("/api/sessions-trend"); // optional route (backend can aggregate)
      setTrend(res.data.trend || []);
    } catch (e) {
      console.warn("No trend data found — using mock");
      setTrend([
        { day: "Mon", sentiment: 75 },
        { day: "Tue", sentiment: 82 },
        { day: "Wed", sentiment: 60 },
        { day: "Thu", sentiment: 88 },
        { day: "Fri", sentiment: 90 },
      ]);
    }
  };

  useEffect(() => {
    Promise.all([loadStats(), loadTrend()]).then(() => setLoading(false));
  }, []);

  const EMOTION_COLORS = ["#4A90E2", "#50E3C2", "#F5A623", "#E94E77"];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Sidebar />

      <main style={{ flex: 1, padding: "2rem 3rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: ".5rem" }}>
            📊 Analytics Dashboard
          </h1>
          <p style={{ color: "#bbb" }}>
            Visualize sentiment trends, mood distribution, and alert frequency
            over time.
          </p>
        </header>

        {loading ? (
          <p>⏳ Loading analytics...</p>
        ) : (
          <>
            {/* ✅ Stats Overview Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  background: "#151515",
                  padding: "1.8rem",
                  borderRadius: "14px",
                  border: "1px solid #222",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <h2>Total Sessions</h2>
                <p style={{ fontSize: "2rem", marginTop: "0.8rem" }}>
                  {overview?.total_sessions || 0}
                </p>
              </div>
              <div
                style={{
                  background: "#151515",
                  padding: "1.8rem",
                  borderRadius: "14px",
                  border: "1px solid #222",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <h2>Total Alerts</h2>
                <p style={{ fontSize: "2rem", marginTop: "0.8rem" }}>
                  {overview?.total_alerts || 0}
                </p>
              </div>
              <div
                style={{
                  background: "#151515",
                  padding: "1.8rem",
                  borderRadius: "14px",
                  border: "1px solid #222",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <h2>Unacknowledged Alerts</h2>
                <p style={{ fontSize: "2rem", marginTop: "0.8rem" }}>
                  {overview?.unacknowledged_alerts || 0}
                </p>
              </div>
            </div>

            {/* 📈 Sentiment Trend */}
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>
                📈 Sentiment Trend (Last 7 Days)
              </h2>
              <div
                style={{
                  background: "#151515",
                  padding: "1.5rem",
                  borderRadius: "14px",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trend}>
                    <CartesianGrid stroke="#222" />
                    <XAxis dataKey="day" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sentiment"
                      stroke="#50E3C2"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* 🍩 Mood Distribution (Static demo for now) */}
            <section>
              <h2 style={{ marginBottom: "1rem" }}>💭 Mood Distribution</h2>
              <div
                style={{
                  background: "#151515",
                  padding: "1.5rem",
                  borderRadius: "14px",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Positive", value: 40 },
                        { name: "Neutral", value: 25 },
                        { name: "Negative", value: 35 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {EMOTION_COLORS.map((c, i) => (
                        <Cell key={i} fill={c} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
