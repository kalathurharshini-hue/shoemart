import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const getWishlist = () => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  };

  const wishlist = getWishlist();
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <div className="not-found-product">
        <h2>Product Not Found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      setMessage("Please select a shoe size.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) =>
        item.id === product.id && item.size === Number(selectedSize)
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...product,
        size: Number(selectedSize),
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setMessage("Product added to cart successfully!");
  };

  const toggleWishlist = () => {
    let updatedWishlist = getWishlist();

    if (isWishlisted) {
      updatedWishlist = updatedWishlist.filter(
        (item) => item.id !== product.id
      );
      setMessage("Removed from wishlist.");
    } else {
      updatedWishlist.push(product);
      setMessage("Added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <p className="details-category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="details-brand">Brand: {product.brand}</p>

          <div className="details-rating">
            ⭐ {product.rating} / 5
          </div>

          <div className="details-price">
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
            <del>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </del>
            <span>{product.discount}% OFF</span>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="size-section">
            <h3>Select Size</h3>

            <div className="sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === String(size) ? "selected" : ""}
                  onClick={() => {
                    setSelectedSize(String(size));
                    setMessage("");
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <h3>Quantity</h3>

            <div className="quantity-control">
              <button
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          {message && <p className="details-message">{message}</p>}

          <div className="details-actions">
            <button className="details-cart-btn" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            <button
              className="details-wishlist-btn"
              onClick={toggleWishlist}
            >
              {isWishlisted ? "♥ Remove Wishlist" : "♡ Wishlist"}
            </button>
          </div>

          <Link to="/cart" className="go-cart">
            Go to Cart →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;