import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../Context/AdminContext";
import "./ProductManager.css";

function ProductManager() {
  const { API_URL, token } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    isBestSeller: false,
    imageFile: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category.trim() || !form.imageFile) {
      setError("Name, price, category, and an image are all required.");
      return;
    }

    const data = new FormData();
    data.append("name", form.name.trim());
    data.append("price", form.price);
    data.append("category", form.category.trim());
    data.append("isBestSeller", form.isBestSeller);
    data.append("image", form.imageFile);

    try {
      await axios.post(`${API_URL}/products`, data, {
        headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
      });
      setForm({ name: "", price: "", category: "", isBestSeller: false, imageFile: null });
      setError("");
      fetchProducts();
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, { headers: authHeaders });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  const startEditPrice = (product) => {
    setEditingId(product._id);
    setEditPrice(product.price);
  };

  const saveEditPrice = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/products/${id}`,
        { price: Number(editPrice) },
        { headers: authHeaders }
      );
      setProducts(products.map((p) => (p._id === id ? res.data : p)));
      setEditingId(null);
      setEditPrice("");
    } catch (err) {
      setError("Failed to update price.");
    }
  };

  return (
    <div className="product-manager">
      <h2 className="product-manager-title">Manage products</h2>

      {error && <p className="product-manager-error">{error}</p>}

      <form className="product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (Rs.)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category (e.g. Burgers)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <label className="product-form-checkbox">
          <input
            type="checkbox"
            checked={form.isBestSeller}
            onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
          />
          Best seller
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
        />
        <button type="submit" className="product-form-submit">
          Add product
        </button>
      </form>

      <div className="product-table">
        <div className="product-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p className="product-table-empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="product-table-empty">No products yet.</p>
        ) : (
          products.map((p) => (
            <div className="product-table-row" key={p._id}>
              <span className="product-table-image">
                <img
                  src={`${API_URL.replace("/api", "")}/uploads/${p.image}`}
                  alt={p.name}
                />
              </span>
              <span>{p.name}</span>
              <span>
                {editingId === p._id ? (
                  <input
                    type="number"
                    className="product-table-price-input"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                ) : (
                  `Rs. ${p.price}`
                )}
              </span>
              <span className="product-table-actions">
                {editingId === p._id ? (
                  <button className="btn-save" onClick={() => saveEditPrice(p._id)}>
                    Save
                  </button>
                ) : (
                  <button className="btn-edit" onClick={() => startEditPrice(p)}>
                    Edit price
                  </button>
                )}
                <button className="btn-delete" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductManager;