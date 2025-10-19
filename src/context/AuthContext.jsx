import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  loginWithGoogle,
  logout as doLogout,
  watchAuth,
  db,
} from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(
    localStorage.getItem("mindmate_role") || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = watchAuth(async (u) => {
      setUser(u);
      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          let newRole = "student";
          if (snap.exists()) {
            newRole = snap.data().role || "student";
          } else {
            await setDoc(ref, {
              email: u.email,
              displayName: u.displayName,
              role: "student",
              createdAt: Date.now(),
            });
          }
          setRole(newRole);
          localStorage.setItem("mindmate_role", newRole);
        } catch (e) {
          console.error(e);
        }
      } else {
        setRole(null);
        localStorage.removeItem("mindmate_role");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async () => {
    try {
      setError(null);
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await doLogout();
      setUser(null);
      setRole(null);
      localStorage.removeItem("mindmate_role");
    } catch (err) {
      console.error("Logout failed:", err);
      setError(err?.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
