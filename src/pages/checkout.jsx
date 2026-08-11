import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [error, setError] = useState("");

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

  // Delivery is free
  const delivery = 0;

  // Simple discount
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.1) : 0;

  const total = subtotal + delivery - discount;

  // Place order
  const handlePlaceOrder = (event) => {
    event.preventDefault();

    setError("");

    // Check cart
    if (cart.length === 0) {
      setError("Your cart is empty. Please add products before checkout.");
      return;
    }

    // Check required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Pincode validation
    const pincodePattern = /^[0-9]{6}$/;

    if (!pincodePattern.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    // Payment validation
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    // Generate order ID
    const orderId =
      "SM" + Math.floor(100000 + Math.random() * 900000);

    // Save order
    const order = {
      orderId,
      customer: {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
      },
      products: cart,
      subtotal,
      delivery,
      discount,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to success page
    navigate("/order-success");
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* LEFT SIDE - CUSTOMER DETAILS */}
        <div className="checkout-form-section">

          <h1>Checkout</h1>

          <p className="checkout-subtitle">
            Complete your details to place your order.
          </p>

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          <form onSubmit={handlePlaceOrder}>

            {/* CUSTOMER INFORMATION */}
            <div className="checkout-section">

              <h2>Customer Information</h2>

              <div className="form-group">
                <label>Full Name *</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>

                <input
                  type="tel"
                  placeholder="10-digit phone number"
                  value={phone}
                  maxLength="10"
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>

            </div>

            {/* SHIPPING ADDRESS */}
            <div className="checkout-section">

              <h2>Shipping Address</h2>

              <div className="form-group">
                <label>Address *</label>

                <textarea
                  placeholder="Enter your complete address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>City *</label>

                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>

                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Pincode *</label>

                <input
                  type="text"
                  placeholder="6-digit pincode"
                  value={pincode}
                  maxLength="6"
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>

            </div>

            {/* PAYMENT */}
            <div className="checkout-section">

              <h2>Payment Method</h2>

              <div className="payment-options">

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Demo Card Payment"
                    checked={paymentMethod === "Demo Card Payment"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Demo Card Payment</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI Demo"
                    checked={paymentMethod === "UPI Demo"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>UPI Demo</span>
                </label>

              </div>

            </div>

            {/* MOBILE PLACE ORDER BUTTON */}
            <button
              type="submit"
              className="place-order-btn mobile-place-order"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <div className="empty-checkout">
              <p>Your cart is empty.</p>

              <button
                onClick={() => navigate("/products")}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* PRODUCTS */}
              <div className="summary-products">

                {cart.map((item) => {

                  const quantity = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;

                  return (
                    <div
                      className="summary-product"
                      key={`${item.id}-${item.selectedSize || item.size || ""}`}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="summary-product-info">

                        <h3>{item.name}</h3>

                        <p>
                          Size{" "}
                          {item.selectedSize ||
                            item.size ||
                            "Not selected"}{" "}
                          × {quantity}
                        </p>

                      </div>

                      <strong>
                        ₹{(price * quantity).toLocaleString("en-IN")}
                      </strong>

                    </div>
                  );
                })}

              </div>

              {/* TOTALS */}
              <div className="summary-line">
                <span>Subtotal</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="summary-line">
                <span>Delivery</span>

                <strong>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <div className="summary-line">
                <span>Discount</span>

                <strong className="discount">
                  -₹{discount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              {/* DESKTOP PLACE ORDER BUTTON */}
              <button
                type="button"
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Checkout;