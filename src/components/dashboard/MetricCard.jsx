// import "../styles/dashboard.css";

export default function MetricCard({ icon, label, value }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-info">
        <h3>{label}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}
