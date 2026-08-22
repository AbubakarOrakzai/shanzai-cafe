import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ eyebrow, title, products }) {
  return (
    <section className="product-grid-section">
      <div className="product-grid-inner">
        <p className="product-grid-eyebrow">{eyebrow}</p>
        <h2 className="product-grid-title">{title}</h2>

        {products.length === 0 ? (
          <p className="product-grid-empty">No products to show yet.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;