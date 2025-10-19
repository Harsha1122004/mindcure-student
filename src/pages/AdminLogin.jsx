import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🧠 Replace this with real admin auth later (Firebase or backend check)
    if (email === "admin@mindmate.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0e17",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#1a1d29",
          padding: "2rem",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          🔐 Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="admin@mindmate.com"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Enter password"
          />
          {error && (
            <p style={{ color: "#f87171", marginTop: "0.5rem" }}>{error}</p>
          )}
          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  margin: "0.5rem 0 1rem",
  borderRadius: "6px",
  border: "1px solid #444",
  background: "#11131c",
  color: "#fff",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  background: "#3A7BD5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
};
