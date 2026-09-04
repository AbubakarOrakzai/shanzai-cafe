import React from "react";
import "./ProductBreakdownCard.css";

function ProductBreakdownCard({ title, items }) {
  return (
    <div className="breakdown-card">
      <p className="breakdown-card-title">{title}</p>

      {items.length === 0 ? (
        <p className="breakdown-card-empty">No sales yet.</p>
      ) : (
        <div className="breakdown-list">
          {items.map((item) => (
            <div className="breakdown-row" key={item.name}>
              <span className="breakdown-name">{item.name}</span>
              <span className="breakdown-qty">x{item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductBreakdownCard;