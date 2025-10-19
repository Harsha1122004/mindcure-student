// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
});

// Always send an app-level role header so backend role-gates work if needed
api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "student";
  return config;
});

export default api;
