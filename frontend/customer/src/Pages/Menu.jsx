import React, { useContext, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../Components/ProductCard";
import "./Menu.css";

function Menu() {
  const { products, loading } = useContext(ShopContext);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...unique];
  }, [products]);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="menu-page">
      <p className="menu-eyebrow">Order online</p>
      <h1 className="menu-title">Full menu</h1>

      {loading ? (
        <p className="menu-loading">Loading menu...</p>
      ) : (
        <>
          <div className="menu-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-category-btn ${
                  activeCategory === cat ? "menu-category-btn-active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="menu-empty">No products in this category yet.</p>
          ) : (
            <div className="menu-grid">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;