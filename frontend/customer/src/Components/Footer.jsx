import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-logo">
            Shan<span className="footer-logo-accent">zai</span>
          </p>
          <p className="footer-text">
         We have good quality burgers and pizzas available.
          </p>
        </div>
        <div className="footer-address">
          <p className="footer-address-title">Visit us</p>
          <p className="footer-address-text">
            Shanzai پخلنځي
            <br />
            Street 9, Canal Town
            <br />
            Peshawar
          </p>
        </div>
      </div>
      <p className="footer-copy">© 2026 Shanzai. All rights reserved.</p>
    </footer>
  );
}

export default Footer;