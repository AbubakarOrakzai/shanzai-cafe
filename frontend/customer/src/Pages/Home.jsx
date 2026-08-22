import React, { useContext } from "react";
import HeroSection from "../Components/HeroSection";
import ProductGrid from "../Components/ProductCard"
import { ShopContext } from "../context/ShopContext";

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

      <ProductGrid
        eyebrow="Crowd favorites"
        title="Best sellers"
        products={bestSellers}
      />

      <ProductGrid
        eyebrow="Full menu"
        title="All products"
        products={products}
      />
    </div>
  );
}

export default Home;