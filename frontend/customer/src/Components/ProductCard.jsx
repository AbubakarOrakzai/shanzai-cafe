import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { API_URL } = useContext(ShopContext);

  if (!product || !product.image) {
    return null; // skip rendering a broken/incomplete product instead of crashing
  }

  const imageUrl = `${API_URL.replace("/api", "")}/uploads/${product.image}`;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="product-card-body">
        <p className="product-card-name">{product.name}</p>
        <p className="product-card-price">Rs. {product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;