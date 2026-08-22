import React from "react";
import ProductManager from "../Components/ProductManger";
import "./Product.css"

function Products() {
  return (
    <div className="products-page">
      <p className="products-eyebrow">Admin panel</p>
      <h1 className="products-title">Products</h1>
      <ProductManager />
    </div>
  );
}

export default Products;