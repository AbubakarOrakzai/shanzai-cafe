import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AdminContext } from "../Context/AdminContext";
import MetricCard from "../Components/MetricCard";
import ProductBreakdownCard from "../Components/ProductBreakdownCard";
import "./Dashboard.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Sums up quantity sold per product name across a set of orders
function aggregateProductSales(ordersList) {
  const map = {};
  ordersList.forEach((order) => {
    order.items.forEach((item) => {
      map[item.name] = (map[item.name] || 0) + item.quantity;
    });
  });
  return Object.entries(map)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
}

function Dashboard() {
  const { API_URL } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const currentMonthValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthValue);

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

  // Today - resets automatically at midnight since we compare calendar dates
  const isToday = (dateStr) => {
    const d = new Date(dateStr);
    return d.toDateString() === now.toDateString();
  };

  // Current calendar week, Monday to Sunday - resets every Monday
  const getWeekRange = (date) => {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(date.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { monday, sunday };
  };
  const { monday, sunday } = getWeekRange(now);
  const isThisWeek = (dateStr) => {
    const d = new Date(dateStr);
    return d >= monday && d <= sunday;
  };

  // Selected month (defaults to current, but admin can pick any past month)
  const [selYear, selMonthNum] = selectedMonth.split("-").map(Number);
  const isSelectedMonth = (dateStr) => {
    const d = new Date(dateStr);
    return d.getFullYear() === selYear && d.getMonth() + 1 === selMonthNum;
  };

  const todayOrders = orders.filter((o) => isToday(o.createdAt));
  const weekOrders = orders.filter((o) => isThisWeek(o.createdAt));
  const selectedMonthOrders = orders.filter((o) => isSelectedMonth(o.createdAt));

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const dailySales = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const weeklySales = weekOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const selectedMonthSales = selectedMonthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const selectedMonthLabel = `${MONTH_NAMES[selMonthNum - 1]} ${selYear}`;

  const metrics = [
    { label: "Total sales", value: `Rs. ${totalSales}`, accent: "#33383f" },
    { label: "Today's sales", value: `Rs. ${dailySales}`, accent: "#2f7a5f" },
    { label: "Weekly sales", value: `Rs. ${weeklySales}`, accent: "#c48a0e" },
    {
      label: `Sales — ${selectedMonthLabel}`,
      value: `Rs. ${selectedMonthSales}`,
      accent: "#e1341e",
    },
  ];

  const todayBreakdown = aggregateProductSales(todayOrders);
  const weekBreakdown = aggregateProductSales(weekOrders);
  const monthBreakdown = aggregateProductSales(selectedMonthOrders);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const breakdownToRows = (items) =>
      items.length === 0
        ? [["No sales"]]
        : items.map((i) => [i.name, i.quantity]);

    const rows = [
      ["Report generated", now.toLocaleString()],
      [],
      ["Metric", "Amount (Rs.)"],
      ["Total sales", totalSales],
      ["Today's sales", dailySales],
      ["Weekly sales (Mon-Sun)", weeklySales],
      [`Sales - ${selectedMonthLabel}`, selectedMonthSales],
      [],
      ["Products sold today", "Quantity"],
      ...breakdownToRows(todayBreakdown),
      [],
      ["Products sold this week", "Quantity"],
      ...breakdownToRows(weekBreakdown),
      [],
      [`Products sold - ${selectedMonthLabel}`, "Quantity"],
      ...breakdownToRows(monthBreakdown),
      [],
      ["Order date", "Items", "Total (Rs.)"],
      ...orders.map((o) => [
        new Date(o.createdAt).toLocaleString(),
        o.items.map((i) => `${i.name} x${i.quantity}`).join("; "),
        o.totalAmount,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `shanzai-sales-report-${now.toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (

    
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Admin panel</p>
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="dashboard-actions">
          <label className="dashboard-month-picker">
            <span>View month</span>
            <input
              type="month"
              value={selectedMonth}
              max={currentMonthValue}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </label>
          <button className="dashboard-btn" onClick={handlePrint}>
            Print
          </button>
          <button className="dashboard-btn dashboard-btn-primary" onClick={handleDownloadCSV}>
            Download CSV
          </button>
        </div>
      </div>

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

      {!loading && (
        <>
          <h2 className="dashboard-subtitle">Products sold</h2>
          <div className="dashboard-breakdowns">
            <ProductBreakdownCard title="Today" items={todayBreakdown} />
            <ProductBreakdownCard title="This week" items={weekBreakdown} />
            <ProductBreakdownCard
              title={selectedMonthLabel}
              items={monthBreakdown}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;