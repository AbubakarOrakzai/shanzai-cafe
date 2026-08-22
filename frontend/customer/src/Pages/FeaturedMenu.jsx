import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedMenu.css";
import deals from "../assets/deals.jpg"
import Menu01 from "../assets/menu01.jpg"
import Menu02 from "../assets/Menu02.jpg"
import Menu03 from "../assets/menu03.jpg"
const items = [
  { id: 1, name: "Specail deal", price: 1995, image: deals },
  { id: 2, name: "Zinger Burger", price: 550, image: Menu01 },
  { id: 3, name: "Wings pack", price: 700, image:Menu02 },
  { id: 3, name: "Pizza", price: 1220, image: Menu03 },
  
]

function FeaturedMenu() {
  return (
    <section className="menu-preview">
      <div className="menu-preview-inner">
        <div className="menu-preview-header">
          <div>
            <p className="menu-preview-eyebrow">Crowd favorites</p>
            <h2 className="menu-preview-title">Best sellers</h2>
          </div>
          <Link to="/menu" className="menu-preview-link">
            Full menu →
          </Link>
        </div>

        <div className="menu-preview-grid">
          {items.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <span className="menu-card-emoji">{item.emoji}</span>
                )}
              </div>
              <div className="menu-card-body">
                <p className="menu-card-name">{item.name}</p>
                <p className="menu-card-price">Rs. {item.price.toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMenu;