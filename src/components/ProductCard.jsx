import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <button className="wishlist-button" title="Add to Wishlist">
          ♡
        </button>

        <span className="discount-badge">
          {product.discount}% OFF
        </span>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-brand">{product.brand}</p>

        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        <div className="product-price">
          <span className="current-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="original-price">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="product-buttons">
          <Link
            to={`/products/${product.id}`}
            className="view-details-button"
          >
            View Details
          </Link>

          <button className="add-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;