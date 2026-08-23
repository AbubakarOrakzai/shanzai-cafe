import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../Components/HeroSection";
import ProductGrid from "../Components/ProductGride";
import { ShopContext } from "../context/ShopContext";
import "./Home.css";

function Home() {
  const { products, loading } = useContext(ShopContext);
  const bestSellers = products.filter((p) => p.isBestSeller);

  if (loading) {
    return (
      <div>
        <HeroSection />
        <p style={{ textAlign: "center", padding: "40px" }}>
          Loading menu...
        </p>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />

      <div className="home-menu-link-wrap">
        <Link to="/menu" className="home-menu-link">
          View full menu
        </Link>
      </div>

      <ProductGrid
        eyebrow="Crowd favorites"
        title="Best sellers"
        products={bestSellers}
      />
    </div>
  );
}

export default Home;