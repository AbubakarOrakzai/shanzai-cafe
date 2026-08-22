import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">Order counter open till 11pm</p>
        <h1 className="hero-title">
          EAT <span className="hero-title-accent">GOOD</span>.
          <br />
          FELL <span className="hero-title-accent">GOOD</span>.
        </h1>
        <p className="hero-text">
        We have good quality burgers and pizzas available. Click here to see the full menu for more deals!
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="hero-btn-primary">View menu</Link>
          <Link to="/contact" className="hero-btn-secondary">Find us</Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;