import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );

    updateStorage(updatedCart);
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    );

    updateStorage(updatedCart);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 && subtotal < 2000 ? 100 : 0;
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery - discount;

  const checkout = () => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      navigate("/login?redirect=/checkout");
      return;
    }

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div>🛒</div>
        <h1>Your cart is empty</h1>
        <p>Add some amazing shoes to your cart.</p>

        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p>YOUR SHOPPING BAG</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}`}
              item={item}
              onRemove={removeItem}
              onQuantityChange={updateQuantity}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </strong>
          </div>

          <div>
            <span>Discount</span>
            <strong>
              -₹{discount.toLocaleString("en-IN")}
            </strong>
          </div>

          <hr />

          <div className="final-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          <button className="checkout-button" onClick={checkout}>
            Proceed to Checkout
          </button>

          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;