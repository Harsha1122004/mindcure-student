import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const active = (p) => (pathname === p ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-dot" />
          <span>MindMate</span>
        </Link>

        <div className="nav-links">
          <Link className={active("/")} to="/">
            Home
          </Link>
          <Link className={active("/chat")} to="/chat">
            Chat
          </Link>
          <Link className={active("/dashboard")} to="/dashboard">
            Dashboard
          </Link>
          <Link className={active("/resources")} to="/resources">
            Resources
          </Link>
          <Link className={active("/analytics")} to="/analytics">
            Analytics
          </Link>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <img
                className="avatar"
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || "User"
                  )}`
                }
                alt="avatar"
              />
              <span className="muted" style={{ fontSize: ".92rem" }}>
                {user.email}
              </span>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
