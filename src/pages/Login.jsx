import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login, loading, error, clearError } = useAuth();
  if (!loading && user) return <Navigate to="/chat" replace />;

  return (
    <div
      className="card"
      style={{
        maxWidth: 420,
        margin: "4rem auto",
        padding: "2rem",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Welcome back</h2>
      <p className="muted" style={{ marginTop: ".4rem" }}>
        Authenticate to continue.
      </p>
      {error && (
        <div
          onClick={clearError}
          className="card"
          style={{
            background: "var(--panel-2)",
            borderColor: "#3a3a3f",
            padding: ".8rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          {error}
        </div>
      )}
      <div className="spacer" />
      <button className="btn primary" onClick={login} disabled={loading}>
        {loading ? "Connecting…" : "Sign in with Google"}
      </button>
      <p className="muted" style={{ fontSize: ".85rem", marginTop: "1.2rem" }}>
        By signing in you agree to our Terms & Privacy.
      </p>
    </div>
  );
}
