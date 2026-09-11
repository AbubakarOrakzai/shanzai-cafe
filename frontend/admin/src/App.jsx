import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import NewOrder from "./Pages/NewOrder";
import Products from "./Pages/Product";
import "./App.css";

// NOTE: Login/auth is temporarily disabled - all routes are open.
// Once real admin login is built, wrap these routes back in <ProtectedRoute>
// and re-add the /login route.

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/new-order"
        element={
          <AdminLayout>
            <NewOrder />
          </AdminLayout>
        }
      />

      <Route
        path="/products"
        element={
          <AdminLayout>
            <Products />
          </AdminLayout>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;