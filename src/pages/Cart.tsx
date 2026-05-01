import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0
  );

  const delivery = cart.length ? 3.99 : 0;
  const totalPrice = subtotal + delivery;

  return (
    <div className="checkout-layout">
      <div className="section-card">
        <h1 className="page-heading">🛒 Your Cart</h1>

        <p className="page-copy">
          Review your selected meals, adjust quantities, and continue to
          checkout when you're ready.
        </p>

        {cart.length === 0 && (
          <p style={{ color: "#64748b" }}>
            Nothing in the cart yet. Add tasty food from the food list.
          </p>
        )}

        <div className="cart-grid">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="cart-item-details">
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <h3 className="cart-item-name">{item.title}</h3>

                  <span className="price-pill">
                    Rs. {item.price.toFixed(2)}
                  </span>
                </div>

                <div className="cart-item-meta">
                  <span>Quantity: {item.qty}</span>
                  <span>
                    Subtotal: Rs. {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>

                <div className="quantity-control">
                  <button
                    className="quantity-button"
                    type="button"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span className="quantity-display">{item.qty}</span>

                  <button
                    className="quantity-button"
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        title: item.title,
                        qty: 1,
                        price: item.price || 0,
                        image: item.image,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <button
                  className="action-button"
                  type="button"
                  style={{
                    background: "#ef4444",
                    color: "white",
                    borderColor: "transparent",
                  }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <aside className="summary-card">
          <div className="summary-item">
            <span>Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-item">
            <span>Subtotal</span>
            <strong>Rs. {subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-item">
            <span>Delivery</span>
            <strong>Rs. {delivery.toFixed(2)}</strong>
          </div>

          <div className="summary-item" style={{ fontSize: "1.15rem" }}>
            <span>Total</span>
            <strong>Rs. {totalPrice.toFixed(2)}</strong>
          </div>

          <button
            className="place-order-button"
            type="button"
            onClick={() => navigate("/order")}
          >
            Proceed to Checkout 🚀
          </button>
        </aside>
      )}
    </div>
  );
}