import React from "react";
import { Link } from "react-router-dom";
import heroBanner from "../assets/hero-banner.jfif";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <p className="hero-eyebrow">WELCOME TO SHANZAI CAFE</p>
        <h1 className="hero-title">
        wHERE FLAVOR MEETS
          <br />
           <span className="hero-title-accent">FRIENDSHIP</span>.
        </h1>
        <p className="hero-text">
          Flame-grilled patties, hand-cut fries and no shortcuts. Order at
          the counter or online, ready in minutes.
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