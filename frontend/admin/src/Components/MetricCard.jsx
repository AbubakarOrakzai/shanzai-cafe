import React from "react";
import "./MetricCard.css";

function MetricCard({ label, value, accent }) {
  return (
    <div className="metric-card">
      <p className="metric-card-label">{label}</p>
      <p className="metric-card-value" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

export default MetricCard;