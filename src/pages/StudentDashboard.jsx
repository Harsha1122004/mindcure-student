import Sidebar from "../components/dashboard/Sidebar";

export default function StudentDashboard() {
  return (
    <div className="row" style={{ alignItems: "flex-start" }}>
      <Sidebar />
      <section className="card" style={{ flex: 1, padding: "1.2rem" }}>
        <h2 style={{ marginTop: 0 }}>Overview</h2>
        <p className="muted">Track your sessions and mood trend.</p>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(3,1fr)", marginTop: "1rem" }}
        >
          <div className="card" style={{ padding: "1rem" }}>
            <div className="muted" style={{ fontSize: ".85rem" }}>
              Total Sessions
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>—</div>
          </div>
          <div className="card" style={{ padding: "1rem" }}>
            <div className="muted" style={{ fontSize: ".85rem" }}>
              Mood (7d)
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>—</div>
          </div>
          <div className="card" style={{ padding: "1rem" }}>
            <div className="muted" style={{ fontSize: ".85rem" }}>
              Alerts
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>—</div>
          </div>
        </div>
        <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
          <div className="muted" style={{ marginBottom: ".4rem" }}>
            Tips
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            <li>Try a 25/5 focus cycle when studying.</li>
            <li>Write down one small win at the end of each day.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
