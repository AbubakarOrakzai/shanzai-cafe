import React from "react";
import WalkInOrder from "../Components/WalkInOrder";
import "./NewOrder.css";

function NewOrder() {
  return (
    <div className="new-order-page">
      <p className="new-order-eyebrow">Admin panel</p>
      <h1 className="new-order-title">New order</h1>
      <WalkInOrder />
    </div>
  );
}

export default NewOrder;