import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>👟 Shoe Mart</h2>
          <p>
            Step into style with comfortable and fashionable shoes
            for every occasion.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <p>Running Shoes</p>
          <p>Sneakers</p>
          <p>Sports Shoes</p>
          <p>Formal Shoes</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 support@shoemart.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Shoe Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;