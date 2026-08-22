import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

const API_URL = "http://localhost:5000/api";

export function AdminProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setError("");
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem("adminToken", res.data.token);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
      return false;
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminContext.Provider value={{ token, login, logout, error, API_URL }}>
      {children}
    </AdminContext.Provider>
  );
}