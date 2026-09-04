import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AdminContext } from "../Context/AdminContext";
import "./WalkInOrder.css";

function isToday(dateStr) {
  const d = new Date(dateStr);
  return d.toDateString() === new Date().toDateString();
}

function WalkInOrder({ onOrderComplete }) {
  const { API_URL, token } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // [{ _id, name, price, quantity }]
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch(() => setMessage("Failed to load products."));
  }, []);

  const fetchTodaysOrders = useCallback(() => {
    axios
      .get(`${API_URL}/orders`)
      .then((res) => setTodaysOrders(res.data.filter((o) => isToday(o.createdAt))))
      .catch(() => {});
  }, [API_URL]);

  useEffect(() => {
    fetchTodaysOrders();
  }, [fetchTodaysOrders]);

  const addToCart = (product) => {
    setMessage("");
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { _id: product._id, name: product.name, price: product.price, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const completeOrder = async () => {
    if (cart.length === 0) return;
    setSubmitting(true);
    setMessage("");

    try {
      await axios.post(
        `${API_URL}/orders`,
        {
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        },
        { headers: authHeaders }
      );
      setCart([]);
      setMessage("Order saved.");
      fetchTodaysOrders();
      if (onOrderComplete) onOrderComplete();
    } catch (err) {
      setMessage("Failed to save order.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteOrder = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/orders/${id}`, { headers: authHeaders });
      setTodaysOrders(todaysOrders.filter((o) => o._id !== id));
      if (onOrderComplete) onOrderComplete();
    } catch (err) {
      setMessage("Failed to delete order.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="walkin-order">
      <h2 className="walkin-order-title">New walk-in order</h2>
      <p className="walkin-order-subtitle">
        Tap items the customer ordered, then complete the order.
      </p>

      {message && <p className="walkin-order-message">{message}</p>}

      <div className="walkin-order-layout">
        <div className="walkin-product-grid">
          {products.map((p) => (
            <button
              key={p._id}
              className="walkin-product-box"
              onClick={() => addToCart(p)}
            >
              <img
                src={`${API_URL.replace("/api", "")}/uploads/${p.image}`}
                alt={p.name}
              />
              <span className="walkin-product-name">{p.name}</span>
              <span className="walkin-product-price">Rs. {p.price}</span>
            </button>
          ))}
        </div>

        <div className="walkin-cart">
          <h3 className="walkin-cart-title">Current order</h3>

          {cart.length === 0 ? (
            <p className="walkin-cart-empty">No items selected yet.</p>
          ) : (
            <div className="walkin-cart-list">
              {cart.map((item) => (
                <div className="walkin-cart-row" key={item._id}>
                  <span className="walkin-cart-name">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="walkin-cart-price">
                    Rs. {item.price * item.quantity}
                  </span>
                  <button
                    className="walkin-cart-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="walkin-cart-total">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>

          <button
            className="walkin-cart-submit"
            onClick={completeOrder}
            disabled={cart.length === 0 || submitting}
          >
            {submitting ? "Saving..." : "Complete order"}
          </button>
        </div>
      </div>

      <div className="walkin-recent">
        <h3 className="walkin-recent-title">Today's orders</h3>

        {todaysOrders.length === 0 ? (
          <p className="walkin-recent-empty">No orders placed today yet.</p>
        ) : (
          <div className="walkin-recent-list">
            {todaysOrders.map((order) => (
              <div className="walkin-recent-row" key={order._id}>
                <span className="walkin-recent-time">
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="walkin-recent-items">
                  {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                </span>
                <span className="walkin-recent-amount">Rs. {order.totalAmount}</span>
                <button
                  className="walkin-recent-delete"
                  onClick={() => deleteOrder(order._id)}
                  disabled={deletingId === order._id}
                >
                  {deletingId === order._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WalkInOrder;