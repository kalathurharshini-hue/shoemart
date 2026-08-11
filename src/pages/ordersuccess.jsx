import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with Shoe Mart.
        </p>

        <p className="success-text">
          Your order has been confirmed successfully.
        </p>

        <div className="success-buttons">

          <Link to="/products" className="success-btn">
            Continue Shopping
          </Link>

          <Link to="/" className="home-btn">
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;