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

        {/* Developer Credit */}
        <div className="footer-developer">
          <p className="footer-powered">Powered by</p>

          <a
            href="https://github.com/AbubakarOrakzai"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-developer-name"
          >
            Abubakar Orakzai
          </a>

          <div className="footer-developer-links">
            <a
              href="https://github.com/AbubakarOrakzai"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <span> | </span>

            <a
              href="https://www.linkedin.com/in/abubakar-orakzai-7040642a1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <p className="footer-copy">
        © 2026 Shanzai. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;