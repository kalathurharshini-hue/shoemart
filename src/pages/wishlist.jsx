import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  const removeWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        size: product.sizes[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    removeWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <div>♡</div>
        <h1>Your wishlist is empty</h1>
        <p>Save your favorite shoes here.</p>

        <Link to="/products">Explore Shoes</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <p>SAVED PRODUCTS</p>
        <h1>My Wishlist</h1>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div className="wishlist-card" key={product.id}>
            <div className="wishlist-image">
              <img src={product.image} alt={product.name} />

              <button
                onClick={() => removeWishlist(product.id)}
              >
                ♥
              </button>
            </div>

            <div className="wishlist-info">
              <p>{product.category}</p>

              <h3>{product.name}</h3>

              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              <div className="wishlist-actions">
                <Link to={`/products/${product.id}`}>
                  View
                </Link>

                <button onClick={() => moveToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;