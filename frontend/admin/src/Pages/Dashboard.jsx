import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AdminContext } from "../Context/AdminContext";
import MetricCard from "../Components/MetricCard";
import "./Dashboard.css";

function Dashboard() {
  const { API_URL } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const now = new Date();
  const isThisMonth = (dateStr) => {
    const d = new Date(dateStr);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalProfit = orders.reduce((sum, o) => sum + o.totalProfit, 0);
  const monthlySales = orders
    .filter((o) => isThisMonth(o.createdAt))
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const monthlyProfit = orders
    .filter((o) => isThisMonth(o.createdAt))
    .reduce((sum, o) => sum + o.totalProfit, 0);

  const metrics = [
    { label: "Total sales", value: `Rs. ${totalSales}`, accent: "#33383f" },
    { label: "Monthly sales", value: `Rs. ${monthlySales}`, accent: "#c48a0e" },
    { label: "Total profit", value: `Rs. ${totalProfit}`, accent: "#e1341e" },
    { label: "Monthly profit", value: `Rs. ${monthlyProfit}`, accent: "#e1341e" },
  ];

  return (
    <div className="dashboard">
      <p className="dashboard-eyebrow">Admin panel</p>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-metrics">
        {loading ? (
          <p>Loading metrics...</p>
        ) : (
          metrics.map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              accent={m.accent}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;