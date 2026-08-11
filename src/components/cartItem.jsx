import "./CartItem.css";

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
        <p>Size: {item.size}</p>

        <strong>
          ₹{item.price.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="cart-quantity">
        <button
          onClick={() =>
            onQuantityChange(item.id, item.size, item.quantity - 1)
          }
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() =>
            onQuantityChange(item.id, item.size, item.quantity + 1)
          }
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
      </div>

      <button className="remove-cart" onClick={() => onRemove(item.id, item.size)}>
        🗑️
      </button>
    </div>
  );
}

export default CartItem;