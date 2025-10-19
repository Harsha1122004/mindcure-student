import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "0.9rem 1rem",
    borderRadius: "10px",
    color: isActive ? "#fff" : "#aaa",
    background: isActive ? "linear-gradient(90deg, #222, #333)" : "transparent",
    border: isActive ? "1px solid #444" : "1px solid transparent",
    textDecoration: "none",
    fontWeight: 500,
    transition: "all 0.25s ease",
  });

  return (
    <aside
      style={{
        width: "250px",
        padding: "2rem 1.2rem",
        borderRight: "1px solid #222",
        height: "100vh",
        background: "linear-gradient(180deg, #0e0e0e, #1a1a1a)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "sticky",
        top: 0,
      }}
    >
      <h2
        style={{
          marginBottom: "2rem",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
        }}
      >
        🧠 Dashboard
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <NavLink to="/dashboard" style={linkStyle} end>
          Overview
        </NavLink>
        <NavLink to="/resources" style={linkStyle}>
          Resources
        </NavLink>
        <NavLink to="/analytics" style={linkStyle}>
          Analytics
        </NavLink>
        <NavLink to="/counselor-dashboard" style={linkStyle}>
          Crisis Alerts
        </NavLink>
        <NavLink to="/chat" style={linkStyle}>
          Back to Chat
        </NavLink>
      </nav>
    </aside>
  );
}
