import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("currentUser")
  );

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setIsLoggedIn(false);

    alert("You have been logged out successfully.");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          👟 Shoe Mart
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">
            Wishlist ❤️
            {wishlistCount > 0 && (
              <span className="nav-count">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart">
            Cart 🛒
            {cartCount > 0 && (
              <span className="nav-count">{cartCount}</span>
            )}
          </Link>

          {/* Authentication */}
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;